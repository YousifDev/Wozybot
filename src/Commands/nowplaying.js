const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "nowplaying",
	aliases: ["np"],
	async execute(message, args, client) {
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
		if (!queue.playing) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no song **playing**!`).setColor("RANDOM")] });
		queue.songs.filter((song, num) => num < 1).map((song) => {
			message.reply({
				embeds: [
					new MessageEmbed()
						.setTitle(`> ${client.config.emojis.music} Now Playing`)
						.setDescription(`[${song.name}](${song.url})\n> Duration [${song.formattedDuration}](${song.url}) ..\n> Requested by ${song.user}..\n**•** Channel's Name [\`${song.uploader.name}\`](${song.uploader.url}) ..\n**•** Video's Likes [\`${song.likes}\`](${song.uploader.url}) ..\n**•** Video's Views [\`${song.views}\`](${song.uploader.url}) ..`)
						.setImage(song.thumbnail)
						.setColor("RANDOM")
				]
			});
		});
	}
}