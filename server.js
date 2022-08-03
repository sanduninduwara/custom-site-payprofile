const path = require('path')
const express = require('express')
const bodyParser = require('body-parser') 
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000




//Connect to database
connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());


app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));





// Routes
app.use('/users', require('./routes/userRoutes'))
app.use('/', require('./routes/homeRoutes'))
app.use('/payment', require('./routes/payRoutes'))
app.use('/admin', require('./routes/adminRoutes'))




app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))