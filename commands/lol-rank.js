const fetch = require('node-fetch');
const {riottoken} = require('../config.json');
const embedMsg = require('../embeds/lol-embed.js');

const servers = {
    "euw": 'EUW1',
    "eune": 'EUN1',
    "na": 'NA1',
    "kr": 'KR',
    "br": 'BR1',
    "jp": 'JP1',
    "las": 'LA1',
    "oce": 'OC1',
    "tr": 'TR1',
    "ru": 'RU',
};
module.exports = {
	name: 'lol-rank',
	description: 'Get lol ranks by given Summoner Name',
	async execute(message, args) {
        const getAPIregion = (string) => {
            for (const [key, value] of Object.entries(servers)) {
                switch(string) {
                    case key:
                        return servers[string];
                    default:
                        console.log("SHIT");
                };
            }
        };
        let user = message.content.slice(6);
        let summonerName = message.content.slice(6);
        let opGG = 'eune';
        let region = getAPIregion(opGG);
        if(message.content.charAt(5) === '$'){
            opGG = message.content.slice(6, message.content.indexOf(' '));
            region = getAPIregion(opGG);
            user = message.content.slice(message.content.indexOf(' ')+1);
            summonerName =  message.content.slice(message.content.indexOf(' ')+1)
            
        }
        if(/\s/.test(user)){
            user = user.replace(/\s/g, '%20')
        }
        try{
            const getAccountId = new URL(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user}?api_key=${riottoken}`); // string literal puts 20% instead of space, omg...
            let response = await fetch(getAccountId);
            let accountData = await response.json();
            const getRank = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountData.id}?api_key=${riottoken}`;
            let secondresponse = await fetch(getRank);
            let summonerData = await secondresponse.json();
            message.channel.send(embedMsg.render(summonerName, user, summonerData[0], opGG));
        }
        catch(error){
            // console.log(error);
            message.channel.send("Esti unranked fratelo!");
        };        
	},
};