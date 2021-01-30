const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix,token} = require('./config.json')
const fetch = require('node-fetch');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.channel.id === "804494561556037643"){
        if (msg.content === 'Test?') {
            msg.reply('Ce test?');
        }
        if (msg.content === '!ping') {
            // send back "Pong." to the channel the message was sent in
            msg.channel.send('Pong.');
        }
        if (msg.content === '!servername') {
            // send back "Pong." to the channel the message was sent in
            msg.channel.send(msg.guild.name);
        }
        // if (msg.content === '!whois @S') {
        //     const member = msg.mentions.members;
        //     console.log(member)
        //     // msg.channel.send(member)
        // }

    }
});

client.on('message', async msg => {
    if (msg.channel.id === "804494561556037643"){
        let msg_content = msg.content;
        console.log(msg_content)
        if (msg.content === 'API') {
            let url = 'https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/MorningStar666?api_key=RGAPI-59a0586d-d7d6-4982-8739-91d3cfcc9e00'
            let response = await fetch(url);
            let json = await response.json();
            console.log(json)
            msg.channel.send(json.id);
       }
    }
});
// client.on('message', async message => {
// 	// Join the same voice channel of the author of the message
// 	if (message.member.voice.channel) {
// 		const connection = await message.member.voice.channel.join();
// 	}
// });

client.login(token);