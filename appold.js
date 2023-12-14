const express=require("express");
// const fs=require("fs")
// const xlsx=require("xlsx")
const path=require("path")
const app=express()
const port=27017;
var mongoose=require("mongoose")
const bodyparser=require('body-parser')

mongoose.connect("mongodb://localhost/contactDance",{useNewUrlParser:true});
//define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    age: String
  });
const Contact = mongoose.model('contact', contactSchema);
//EXPRESS SPECIFIC STUFF
// app.use(express.static("static",options));
app.use("/static",express.static("static"))//for serving static files
app.use(express.urlencoded({extended:true}))

//PUG SPECIFIC STUFF
app.set('view engine',"pug")//set template engine as pug
app.set("views",path.join(__dirname,"views")) //Set the views directory

//ENDPOINTS
app.get('/',(req,res)=>{
    const con="My name is dev"
    const params={"title":"This is dance website","content":con}
    res.status(200).render('home.pug',params)
});
app.get('/contact',(req,res)=>{
    const con="My name is dev"
    const params={"title":"This is dance website","content":con}
    res.status(200).render('contact.pug',params)
});
app.post("/contact",(req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
});
// app.post('/contact',(req,res)=>{
//     name=req.body.name
//     age=req.body.age
//     email=req.body.email
//     address=req.body.Address
//     comment=req.body.comment
//     // writeFileSync("output.txt",`The name is ${name}, ${age} year old. email is ${email}, lives in ${address} and commented that "${comment}" `)
//     res.status(200).render('contact.pug')
//     fs.appendFileSync("output.txt",`The name is ${name}, ${age} year old. email is ${email}, lives in ${address} and commented that "${comment}" \n`)
//     console.table([{"name":name,"age":age,"email":email,'Address':address}])
//     data=[{Name:name,Age:age,Email:email,Address:address}]
//     var newWB=xlsx.utils.book_new();
//     var newWS=xlsx.utils.json_to_sheet(data);
//     xlsx.utils.book_append_sheet(newWB,newWS,"New Data");
//     xlsx.writeFile(newWB,"Output data file.xlsx");
// });

//START THE SERVER
app.listen(port,()=>{
    console.log(`The application successfully started on ${port}`);
});