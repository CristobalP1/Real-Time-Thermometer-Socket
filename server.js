const net = require("net");

let algoritmo = (socket)=>{
    function generate(){
        limite = 0;
        let r = Math.random()*10;
        r = r.toFixed(1);
        console.log('sensor 2: %s',r);
        socket.write(r.toString());
        if (limite=200) {
            setTimeout(generate,500);
        }
        return r;
    }
    generate();
};

const server = net.createServer(algoritmo);

server.listen(4000,'192.168.8.103');


