const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "queue",
	aliases: ["القائمة"],
	async execute(message, args, client) {
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
		if (queue.songs.length <= 0) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no more **Songs**!`).setColor("RANDOM")] });
		const queueList = queue.songs.filter((song, id) => id < 10).map((song, id) => `> \`${id}\` :: __[${song.name}](${song.url})__ Duration [${song.formattedDuration}](${song.url}) ..`).join("\n")
		if (queue.songs.length <= 10) {
			await message.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
						.setTitle("> Server Queue")
						.setDescription(`${queueList}`)
						.setColor("RANDOM")
				]
			});
		} else {
			await message.reply({
				embeds: [
					new MessageEmbed()
						.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
						.setTitle("> Server Queue")
						.setDescription(`${queueList}\nAnd Other **Songs**..`)
						.setColor("RANDOM")
				]
			});
		}
	}
}