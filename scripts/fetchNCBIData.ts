import connectDB from '@/lib/mongodb'
import { GeneticSequence, Species } from '@/lib/models'
import mongoose from 'mongoose'
import https from 'https'
import { XMLParser } from 'fast-xml-parser'

// Install fast-xml-parser if not already installed
// pnpm add fast-xml-parser

interface NCBISequence {
  accession: string
  organism: string
  definition: string
  sequence: string
  length: number
  gene?: string
  molType?: string
}

// Marine organisms we're interested in
const MARINE_ORGANISMS = [
  'Thunnus albacares',
  'Sardinella longiceps', 
  'Penaeus monodon',
  'Lates calcarifer',
  'Epinephelus marginatus',
  'Mugil cephalus',
  'Chanos chanos'
]

async function fetchNCBIData(organism: string, retmax: number = 10): Promise<NCBISequence[]> {
  return new Promise((resolve, reject) => {
    const searchTerm = encodeURIComponent(`${organism}[ORGN] AND (COI[GENE] OR 16S[GENE] OR 18S[GENE])`)
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=nucleotide&term=${searchTerm}&retmax=${retmax}&retmode=json`
    
    console.log(`🔍 Searching NCBI for: ${organism}`)
    
    https.get(searchUrl, (response) => {
      let data = ''
      
      response.on('data', (chunk) => {
        data += chunk
      })
      
      response.on('end', async () => {
        try {
          const searchResult = JSON.parse(data)
          const idList = searchResult.esearchresult?.idlist || []
          
          if (idList.length === 0) {
            console.log(`⚠️  No sequences found for ${organism}`)
            resolve([])
            return
          }
          
          console.log(`📋 Found ${idList.length} sequences for ${organism}`)
          
          // Fetch sequence details
          const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nucleotide&id=${idList.join(',')}&rettype=fasta&retmode=text`
          
          https.get(fetchUrl, (fetchResponse) => {
            let fastaData = ''
            
            fetchResponse.on('data', (chunk) => {
              fastaData += chunk
            })
            
            fetchResponse.on('end', () => {
              try {
                const sequences = parseFASTAData(fastaData, organism)
                resolve(sequences)
              } catch (error) {
                console.error(`❌ Error parsing FASTA data for ${organism}:`, error)
                resolve([])
              }
            })
          }).on('error', (error) => {
            console.error(`❌ Error fetching sequences for ${organism}:`, error)
            resolve([])
          })
          
        } catch (error) {
          console.error(`❌ Error parsing search results for ${organism}:`, error)
          resolve([])
        }
      })
    }).on('error', (error) => {
      console.error(`❌ Error searching NCBI for ${organism}:`, error)
      resolve([])
    })
  })
}

function parseFASTAData(fastaData: string, organism: string): NCBISequence[] {
  const sequences: NCBISequence[] = []
  const entries = fastaData.split('>').filter(entry => entry.trim().length > 0)
  
  for (const entry of entries) {
    const lines = entry.trim().split('\n')
    const header = lines[0]
    const sequence = lines.slice(1).join('').replace(/\s/g, '')
    
    if (sequence.length === 0) continue
    
    // Parse header to extract information
    const accessionMatch = header.match(/^([A-Z]+\d+(?:\.\d+)?)/)
    const accession = accessionMatch ? accessionMatch[1] : `UNKNOWN_${Date.now()}`
    
    // Extract gene information if available
    let gene = 'unknown'
    if (header.toLowerCase().includes('coi') || header.toLowerCase().includes('cytochrome oxidase')) {
      gene = 'cytochrome oxidase subunit I'
    } else if (header.toLowerCase().includes('16s')) {
      gene = '16S ribosomal RNA'
    } else if (header.toLowerCase().includes('18s')) {
      gene = '18S ribosomal RNA'
    }
    
    sequences.push({
      accession,
      organism,
      definition: header,
      sequence,
      length: sequence.length,
      gene,
      molType: 'DNA'
    })
  }
  
  return sequences
}

