const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "volume",
	aliases: ["vol", "v", "صوت", "setvolume", "setvol"],
	async execute(message, args, client) {
		if (!args.join(" ")) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Missing **arguments**!\n**•** Provide a Number of Volume.`).setColor("RANDOM")] });
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		if (isNaN(args[0]) || args[0] <= 0 || args[0] > 300) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Volume must be between **1** and **300** .`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
		await client.distube.setVolume(message.guildId, parseInt(args[0]));
		await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.music}-**Volume** has been changed to \`${parseInt(args[0])}\` .`).setColor("RANDOM")] });
	}
}