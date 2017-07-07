var express = require('express'),
    app = express();

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// app.use("/dist", function(req, res){  
//   res.sendFile(__dirname+"/dist/pages/index.html");
// });

app.use("/", function(req, res){
  res.sendFile(__dirname+"/dist/pages/index.html");
});

app.listen(8000, function(){
  console.log('listening on port 8000');
});
