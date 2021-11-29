const express = require('express');
const app = express();
const port = 4004;
const fs = require('fs');

const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.delete('/endpoint_4', urlencodedParser, (req, res) => {
    const id = req.body.id;
    fs.access("result.json", function(error){
        if (error) {
            console.log("Файл не найден");
        } else {
            console.log("Файл найден");
            fs.readFile("result.json", "utf8", function(error, data) {
                let json_arr = JSON.parse(data);
                json_arr = json_arr.filter((el)=>{ 
                    return el.uuid != id;
                })
                const result = JSON.stringify(json_arr, null, ' ');
                fs.writeFile("result.json", result, function(error) {
                    if (error) throw error;
                });
                res.send('Удален элемент с id ' + id)
            });        
        }
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
