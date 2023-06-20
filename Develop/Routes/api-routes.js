const fs = require("fs");
// read contents of db.json file and parse it as JSON
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

module.exports = function(app) {

    // code to define a GET endpoint for retreiving all notes 
    app.get("/api/notes", (req, res) => {
        res.json(data);
    });

    // code for a GET endpoint for retreiving a specific note by its ID
    app.get("api/notes/:id", (req, res) => {
        // respond with the note at the specific ID from the 'data' JSON object
        res.json(data[Number(req.params.id)]);
    });

    // post endpoint for creating a new note
    app.post("/api/notes", (req, res) => {

        // get new note from the request body
        let newNote = req.body;
        // generate a unique ID for the new note
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        // assign the unique ID to the new note
        newNote.id = uniqueId;
        // add the new note to the data JSON object
        data.push(newNote);

        // write the updated data JSON object back to the db.json file
        fs.writeFileSync("/db/db.json", JSON.stringify(data), function(err) {
            if (err) {
                console.log(err);
            };
        });

        // respond with the updates data JSON object
        res.json(data);
    });

    // define a DELETE endpoint for deleting a note by its ID
    app.delete("/api/notes/:id", function(req,res) {
        // get the ID of the note to be deleted from the request parameters
        let noteId = req.params.id;
        let newId = 0;
        console.log(`Delete note ${noteId}`);
        data = data.filter(currentNote => {
            // remove the note with the specified ID from the data JSON object
            return currentNote.id != noteId;
        });
        for (currentNote of data) {
            // update the IDs of the remaining notes in data to ensure they are still unique 
            currentNote.id = newId.toString();
            newId++;
        }
        // write the updated data json file back into the db.json file and respond with the updated data json object
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    });
}