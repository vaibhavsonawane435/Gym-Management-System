# 🏋️ Gym Management System (GMS)

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> A full-stack web application to digitize gym administration, replacing paper receipts with a secure, digital tracking system.

---

## 📖 Table of Contents
- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Installation & Setup](#-installation--setup)
- [Usage Guide (Workflow)](#-usage-guide-workflow)
- [Evaluation Metrics](#-evaluation-metrics)
- [Future Scope](#-future-scope)

---

## 🚩 Problem Statement
Traditional gyms often rely on paper receipts, which are easily lost by members and difficult for owners to track. This project solves these issues by:
1.  **Digitizing Records:** Storing all data in a secure MongoDB database.
2.  **Automating Receipts:** Generating instant digital bills.
3.  **Centralizing Data:** Providing a single dashboard for member and fee management.

---

## 🚀 Features

### 👨‍💼 Admin Module
* **Secure Login:** Authentication for administrators.
* **Member Management:** Add, update, and view member details (Contact, Package type, Join Date).
* **Billing System:** Create and assign fee packages; generate digital payment receipts.
* **Dashboard:** View total active members and recent transactions.

### 👤 Member/User Module
* **Personal Access:** Login credentials for members.
* **Receipt History:** View personal payment history and status.
* **Transparency:** Real-time updates on fee status.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js | Component-based UI for modularity. |
| **Styling** | Tailwind CSS | Modern, responsive utility-first styling. |
| **Backend** | Node.js + Express | RESTful API server. |
| **Database** | MongoDB | NoSQL database for flexible schema design. |
| **Tools** | Git, Postman | Version control and API testing. |

---

## 📂 Project Architecture
The project follows a standard **MERN** directory structure:


## ⚙ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* **Node.js** (v14+) installed.
* **MongoDB Community Server** installed and running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/vaibhavsonawane435/Gym-Management-System.git
cd gym-management-system



##Backend Setup

cd backend
npm install   # Install dependencies (Express, Mongoose, Cors)
node server.js

##Frontend Setup

cd frontend
npm install   # Install dependencies (React, Axios, Tailwind)
npm start



📖 Usage Guide (Workflow)Use the following credentials to test the system 

for admin
Admin :
Username =admin		
Password =admin123

for user
user :
Username =user	
Password =user123
