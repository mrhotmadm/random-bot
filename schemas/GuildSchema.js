const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    }, 
    prefix: {
        type: String,
    },
});

module.exports = mongoose.model('guild-settings', guildSchema);