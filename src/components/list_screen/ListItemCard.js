import React, { Component } from 'react'

export class ListItemCard extends Component {
    state = {
        todoList: this.props.todoList
    }
    is_completed(){
        if (this.props.listItem.completed) {
            return "Completed";
        }
    }
    is_not_completed(){
        if (!this.props.listItem.completed) {
            return "Pending";
        }
    }
    changeUpBackground(){
        if(this.props.listItem.key == 0) {
            return {backgroundColor: "#E6E6E6"};
        }
    }

    changeDownBackground(){
        if(this.props.listItem.key == this.props.todoList.items.length - 1) {
            return {backgroundColor: "#E6E6E6"};
        }
    }

    render() {
        return (
            <div className='list_item_card'
                onClick={this.props.goEditScreen.bind(this, this.props.listItem)}>
                <div className='list_item_card_description'>
                    {this.props.listItem.description}
                </div>
                <div className='list_item_card_assigned_to'>
                    Assigned To: <strong>{this.props.listItem.assigned_to}</strong>
                </div>
                <div className='list_item_card_due_date'>
                    {this.props.listItem.due_date}
                </div>
                <div className='list_item_card_completed'>
                    {this.is_completed()}
                </div>
                <div className='list_item_card_not_completed'>
                    {this.is_not_completed()}
                </div>
                <div className= 'delete_item'
                onClick={this.props.deleteItem.bind(this, this.props.listItem.key)}
                >&#10005;</div>
                <div className= 'move_item_up'
                    style = {this.changeUpBackground()}
                    onClick={this.props.moveItemUp.bind(this, this.props.listItem.key)}>
                </div>
                <div className= "move_item_down"
                    style = {this.changeDownBackground()}
                    onClick={this.props.moveItemDown.bind(this, this.props.listItem.key)}>
                </div>
            </div>
        )
    }
}

export default ListItemCard
