const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, discordtoken, riottoken} = require('./config.json')
const fetch = require('node-fetch');


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong.');
    } else if (message.content === `${prefix}beep`) {
        message.channel.send('Boop.');
    }
    else if (message.content === `${prefix}server`) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
});

client.on('message', async message => {
    if (message.channel.id === "804494561556037643"){
        if (message.content.startsWith(`${prefix}rank`)) {
            const options = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',

                }
            };
            let message_content = message.content.slice(6);
            if(/\s/.test(message_content)){
                message_content = message_content.replace(/\s/g, '%20')
            }
            // message.channel.send(message_content);
            let getAccountId = new URL('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + message_content + '?api_key=' + riottoken)
            console.log(getAccountId)
            let response = await fetch(getAccountId);
            let json = await response.json();
            console.log(json)
            let getRank = 'https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ json.id +'?api_key=' + riottoken;
            let secondresponse = await fetch(getRank);
            let secondjson = await secondresponse.json();
            console.log(secondjson);

            message.channel.send(secondjson[0].tier + ' , ' + secondjson[0].rank + ' , Meciuri castigate: ' + secondjson[0].wins + ', Meciuri pierdute: ' + + secondjson[0].losses);
       }
    }
});
client.on('message', async message => {
	// Join the same voice channel of the author of the message
	if (message.member.voice.channel) {
		const connection = await message.member.voice.channel.join();
	}
});

client.login(discordtoken);