const mongoose = require("mongoose");

module.exports =  () => {
	mongoose.Promise = global.Promise;

	mongoose
		.connect(process.env.DBURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.info("Successfully connected to MongoDB.");
		})
		.catch((error) => {
			console.warn("Could not connect to MongoDB.");
			console.error(error);
			console.warn("Continue without connecting to MongoDB.");
		});
};
