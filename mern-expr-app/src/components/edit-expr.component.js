import React, { Component } from 'react';
import axios from 'axios';
import { properties } from './properties.js';


export default class EditExpr extends Component {

    constructor(props) {
        super(props);

        this.onChangeExprDescription = this.onChangeExprDescription.bind(this);
        this.onChangeExprResponsible = this.onChangeExprResponsible.bind(this);
        this.onChangeExprPriority = this.onChangeExprPriority.bind(this);
        this.onChangeExprCompleted = this.onChangeExprCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            expr_description: '',
            expr_responsible: '',
            expr_priority: '',
            expr_completed: false
        }
    }

    componentDidMount() {
        axios.get(`http://${properties.serverHost}:${properties.serverPort}/expr/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    expr_description: response.data.expr_description,
                    expr_responsible: response.data.expr_responsible,
                    expr_priority: response.data.expr_priority,
                    expr_completed: response.data.expr_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeExprDescription(e) {
        this.setState({
            expr_description: e.target.value
        });
    }

    onChangeExprResponsible(e) {
        this.setState({
            expr_responsible: e.target.value
        });
    }

    onChangeExprPriority(e) {
        this.setState({
            expr_priority: e.target.value
        });
    }

    onChangeExprCompleted(e) {
        this.setState({
            expr_completed: !this.state.expr_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            expr_description: this.state.expr_description,
            expr_responsible: this.state.expr_responsible,
            expr_priority: this.state.expr_priority,
            expr_completed: this.state.expr_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/expr/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Expr</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.expr_description}
                                onChange={this.onChangeExprDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.expr_responsible}
                                onChange={this.onChangeExprResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.expr_priority==='Low'} 
                                    onChange={this.onChangeExprPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.expr_priority==='Medium'} 
                                    onChange={this.onChangeExprPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.expr_priority==='High'} 
                                    onChange={this.onChangeExprPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeExprCompleted}
                                checked={this.state.expr_completed}
                                value={this.state.expr_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Expr" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}