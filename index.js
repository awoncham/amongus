const Discord = require('discord.js');
const client = new Discord.Client();
const token = "NzU4MTMwNTE2ODMzODYxNjk0.X2qeEA.BXlAEbNJt7_UULFniN_Y71GXXrM";
const welcomeChannelName = "👋｜환영합니다";

client.on('ready', () => {
    console.log('켰다.');
    client.user.setPresence({ game: { name: '모든 우주선 | 접두사: .' }, status: 'online' })
});

client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const newUser = member.user;
    const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);
});
      
client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const newUser = member.user;
    const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);
    let embed = new Discord.RichEmbed()
      .setColor('#F08080')
      .setDescription(`<${user.tag} 님이 **\`어몽어스 코리아 디스코드\`** 서버에 입장하셨습니다`)
      
    welcomeChannel.send(embed);
});

client.on('raw', event => {
    console.log(event);
    const eventName = event.t;
    if(eventName === 'MESSAGE_REACTION_ADD')
    {
        if(event.d.message_id === '752693141114454036')
        {
            var reactionChannel = client.channels.get(event.d.channel_id);
            if(reactionChannel.message.has(event.d.message_id))
              return;
            else {
                reactionChannel.fetchMessage(event.d.message_id)
                .then(msg => {
                    var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                    var user = client.users.get(event.d.user_id);
                    client.emit('messageReactionAdd', msgReaction, user);
                })
                .catch(err => console.log(err_));
            }
        }
    }
});

client.on('messageReactionAdd', (MessageReaction, user) => {
    
    var roleName = MessageReaction.emoji.name;
    console.log(roleName);
    var role = MessageReaction.message.guild.roles.find(role => role.name.toLowerCase() ===
    roleName.toLowerCase());

    if(role)
    {
      var memeber = Discord.MessageReaction.message.guild.members.find(member => member.id === user.id);
      if(member)
      {
        member.addRole(role.id);
        console.log("성공하였다. 역할을 추가하였다");
      }
    }
    else if(eventName === 'MESSAGE_REACTION_REMOVE')
    {
      if(event.d.message_id === '752693141114454036')
      {
        var reactionChannel = client.channels.get(event.d.channel_id);
        if(reactionChannel.message.has(event.d.message_id))
            return;
        else {
            reactionChannel.fetchMessage(event.d.message_id)
            .then(msg => {
                var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
                var user = client.users.get(event.d.user_id);
                client.emit('messageReactionRemove', msgReaction, user);
            })
            .catch(err => console.log(err_));
        }
      }
    }
});

client.on('messageReactionRemove', (messageReaction, user) => {
    var roleName = messageReaction.emoji.name;
    var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() ===
    roleName.toLowerCase ());
    if(role)
    {
      var member = messageReaction.message.guild.members.find(member => member.id === user.id);
      if(member)
      {
          member.removeRole(role.id);
          console.log("성공하였다. 역할을 제거하였다");
      }
    }
});

client.login(token);