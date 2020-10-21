const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	isQuizz: {
		type: Boolean,
		required: true,
	},
	question1: {
		type: String,
		required: true,
	},
	question2: {
		type: String,
		required: true,
	},
	question3: {
		type: String,
		required: true,
	},
	question4: {
		type: String,
		required: true,
	},
	question5: {
		type: String,
		required: true,
	},
	answer1: {
		type: String,
		required: true,
	},
	answer2: {
		type: String,
		required: true,
	},
	answer3: {
		type: String,
		required: true,
	},
	answer4: {
		type: String,
		required: true,
	},
	answer5: {
		type: String,
		required: true,
	},
	createdBy: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = Exercise = mongoose.model('exercise', ExerciseSchema);
