const io = require('socket.io-client')

export default function () {
  const socket = io.connect('http://localhost:3001')

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived)
  }

  function unregisterhandler () {
    socket.off('message')
  }

  socket.on('error', function (err) {
    console.log('received socket error:', err)
  })

  function register(name, cb) {
    socket.emit('register', name, cb)
  }

  function join(chatroomName, cb) {
    socket.emit('join', chatroomName, cb)
  }

  function leave(chatroomName, cb) {
    socket.emit('leave', chatroomName, cb)
  }

  function message(chatroomName, msg, cb) {
    socket.emit('message', { chatroomName, message: msg}, cb)
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('getAvailableUsers', null, cb)
  }

  return {
    register,
    join,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterhandler
  }
}
