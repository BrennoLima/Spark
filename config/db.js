const mongoose = require('mongoose');
const { mongoURI } = require('./keys');

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('MongoDB connected');
	} catch (err) {
		console.error(err.message);
		// exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
