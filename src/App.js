import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json'
import HomeScreen from './components/home_screen/HomeScreen'
import ItemScreen from './components/item_screen/ItemScreen'
import ListScreen from './components/list_screen/ListScreen'
import MoveUp_Transaction from './jTPS-master/test/demo/MoveUp_Transaction'
import MoveDown_Transaction from './jTPS-master/test/demo/MoveDown_Transaction'
import Delete_Transaction from './jTPS-master/test/demo/Delete_Transaction'
import Edit_Transaction from './jTPS-master/test/demo/Edit_Transaction.js';
import Add_Transaction from './jTPS-master/test/demo/Add_Transaction.js'
import Name_Transaction from './jTPS-master/test/demo/Name_Transaction.js'
import Owner_Transaction from './jTPS-master/test/demo/Owner_Transaction.js'
import jSTPS from './jTPS-master/test/jtps/jSTPS.js'

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
}


class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null,
    items: null,
    item: null,
    redoStack: [],
    show: true,
    transaction: null,
    originalName: null,
    originalOwner: null,
    previousName: null,
    currentElement: null,
    currentOwner: null,
  }
 
  stack = new jSTPS();
  


  goHome = (event) => {
    this.stack.clearAllTransactions();
    this.state.currentList.name = this.state.originalName;
    this.state.currentList.owner = this.state.originalOwner;
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({currentList: null});
  }
  setName(event){
    this.setState({
        value: event.target.value
      });
    this.state.currentList.name = event.target.value;
}

changeName(event){
    if(this.state.currentScreen != AppScreen.HOME_SCREEN && this.state.currentElement !== null && document.activeElement.id != "list_name_textfield"){
      this.state.transaction = new Name_Transaction(this.state.previousName, this.state.currentList.name, this.state.currentList);
      this.stack.addTransaction(this.state.transaction);
      var list = this.state.transaction.updateList();
      this.setState({
        currentList: list,
        originalName: list.name,
        previousName: list.name
      })
      this.state.currentElement = null;
    }
    else if(document.activeElement.id == "list_name_textfield" && this.state.currentElement == null){
      this.setState({currentElement: document.activeElement.id});
    }
}
changeOwner(event){
  event.stopImmediatePropagation();
  if(this.state.currentScreen != AppScreen.HOME_SCREEN && this.state.currentOwner != null && document.activeElement != "list_owner_textfield"){
    this.state.transaction = new Owner_Transaction(this.state.previousOwner, this.state.currentList.owner, this.state.currentList);
    this.stack.addTransaction(this.state.transaction);
    var list = this.state.transaction.updateList();
    this.setState({
      currentList: list,
      originalOwner: list.owner,
      previousOwner: list.owner
    })
    this.state.currentOwner = null;
  }
  else if(document.activeElement.id == "list_owner_textfield"){
    this.state.currentOwner = document.activeElement.id;
  }
}
setOwner(event){
    this.setState({
        value: event.target.value
      });
    this.state.currentList.owner = event.target.value;
}

  deleteList = (key) =>{
        this.setState({
      stack: [],
      redoStack: []
    })
    this.setState({currentScreen: AppScreen.HOME_SCREEN});
    this.setState({todoLists: [...this.state.todoLists.filter(item => item.key !== key)]
    });
    for(var i = key+1; i < this.state.todoLists.length; i++){
      this.state.todoLists[i].key--;
      this.state.todoLists[i - 1] = this.state.todoLists[i];
    }
    this.state.todoLists.pop();
}

  loadList = (todoListToLoad) => {
    this.setState({currentScreen: AppScreen.LIST_SCREEN});
    this.setState({currentList: todoListToLoad});
    this.setState({items: todoListToLoad.items})
    this.state.currentList = todoListToLoad;
    this.state.originalName = todoListToLoad.name;
    this.state.previousName = todoListToLoad.name;
    this.state.originalOwner = todoListToLoad.owner;
    this.state.previousOwner = todoListToLoad.owner;
    console.log("currentList: " + this.state.currentList);
    console.log("currentScreen: " + this.state.currentScreen);
    if(todoListToLoad.key == 0){
      return;
    }
    this.setState({
      name: todoListToLoad.name
    })
    var newList = [];
    for(var i = 0; i < this.state.todoLists.length; i++){
      if(this.state.todoLists[i].key < todoListToLoad.key){
        this.state.todoLists[i].key++;
      }
    }
    todoListToLoad.key = 0;
    for(var i = 0; i < this.state.todoLists.length; i++){
      newList[this.state.todoLists[i].key] = this.state.todoLists[i];
    }
    this.setState({
      todoLists: newList
    })
  }

  newList = () =>{
     var newList = [];
     var len = this.state.todoLists.length;
     this.state.todoLists.push({"key": len, "name": "Unknown","owner": "Unknown","items": []});
     this.setState({
       currentList: this.state.todoLists[len],
       currentScreen: AppScreen.LIST_SCREEN
     })
    for(var i = 0; i < this.state.todoLists.length - 1; i++){
      this.state.todoLists[i].key = i+1;
    }
    this.state.todoLists[this.state.todoLists.length - 1].key = 0;
    for(var i = 0; i < this.state.todoLists.length; i++){
      newList[this.state.todoLists[i].key] = this.state.todoLists[i];
    }
    this.setState({
      todoLists: newList
    })

    this.state.previousName = newList[0].name;
    this.state.originalName = newList[0].name;
    this.state.originalOwner = newList[0].owner;
  }

  moveItemUp=(key, event)=>{
    event.stopPropagation();
    if(key == 0){
      return;
    }
    else{
        this.state.transaction = new MoveUp_Transaction(this.state.currentList,this.state.currentList.items[key], this.state.currentList.items[key-1]);
        this.stack.addTransaction(this.state.transaction);
        var list = this.state.transaction.updateList();
        this.setState({
          currentList: list,
        })
    }
}

