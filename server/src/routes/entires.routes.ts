import { Router } from "express";
const router = Router();
import Note from "../models/JournalEntries.model";

router.get("/entries", async (req, res, next) => {
  try {
    const data = await Note.find();
    res.json(data);
  } catch (error) {
    console.log("Error fetching entries");
  }
});

router.get("/entries/:id", async (req, res, next) => {
  try {
    const noteId = req.params.id;

    const singleNote = await Note.findById(noteId);

    res.json({ singleNote, message: "Success" });
  } catch (error) {
    console.log("Error fetching single note!");
    next(error);
  }
});

router.post("/new-entry", async (req, res, next) => {
  try {
    console.log("New Entry!", req.body);
    const { note, date, subject, mood } = req.body;
    await Note.create({
      note: note,
      date: date,
      subject: subject,
      mood: mood,
    });
    res.status(200).json({ success: "Note created!" });
  } catch (error) {
    console.log("error posting!", error);
    next(error)
  }
});

router.delete("/entries/:id", async (req, res, next) => {
  try {
    const noteId = req.params.id;

    await Note.findByIdAndDelete(noteId);
    if (!noteId) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ success: "Note deleted!" });
  } catch (error) {
    console.log("Error deleting a note!", error);
    next(error);
  }
});

export default router;
