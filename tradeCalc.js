console.log('Trade Calc js started executing');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('Launching trade calc Home page.');
app.get('', function(req, res){
	res.sendFile('D:/eclipse_workspace/TradeCalc/WebContent/html/home.html');
});

app.get('/tradingEntry', function(req, res){
	res.sendFile('D:/eclipse_workspace/TradeCalc/WebContent/html/trading.html');
});

app.get('/tradingHistory', function(req, res){
	res.sendFile('D:/eclipse_workspace/TradeCalc/WebContent/html/tradingHistory.html');
});

app.get('/transactionEntry', function(req, res){
	res.sendFile('D:/eclipse_workspace/TradeCalc/WebContent/html/transactions.html');
});

app.get('/transactionHistory', function(req, res){
	res.sendFile('D:/eclipse_workspace/TradeCalc/WebContent/html/transactionHistory.html');
});

app.listen('3000', function(){
	console.log('App is listening at port 3000...');
});

var mysql = require('mysql');
var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'trading'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to DB.');
});

app.post('/transactions', function (req, res){
	var trans_record = {
	id  : null,
	date	: req.body.trans_date,
	value	: req.body.trans_val,
	trans_type	: req.body.trans_type,
	details 	: req.body.details 
	}
	var query = con.query('INSERT INTO transactions SET ?', trans_record, function(err, result){
		if (err) throw err;
		console.log('Record inserted in to DB successfully.');
		res.send('Record inserted in to DB successfully.');
	});
});

app.post('/transactionHistory', function (req, res){
	var trans_record = {
	from_date	: req.body.from_date,
	to_date		: req.body.to_date,
	trans_type	: req.body.trans_type,
	}
	var query = con.query('SELECT * FROM transactions', function(err, result, fields){
		if (err){
			console.log(err);
			con.end();
			res.render('',{data:null,error:error});
			console.log('Error while fetching data');
		}
		if(result.length>0){
			//res.render('templateFile',{data:result,error:null});
			console.log('Data fetched successfully' + result);
		}
		else {
			res.render('',{data:null,error:"no data"});
			console.log('No data available');
		}
	});
});