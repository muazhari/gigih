import {useEffect} from "react";
import {Socket} from "socket.io-client";

export default function useSocket(
    socket: Socket,
    registerEvents: (socket: Socket) => void,
    unregisterEvents?: (socket: Socket) => void
) {
    useEffect(() => {
        registerEvents(socket)
        return () => {
            if (unregisterEvents !== undefined) {
                unregisterEvents(socket)
            }
        }
    }, [])

    return socket
}
