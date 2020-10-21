const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	school: {
		type: String,
		required: true,
	},
	isTeacher: {
		type: Boolean,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = User = mongoose.model('user', UserSchema);
