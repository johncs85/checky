const mongoose = require('mongoose')

const checklistSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    note: String
})

const Checklist = mongoose.model('Checklist', checklistSchema)


module.exports = Checklist