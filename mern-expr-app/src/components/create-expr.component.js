import React, { Component } from 'react';
import axios from 'axios';

export default class CreateExpr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expr_description: '',
            expr_responsible: '',
            expr_priority: '',
            expr_completed: false
        }
        this.onChangeExprDescription = this.onChangeExprDescription.bind(this);
        this.onChangeExprResponsible = this.onChangeExprResponsible.bind(this);
        this.onChangeExprPriority = this.onChangeExprPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Expr Description: ${this.state.expr_description}`);
        console.log(`Expr Responsible: ${this.state.expr_responsible}`);
        console.log(`Expr Priority: ${this.state.expr_priority}`);
        
         const newExpr = {
            expr_description: this.state.expr_description,
            expr_responsible: this.state.expr_responsible,
            expr_priority: this.state.expr_priority,
            expr_completed: this.state.expr_completed
        };

        axios.post('http://localhost:4000/expr/add', newExpr)
            .then(res => console.log(res.data));

        this.setState({
            expr_description: '',
            expr_responsible: '',
            expr_priority: '',
            expr_completed: false
        })
    }
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Expr</h3>
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

                    <div className="form-group">
                        <input type="submit" value="Create Expr" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
