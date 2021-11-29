const express = require('express');
const app = express();
const port = 4003;
const fs = require('fs');

const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/endpoint_3', urlencodedParser, (req, res) => {
    const id = req.body.id;
    fs.access("result.json", function(error){
        if (error) {
            console.log("Файл не найден");
        } else {
            console.log("Файл найден");
            fs.readFile("result.json", "utf8", function(error, data) {
                const json_arr = JSON.parse(data);
                let found = false;
                let result;
                json_arr.forEach((elem)=>{
                    if (elem.uuid === id){
                        result = elem;
                        found = true;
                    };
                });
                found === false ? console.log('элемент не найден') : console.log('элемент найден');
                res.json(result);
            });        
        }
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
