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

client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith('.킥')) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .then(() => {
            let embed = new.discord.RichEmbed()
              .setColor('F08080')
              .setDescription(`성공적으로 ${user.tag} 님을 추방하였습니다`);

            message.channel.send(embed);
          })
          .catch(err => {
            let embed = new.discord.RichEmbed()
              .setColor('F08080')
              .setDescription(`이 유저를 추방할 수가 없습니다`);

              message.channel.send(embed);
            console.error(err);
          });
      } else {
        let embed = new.discord.RichEmbed()
        .setColor('F08080')
        .setDescription(`그 유저는 이 서버에 가입되어 있지 않습니다!`);

        message.channel.send(embed);
      }
    } else {
      let embed = new.discord.RichEmbed()
      .setColor('F08080')
      .setDescription(`멘션이 되지 않았습니다!`);

      message.channel.send(embed);
    }
  }
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