import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: '#e6f2ff',
            fontFamily: 'arial',
            width: '50%',
            margin: 'auto',
            letterSpacing: '1px',
            wordSpacing: '1px',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
            color: this.props.todo.completed ? '#696969' : '#333F42'
        }
    }

    render() {
        const { _id, completed, model, make, year, price, sellerName, description } = this.props.todo;
        var buttonName = completed ? 'SOLD' : 'SELL';

        return (
            <div style={this.getStyle()}>
                <p> 
                    {/*<input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}*/}
                    <button onClick={this.props.markComplete.bind(this, _id)} style={sellBtn}>{buttonName} </button> {'  '}
                    <b>{model} {make} {year}</b> || <i>{sellerName}</i> is selling for <b>{price}</b> ({description})
                    <button onClick={this.props.delTodo.bind(this, _id)} 
                            style={btnStyle}> x </button>
                </p>
            </div>
        )
    }
}

// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
  }

const sellBtn = {
    background: '#0066cc',
    color: '#f4f4f4',
    fontFamily: 'arial',
    letterSpacing: '1px'
}

const btnStyle = {
    background: '#003366',
    color: '#fff',
    border: 'none',
    padding: '2px 5px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem;