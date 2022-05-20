const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "play",
	aliases: ["شغل", "p"],
	async execute(message, args, client) {
		if (!args.join(" ")) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Missing **arguments**!\n**•** Provide a Ttile of a Song,\n**•** Provide a URL of a Song.`).setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true })).setColor("RANDOM")] });
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.waiting}-Searching **of** \`${args.join(" ")}\` .`).setColor("RANDOM")] });
		await client.distube.play(message.member.voice.channel, args.join(" "), { textChannel: message.channel, member: message.member });
	}
}