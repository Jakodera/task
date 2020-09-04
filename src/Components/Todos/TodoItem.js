import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stack, IconButton } from '@fluentui/react';  

export class TodoItem extends Component {

    getStyle = () => {
        return {
          background: "#f4f4f4",
          padding: "10px",
          borderBottom: "1px #ccc dotted",
          textDecoration: this.props.todo.completed ? "line-through" : "none",
        };
      };

    render() {
        const {id, title, completed} = this.props.todo;
        return (
        <Stack>
            <div style= {this.getStyle()}>
                <p>
            <Stack style={{ width: 500 }}>
            <Stack horizontal horizontalAlign="space-between">
                <input
                 type="checkbox"
                 defaultChecked={completed}
                 onChange={this.props.markComplete.bind(this, id)}
                />{" "}
                    {title}
                <IconButton iconProps={{ iconName: 'trash' }} className="clearButton" onClick={this.props.delTodo.bind(this, id)} /> 
                </Stack>
                </Stack>
                </p>
            </div>
            </Stack>
        )
    }
}

//PropTypes

TodoItem.propTypes = {
    todo : PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
};
export default TodoItem
