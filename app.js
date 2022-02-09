const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose")

const app = express();

mongoose.connect('mongodb://127.0.0.1/messageBoard');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

const contentSchema = {
  title: String,
  content: String,
  dateTime: String
};

const Content = mongoose.model("Content", contentSchema);

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = String(date+' '+time);


app.get("/", (req, res)=>{

  // res.render('home')

  Content.find({}, (err, results)=>{
  if (!err){
    console.log(results);
    res.render("home", {
      results,
      dateTime

    })
  }
})


})



app.get("/compose", (req, res)=>{
  res.render("compose")
})

app.post("/compose", function(req, res){

  head = req.body.postTitle
  body = req.body.postBody
  console.log(head, body)
  // array.push({
  //   head,
  //   body
  // })

  const content = new Content ({
    title: head,
    content: body,
    dateTime: dateTime
  })

  // console.log(array);
  // content.save()
  content.save(function(err){

    if (!err){

      res.redirect("/");

    }

  });

});

app.listen(1111, function() {
  console.log("Server started on port 1111");
});
