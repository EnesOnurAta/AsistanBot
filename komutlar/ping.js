exports.run = (client, message, args) => {
  message.channel.send({embed: {
  description: ('Ping:  ' + ~~(client.ping) + 'ms')
  }})
}
