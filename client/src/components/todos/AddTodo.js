import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component{
    state = {
        model: '',
        make: '',
        year: '',
        price: '',
        sellerName: '',
        description: ''
    }

    getDivStyle = () => {
        return {
            //background: '#e6f2ff',
            padding: '5px',
            textAlign: 'center',
            margin: 'auto',
            //borderBottom: '1px #ccc dotted',
        }
    }
    getFormStyle = () => {
        return {
            width: '100%',
            margin: '8px 0',
            boxSizing: 'border-box',
            display: 'inline-block'
            //display: 'flex'
        }
    }
    // we wanna pass this up to app.js
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.model, this.state.make, this.state.year, this.state.price, this.state.sellerName, this.state.description);
        this.setState({ model: '', make: '', year: '', price: '', sellerName: '', description: ''});
    }

    // allow us to type in input form (e gives us whatever we type in)
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div style={this.getDivStyle()}>
                <form onSubmit={this.onSubmit} style={this.getFormStyle()}>
                    <label>
                    <input 
                        type = "text" 
                        name="model" 
                        placeholder="Enter car model" 
                        style={{ flex: '10', padding: '5px'}}
                        value={this.state.model}
                        onChange={this.onChange}
                    />
                    </label>
                    <label>
                    <input 
                        type = "text"
                        name="make"
                        value={this.state.make}
                        placeholder="Enter car make" 
                        style={{ flex: '10', padding: '5px'}}
                        onChange={this.onChange}
                    />
                    </label>
                    <label>
                    <input 
                        type = "text"
                        name="year"
                        value={this.state.year}
                        placeholder="Enter car model year"
                        style={{ flex: '10', padding: '5px'}}
                        onChange={this.onChange}
                    />
                    </label>
                    <label>
                    <input 
                        type = "text"
                        name="price"
                        value={this.state.price}
                        placeholder="Enter car price"
                        style={{ flex: '10', padding: '5px'}}
                        onChange={this.onChange}
                    />
                    </label>
                    <label>
                    <input 
                        type = "text"
                        name="sellerName"
                        value={this.state.sellerName}
                        placeholder="Enter seller name"
                        style={{ flex: '10', padding: '5px'}}
                        onChange={this.onChange}
                    />
                    </label>
                    <label>
                    <input 
                        type = "text"
                        name="description"
                        value={this.state.description}
                        placeholder="Enter description"
                        style={{ flex: '10', padding: '5px'}}
                        onChange={this.onChange}
                    />
                    </label>
                    <label>
                    <input 
                        type="submit"
                        value="Add Listing"
                        className="btn"
                        style={{flex: '1'}}
                    />
                    </label>
                </form>
            </div>
        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo;