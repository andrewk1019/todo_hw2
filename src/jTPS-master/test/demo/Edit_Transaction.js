import jSTPS_Transaction from '../jtps/jSTPS_Transaction.js'
/**
 * AddToNum_Transaction.java
 * 
 * This class is a transaction that can be executed and undone. It
 * can be stored in the jTPS transaction stack and must be constructed
 * with all the data necessary to perform both do and undo.
 * 
 * @author THE McKilla Gorilla (accept no imposters)
 * @version 2.0
 */
export class Edit_Transaction extends jSTPS_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     */
    constructor(initItem, key, list, desc, assigned_to, due_date, completed) {
        super();
        // KEEP THESE FOR LATER
        this.desc = initItem.description;
        this.assigned_to = initItem.assigned_to;
        this.due_date = initItem.due_date;
        this.completed = initItem.completed;
        this.newDesc = desc;
        this.newAssigned = assigned_to;
        this.newDueDate = due_date;
        this.newCompleted = completed;
        this.key = key;
        this.list = list;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.list.items[this.key] = {"key":
        this.key, "description": this.newDesc, "assigned_to": this.newAssigned
        , "due_date": this.newDueDate, "completed": this.newCompleted}
    }

    updateList(){
        return this.list;
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.list.items[this.key] = {"key":
        this.key, "description": this.desc, "assigned_to": this.assigned_to
        , "due_date": this.due_date, "completed": this.completed}
        return this.list;
    }

    redoTransaction() {
        this.list.items[this.key] = {"key":
        this.key, "description": this.newDesc, "assigned_to": this.newAssigned
        , "due_date": this.newDueDate, "completed": this.newCompleted}
        return this.list;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Edit " + this.initItem;
    }
}
export default Edit_Transaction;