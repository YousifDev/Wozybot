const { error } = require("console");
const fs = require("fs");
module.exports = async (client) => {
	fs.readdirSync("./src/Commands").forEach(file => {
		const command = require(`./Commands/${file}`);
		if (!command.name || command.name.length === 0) error(`⚠ - ${file} has not Command's Name .`);
		if (!command.aliases) return error(`⚠ - ${file} has not Command's Aliases .`);
		client.commands.set(command.name, command);
		command.aliases.forEach(alias => {
			client.aliases.set(alias, command);
		});
	});
};