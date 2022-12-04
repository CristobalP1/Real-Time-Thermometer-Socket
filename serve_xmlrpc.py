from xmlrpc.server import SimpleXMLRPCServer
from udp1 import sensor

def sumar(a):
    return a*97

def main():
    print("Servidor_rpc")
    server = SimpleXMLRPCServer(('192.168.8.103',5000))
    server.register_function(sumar)
    server.serve_forever()

if __name__ == '__main__':
    main()




