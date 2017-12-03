const express = require('express')
const app = express()
var path  = require("path");
var PythonShell = require('python-shell');

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/query/:y1&:y2&:q', (req, res) => {
  // req.params
  var options = {
    mode: 'text',
    pythonPath: '/usr/bin/python',
    pythonOptions: ['-u'],

    args: [req.params.q, req.params.y1, req.params.y2]
  }

  PythonShell.run('scrapeIt.py', options, (err, results)=>{
    if(err) throw err;
    res.send(results)
  })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
