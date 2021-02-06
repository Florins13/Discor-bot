const Discord = require('discord.js');

module.exports = {
	name: 'Embed for lol',
	description: 'Give fancy window for given summoner!',
	render(sumonnerName, user,league, rank, leaguePoints, wins, losses, queueType) {
		const exampleEmbed = new Discord.MessageEmbed()
		.attachFiles(['./assets/ranked-emblems/' + league + '.png'])
		.attachFiles(['./assets/icons/skull.png'])
		.setColor("ORANGE")
		.setTitle(sumonnerName)
		.setURL('https://eune.op.gg/summoner/userName=' + user)
		// .setAuthor('Rankul acestui noob este: ', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		// .setDescription('Some description here')
		.setThumbnail('attachment://' + league + '.png')
		.addFields(
			{ name: 'Liga:', value: league + ' ' + rank, inline : false },
			{ name: 'Tip q:', value: queueType , inline: false },
			{ name: 'Puncte in liga:', value: '---- ' + leaguePoints  + ' ----' , inline: false },
			{ name: 'Meciuri castigate:', value: '---- ' + wins + ' ----' , inline: false },
			{ name: 'Meciuri pierdute:', value: '---- ' + losses + ' ----' , inline: false },
			{ name: 'Procentaj castigate:', value: '--- ' + Math.round((wins/(wins+losses))*100) + '%' + ' ---' , inline: false },
			
		)
		.setTimestamp()
		.setFooter('Powered by Hackerman v1.0', 'attachment://skull.png');
		
		return exampleEmbed;
	},
};