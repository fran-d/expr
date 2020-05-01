import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateExpr from "./components/create-expr.component";
import EditExpr from "./components/edit-expr.component";
import ExprList from "./components/expr-list.component";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Expiration Tracker</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">List All Items</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Add New Item</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={ExprList} />
          <Route path="/edit/:id" component={EditExpr} />
          <Route path="/create" component={CreateExpr} />
        </div>
      </Router>
    );
  }
}

export default App;
