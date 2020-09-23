const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "👋｜환영합니다";

client.on('ready', () => {
    console.log('켰다.');
    client.user.setPresence({ game: { name: '모든 우주선 | 접두사: .' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const newUser = member.user;
    const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);
  
    member.addRole(guild.roles.find(role => role.name == "―――――――성과―――――――"));
});
      
client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const newUser = member.user;
    const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);
    let embed = new Discord.RichEmbed()
      .setColor('#F08080')
      .setDescription(`<@${newUser.id}> 님이 **\`어몽어스 코리아 디스코드\`** 서버에 입장하셨습니다`)
      
    welcomeChannel.send(embed);
});


client.on('message', (message) => {
  if(message.content === '.도움') {
    message.reply('아직 미완성입니다 다음에 이용해주세요');
  }
});

client.login(token);