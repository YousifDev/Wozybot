const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
		Intents.FLAGS.GUILD_INTEGRATIONS,
		Intents.FLAGS.GUILD_PRESENCES
	],

});
const express = require("express");
const app = express();
app.listen(8080, () => { console.log("Express Server !") });
app.get('/', (req, res) => {
  res.send("Connected");
});

const { Token } = require("./config.json");
const { DisTube, QueueManager } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const soundcloud = new SoundCloudPlugin();
const distube = new DisTube(client, {
	searchSongs: 10,
	plugins: [
		new SpotifyPlugin(),
		new SoundCloudPlugin(),
		new YtDlpPlugin()
	],
	nsfw: true,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false,
	emitNewSongOnly: true,
	youtubeDL: false,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
});
client.distube = distube;
client.commands = new Collection();
client.aliases = new Collection();
client.config = require("./config");
require("./eventsHandler")(client);
require("./commandsHandler")(client);
require("./musicEvents")(client, distube);
require("./Events/error.")();

const fetchUrl = require("fetch-url");
client.on("messageCreate", async (message) => {
	if (message.author.bot || !message.guild) return;
	try {
		fetchUrl(message.content, async success => {
			if (message.member.roles.cache.has("954796121304236095") || message.member.permissions.has("ADMINISTRATOR")) return;
			await message.delete().catch(() => { });
		}, err => {
			return;
		})
	} catch (err) {
		return;
	}
});

client.login(Token);