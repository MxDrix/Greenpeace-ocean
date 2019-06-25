var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
const mongoDB = require('./services/db.service');
const UserModel = require('./models/user.model');

app.use(express.static(__dirname));

// app.set( 'views', __dirname + '/www' );
app.use( express.static(path.join(__dirname, 'www')) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))



app.get('/allUser', (req, res) => {
  UserModel.find({},(err, messages)=> {
    res.send(messages);
  })
})


app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  UserModel.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


app.post('/register', async (req, res) => {
  try{
    var user = new UserModel(req.body);

    var userExist = await UserModel.findOne({email: req.body.email});
      if(userExist){
        console.log("already in database")
        io.emit('message', "error_one")
        res.sendStatus(401);
      }
      else{
        var savedMessage = await user.save()
          console.log('saved');
    
        io.emit('message', req.body);
        res.sendStatus(200);
      }
  }
  catch (error){
    res.sendStatus(500);
    io.emit('message', "error_one");
    // return console.log('error',error);
  }
  // finally{
  //   console.log('Message Posted')
  // }

})



io.on('connection', () =>{
  console.log('a user is connected')
})


  // Connect MongoDB
  mongoDB.initClient()
  .then( db => {
      // Launch server
      var server = http.listen(3000, () => {
        console.log('server is running on port 3000');
      });
  })
  .catch( mongooseError => console.log(mongooseError));



