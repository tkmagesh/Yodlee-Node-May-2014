var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	path = require("path"),
	qs = require("querystring");
	

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var tasks = [];

var server = http.createServer(function(req,res){
	if (!serveStatic(req,res)){
		console.log('dynamic');
		var reqData = '';
		req.on('data',function(data){
			reqData += data;
		});
		req.on('end',function(){
			reqObj = qs.parse(reqData);
			tasks.push(reqObj.taskName);
			serveDynamic("TaskManager2.html",{taskCount : tasks.length},res);
		});
	}
});
server.listen(9090);
console.log("Yodlee server running on port 9090...!!");

function serveDynamic(filePath,data,res){
	fs.readFile(filePath, {encoding : "utf8"},function(err,fileContents){
		if (err){
			res.statusCode = 500;
			res.end();
			return;
		} 
		for(var key in data){
			var search = new RegExp("{" + key + "}","g");
			var replace = data[key].toString();
			fileContents = fileContents.replace(search,replace);
		}
		res.write(fileContents);
		res.end();

	});
}

function serveStatic(req,res){
	function isStaticResource(urlString){
		var staticTypes = [".html",".js",".ico",".css"];
		return staticTypes.some(function(t){
			return urlString.endsWith(t);
		});
	}

	var urlObj = url.parse(req.url);
	var resource = urlObj.pathname;
	var fileName = path.join(__dirname, resource);
	if (isStaticResource(fileName)){
		if (!fs.existsSync(fileName)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var readStream = fs.createReadStream(fileName,{encoding : "utf8"});
		readStream.pipe(res);		
		return true;
	} else {
		return false;
	}
}
