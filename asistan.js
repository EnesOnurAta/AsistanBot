const Discord = require("discord.js");

//Asistan, client OLARAK TANITILDI
const Asistan = new Discord.Client();

//PREFIX
var prefix = '=';

//BOT AÇILINCA
Asistan.on("ready", () => {
  console.log('[------------] Asistan [-------------]');
  console.log(`${Asistan.guilds.size} tane sunucuya hizmet veriyor`);
  console.log(`${Asistan.users.size} kullaniciya hizmet veriyor`);
  console.log(`${Asistan.channels.size} kanala hizmet veriyor`);
  console.log("Prefix: " + prefix);
  console.log("Bot ID'si: " + Asistan.user.id);
  console.log("Bot Isim: " + Asistan.user.username);
  console.log('[------------] Asistan [-------------]');
});

//Sunucu Botu eklediğinde bot durumunu yayın olarak yeniliyor
Asistan.on("guildCreate", guild => {
  Asistan.user.setStatus("STREAMING"); 
});
Asistan.on("guildDelete", guild => {
  Asistan.user.setStatus("STREAMING"); 
});

//Botu ekleyen sunucu olursa bot kendi sunucusunun belirtilen ID'li kanala log atıyor
Asistan.on('guildCreate', guild => {
    let channel = Asistan.channels.get("450419544519999509")
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
Asistan.on('guildDelete', guild => {
    let channel = Asistan.channels.get("450419544519999509")
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
Asistan.on('guildMemberAdd', member => {
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
Asistan.on('guildMemberRemove', member => {
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




//DOSYALARI KOMUT OLARAK ALGILAMASI ICIN
Asistan.on("message", async msg => {
  if (msg.author.bot) return;
  if(msg.content.indexOf(prefix) !== 0) return;

  const argümanlar = msg.content.slice(prefix.length).trim().split(/ +/g);
  const komut = args.shift().toLowerCase();
  const olay = msg.content.toLower

  try {
    let komutdosyası = require(`./komutlar/${komut}.js`);
    komutdosyası.run(Asistan, msg, argümanlar);
  } catch (err) {}
});


//TOKEN
Asistan.login(process.env.Asistan_TOKEN);
