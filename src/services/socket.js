import { io } from "socket.io-client"

const socket = io("https://socketio-chat-h9jt.herokuapp.com/")

export default socket