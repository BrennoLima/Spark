const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	marks: [
		{
			exercise: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'exercise',
			},
			grade: {
				type: Number,
			},
		},
	],
	exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'exercise' }],
});

module.exports = Student = mongoose.model('student', StudentSchema);
