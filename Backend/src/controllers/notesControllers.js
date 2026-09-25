// db username = achacynthiatua_db_user
// db password = C2SsscGPsyxAoo8h
// connection string = mongodb+srv://achacynthiatua_db_user:<db_password>@cluster0.85uib6z.mongodb.net/?appName=Cluster0
import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort notes by creation date in descending order
        res.status(200).json(notes);
    } catch (error) {
        console.error("Failed to get notes", error);
        res.status(500).send("Failed to get notes");
    }
}

export const getNoteById = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Failed to get note by id", error);
        res.status(500).send("Failed to get note by id");
    }
}

export const createNote = async(req, res) => {
    try{
        const { title, content } = req.body;
        const note = new Note({title,content});

        const savedNote = await note.save(); // Save the note to the database with the save method on the note instance, the saved method is a built in Mongoose function that returns the saved document
        res.status(201).json(savedNote);   // Respond with the saved note pass the note in json to convert it to a JSON object so that it can be easily consumed by the client why ? Because JSON is a widely used format for data exchange between the server and client. who is the client ? 
    } catch (error) {
        console.error("Failed to create note", error);
        res.status(500).send("Failed to create note");
    }
   
}

export const updateNote = async (req, res) => {
        try{
            const {title, content } = req.body;
            const updatedNote = await Note.findByIdAndUpdate(
                req.params.id,
                { title, content },
                { new: true },  
            );
              if(!updatedNote) {
                return res.status(404).json({ message: "Note not found" });
            }
            res.status(200).json({ message: "Note updated successfully", note: updatedNote });
          
        } catch (error) {
            console.error("Failed to update note", error);
            res.status(500).send("Failed to update note");
        }


}
    

export const deleteNote = async (req, res) => {
   try{
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if(!deletedNote) {
        return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully", note: deletedNote });

   } catch (error) {
       console.error("Failed to delete note", error);
       res.status(500).send("Failed to delete note");
   }
}

