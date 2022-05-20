const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "skip",
	aliases: ["skipsong", "sk", "تخطي", "تخطى"],
	permissions: [],
	clientPermissions: [],
	async execute(message, args, client) {
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
		if (queue.songs.length <= 1) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no up next **song**!`).setColor("RANDOM")] });
		await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.waiting}-Now I'm skipping a **song** .`).setColor("RANDOM")] });
		await client.distube.skip(message.guildId);
	}
}