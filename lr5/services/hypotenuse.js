const express = require('express');
const app = express();
const port = 5008;

const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/hypotenuse', urlencodedParser, (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    res.send('Hypotenuse is ' + Math.pow(Math.pow(a, 2) + Math.pow(b, 2), 1/2));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
