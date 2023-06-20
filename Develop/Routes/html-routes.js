const path = require("path");

module.exports = function(app){
    // define a get endpoint for the root URL
    app.get("/", (req, res){
        // send the index.html file
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

    // define a get endpoint for the "/notes" URL
    app.get("/notes", (req, res) => {
        // send the notes.html file
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
}
