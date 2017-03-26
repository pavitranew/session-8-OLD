const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pirateSchema = new Schema({
	name: String,
	vessel: String,
	weapon: String
})

module.exports = mongoose.model('Pirate', pirateSchema)