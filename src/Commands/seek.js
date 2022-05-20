const { MessageEmbed } = require("discord.js");
const config = require("../../src/config");
module.exports = {
	name: "seek",
	aliases: ["settime", "set-time", "وقت"],
	async execute(message, args, client) {
		if (!args.join(" ")) return await message.channel.send({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Missing **arguments**!\n**•** Type a valid **Time**.`).setColor("RANDOM")] })
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.channel.send({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] })
		queue.songs.filter((song, num) => num === 0).map(async (song, num) => {
			if (args[0] >= song.duration || args[0] < 0) return await message.channel.send({ embeds: [new MessageEmbed().setDescription(`${client.config.emojis.warning} • You can seek Track between \`0\` and \`${song.duration}\``).setColor("RANDOM")] });
			await client.distube.seek(message.guildId, Number(args[0]));
			await message.channel.send({ embeds: [new MessageEmbed().setDescription(`${client.config.emojis.time} • Track has been **Seeked** to \`${args[0]}\`.`).setColor("RANDOM")] });
		});
	}
}