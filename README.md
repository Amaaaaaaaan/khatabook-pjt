# 📘 Khatabook - Hisaab Management App

A full-stack web application inspired by the traditional "Khatabook" system — allowing users to securely manage their *hisaabs* (records), track activity, and maintain a clean personal ledger.

🔗 **Live Demo:** [Click Here](https://lnkd.in/dTwU4rjT)  
📦 **Repository:** [GitHub - khatabook-pjt](https://github.com/Amaaaaaaaan/khatabook-pjt)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Templating Engine:** EJS  
- **Styling:** Tailwind CSS  
- **Utilities:**  
  - `bcrypt` for secure password hashing  
  - `express-session` for session management  
  - `multer` for file uploads

---

## 🔐 Features

- ✅ **User Authentication:**  
  Secure registration and login using encrypted passwords.

- 👤 **Profile Management:**  
  Update and manage your profile information.

- 📒 **Hisaab Management:**  
  - Add new records  
  - View all your entries  
  - Filter by date and other criteria  
  - Status indicators for quick overview

- 🖼️ **File Uploads:**  
  Upload and update profile images.

---



## 📂 Project Structure
khatabook-pjt/ ├── config/ # Configuration files (e.g., DB setup, middlewares) ├── controllers/ # Logic handling for routes ├── middlewares/ # Custom middlewares (auth, error handling, etc.) ├── models/ # Mongoose schemas ├── node_modules/ # Node.js modules ├── public/ # Static assets (CSS, images) │ └── css/ # Tailwind CSS file ├── routes/ # API and page route handlers ├── views/ # EJS templates for rendering pages ├── uploads/ # Uploaded profile pictures ├── .env # Environment variables (do not commit) ├── .gitignore # Git ignore file for node_modules, .env, etc. ├── app.js # Main app file ├── package-lock.json # Auto-generated, lock for dependencies ├── package.json # Project metadata and dependencies



---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Amaaaaaaaan/khatabook-pjt.git
   cd khatabook-pjt
   npm install

2. Add a .env file in the root with the following:

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

3.Start the app:
node app.js



📫 Let’s Connect
Connect with me on LinkedIn
https://www.linkedin.com/in/aman-tomar-aaa554248/
