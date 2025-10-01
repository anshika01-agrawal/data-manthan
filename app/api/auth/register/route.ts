import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import { User } from "@/lib/models"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { name, email, password, institution, role, researchArea } = await request.json()
    
    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      institution: institution || "",
      role: role || "user",
      researchArea: researchArea || [],
      isActive: true
    })
    
    await user.save()
    
    // Return success (without password)
    const { password: _, ...userWithoutPassword } = user.toObject()
    
    return NextResponse.json(
      { 
        message: "User created successfully",
        user: userWithoutPassword
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}