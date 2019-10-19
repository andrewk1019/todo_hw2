import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItemCard from '../list_screen/ListItemCard';

export class ItemScreen extends Component {
    state={
        key: this.props.item ? this.props.item.key : null,
        description: this.props.item ? this.props.item.description : "",
        assigned_to: this.props.item ? this.props.item.assigned_to : "",
        due_date: this.props.item ? this.props.item.due_date : "",
        completed: this.props.item && this.props.item.completed ? true : false,
        show: this.props.show,
    }
    onChangeDesc(event){
        this.setState({
            description: event.target.value
        })
    }

    onChangeAssigned(event){
        this.setState({
            assigned_to: event.target.value
        })
    }
    
    onChangeDueDate(event){
        this.setState({
            due_date: event.target.value
        })
    }

    onChangeCompleted(event){
        this.setState({
            completed: event.target.checked
        })
    }

    render() {
        return (
            <div id="todo_item">
                <div id= "item_form_container">
                    <span id="list_dialog"><strong>Item</strong></span>
                    <span id="item_description_prompt"><strong>Description: </strong></span>
                    <input type="text" id="item_description_textfield" defaultValue={this.state.description}
                    onChange={this.onChangeDesc.bind(this)}/>
                    <span id="item_assigned_to_prompt"><strong>Assigned To: </strong></span>
                    <input type="text" id="item_assigned_to_textfield" defaultValue={this.state.assigned_to}
                    onChange={this.onChangeAssigned.bind(this)}/>
                    <span id="item_due_date_prompt"><strong>Due Date: </strong></span>
                    <input type="date" id="item_due_date_picker" defaultValue={this.state.due_date}
                    onChange={this.onChangeDueDate.bind(this)}/>
                    <span id="item_completed_prompt"><strong>Completed: </strong></span>
                    <input type="checkbox" id="item_completed_checkbox"defaultChecked={this.state.completed}
                    onChange={this.onChangeCompleted.bind(this)}/>
                    <button id = "item_form_submit_button"
                    style={{visibility: this.state.show ? "visibility" : "hidden"}}
                    onClick={this.props.submitItem.bind(this, this.state.description, this.state.assigned_to, this.state.due_date, this.state.completed)}><strong>Submit</strong></button>
                    <button id = "item_form_edit_submit_button"
                    style= {{visibility: this.state.show ? "hidden" : "visibility"}}
                    onClick={this.props.submitEditItem.bind(this, this.state.description, this.state.assigned_to, this.state.due_date, this.state.completed, this.state.key)}>
                    <strong>Submit</strong>
                    </button>
                    <button id = "item_form_cancel_button"
                    onClick={this.props.closeItemScreen.bind(this)}><strong>Cancel</strong></button>
                </div>
            </div>
        )
    }
}

ItemScreen.propTypes = {
    currentScreen: PropTypes.string.isRequired,
    todoItem: PropTypes.object.isRequired
}

export default ItemScreen
