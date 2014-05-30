var nodeSocket = require("nodejs-websocket");
var socketServer = nodeSocket.createServer(function (con){
	console.log("A new connection is established....");	
	con.on("text",function(data){
		console.log("Received from client ", data);
		/*if (data === "time"){
			var counter = 0;
			var timer = setInterval(function(){
				con.sendText(new Date().toString());
				if (++counter >= 10) 
					clearInterval(timer);
			},5000);
		}*/
		socketServer.connections.forEach(function(sc){
			sc.sendText(data);
		});
	});
});
socketServer.listen(9095);
console.log("Socket server listening on port 9095....");