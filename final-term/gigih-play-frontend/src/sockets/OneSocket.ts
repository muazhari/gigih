import {io, Socket} from "socket.io-client";

export default class OneSocket {
    instance: Socket

    constructor(
        instance: Socket = io(import.meta.env.VITE_ONE_SOCKET_URL)
    ) {
        this.instance = instance
    }
}
