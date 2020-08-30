//LOADING PACKAGES
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSantizer = require("express-sanitizer");
const port = 3000;
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '**',
	database:'blog'
  });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSantizer());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//ROUTES
app.get("/",function(req,res){
	res.redirect("/blogs");
})
app.get("/blogs",function(req,res){
	const sql = `SELECT * from blogs`;
	connection.query(sql,(err,blogs)=>{
		if(err){
			throw err;
		}
		else{
			res.render("index",{blogs:blogs});
		}
	});
	
});

app.get("/blogs/new",function(req,res){
	res.render("new");
});

app.post("/blogs",function(req,res){
	const vals = Object.keys(req.body.blog).map((key) =>{
		return req.body.blog[key];
	});
	console.log(vals);
	const sql = 'INSERT INTO blogs(_id,title,image,body,created_date) values(NULL,?,CURDATE())';
	connection.query(sql,[vals],(err,result)=>{
		if(err){
			throw err;
		}
		else{
			res.redirect("/blogs");
		}
	});
});
app.get("/blogs/:id",function(req,res){
	const sql = 'Select * from blogs where _id = ?'
	connection.query(sql,req.params.id,(err,result)=>{
		if(err){
			res.redirect("/blogs");
			throw err;
		}
		else{
			res.render("show",{blog:result});
		}
	});
});
app.get("/blogs/:id/edit",function(req,res){
	const sql = 'Select * from blogs where _id = ?'
	connection.query(sql,req.params.id,(err,result)=>{
		if(err){
			res.redirect("/blogs");
			throw err;
		}
		else{
			res.render("edit",{blog:result});
		}
	});
});
app.put("/blogs/:id",function(req,res){
	const vals = Object.keys(req.body.blog).map((key) =>{
		return req.body.blog[key];
	});
	
	const sql = `UPDATE blogs SET title = ?,image = ?,body = ?,created_date = CURDATE() where _id = ?`;
	connection.query(sql,[vals[0],vals[1],vals[2],req.params.id],(err,result)=>{
		if(err){
			throw err;
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});
app.delete("/blogs/:id",function(req,res){
	const sql = `DELETE FROM blogs where _id = ?`
	connection.query(sql,req.params.id,(err,result)=>{
		if(err){
			throw err;
		}
		else{
			res.redirect("/blogs");
		}
	});
})
app.listen(port,function(){
	console.log("The RESTful Server has started");
});