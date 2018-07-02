exports.run = (Asistan, message, argümentler) => {
  message.channel.send({embed: {
  description: ('Ping:  ' + ~~(client.ping) + 'ms')
  }})
}
