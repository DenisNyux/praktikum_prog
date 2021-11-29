const express = require('express');
const app = express();
const port = 5003;

app.get('/', (req, res) => {
    res.json({res: "Hello world!"});
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});