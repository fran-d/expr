import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { properties } from './properties.js';


const Expr = props => (
    <tr>
        <td><Link to={"/edit/"+props.expr._id}>{props.expr.expr_description}</Link></td>
        <td>{props.expr.expr_responsible}</td>

    </tr>
)

export default class ExprList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {expr: []};
    }

    componentDidMount() {
        axios.get(`http://${properties.serverHost}:${properties.serverPort}/expr/`)
            .then(response => {
                this.setState({ expr: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    exprList() {
        return this.state.expr.map(function(currentExpr, i){
            return <Expr expr={currentExpr} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>All Items</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exprList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
