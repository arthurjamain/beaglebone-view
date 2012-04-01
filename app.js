var express = require('express'),
    app = express.createServer(),
    path = require('path'),
    io = require('socket.io').listen(8082),
    gpioManager = require('./node_modules/beaglebone-gpio'),
    bb = require('./bonescript'),
    ledUsr = bone.USR3,
    ledPin = bone.P8_3;

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.set('view engine', 'ejs');
});

setup = function() {
    pinMode(ledPin, OUTPUT);
    pinMode(ledUsr, OUTPUT);
};

setup();

console.log(gpioManager);


gpioManager.addInputListener({    key: 'physicalbutton_1', 
                    pin: 'P8_3', 
                    method: '_buttonpressed',
                    port: 8080,
                    edge: 'rising', 
                    pull: 'up', 
                    speed: 'slow'});
                    
gpioManager.addInputListener({    key: 'physicalbutton_2', 
                    pin: 'P8_5', 
                    method: '_buttonpressed_2',
                    port: 8080,
                    edge: 'rising', 
                    pull: 'up', 
                    speed: 'slow'});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/start', function(req, res){
    //digitalWrite(ledPin, HIGH);
    digitalWrite(ledUsr, HIGH);
    console.log('start');
    res.end();
});

app.get('/stop', function(req, res){
    //digitalWrite(ledPin, LOW);
    digitalWrite(ledUsr, LOW);
    console.log('stop');
    res.end();
});

app.get('/_buttonpressed', function(req, res) {
    io.sockets.emit('togglePhysicalButton', true)
    res.end();
});

app.get('/_buttonpressed_2', function(req, res) {
    io.sockets.emit('togglePhysicalButton', true)
    res.end();
});

app.listen(8080);



/**
 * 
 * Process Handlers
 * 
 **/
 