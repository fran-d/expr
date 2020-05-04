import React, { Component } from 'react';
import axios from 'axios';
import { properties } from './properties.js';
import DatePicker from "react-datepicker";

import ReactModal from 'react-modal';


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
            expr_completed: false,
            startDate: new Date(),
            showModal: false
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    componentDidMount() {
        axios.get(`http://${properties.serverHost}:${properties.serverPort}/expr/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    expr_description: response.data.expr_description,
                    expr_responsible: response.data.expr_responsible,
                    expr_priority: response.data.expr_priority,
                    expr_completed: response.data.expr_completed,
                    startDate: new Date(response.data.expr_responsible)
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onChangeExprCompleted(e) {
        this.setState({
            expr_completed: !this.state.expr_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            expr_description: this.state.expr_description,
            expr_responsible: this.state.startDate.toLocaleDateString(),
            expr_priority: this.state.expr_priority,
            expr_completed: this.state.expr_completed
        };
        console.log(obj);
        axios.post('http://'+properties.serverHost+':'+properties.serverPort+'/expr/update/'+this.props.match.params.id, obj)
            .then(this.handleOpenModal);
        
       // this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Item</h3>
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
                   

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Item" className="btn btn-primary" />
                    </div>
                </form>

                <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
        >
        <h3>Item Updated!</h3>
          <button onClick={this.handleCloseModal} className="btn btn-primary">OK, SWEET!</button>
        </ReactModal>
            </div>
        )
    }
}