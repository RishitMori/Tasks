const express = require("express");
const app = express();
const store = require('./store.json')
const fs = require('fs')

app.use(express.json())
app.post("/", function (req, res) {
    const data = req.body.stringvalue;
    var found = false;
    store.map((value,index)=>{
        if(data===value.stringvalue){
            found = true;
        }
    })
    if(found) return res.send(found)
    else{
    store.push({stringvalue:data})
    fs.writeFileSync('./store.json', JSON.stringify(store, null, 2));
    console.log(store)
     return res.send(found);
    }
});
app.listen(3000);