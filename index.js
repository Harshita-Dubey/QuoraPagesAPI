const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const {v4: uuidv4}=require("uuid");

app.use(express.urlencoded({ extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {   id:uuidv4(),
        username:"Web dev",
        content:"I love coding"
    },
    {   id:uuidv4(),
        username:"DSA",
        content:"quite hard for me"
    },
    {   id:uuidv4(),
        username:"Harshita",
        content:"Hardwork is the key"
    }
];




app.listen(port,()=>{
    console.log("App is listening");
})
app.get("/posts",(req,res)=>{
  //  res.send("Server working well");
   res.render("index.ejs",{ posts });
})
app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})
app.post("/posts",(req,res)=>{
   let {username, content}=req.body;
   posts.push({id:uuidv4(),username,content});
   res.redirect("http://localhost:8080/posts")
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    if(!post){
        return res.status(404).send("post not found");
    }
    res.render("detail.ejs",{post});
})
//to update content: patch request
//we can also use put req. syntax is almost same it is used when sb kch badlna ho
app.patch("/posts/:id",(req,res)=>{
    let { id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    
    post.content=newContent;
  
    res.redirect("http://localhost:8080/posts");

})
app.get("/posts/:id/edit",(req,res)=>{

    let { id }=req.params;
    let post =posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});

})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts =posts.filter((p)=>id!=p.id);
     res.redirect("http://localhost:8080/posts");

})