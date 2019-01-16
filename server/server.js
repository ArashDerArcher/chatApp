const server = require('http').createServer()
const io = require ('socker.io')(server)

const makeHandlers = require('./handlers')

const port = 3002

io.on('connection', function (client) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager)

  console.log('client connected...', clinet.id)
  clientManager.addClient(client)

  client.on('register', handleRegister)
  client.on('chatrooms', handleGetChatrooms)
  client.on('availableUsers', handleGetAvailableUsers)
  client.on('join', handleJoin)
  client.on('message', handleMessage)
  client.on('leave', handleLeave)
  client.on('disconnect', function () {
    console.log('client disconnected...', client.id)
    handleDisconnect()
  })
  client.on('error', function (err) {
    console.log('received error from client: ', client.id)
    console.log(err)
  })
})

server.listen(port, function (err) {
  if (err) throw err
  console.log(`listening on port: ${port}`)
})
