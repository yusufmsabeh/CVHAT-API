# 📄 CVhat Backend API
Our CVhat Backend API is built using Express.js and integrates with OpenAI to deliver smart, AI-powered resume optimization. It leverages Sequelize ORM to manage a MySQL database and supports session-based token authentication for secure access. The API is designed to serve personalized CV feedback in a structured JSON format using prompt engineering. This feedback helps job seekers enhance their resumes efficiently and increase their chances of landing interviews.

# ✨ Getting Started
Follow these steps to get the backend server up and running on your local environment.
### 🛠️ Installation
```shell
git clone https://github.com/yusufmsabeh/CVHAT-API.git
cd CVHAT-API
npm install
npm run dev
```
### 🔧 Configuration
Create a .env file in the root directory of the project and add the following variables:
```dotenv
# Server
PORT=

# Session and security
SESSION_SECRET=

# OpenAI API Key
OPENAI_API_KEY=

# Database credentials
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```
### 🌟 Features
CVhat Resume API provides the following core features:
* 🧠 AI Resume Feedback: Uses OpenAI to analyze and improve resume content based on structured prompt engineering.
* 📄 JSON-Structured Responses: Feedback is returned in a comment-style format, including section titles and descriptions.
* 🔐 Authentication: Session-based token authentication to manage user sessions securely.
* 💬 Feedback History: Track and retrieve previous feedback submissions (optional if implemented).
* ☁️ Azure Integration: Deployed using Azure App Service, with Azure MySQL for data and Azure Blob Storage for CV file handling (via S3-compatible LocalStack in local development).
## 📊 Database Schema
[schema](https://drawsql.app/teams/pwateam/diagrams/cvhat)
## 📎 API Documentation
## 📦 Tech Stack
* Node.js / Express.js

* Sequelize ORM

* MySQL

* OpenAI API

* Azure App Service & Azure MySQL

* Session-based Authentication

* Dotenv for config management