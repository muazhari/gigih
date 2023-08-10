import {useEffect} from "react";
import {Socket} from "socket.io-client";

export default function useSocket(
    socket: Socket,
    registerEvents: (socket: Socket) => void,
    unregisterEvents: (socket: Socket) => void
){
    useEffect(() => {
        socket.connect()
        registerEvents(socket)
        return () => {
            unregisterEvents(socket)
            socket.disconnect()
        }
    }, [])

    return socket
}
