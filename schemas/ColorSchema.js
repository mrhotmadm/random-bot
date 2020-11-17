const mongoose = require('mongoose')

const colorSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    }, 
    color: {
        type: String,
    },
});

module.exports = mongoose.model('user-colors', colorSchema);