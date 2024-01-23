const express = require("express");
const mongoose = require("mongoose");
const Message = require("./models/todo_file");
const cors = require('cors')
const MONGO_URL = "mongodb+srv://rishit164:V0F2j3ojVGmqiaZL@cluster0.gcvjkeg.mongodb.net/test";
const app = express();
try {
    mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}
app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:5173',
    })
  );

app.use(express.json());

app.route('/items').get(async (req, res) => {
    try {
        const items = await Message.find({},{_id:0,text:1});
        if(items.length==0) return res.send("no data found");
        res.json(items);
        
    } catch (error) {
        console.error("Error retrieving items:", error);
        res.status(500).send("Server Error");
    }
}).post(async (req, res) => {
    const data = req.body.itemsdata;
    if (!data) {
        return res.send("Error occurred");
    }

    try {
        const existingItem = await Message.findOne({ text: data });

        if (existingItem) {
            return res.send("Item already present");
        }

        const newItem = await Message.create({ text: data });
        res.send(newItem);
    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).send("Server Error");
    }
})
app.get('/', (req, res) => {
    res.send("Hello World");
});


app.route('/items/:id').get(async (req, res) => {
    const itemId = req.params.id;

    try {
        const item = await Message.findById(itemId);

        if (item) {
            return res.send(item.text);
        }

        res.send("Item not found");
    } catch (error) {
        console.error("Error retrieving item:", error);
        res.status(500).send("Internal Server Error");
    }
}).delete(async (req,res)=>{
    const itemId=req.params.id;
    try{
        const remove = await Message.deleteOne({ _id:itemId })  ;
        res.send("item removed")

    }
    catch(error){
        res.status(500).send("Server Error")
    }
});
app.delete("/items/del/:text",async (req,res)=>{
    const itemId=req.params.text;
    try{
        const remove = await Message.deleteOne({ text:itemId })  ;
        res.send(itemId)

    }
    catch(error){
        res.status(500).send("Server Error")
    }
});



app.listen(3000);