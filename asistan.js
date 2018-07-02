const Discord = require("discord.js");
const client = new Discord.Client();

//PREFIX
var prefix = '=';

//BOT AÇILINCA
client.on("ready", () => {
  console.log('[------------] Asistan [-------------]');
  console.log(`${client.guilds.size} tane sunucuya hizmet veriyor`);
  console.log(`${client.users.size} kullaniciya hizmet veriyor`);
  console.log(`${client.channels.size} kanala hizmet veriyor`);
  console.log("Prefix: " + prefix);
  console.log("Bot ID'si: " + client.user.id);
  console.log("Bot Isim: " + client.user.username);
  console.log('[------------] Asistan [-------------]');
});

//Sunucu Botu eklediğinde bot durumunu yayın olarak yeniliyor
client.on("guildCreate", guild => {
  client.user.setStatus("STREAMING"); 
});
client.on("guildDelete", guild => {
  client.user.setStatus("STREAMING"); 
});

//Botu ekleyen sunucu olursa bot kendi sunucusunun belirtilen ID'li kanala log atıyor
client.on('guildCreate', guild => {
    let channel = client.channels.get("450419544519999509")
        const embed = new Discord.RichEmbed()
        .setColor("GREEN")
        .setAuthor(`GIRIS YAPTIM`)
        .setThumbnail(guild.iconURL)
        .addField("Sunucu", guild.name)
        .addField("Kurucu", guild.owner)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
         channel.send(embed);
    });
client.on('guildDelete', guild => {
    let channel = client.channels.get("450419544519999509")
        const embed = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(`BENI ATTILAR`)
        .setThumbnail(guild.iconURL)
        .addField("Sunucu", guild.name)
        .addField("Kurucu", guild.owner)
        .addField("Sunucu ID", guild.id, true)
        .addField("Toplam Kullanıcı", guild.memberCount, true)
        .addField("Toplam Kanal", guild.channels.size, true)
         channel.send(embed);
    });

// SUNUCUYA GİRİŞ
client.on('guildMemberAdd', member => {
  let Sunucu = member.guild;
  let GirişRolü = guild.roles.find('name', 'Üye');
  member.addRole(GirişRolü);

  const GirişKanalı = member.guild.channels.find('name', 'giriş');
  if (!GirişKanalı) return;
  const GirişMesaj = new Discord.RichEmbed()
  .setColor('GREEN')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📥 | Sunucuya katıldı')
  .setTimestamp()
  GirişKanalı.sendEmbed(GirişMesaj);
});
// SUNUCUDAN ÇIKIŞ
client.on('guildMemberRemove', member => {
  const ÇıkışKanalı = member.guild.channels.find('name', 'çıkış');
  if (!ÇıkışKanalı) return;
  const ÇıkışMesaj = new Discord.RichEmbed()
  .setColor('RED')
  .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('📤 | Sunucudan Ayrıldı')
  .setTimestamp()
  ÇıkışKanalı.sendEmbed(ÇıkışMesaj); 
});

const chalk = require('chalk');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
const snekfetch = require('snekfetch');
const api = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1NDIzMTYzMDQwNTA0MjE3NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTE2Mjc0MTQ1fQ.2H9LjNjH6WFp5LmswfXAYSDsHQn2JSPPgbgf1WjSi_c';
module.exports = client => {
  snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`).set('Authorization', api).send({
    server_count: client.guilds.size
  }) console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
  var Games = ["Kendi Cümlenizi Yazın", "Kendi Cümlenizi Yazın", `evo!yardım|${client.guilds.size} sunucu|${client.users.size} kullanıcı`];
  setInterval(function() {
    var random = Math.floor(Math.random() * (Games.length - 0 + 1) + 0);
    client.user.setGame(Games[random], "https://www.twitch.tv/azeriiteammurad");
  }, 2 * 2500);
};


//DOSYALARI KOMUT OLARAK ALGILAMASI ICIN
client.on("message", async msg => {
  if (msg.author.bot) return;
  if(msg.content.indexOf(prefix) !== 0) return;

  const argümanlar = msg.content.slice(prefix.length).trim().split(/ +/g);
  const komut = args.shift().toLowerCase();
  const olay = msg.content.toLower

  try {
    let komutdosyası = require(`./komutlar/${komut}.js`);
    komutdosyası.run(client, msg, argümanlar);
  } catch (err) {}
});


//TOKEN
client.login(process.env.Asistan_TOKEN);
