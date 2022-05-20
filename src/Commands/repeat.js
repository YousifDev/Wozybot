const { MessageEmbed, Message } = require("discord.js");
module.exports = {
	name: "repeat",
	aliases: ["loop", "تكرار"],
	async execute(message, args, client) {
		// if (!args.join(" ")) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Missing **arguments**!\n**•** Provide a Type of RepeatMode **[**\`'OFF', 'SONG', 'QUEUE'\`**]**.`).setColor("RANDOM")] });
		if (!args[0]) {
			if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
			if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
			const queue = client.distube.getQueue(message.guildId);
			if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
			if (queue.repeatMode === 1 || queue.repeatMode === 2) {
				await client.distube.setRepeatMode(message.guildId, 0);
				await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-RepeatMode of Song now is **Disable** .`).setColor("RANDOM")] });
			} else {
				await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.success}-RepeatMode of Song now is **Enable** .`).setColor("RANDOM")] });
				await client.distube.setRepeatMode(message.guildId, 1);
			}
		} else {
			if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
			if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
			const queue = client.distube.getQueue(message.guildId);
			if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
			if (args[0].toLowerCase() === "queue") {
				if (queue.repeatMode === 2) {
					await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-RepeatMode of Queue is already **Enabled**!`).setColor("RANDOM")] });
				} else {
					await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.success}-RepeatMode of Queue now is **Enable** .`).setColor("RANDOM")] });
					await client.distube.setRepeatMode(message.guildId, 2);
				}
			} else if (args[0].toLowerCase() === "song") {
				if (queue.repeatMode === 1) {
					await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-RepeatMode of Song is already **Enabled**!`).setColor("RANDOM")] });
				} else {
					await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.success}-RepeatMode of Song now is **Enable** .`).setColor("RANDOM")] });
					await client.distube.setRepeatMode(message.guildId, 1);
				}
			} else if (args[0].toLowerCase() === "disable" || args[0].toLowerCase() === "off") {
				if (queue.repeatMode === 0) {
					await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-RepeatMode is not **Enabled**!`).setColor("RANDOM")] });
				} else {
					await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.success}-RepeatMode now is **Disable** .`).setColor("RANDOM")] });
					await client.distube.setRepeatMode(message.guildId, 0);
				}
			} else {
				await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Missing **arguments** (**Queue, Song, Disable**)!`).setColor("RANDOM")] });
			}
		}
	}
}