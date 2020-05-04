import React, { Component } from 'react';
import axios from 'axios';
import { properties } from './properties.js';

import DatePicker from "react-datepicker";

import ReactModal from 'react-modal';

 
import "react-datepicker/dist/react-datepicker.css";


export default class CreateExpr extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expr_description: '',
            expr_responsible: new Date(),
            expr_priority: '',
            expr_completed: false,
            startDate: new Date(),
            showModal: false
        }
        this.onChangeExprDescription = this.onChangeExprDescription.bind(this);
        this.onChangeExprResponsible = this.onChangeExprResponsible.bind(this);
        this.onChangeExprPriority = this.onChangeExprPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

        handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
        this.props.history.push('/');
      }
    handleChange = date => {
        console.log(date);
        this.setState({
          startDate: date,
          expr_responsible: date
        });
      };

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
            expr_responsible: this.state.startDate.toLocaleDateString(),
            expr_priority: this.state.expr_priority,
            expr_completed: this.state.expr_completed
        };

        axios.post(`http://${properties.serverHost}:${properties.serverPort}/expr/add`, newExpr)
            .then(this.handleOpenModal);

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
                <h3>Add New Item</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Item Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.expr_description}
                                onChange={this.onChangeExprDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Expiration Date: </label>
                        <br/>
                        <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        className="form-control"
                    />
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Create Entry" className="btn btn-primary" />
                    </div>
                </form>
                <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
        <h3>Item Added!</h3>
          <button onClick={this.handleCloseModal} className="btn btn-primary">OK, SWEET!</button>
        </ReactModal>
            </div>
            
        )
    }
}
