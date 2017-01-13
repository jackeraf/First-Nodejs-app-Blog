
var bodyParser= require("body-parser"),
mongoose =		require ("mongoose"),
express =		require("express"),
app =			express(),
methodOverride =	require("method-override");


var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost/restful_app");
// to create the  restful_app db
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// MONGOOSE/MODEL CONFIG
var blogSchema= new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}


});

var Blog= mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "My dog",
// 	image: "http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg",
// 	body: "I don't know its breed but is cute",
// });

// ROUTES

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if (err) {
			console.log("Error")
		}else{
			res.render("index", {blogs: blogs});
		}
	});
	
});

app.post("/blogs", function(req, res){

	console.log(req.body)

	Blog.create(req.body.blog, function(err, blogs){
		if (err) {
			res.render("new")
		}else{
			res.redirect("/blogs");
		}
	});
	
});

app.get("/blogs/new", function(req, res){
	
	res.render("new");
	
});


// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
	Blog. findById(req.params.id, function(err, foundBlog){ 
 	if(err){
 		res.redirect("/blogs");
 	} else {
 		res.render("edit", {blog: foundBlog});
 	}
 });
	
});

app.get("/blogs/:id", function(req, res){
 // res.send("SHOW PAGE!");
 Blog. findById(req.params.id, function(err, foundBlog){ 
 	if(err){
 		res.redirect("/blogs");
 	} else {
 		res.render("show", {blog: foundBlog});
 	}
 });
 });

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
 // res.send("SHOW PAGE!");
 Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){ 
 	if(err){
 		res.redirect("/blogs");
 	} else {
 		res.redirect("/blogs" + req.params.id);
 	}
 });
 });


// DELETE ROUTE

app.delete("/blogs/:id", function(req, res){
	 Blog.findByIdAndRemove(req.params.id, function(err){
	 	if (err) {
	 		res.redirect("/blogs");
	 	}else{
	 	res.redirect("/blogs");

	 	}
	 });
});
// HOME ROUTE
 app.get("/", function(req, res){
 	res.redirect("/blogs");
 });




 app.listen(3000, function(){
 	console.log("Server running")
 });



