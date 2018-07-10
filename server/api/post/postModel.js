var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {
        type: String,
        required : true,
        unique : true
    },
    text: {
        type: String,
        required : true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    categories: [
        {   
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true
        }
    ]
        
});

module.exports = mongoose.model('post', PostSchema);
