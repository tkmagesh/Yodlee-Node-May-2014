var express = require("express"),
	router = express.Router();

var tasks = ['Task - 1','Task - 2', 'Task -3'];
router.get('/',function(req,res){
	res.render('tasks', {list : tasks} );
});

router.post('/',function(req,res){
	console.log(req.body);
	//console.log("The given task is yet to be added to the collection");
	tasks.push({name : req.body.taskName});
	res.render('tasks', {list : tasks} );
});

module.exports = router;