const express = require('express');
const app = express();
const port = 4001;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/endpoint_1', urlencodedParser, (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const hypotenuse = Math.pow(Math.pow(a, 2) + Math.pow(b, 2), 1/2)
    fs.access("result.json", function(error){
        if (error) {
            console.log("Файл не найден");
            fs.writeFile("result.json", `[\n{"uuid":"${uuidv4()}", "hypotenuse": ${hypotenuse}}\n]`, function(error) {
                if (error) throw error;
            });
        } else {
            console.log("Файл найден");
            fs.readFile("result.json", "utf8", function(error, data) {
                let splitArray = data.split('\n');
                splitArray.pop();
                splitArray.push(`,{"uuid":"${uuidv4()}", "hypotenuse": ${hypotenuse}}`, ']')
                res = splitArray.join('\n');
                fs.writeFile("result.json", res, function(error) {
                    if (error) throw error;
                });
            });           
        }
    });
    res.send('Hypotenuse is ' + hypotenuse);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
