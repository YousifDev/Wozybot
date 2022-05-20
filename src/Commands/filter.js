const { MessageEmbed, Message } = require("discord.js");
module.exports = {
	name: "filter",
	aliases: ["setfilter", "set-filter", "فلتر"],
	async execute(message, args, client) {
		if (!args.join(" ")) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Missing **arguments**!`).setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })).setColor("RANDOM")] });
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
		if (queue.songs.length <= 0) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no song **playing**!`).setColor("RANDOM")] });
		if (!queue.playing) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Song is **paused** .`).setColor("RANDOM")] });
		if (!client.config.filters.includes(args[0])) return await message.channel.send({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-I can't find that **filter**.`)] })
		client.distube.setFilter(message.guildId, args[0]);
		message.channel.send({ embeds: [new MessageEmbed().setDescription(`${client.config.emojis.success} __-__ **Successfully** updated the song filter.`)] });
	}
} 