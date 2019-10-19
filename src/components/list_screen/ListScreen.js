import React, { Component } from 'react'
import ListHeading from './ListHeading'
import ListItemsTable from './ListItemsTable'
import ListTrash from './ListTrash'
import PropTypes from 'prop-types';
import { throwStatement } from '@babel/types';

export class ListScreen extends Component {
    state={
        show: 'modal',
        originalName: null
    }
    getListName() {
        if (this.props.todoList) {
            let name = this.props.todoList.name;
            return this.props.todoList.name;
        }
        else
            return "";
    }
    getListOwner() {
        if (this.props.todoList) {
            let owner = this.props.todoList.owner;
            return this.props.todoList.owner;
        }
    }
    openModal(event){
        this.setState({
            show: event.target.value
        })
    }

    invisDialog(event){
        this.setState({
            show: "modal"
        })
    }
    
    render() {
        const isVisible = this.state.show ? 'modal' : 'modal is_visible';
        return (
            <div id="todo_list"
            onKeyDown={document.addEventListener("keydown", this.props.printEvent.bind(this))}>
                <ListHeading goHome={this.props.goHome.bind(this)} />
                <ListTrash openModal={this.openModal.bind(this)}/>
                <div id="list_details_container">
                    <div id="list_details_name_container" className="text_toolbar">
                        <span id="list_name_prompt">Name:</span>
                        <input
                            value={this.getListName()} 
                            type="text" 
                            id="list_name_textfield"
                            onChange={this.props.setName.bind(this)}
                            onClick={window.addEventListener("click",this.props.changeName.bind(this))}/>
                    </div>
                    <div id="list_details_owner_container" className="text_toolbar">
                        <span id="list_owner_prompt">Owner:</span>
                        <input id = "owner_input"
                            value={this.getListOwner()}
                            type="text" 
                            id="list_owner_textfield"
                            onChange={this.props.setOwner.bind(this)}
                            onFocus={window.addEventListener("click",this.props.changeOwner.bind(this))}/>
                    </div>
                </div>
                <ListItemsTable todoList={this.props.todoList}
                                moveItemUp={this.props.moveItemUp}
                                moveItemDown={this.props.moveItemDown} 
                                deleteItem={this.props.deleteItem}
                                goItemScreen={this.props.goItemScreen}
                                goEditScreen={this.props.goEditScreen}
                                />
                <div className={isVisible} id="modal_yes_no_dialog" data-animation="slideInOutLeft">
                    <div className="modal_dialog">  
                        <header className="dialog_header">
                            Delete List?
                        </header>
                        <section className="dialog_content">
                            <p><strong>Are you sure you want to delete this list?</strong></p>
                        </section>
                            <button id="dialog_yes_button"
                            onClick={this.props.deleteList.bind(this, this.props.todoList.key)}>Yes</button>
                            <button id="dialog_no_button"
                            onClick={this.invisDialog.bind(this)}>No</button>
                        <footer className="dialog_footer">
                            The list will not be retreivable.
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListScreen
