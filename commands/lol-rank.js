const fetch = require('node-fetch');
const {riottoken} = require('../config.json');
const embedMsg = require('../embeds/lol-embed.js');

console.log(embedMsg.render("green", "test"))
module.exports = {
	name: 'lol-rank',
	description: 'Get lol ranks by given Summoner Name',
	async execute(message, args) {
        let message_string = message.content.slice(6);
        if(/\s/.test(message_string)){
            message_string = message_string.replace(/\s/g, '%20')
        }
        try{
            let getAccountId = new URL('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + message_string + '?api_key=' + riottoken);
            // console.log(getAccountId)
            let response = await fetch(getAccountId);
            let json = await response.json();
            let getRank = 'https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ json.id +'?api_key=' + riottoken;
            let secondresponse = await fetch(getRank);
            let secondjson = await secondresponse.json();
            console.log(secondjson)
            // message.channel.send(secondjson[0].tier + ' , ' + secondjson[0].rank + ' , Meciuri castigate: ' + secondjson[0].wins + ', Meciuri pierdute: ' + + secondjson[0].losses);
            message.channel.send(embedMsg.render("green", message_string, secondjson[0].tier, secondjson[0].rank, secondjson[0].wins, secondjson[0].losses))
        }
        catch(error){
            message.channel.send("Esti unranked fratelo!");
        }       
	},
};