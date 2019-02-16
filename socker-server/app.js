var app = require('http').createServer();
var io = require('socket.io')(app);
var PORT = 8088;

app.listen(PORT);


Date.prototype.format = function(format) {
    var args = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    if (/(y+)/.test(format))
        format = format.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var i in args) {
        var n = args[i];
        if (new RegExp("(" + i + ")").test(format))
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
            );
    }
    return format;
};




io.on('connection', socket => {

	// All User with Socket connection broadcast an add event
	// io.sockets.emit('receiveMessage',resdata);

	// function中的socket为每个客户端单独连接的socket实例，只通知当前连接用户
	//  socket.emit('loginSuccess',{username:data.username});


	// listening request message from Users
	socket.on('sendMessage', data => {
		let resData = {
			msgDate: new Date(), // get current time 
			message: data,
		}
		io.sockets.emit('receiveMessage',resData);
	})

	// pay order for some goods
	socket.on('payOrder',data => {
		let obj = {}
		obj.cName = data.cinemaName
		obj.time = new Date().format("yyyy-MM-dd hh:mm");
		obj.num = data.num
		socket.emit('paySuccess',JSON.stringify(obj));
	})

})

// show listening port
console.log('app listen at：'+PORT);