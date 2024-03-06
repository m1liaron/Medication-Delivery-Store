const express = require('express');
const app = express();

app.get("/api", (req, res ) => {
    res.json({"users":['UserOne', 'UserTwo']})
})

app.listen(5000, () => {console.log('The server is running on port 5000')})