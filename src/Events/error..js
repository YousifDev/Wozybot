module.exports = async () => {
	process.on("uncaughtException", (err) => {
		console.log(err);
	});
	process.on("rejectionHandled", (err) => {
		console.log(err);
	});
	process.on("unhandledRejection", (err) => {
		console.log(err);
	});
}