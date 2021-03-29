const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
app.use(cors());
app.use(express.json());

const userRoute = require('./routes/User')
app.use("/user" , userRoute);

const uploadRoute = require('./routes/Upload')
app.use("/upload" , uploadRoute);


app.use("/user" , userRoute);

app.listen(3009 , (req , res)=>{
    console.log("Server running in 3009");
});