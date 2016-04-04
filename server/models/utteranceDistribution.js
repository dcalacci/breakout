var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UtteranceDistributionSchema = new Schema({
    meeting: {type: String, ref: 'Meeting'},
    talkTimes: [{
        participant: {type: String, ref: 'Participant'},
        seconds: Number
    }],
    timestamp: Date
});

var Model = mongoose.model('UtteranceDistribution', UtteranceDistributionSchema);

module.exports = Model;
