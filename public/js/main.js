$(function() {
   
    $('#startbutton').on('click', function() {
        $.get('/start');   
    });
    
    $('#stopbutton').on('click', function() {
        $.get('/stop');   
    });
   
    var socket = io.connect('http://192.168.7.2:8082');
    
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
  
    socket.on('togglePhysicalButton', function (data) {
        console.log('togglephysicalbutton');
        $('.physicalbutton').toggleClass('on');
    });
   
});