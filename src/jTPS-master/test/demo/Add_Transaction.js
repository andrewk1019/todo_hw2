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
export class Edit_Transaction extends jSTPS_Transaction{
    // THIS IS THE OBJECT IT WILL MANIPULATE

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     */
    constructor(desc, assigned, due_date, completed, list) {
        super();
        // KEEP THESE FOR LATER
        this.desc = desc;
        this.assigned_to = assigned;
        this.due_date = due_date;
        this.completed = completed;
        this.list = list;
        this.item = null;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.list.items[this.list.items.length] = {"key":
        this.list.items.length, "description": this.desc, "assigned_to": this.assigned_to
        , "due_date": this.due_date, "completed": this.completed}
        this.item = this.list.items[this.list.items.length - 1];
    }

    updateList(){
        return this.list;
    }
    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.list.items.pop();
        return this.list;
    }

    redoTransaction() {
        this.list.items.push(this.item);
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