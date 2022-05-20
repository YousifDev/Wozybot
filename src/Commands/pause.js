const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "pause",
	aliases: ["p", "ايقاف"],
	async execute(message, args, client) {
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
		if (queue.songs.length <= 0) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no song **playing**!`).setColor("RANDOM")] });
		if (!queue.playing) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Song is already **paused** .`).setColor("RANDOM")] });
		await client.distube.pause(message.guildId);
		await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.music}-Song has been just **paused** .`).setColor("RANDOM")] });
	}
}