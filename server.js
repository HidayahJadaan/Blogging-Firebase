const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

// initial_path is set to the directory path where the 
// server will look for static files (like HTML, CSS, JS) to serve.
let initial_path = path.join(__dirname, "public");

const app = express();
// Static files from the public directory are served using express.static
app.use(express.static(initial_path));
// Middleware for handling file uploads.
app.use(fileupload());

// =========================================
// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})
app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

// ==================================================
//  catch-all middleware for any undefined routes, responding with a 404 JSON message.
app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})