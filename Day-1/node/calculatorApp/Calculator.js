function Calculator(){
	this.result = 0;
}
Calculator.prototype.add = function(n){
	this.result += n;
}
Calculator.prototype.subtract = function(n){
	this.result -= n;
}

module.exports = new Calculator();