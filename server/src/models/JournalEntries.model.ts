import {Schema, model} from 'mongoose'
import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
})

const Note = model("Note", journalEntrySchema)

export default Note;