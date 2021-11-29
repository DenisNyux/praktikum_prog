const express = require('express');
const app = express();
const port = 4002;
const fs = require('fs');

const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.put('/endpoint_2', urlencodedParser, (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    const id = req.body.id;
    const hypotenuse = Math.pow(Math.pow(a, 2) + Math.pow(b, 2), 1/2);
    fs.access("result.json", function(error){
        if (error) {
            console.log("Файл не найден");
        } else {
            console.log("Файл найден");
            fs.readFile("result.json", "utf8", function(error, data) {
                const json_arr = JSON.parse(data);
                let found = false;
                json_arr.forEach((elem)=>{
                    if (elem.uuid === id){
                        elem.hypotenuse = hypotenuse;
                        found = true;
                    };
                });
                found === false ? console.log('элемент не найден') : console.log('элемент найден и переписан');
                const result = JSON.stringify(json_arr, null, ' ');
                fs.writeFile("result.json", result, function(error) {
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
