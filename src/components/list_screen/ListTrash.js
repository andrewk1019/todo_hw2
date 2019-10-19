import React, { Component } from 'react'

export class ListTrash extends Component {
    render() {
        return (
            <div id="list_trash"
             //onClick={this.props.goHome}
             onClick={this.props.openModal}
            >&#128465;
            </div> //trash can icon
        )
    }
}

export default ListTrash
