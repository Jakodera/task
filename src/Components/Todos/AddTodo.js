import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stack, PrimaryButton } from '@fluentui/react'; 

export class AddTodo extends Component {
  state = {
    title: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Stack horizontal > 
      <Stack.Item grow> 
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input 
          type="text" 
          name="title" 
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add Todo ..." 
          value={this.state.title}
          onChange={this.onChange}
        />
      <PrimaryButton onClick={this.onSubmit} >Add</PrimaryButton> 
      </form>
      </Stack.Item>
      </Stack>
    )
  }
}

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default AddTodo