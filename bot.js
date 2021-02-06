const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix, discordtoken} = require('./config.json');



client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content.startsWith(`${prefix}ping`)) {
        client.commands.get('ping').execute(message);
    }
});

client.on('message', async message => {
    if (message.channel.id === "804494561556037643"){
        if (message.content.startsWith(`${prefix}rank`)) {
            client.commands.get('lol-rank').execute(message);
        }
    }
});

// client.on('message', async message => {
// 	// Join the same voice channel of the author of the message
// 	if (message.member.voice.channel) {
//         const connection = await message.member.voice.channel.join();
//         // const audio = connection.receiver.createStream(user, { mode: 'pcm' });
//         // audio.pipe(fs.createWriteStream('user_audio'));
//         // const audio = connectionA.receiver.createStream('238273480594817024');
//         // connectionB.play(audio, { type: 'opus' });
//         // console.log(audio)
// 	}
// });

client.login(discordtoken);