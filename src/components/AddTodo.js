import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class AddTodo extends Component {
    state={
        title: ''
    }

    Chng = (e) => this.setState({ [e.target.name]: e.target.value });

    Sbmt = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }

    render() {
        return (
            <form onSubmit={this.Sbmt} style={{display:'flex'}}>
                <input 
                type="text"
                name="title"
                style={{flex:'10'}}
                placeholder="Add todo..."
                value={this.state.title}
                onChange={this.Chng}
                autoComplete="off"
                />
                <input 
                type="Submit"
                value="Submit"
                className="btn"
                style={{flex:'1'}}
                />
            </form>
        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo
