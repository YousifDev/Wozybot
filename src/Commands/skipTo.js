const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "skipto",
	aliases: ["تخطى-الى", "skip-to", "jump"],
	async execute(message, args, client) {
		if (!args.join(" ")) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-Missing **arguments**!\n**•** Provide a Number of a Song "\`1,2,3...\`".\n- * NOTE * \`You can get a number of a song from Queue Commands.\``).setColor("RANDOM")] });
		if (!message.member.voice.channel) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in a **VoiceChannel**!`).setColor("RANDOM")] })
		if (message.guild.me.voice.channel && message.member.voice.channelId !== message.guild.me.voice.channelId) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.error}-You're not in the same **VoiceChannel**!`).setColor("RANDOM")] });
		const queue = client.distube.getQueue(message.guildId);
		if (!queue) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no **queue** in the server!`).setColor("RANDOM")] });
		// if (isNaN(args[0]) || args[0] <= 0 || queue.songs.length < args[0]) return await message.reply(`> ${client.config.emojis.warning}-Number must be between **1**-**${queue.songs.length}(Queue Songs)** and more than a **Song**!`);
		if (queue.songs.length <= 1) return await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.warning}-There's no up next **song**!`).setColor("RANDOM")] });
		await message.reply({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.waiting}-Now I'm skipping a **song** .`).setColor("RANDOM")] });
		await client.distube.jump(message.guildId, Number(args[0]));
	}
}