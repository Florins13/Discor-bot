const Discord = require('discord.js');

module.exports = {
	name: 'Embed for lol',
	description: 'Give fancy window for given summoner!',
	render(name, user, summoner, region) {
		const exampleEmbed = new Discord.MessageEmbed()
		.attachFiles(['./assets/ranked-emblems/' + summoner.tier + '.png'])
		.attachFiles(['./assets/icons/skull.png'])
		.setColor("ORANGE")
		.setTitle(name)
		.setURL(`https://${region==='kr'?'kr.':region+'.'}op.gg/summoner/userName=${user}`)
		// .setAuthor('Rankul acestui noob este: ', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		// .setDescription('Some description here')
		.setThumbnail('attachment://' + summoner.tier + '.png')
		.addFields(
			{ name: 'Liga:', value: summoner.tier + ' ' + summoner.rank, inline : false },
			{ name: 'Regiune:', value: region.toUpperCase(), inline : false },
			{ name: 'Tip q:', value: summoner.queueType.replace(/_/g, ' '), inline: false },
			{ name: 'Puncte in liga:', value: '---- ' + summoner.leaguePoints  + ' ----' , inline: false },
			{ name: 'Meciuri castigate:', value: '---- ' + summoner.wins + ' ----' , inline: false },
			{ name: 'Meciuri pierdute:', value: '---- ' + summoner.losses + ' ----' , inline: false },
			{ name: 'Procentaj castigate:', value: '--- ' + Math.round((summoner.wins/(summoner.wins+summoner.losses))*100) + '%' + ' ---' , inline: false },
			
		)
		.setTimestamp()
		.setFooter('Powered by Je v1.0', 'attachment://skull.png');
		
		return exampleEmbed;
	},
};