function SalaryCalculator(defaults){
   var attributes = defaults || {};
   this.get = function(attrName){
     return attributes[attrName];
   };
   this.set = function(attrName,value){
     attributes[attrName] = value;
     this.triggerChange(attrName);
   };
   this.toJSON = function(){
      return attributes;
   }
}

SalaryCalculator.prototype = {
   subscribers : {},
   addChangeSubscriber : function(attrName,changeCallback){
     this.subscribers[attrName] = this.subscribers[attrName] || [];
     this.subscribers[attrName].push(changeCallback) ;
   },
   triggerChange : function(attrName){
      var subs = this.subscribers[attrName] || [];
      subs.forEach(function(s){ s(); });
   }
}