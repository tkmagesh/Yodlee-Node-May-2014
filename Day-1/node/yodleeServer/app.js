var http = require("http"),
	fs = require("fs"),
	path = require("path");

var server = http.createServer(function(req,res){
	var fileName = path.join(__dirname, req.url);
	console.log(fileName);
	if (!fs.existsSync(fileName)){
		res.statusCode = 404;
		res.end();
		return;
	}
	var fileContents = fs.readFileSync(fileName,{encoding : "utf8"});
	res.write(fileContents);
	res.end();
});
server.listen(9090);
console.log("Yodlee server running on port 9090...!!");