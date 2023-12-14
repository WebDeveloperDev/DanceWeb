const express=require('express')
const path=require("path")
const app =express()
var mongoose=require('mongoose')
const bodyparser=require('body-parser')
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true})
const port =3000
app.use('/static',express.static("static")) //for serving static file
app.use(express.urlencoded())

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    Address: String,
    comment: String
});

const Contact = mongoose.model('Contact', contactSchema);

//pug spicific stuff
app.set("view engine",'pug')
app.set('views',path.join(__dirname,'views')) //set the views directory
 
//Endpoints
app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params)
})
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body)
    myData.save().then(()=>{
        res.send("This item has been saved to the data base")
    }).catch(()=>{
        res.status(400).send("Item was not save to the database")
    })
    // res.status(200).render('contact.pug')
})


//Start the server
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})