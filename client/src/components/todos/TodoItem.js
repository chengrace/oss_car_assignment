import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
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
                    {model} {make} {year} {price} {sellerName} {description} 
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
    background: '#333F42',
    color: '#f4f4f4',
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '2px 5px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default TodoItem;