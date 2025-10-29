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
app.get('/', async (req, res) => {
    const allChecklists = await Checklist.find()
    res.render('checklists/index.ejs', { checklists: allChecklists })
})

//  GET: /checklists
app.get('/checklists', async (req, res) => {
    const allChecklists = await Checklist.find()
    console.log("All Checklists: ", allChecklists)
  if (!allChecklists) return res.send("No data found!")
    res.render('checklists/index.ejs', { checklists: allChecklists })
})

// GET: /checklists/new
app.get('/checklists/new', (req, res) => {
    res.render('checklists/new.ejs')
})

// POST: /checklists
app.post('/checklists', async (req, res) => {
    if(req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }

    await Checklist.create(req.body)
    res.redirect('/')
})

// GET: /checklists/:checklistId
app.get('/checklists/:checklistId', async (req, res) => {
    const foundChecklist = await Checklist.findById(req.params.checklistId)
    console.log("found checklist: ", foundChecklist)
    res.render('checklists/show.ejs', { checklist: foundChecklist})
})

// GET: /checklists/:checklistId/edit
app.get('/checklists/:checklistId/edit', async (req, res) => {
    const foundChecklist = await Checklist.findById(req.params.checklistId)
    console.log('Editing Checklist: ', foundChecklist)
    res.render('checklists/edit.ejs', { checklist: foundChecklist })
})

// PUT: /checklists/:checklistId
app.put('/checklists/:checklistId', async (req, res) => {
    if(req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    await Checklist.findByIdAndUpdate(req.params.checklistId, req.body)
    res.redirect('/')
})

// DELETE: /checklists/:checklistId
app.delete('/checklists/:checklistId', async (req, res) => {
    await Checklist.findByIdAndDelete(req.params.checklistId)
    res.redirect('/')
})


 // Connect port
app.listen(3000, () => {
    console.log('server is running at Port 3000')
})
