const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const multer = require("multer"); // Import multer

require("dotenv").config();

const app = express();



const indexRouter = require("./routes/indexRouter");
const hisaabRouter = require("./routes/hisaabRouter");
const db = require("./config/mongooseconnection");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());



// Routes
app.use("/", indexRouter);
app.use("/hisaab", hisaabRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

