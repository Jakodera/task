// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Stack, PrimaryButton, TextField } from '@fluentui/react'; 
// // import Todos from './Todos';

// export class AddTodo extends Component {
//   state = {
//     title: '',
//     id: '',
//     time:new Date().toLocaleString(),
//   }

//   onSubmit = (e) => {
//     e.preventDefault();
//     this.props.addTodo(this.state.title,this.state.time);
//     this.setState({ title: '',time:new Date().toLocaleString() });
//   }

//   onChange = (e) => this.setState({ [e.target.name]: e.target.value });

//   render() {
//     return (
//       <Stack horizontal > 
//       <Stack.Item grow> 
//       <form onSubmit={this.onSubmit} style={{ display: 'flex'}}>
//         <TextField 
//           type="text" 
//           name="title" 
//           placeholder="Add Todo ..." 
//           value={this.state.title}
//           onChange={this.onChange}
//         />
//       <PrimaryButton onClick={this.onSubmit} >Add</PrimaryButton> 
//       </form>
//       </Stack.Item>
//       </Stack>
//     )
//   }
// }

// // PropTypes
// AddTodo.propTypes = {
//   addTodo: PropTypes.func.isRequired
// }

// export default AddTodo