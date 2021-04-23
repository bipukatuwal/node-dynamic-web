const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bipudb", {
    useCreateIndex:true,
    useNewUrlParser:true,
  
}).then(()=>{
    console.log('Connection Successful');
}).catch((error)=>{
    console.log(error);
})