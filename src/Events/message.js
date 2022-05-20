const { VoiceChannel } = require("../config.json");
module.exports = {
	name: "messageCreate",
	async execute(message, client) {
		if (message.author.bot || !message.guild) return;
    if(message.channelId !== "954791842082328576") return;
		const args = message.content.trim().split(/ +/);
		const cmdName = args.shift().toLowerCase();
		const cmd = client.commands.get(cmdName) || client.aliases.get(cmdName);
		if (!message.member.voice.channel || message.member.voice.channel.id !== VoiceChannel || !message.guild.me.voice.channel || message.guild.me.voice.channel.id !== VoiceChannel) return;
		if (!cmd) return;
		try {
			cmd.execute(message, args, client);
		} catch (err) {
			console.log(err);
		}
	}
}