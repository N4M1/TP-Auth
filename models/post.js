const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Post = new Schema({
    text: {
        type    : String,
        trim    : true,
    },
    user_id: {
        type: String,
        trim: true,
        required: [true, 'Le user id est obligatoire']
    },
}, {
    timestamps: true // ajoute 2 champs au document createdAt et updatedAt
});

module.exports = mongoose.model('Post', Post);