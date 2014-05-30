var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	path = require("path"),
	Calculator = require("./Calculator");

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var calculator = new Calculator();

var server = http.createServer(function(req,res){
	if (!serveStatic(req,res)){

		var urlObj = url.parse(req.url,true);
		var resource = urlObj.pathname,
			query = urlObj.query,
			number = parseInt(query.no,10),
			operation = query.op;
			
		calculator[operation](number);
		res.write(calculator.result.toString());
		res.end();
		
	}
});
server.listen(9090);
console.log("Yodlee server running on port 9090...!!");


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
