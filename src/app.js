const express = require('express');
const path = require('path');
require("./db/conn");
const User = require('./models/user')
const app = express();
const hbs = require("hbs")
const {registerPartials}= require("hbs");
const port = process.env.PORT || 3000;

const templatePath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")
const staticPath = path.join(__dirname, "../public");


app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jq/dist")));
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticPath)); 

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

app.get('/', (req, res)=>{
    res.render("index")
});

app.post('/contact', async(req, res)=>{
    try{
       const userData = new User(req.body);
        await userData.save();
        res.status(201).render('index');
    }catch(error){
        res.status(500).send(error)
    }
});

app.listen(port, ()=>
{
    console.log("Server running on given port ")
})