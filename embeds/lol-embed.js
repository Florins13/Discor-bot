const Discord = require('discord.js');

// inside a command, event listener, etc.


module.exports = {
	name: 'Embed for lol',
	description: 'Give fancy window for given summoner!',
	render(color, title, league, rank, wins, losses) {
		const exampleEmbed = new Discord.MessageEmbed()
		.attachFiles(['./assets/ranked-emblems/' + league + '.png'])
		// .setImage('attachment://' + league + '.png')
		.setColor(color)
		.setTitle(title)
		.setURL('https://eune.op.gg/summoner/userName=' + title)
		// .setAuthor('Rankul acestui noob este: ', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		// .setDescription('Some description here')
		// .addField('\u200B', '\u200B')
		.setThumbnail('attachment://' + league + '.png')
		.addFields(
			{ name: 'Liga:', value: league + ' ' + rank,inline: false },
			// { name: '\u200B', value: '\u200B' },
			{ name: 'Meciuri castigate', value: wins,inline: false },
			{ name: 'Meciuri pierdute', value: losses, inline: false },
			// { name: '\u200B', value: '\u200B' },
		)
		// .addField('Inline field title', 'Some value here', true)
		.setTimestamp()
		.setFooter('Powered by Hackerman v1.0', 'https://i.imgur.com/wSTFkRM.png');
		return exampleEmbed;
	},
};