const mongoose = require("mongoose");
const net = require("net");
let dgram = require("dgram");
let enchufe_udp = dgram.createSocket("udp4");
let xmlrpc = require('xmlrpc');
let http = require('http')
let fs = require('fs')

//conexion http
let server = http.createServer((req,res)=>{
    fs.readFile('./index2.html',(err,data)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data,'utf-8')
    });
}).listen(1000,'192.168.8.103');


//conexion a BD Mongo
mongoose.connect("mongodb://127.0.0.1:27017/termometro",(err)=>{
    if (!err) {
        console.log("db conectado");
    } else {
        throw err;
    }
});

//crear shemas
    Sensor = new mongoose.Schema({
    medida:Number,
},{colletion:'sensor01'});

    Sensor1 = new mongoose.Schema({
    medida:Number,
},{colletion:'sensor02'});


//crear modelo
    Sensor = mongoose.model('sensor01',Sensor);
    Sensor1 = mongoose.model('sensor02',Sensor1);


//recibo udp
enchufe_udp.on("message",(msg,info)=>{
    data_udp = msg.toString('utf8');
    console.log("Sensor 2: " +data_udp);
    
    //WS
    io.emit('lectura1',data_udp);

     Sensor1.collection.insert({medida:data_udp},(err,res)=>{
        if(err) throw err;
    });

});

enchufe_udp.bind(4001,'192.168.8.103')

//recibo tcp
    let io = require('socket.io')(server);
    let enchufe_tpc = new net.Socket();
    enchufe_tpc.connect(4000,'192.168.8.103');
    enchufe_tpc.on('data',(data)=>{
        data = data.toString();
        console.log('Sensor 1:' +data);

//WS
    io.emit('lectura',data);

//recibo tpc cliente
    setTimeout(function(){
        let data1 = parseInt(data)
        let cliente = xmlrpc.createClient({host:'192.168.8.103',port:5000,path:'/'})
        cliente.methodCall('sumar',[data1],(err,value)=>{
            console.log('Respuesta:' +value);
            //WS
            io.emit('lectura2',value);
        })
    },100)

    Sensor.collection.insert({medida:data},(err,res)=>{
        if(err) throw err;
    });

});
