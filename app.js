const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const app = express();
const mongoose = require("mongoose");

var homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var aboutContent = "Proin nibh nisl condimentum id venenatis a condimentum. Viverra nam libero justo laoreet sit amet cursus. Arcu ac tortor dignissim convallis aenean et. A diam maecenas sed enim ut sem viverra. In dictum non consectetur a erat nam at lectus urna. Amet commodo nulla facilisi nullam vehicula ipsum. Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Eget felis eget nunc lobortis mattis aliquam. Pulvinar mattis nunc sed blandit. Volutpat consequat mauris nunc congue nisi vitae suscipit. Et ultrices neque ornare aenean. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Gravida rutrum quisque non tellus orci ac auctor augue. Lectus arcu bibendum at varius vel. Odio eu feugiat pretium nibh ipsum. Sit amet purus gravida quis blandit turpis cursus in. Elementum curabitur vitae nunc sed velit.";
var contactContent = "Lacus laoreet non curabitur gravida arcu ac. Nunc sed blandit libero volutpat sed cras. Luctus venenatis lectus magna fringilla urna porttitor rhoncus. Semper risus in hendrerit gravida rutrum quisque non. Auctor eu augue ut lectus. Urna condimentum mattis pellentesque id. Viverra vitae congue eu consequat ac felis donec. Netus et malesuada fames ac turpis. Dignissim convallis aenean et tortor at risus viverra adipiscing. Egestas erat imperdiet sed euismod. Pharetra magna ac placerat vestibulum. Proin sed libero enim sed. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Ac placerat vestibulum lectus mauris ultrices. At elementum eu facilisis sed. Sed vulputate mi sit amet mauris commodo quis. Posuere sollicitudin aliquam ultrices sagittis. Turpis cursus in hac habitasse platea.";
app.set('view engine','ejs');
mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const blogSchema ={
    title: String,
    body: String
};
const Blog = mongoose.model("Blog",blogSchema);
app.get("/",function(req,res){
   
    Blog.find({},function(err,foundList){
        if(err){
            console.log(err);
        }
        else{
            if(!foundList){
                console.log("Empty");
            }
            else{
                res.render("home",{para1: homeStartingContent, toPost: foundList});
            }
        }
    });

});

app.get("/about",function(req,res){
res.render("about",{para1:aboutContent});
});

app.get("/contact",function(req,res){
res.render("contact",{para1:contactContent});
 });

app.get("/compose",function(req,res){
res.render("compose");
});

app.get("/post/:article",function(req,res){

    var id = req.params.article;

        Blog.findById(id, function(err,item){
            if(err){
                console.log(err);
            }
            else{
                if(!item){
                    console.log("Empty");
                }
                else{
                    console.log(item);
                    res.render("post",{headd:item.title, bodyy: item.body});
                }
            }
        });

});
app.post("/compose",function(req,res){
    
const data= new Blog({
    title: req.body.head,
    body: req.body.post
});
    data.save();
res.redirect("/");
});

app.listen(3000,function(){
    console.log("App Started");
});