const { MessageEmbed } = require("discord.js");

module.exports = async (client, distube) => {
	distube.on("playSong", async (queue, song) => {
		await queue.textChannel.send({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.music}-Playing \`${song.name}\`, Song Duration **${song.formattedDuration == "00:00" && "\\⛔" || song.formattedDuration}** .`).setColor("RANDOM")] })
	});
	distube.on("addSong", async (queue, song) => {
		await queue.textChannel.send({ embeds: [new MessageEmbed().setDescription(`> ${client.config.emojis.music}-Song Added \`${song.name}\` to queue, Song Duration **${song.formattedDuration == "00:00" && "\\⛔" || song.formattedDuration}** .`).setColor("RANDOM")] })
	}).on("addList", async (queue, playlist) => {
		await queue.textChannel.send({
			embeds: [
				new MessageEmbed().setDescription(`> ${client.config.emojis.success}-Added \`${playlist.name}\` **Playlist** (\`${playlist.songs.length} songs\`) to queue .`).setColor("RANDOM")
			]
		});
	}).on("searchCancel", async (message) => {
		await message.channel.send(`> ${client.config.emojis.warning}-Searching **cancelled** .`)
	}).on("searchNoResult", async (message, query) => {
		await message.channel.send(`> ${client.config.emojis.error}-No result found for \`${query}\`!`);
	}).on("error", async (channel, error) => {
		await console.log(error);
    await channel.send({embeds:[
      new MessageEmbed()
      .setDescription(`> I didn't find any **result**.`)
    ]})
	});
};