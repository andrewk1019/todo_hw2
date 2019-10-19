import React, { Component } from 'react'
import ListItemCard from './ListItemCard'

export class ListItemsTable extends Component {
    state = {
        items: this.props.todoList.items,
        task: "regular",
        due_date: "regular",
        completed: "regular",
      }
    sortTask(){
        if(this.state.task === "regular"){
            this.props.todoList.items.sort(function(a, b){
                    if(a.description < b.description) { return -1; }
                    else if(a.description > b.description) { return 1; }
                    return 0;
            })
            this.setState({
                task: "reverse"
            })
        }
        else{
            this.props.todoList.items.sort(function(a, b){
                if(a.description < b.description) { return 1; }
                else if(a.description > b.description) { return -1; }
                return 0;
            })
            this.setState({
                task: "regular"
            })
        }
        var newList = this.props.todoList.items
        if(this.state.task === "regular"){
            for(var i = 0; i < newList.length; i++){
                newList[i].key = i;
            }
        }
        else if(this.state.task === "reverse"){
            for(var i = 0; i < newList.length; i++){
                newList[i].key = i;
            }
        }
        this.setState({
            items: newList
        })
    }

    sortDueDate(){
        if(this.state.due_date === "regular"){
            this.props.todoList.items.sort(function(a, b){
                    if(a.due_date < b.due_date) { return -1; }
                    if(a.due_date > b.due_date) { return 1; }
                    return 0;
            })
            this.setState({
                due_date: "reverse"
            })
        }
        else{
            this.props.todoList.items.sort(function(a, b){
                if(a.due_date < b.due_date) { return 1; }
                if(a.due_date > b.due_date) { return -1; }
                return 0;
            })
            this.setState({
                due_date: "regular"
            })

        }
        var newList = this.props.todoList.items
        if(this.state.task == "regular"){
            for(var i = 0; i < newList.length; i++){
                newList[i].key = i;
            }
        }
        else if(this.state.task == "reverse"){
            for(var i = 0; i < newList.length; i++){
                newList[i].key = i;
            }
        }
        this.setState({
            items: newList
        })
    }

    sortCompleted(){
        if(this.state.completed === "regular"){
            this.props.todoList.items.sort(function(a, b){
                    if(a.completed < b.completed) { return -1; }
                    if(a.completed > b.completed) { return 1; }
                    return 0;
            })
            this.setState({
                completed: "reverse"
            })
        }
        else{
            this.props.todoList.items.sort(function(a, b){
                if(a.completed < b.completed) { return 1; }
                if(a.completed > b.completed) { return -1; }
                return 0;
            })
            this.setState({
                completed: "regular"
            })

        }
        var newList = this.props.todoList.items
        if(this.state.task == "regular"){
            for(var i = 0; i < newList.length; i++){
                newList[i].key = i;
            }
        }
        else if(this.state.task == "reverse"){
            for(var i = 0; i < newList.length; i++){
                newList[i].key = i;
            }
        }
        this.setState({
            items: newList
        })
    }

    render() {
        return (
            <div id="list_items_container">
                <div className="list_item_header_card">
                    <div className="list_item_task_header"
                    onClick={this.sortTask.bind(this)}>Task</div>
                    <div className="list_item_due_date_header"
                    onClick={this.sortDueDate.bind(this)}>Due Date</div>
                    <div className="list_item_status_header"
                    onClick={this.sortCompleted.bind(this)}>Status</div>
                </div>
                {
                    this.props.todoList.items.map((todoItem)=>(
                        <ListItemCard 
                            key={todoItem.key}
                            listItem={todoItem} 
                            todoList={this.props.todoList}
                            moveItemUp={this.props.moveItemUp}
                            moveItemDown={this.props.moveItemDown}
                            deleteItem={this.props.deleteItem}
                            goEditScreen={this.props.goEditScreen}
                            goItemScreen={this.props.goItemScreen}
                            />
                    ))
                } 
                <div className="list_item_add_card">
                    <div className="list_item_add"
                        onClick={this.props.goItemScreen.bind(this)}>
                    </div>
                </div> 
            </div>
        )
    }
}

export default ListItemsTable
