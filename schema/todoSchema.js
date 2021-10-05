const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({

    todoName:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
})

module.exports = todoSchema;