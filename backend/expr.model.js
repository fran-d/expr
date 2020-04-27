const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Expr = new Schema({
    expr_description: {
        type: String
    },
    expr_responsible: {
        type: String
    },
    expr_priority: {
        type: String
    },
    expr_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Expr', Expr);
