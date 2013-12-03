var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ToDo = new Schema({
    description : { type: String, index: true, required: true },
    priority :    { type: String, enum : ['0', '1', '2'], default: '0' },
    scheduled :   Date,
    modified :    { type: Date, default : new Date() },
    done :        { type: Boolean, default: false }
});

mongoose.model('ToDo', ToDo);

exports.ToDo = function(db) {
    return db.model('ToDo');
};
