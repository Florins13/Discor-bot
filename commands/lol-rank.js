const fetch = require('node-fetch');
const {riottoken} = require('../config.json');
const embedMsg = require('../embeds/lol-embed.js');

module.exports = {
	name: 'lol-rank',
	description: 'Get lol ranks by given Summoner Name',
	async execute(message, args) {
        let user = message.content.slice(6);
        const summonerName = message.content.slice(6);
        if(/\s/.test(user)){
            user = user.replace(/\s/g, '%20')
        }
        try{
            const getAccountId = new URL('https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + user + '?api_key=' + riottoken);
            let response = await fetch(getAccountId);
            let accountData = await response.json();
            const getRank = 'https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ accountData.id +'?api_key=' + riottoken;
            let secondresponse = await fetch(getRank);
            let summonerData = await secondresponse.json();
            message.channel.send(embedMsg.render(summonerName, user, summonerData[0].tier, summonerData[0].rank, summonerData[0].leaguePoints, summonerData[0].wins, summonerData[0].losses, summonerData[0].queueType.replace(/_/g, ' ')))
        }
        catch(error){
            message.channel.send("Esti unranked fratelo!");
        }       
	},
};