const fs = require("fs");
const { error } = require("console");
module.exports = async (client) => {
	fs.readdirSync("./src/Events").filter(file => file.endsWith(".js")).forEach(file => {
		if (file.startsWith("error.")) return;
		const event = require(`./Events/${file}`);
		if (!event.name || event.name.length === 0) return error(`⚠ - ${file} has not Name Events .`);
		client.on(event.name, (...args) => event.execute(...args, client));
	});
};
