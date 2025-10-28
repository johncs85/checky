const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const express = require('express')
const app = express()

// Dabatase and url connections
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
const Checklist = require('./models/checklist.js')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))

// Routes

// GET: route url
app.get('/', (req, res) => {
    res.render('checklists/index.ejs')
})


 // Connect port
app.listen(3000, () => {
    console.log('server is running at Port 3000')
})
