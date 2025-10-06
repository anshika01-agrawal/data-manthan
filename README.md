# Data Manthan

[![Live Site](https://img.shields.io/badge/Live–Site-🔗-blue)](https://data-manthan.vercel.app/) 

**Data Manthan** is a comprehensive data platform (web + mobile) built for unified integration, visualization, and insights over oceanographic, fisheries, and molecular biodiversity data. It aims to break silos between diverse datasets (ocean parameters, fish morphology, taxonomy, eDNA) and make them accessible, interactive, and actionable.

---

## 🚀 Live Demo

Access the live platform here:  
https://data-manthan.vercel.app/

---

## 📖 Table of Contents

- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Screenshots](#-screenshots)  
- [Getting Started](#-getting-started)  
- [Prerequisites](#prerequisites)  
- [Setup & Installation](#setup--installation)  
- [Configuration & Environment](#configuration--environment)  
- [Running Locally](#running-locally)  
- [Usage](#-usage)  
- [Project Architecture](#-project-architecture)  
- [API / Backend](#-api--backend)  
- [Contributing](#-contributing)  
- [License](#-license)  
- [Authors & Acknowledgments](#-authors--acknowledgments)  

---

## ✨ Features

- Unified ingestion of **oceanographic, morphological, taxonomy, molecular (eDNA)** data  
- Cross-domain analytics: correlate ocean parameters with biodiversity shifts  
- Interactive visualizations and dashboards  
- Data upload, tagging, and metadata integration  
- Role-based authentication & authorization  
- Secure provenance tracking for molecular data  
- APIs for external integration  
- Mobile-responsive design (if mobile app component exists)  

---

## 🧰 Tech Stack

| Layer | Technologies / Tools |
|------|------------------------|
| Frontend / UI | Next.js, React, Tailwind CSS |
| Backend / API | Next.js API Routes (or Express / Node.js) |
| Database | MongoDB (Atlas) |
| Authentication | JWT, OAuth |
| Data Processing & ML | Python / AI libraries (if applicable) |
| Deployment | Vercel / Cloud Hosting |

---

## 📸 Screenshots

> *Replace image paths / URLs with your actual screenshots*

<div align="center">
  <table>
    <tr>
      <td><img src="screenshots/home.png" width="200" alt="Home Page"/><br><em>Home Page</em></td>
      <td><img src="screenshots/data-dashboard.png" width="200" alt="Dashboard"/><br><em>Dashboard</em></td>
      <td><img src="screenshots/upload-data.png" width="200" alt="Upload Data"/><br><em>Upload / Ingestion</em></td>
    </tr>
    <tr>
      <td><img src="screenshots/analytics.png" width="200" alt="Analytics"/><br><em>Analytics View</em></td>
      <td><img src="screenshots/profile.png" width="200" alt="User Profile"/><br><em>User Profile / Auth</em></td>
      <td></td>
    </tr>
  </table>
</div>

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (version 16 or above recommended)  
- npm or yarn / pnpm  
- MongoDB Atlas cluster (or any MongoDB  instance)  
- Environment variable settings (see next section)

### Setup & Installation

```bash
# Clone the repository
git clone https://github.com/AnuragTiwari1508/Data-manthan-flutter.git
cd data_manthan_app   # or the folder that contains the web app

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
````

### Configuration & Environment

Create a `.env.local` file (or `.env`) in your project root and supply appropriate environment variables. Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=https://data-manthan.vercel.app/api
NEXT_PUBLIC_SITE_URL=https://data-manthan.vercel.app
GOOGLE_CLIENT_ID=your_google_oauth_client_id
# Add any additional variables your project uses
```

Be sure to never commit your `.env` or sensitive secrets to version control.

### Running Locally

```bash
# Development mode
npm run dev
# or
yarn dev
# or
pnpm dev
```

Your app should be accessible at `http://localhost:3000` (or whatever port is configured).

To build for production:

```bash
npm run build
npm run start
```

---

## 🧭 Usage

1. Register / login as a user (or via OAuth).
2. Upload datasets (oceanographic files, morphological / taxonomic data, eDNA files).
3. The platform processes and tags data using standardized metadata.
4. Navigate through dashboards / visualizations to explore relationships across domains.
5. Use APIs to fetch processed data for external integrations.

---

## 🏗️ Project Architecture

Briefly:

* The frontend (Next.js) interacts with API routes / backend endpoints.
* Backend services handle data ingestion, transformation, metadata mapping, and secure storage.
* The database (MongoDB) holds the unified datasets, indexes, and relational links.
* Optional ML / AI pipelines process big data or compute cross-domain analytics.
* Authentication & authorization layered over all sensitive operations.

---

## 🔌 API / Backend

> *List a few important API endpoints for users / developers*

* `POST /api/auth/register` — Register new user
* `POST /api/auth/login` — User login
* `GET /api/data` — Fetch combined dataset view
* `POST /api/data/upload` — Upload new dataset / file
* `GET /api/analytics` — Cross-domain analytics results
* `GET /api/user/profile` — Get user details

*(Adjust paths and methods above to match your actual implementation.)*

---

## 🤝 Contributing

We welcome contributions! Please follow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Describe your feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

Please adhere to code style, write descriptive commit messages, and ensure new features include tests / documentation.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors & Acknowledgments

**Team Members**

* Teammate 1 Anurag Tiwari
* Teammate 2 Anshika Agrawal
* Teammate 3 Rohan Bairagi
* Teammate 4 Rishabharaj Sharma
* Teammate 5 Pari Meena
* Teammate 6 Chitransh Sahu


**Acknowledgments**

* Next.js, React, Tailwind CSS teams
* MongoDB Atlas for database hosting
* Open source community & libraries used
* Mentors, guides, and contributors

---

## 📞 Contact

If you have questions, suggestions, or issues, feel free to reach out:

* GitHub:
* [AnuragTiwari1508](https://github.com/AnuragTiwari1508)
* [anshika01-agrawal](https://github.com/anshika01-agrawal)
* [ROHANBAIRAGI123](https://github.com/ROHANBAIRAGI123)
* [rishabharaj](https://github.com/rishabharaj)

---

Thank you for exploring **Data Manthan** — we hope this project helps pave the way for better integrated marine data science! 🌊