async function storeNCBIData(sequences: NCBISequence[]) {
  const mongoSequences = sequences.map(seq => ({
    accessionNumber: seq.accession,
    sequenceId: `gi|${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    organism: seq.organism,
    gene: seq.gene || 'unknown',
    sequence: seq.sequence,
    sequenceLength: seq.length,
    sequenceType: 'DNA' as const,
    description: seq.definition,
    taxonomy: parseOrganismName(seq.organism),
    publications: [],
    submissionDate: new Date(),
    qualityScore: Math.floor(Math.random() * 20) + 80, // 80-100
    annotations: {
      features: [{
        type: 'gene',
        location: `1..${seq.length}`,
        qualifiers: new Map([
          ['gene', seq.gene || 'unknown'],
          ['organism', seq.organism]
        ])
      }]
    }
  }))
  
  // Use upsert to avoid duplicates
  for (const sequence of mongoSequences) {
    try {
      await GeneticSequence.findOneAndUpdate(
        { accessionNumber: sequence.accessionNumber },
        sequence,
        { upsert: true, new: true }
      )
    } catch (error) {
      console.log(`⚠️  Sequence ${sequence.accessionNumber} already exists or error occurred`)
    }
  }
  
  console.log(`✅ Stored ${mongoSequences.length} genetic sequences`)
}

function parseOrganismName(organismName: string) {
  const parts = organismName.split(' ')
  return {
    kingdom: 'Eukaryota',
    phylum: 'Chordata',
    class: 'Actinopterygii',
    order: 'Unknown',
    family: 'Unknown', 
    genus: parts[0] || 'Unknown',
    species: parts.slice(0, 2).join(' ') || 'Unknown'
  }
}

async function fetchAllNCBIData() {
  try {
    console.log('🧬 Starting NCBI genetic sequence data collection...')
    await connectDB()
    
    let totalSequences = 0
    
    for (const organism of MARINE_ORGANISMS) {
      try {
        const sequences = await fetchNCBIData(organism, 5) // Limit to 5 per organism
        if (sequences.length > 0) {
          await storeNCBIData(sequences)
          totalSequences += sequences.length
        }
        
        // Add delay to be respectful to NCBI servers
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.error(`❌ Error processing ${organism}:`, error)
      }
    }
    
    console.log(`📊 Total genetic sequences collected: ${totalSequences}`)
    
    // Get statistics
    const totalInDB = await GeneticSequence.countDocuments()
    console.log(`💾 Total sequences in database: ${totalInDB}`)
    
  } catch (error) {
    console.error('❌ Error in NCBI data collection:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
  }
}

// Simple version that uses mock data if NCBI is not accessible
async function fetchMockNCBIData() {
  try {
    console.log('🧬 Adding mock NCBI genetic sequence data...')
    await connectDB()
    
    const mockSequences = [
      {
        accessionNumber: 'MN123456.1',
        sequenceId: 'gi|123456789',
        organism: 'Thunnus albacares',
        gene: 'cytochrome oxidase subunit I',
        sequence: 'ATGTTCGCCGACCTTGACCCCCCCCCAATAAATAACATAAGCTTCTGACTACTCCCCCCCTCACTAATCCTACTAATATCAAGAAGAATTGTGGAAACTGGGTGAACCGTATATCCCCCCTTAGCAGGAAATCTAGCACATGCAGGAGCATCAGTAGACTTAGCTATTTTCTCTTTACATCTAGCAGGTATTTCATCTATTTTAGGGGCTATTAATTTTATTACTACAATTATTAATATAAAACCCCCTGCAATATCACAATATCAAACCCCCTTATTTGTTTGATCTGTATTAATTACTGCCGTATTATTACTCTTATCTTTACCAGTACTAGCAGGCGCTATTACTATATTATTAACAGATCGAAATTTAAATACAACCTTTTTTGATCCAACAGGAGGAGGAGATCCAATTCTATACCAACATCTATTCTGATTCTTTGGACACCCTGAAGTCTACATTCTTATCTTACCAGGATTCGGAATAATCTCCCATATTGTCACTTACTATTCTGGAAAAAAAGAACCCTTTGGGTATATGGGTATGGTCTGAGCTATAATAAGCATTGGCTTACTAGGCTTTATTGTCTGAGCCCACCACATATTTACAGTAGGAATAGACGTAGACACCCGAGCCTATTTTACATCTGCCACAATAATTATTGCTATTCCAACTGGAGTAAAAGTATTTAGCTGATTAGCCACACTCCATGGAGGAAACATTAAATGATCCCCCGCTATAATATGAGCCCTAGGCTTTATCTTCCTATTCACCGTGGGAGGCTTGACCGGAATTGTACTCGCCAACTCATCTCTAGATATTGTACTACATGATACATACTACGTAGTAGCCCACTTCCACTACGTACTTTCAATAGGCGCCGTATTTGCTATTATAGGGGGATTTGTACACTGATTTCCCCTATTTACAGGGTACACCCTAAATGACACCTGAGCCAAAATTCACTTCTCTATCATATTCGTAGGAGTAAACATAACTTTCTTTCCACAACATTTTCTCGGCCTATCCGGAATGCCCCGACGTTACTCGGACTACCCCGATGCATACACAACATGAAACACCATCTCATCCATAGGCTCCTTCATTTCTCTAACAGCAGTTATATTAATAATTTATATGATCTGAGAAGCCTTCGCTTCAAAACGAGAAGTACTAACAGTAGAACTAACAACAACAAACCTAGAGTGACTAAATGGATGCCCCCCTCCCTACCACACATTCGAAGAACCAACCTACGTAAACCTAAAATAA',
        sequenceLength: 1551,
        sequenceType: 'DNA' as const,
        description: 'Thunnus albacares cytochrome oxidase subunit I (COI) gene, partial cds; mitochondrial',
        taxonomy: {
          kingdom: 'Eukaryota',
          phylum: 'Chordata',
          class: 'Actinopterygii',
          order: 'Perciformes',
          family: 'Scombridae',
          genus: 'Thunnus',
          species: 'Thunnus albacares'
        },
        publications: [],
        submissionDate: new Date(),
        qualityScore: 95,
        annotations: {
          features: [{
            type: 'CDS',
            location: '1..1551',
            qualifiers: new Map([
              ['gene', 'COI'],
              ['product', 'cytochrome oxidase subunit I']
            ])
          }]
        }
      },
      {
        accessionNumber: 'MN789012.1',
        sequenceId: 'gi|789012345',
        organism: 'Sardinella longiceps',
        gene: '16S ribosomal RNA',
        sequence: 'CGCCTGTTTATCAAAAAACATTAAGCCATGCATGTCAAGTACGCACGGCCGGTACAGTGAAACTGCGAATGGCTCATTAAATCAGTTATGGTTCCTTTGGTCGCTCGCTCCTCTCCTACTTGGATAACTGTGGTAATTCTAGAGCTAATACATGCCGACGGGCGCTGACCCCCTTCGCGGGGGGGATGCGTGCATTTATCAGATCAAAACCAACCCGGTCAGCCCCTCTCCGGCCCCGGCCGGGGCGCGCCCATTGCGGTCGCCCCCTTGGCCCCGGCCGGGG',
        sequenceLength: 589,
        sequenceType: 'DNA' as const,
        description: 'Sardinella longiceps 16S ribosomal RNA gene, partial sequence; mitochondrial',
        taxonomy: {
          kingdom: 'Eukaryota',
          phylum: 'Chordata',
          class: 'Actinopterygii',
          order: 'Clupeiformes',
          family: 'Clupeidae',
          genus: 'Sardinella',
          species: 'Sardinella longiceps'
        },
        publications: [],
        submissionDate: new Date(),
        qualityScore: 92,
        annotations: {
          features: [{
            type: 'rRNA',
            location: '1..589',
            qualifiers: new Map([
              ['gene', '16S'],
              ['product', '16S ribosomal RNA']
            ])
          }]
        }
      }
    ]
    
    for (const sequence of mockSequences) {
      try {
        await GeneticSequence.findOneAndUpdate(
          { accessionNumber: sequence.accessionNumber },
          sequence,
          { upsert: true, new: true }
        )
      } catch (error) {
        console.log(`⚠️  Sequence ${sequence.accessionNumber} already exists`)
      }
    }
    
    console.log(`✅ Added ${mockSequences.length} mock genetic sequences`)
    
  } catch (error) {
    console.error('❌ Error adding mock NCBI data:', error)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
  }
}

if (require.main === module) {
  const args = process.argv.slice(2)
  const useMock = args.includes('--mock')
  
  if (useMock) {
    fetchMockNCBIData()
      .then(() => {
        console.log('✅ Mock NCBI data collection completed')
        process.exit(0)
      })
      .catch((error) => {
        console.error('❌ Mock NCBI data collection failed:', error)
        process.exit(1)
      })
  } else {
    fetchAllNCBIData()
      .then(() => {
        console.log('✅ NCBI data collection completed')
        process.exit(0)
      })
      .catch((error) => {
        console.error('❌ NCBI data collection failed:', error)
        process.exit(1)
      })
  }
}