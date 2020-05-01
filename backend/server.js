const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const exprRoutes = express.Router();
const configParams = require('./config.json');
const PORT = configParams.serverPort;

let Expr = require('./expr.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(`mongodb://${configParams.mongoHost}:${configParams.mongoPort}/expr`, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

exprRoutes.route('/').get(function(req, res) {
    Expr.find(function(err, expr) {
        if (err) {
            console.log(err);
        } else {
            res.json(expr);
        }
    });
});

exprRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Expr.findById(id, function(err, expr) {
        res.json(expr);
    });
});

exprRoutes.route('/update/:id').post(function(req, res) {
    Expr.findById(req.params.id, function(err, expr) {
        if (!expr)
            res.status(404).send("data is not found");
        else
            expr.expr_description = req.body.expr_description;
            expr.expr_responsible = req.body.expr_responsible;
            expr.expr_priority = req.body.expr_priority;
            expr.expr_completed = req.body.expr_completed;

            expr.save().then(expr => {
                res.json('Expr updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

exprRoutes.route('/add').post(function(req, res) {
    let expr = new Expr(req.body);
    expr.save()
        .then(expr => {
            res.status(200).json({'expr': 'expr added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new expr failed');
        });
});

app.use('/expr', exprRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});