moveItemDown=(key, event)=>{
  event.stopPropagation();
  if(key == this.state.currentList.items.length - 1){
    return
  }
  else{
    this.state.transaction = new MoveDown_Transaction(this.state.currentList, this.state.currentList.items[key], this.state.currentList.items[key+1])
    this.stack.addTransaction(this.state.transaction);
    var list = this.state.transaction.updateList();
    this.setState({
      currentList: list
    })
  }
}
deleteItem = (key, event) =>{
  event.stopPropagation();
  this.state.transaction = new Delete_Transaction(this.state.currentList, key, this.state.currentList.items[key]);
  this.stack.addTransaction(this.state.transaction);
  var list = this.state.transaction.updateList();
  this.setState({
    currentList: list,
    items: list.items
  })
}

goItemScreen(){
  this.setState({currentScreen: AppScreen.ITEM_SCREEN
  , item: null
  , show: true});
}

closeItemScreen(){
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
  document.removeEventListener("keydown", this.printEvent.bind(this))
}

submitItem(desc, assigned, due_date, completed){
  this.state.transaction = new Add_Transaction(desc, assigned, due_date, completed, this.state.currentList)
  this.stack.addTransaction(this.state.transaction);
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}

submitEditItem(desc, assigned, due_date, completed,key){
  if(key == null){
    return;
  }
  this.state.transaction = new Edit_Transaction(this.state.currentList.items[key], key, this.state.currentList, desc, assigned, due_date, completed);
  this.stack.addTransaction(this.state.transaction)
  var list = this.state.transaction.updateList();
  this.setState({
    currentList: list
  });
  this.setState({currentScreen: AppScreen.LIST_SCREEN});
}
goEditScreen(item){
  this.setState({currentScreen: AppScreen.ITEM_SCREEN,
                item: item
                ,show: false});
}

printEvent(event){
    event.stopImmediatePropagation();
    if(this.state.currentScreen === AppScreen.LIST_SCREEN){
      if (event.keyCode == 90 && event.ctrlKey && this.state.transaction != null){
        var transaction = this.state.transaction;
        this.stack.undoTransaction();
        var list = transaction.updateList();
        this.setState({
          currentList: list,
          originalName: list.name,
          originalOwner: list.owner,
          previousName: list.name,
          previousOwner: list.owner
        })
      }
        else if(event.keyCode == 89 && event.ctrlKey && this.state.transaction != null){
          var transaction = this.state.transaction;
          this.stack.doTransaction();
          var list = transaction.updateList();
          this.setState({
              currentList: list,
              originalName: list.name,
              originalOwner: list.owner,
              previousName: list.name,
              previousOwner: list.owner
          })

        }
      }
}


  render() {
    console.log(this.state.stack)
    switch(this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return <HomeScreen 
        loadList={this.loadList.bind(this)} 
        todoLists={this.state.todoLists} 
        newList={this.newList}/>;
      case AppScreen.LIST_SCREEN:            
        return <ListScreen
          printEvent={this.printEvent.bind(this)}
          goHome={this.goHome.bind(this)}
          setName={this.setName.bind(this)}
          changeName={this.changeName.bind(this)}
          changeOwner={this.changeOwner.bind(this)}
          setOwner={this.setOwner.bind(this)}
          todoList={this.state.currentList}
          currentScreen={this.state.currentScreen}
          deleteList= {this.deleteList}
          moveItemUp={this.moveItemUp} 
          moveItemDown={this.moveItemDown}
          deleteItem={this.deleteItem}
          items={this.state.items}
          goItemScreen={this.goItemScreen.bind(this)}
          goEditScreen={this.goEditScreen.bind(this)}
          currentScreen={this.state.currentScreen}
          originalName={this.state.originalName}/>;
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen
        closeItemScreen={this.closeItemScreen.bind(this)}
        submitItem={this.submitItem.bind(this)}
        item={this.state.item}
        show={this.state.show}
        currentScreen={this.state.currentScreen}
        submitEditItem={this.submitEditItem.bind(this)}
        />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;