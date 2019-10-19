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
export class MoveDown_Transaction extends jSTPS_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     */
    constructor(currentList, initItem, secondItem) {
        // KEEP THESE FOR LATER
        super();
        this.item = initItem;
        this.second = secondItem;
        this.key = initItem.key;
        this.list = currentList;
        this.state = true;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        var key1 = this.key + 1;
        var item = this.list.items[this.key];
        var item1 = this.list.items[key1];
        this.list.items[this.key] = item1;
        this.list.items[key1] = item;
        this.list.items[this.key].key = this.key;
        this.list.items[key1].key = key1;
    }

    updateList(){
        return this.list;
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        var key1 = this.key + 1;
        var item = this.list.items[this.key];
        var item1 = this.list.items[key1];
        this.list.items[this.key] = item1;
        this.list.items[key1] = item;
        this.list.items[this.key].key = this.key;
        this.list.items[key1].key = key1;
        return this.list;
    }

    redoTransaction() {
        var key1 = this.key + 1;
        var item = this.list.items[this.key];
        var item1 = this.list.items[key1];
        this.list.items[this.key] = item1;
        this.list.items[key1] = item;
        this.list.items[this.key].key = this.key;
        this.list.items[key1].key = key1;
        return this.list;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Move " + this.initItem;
    }
}
export default MoveDown_Transaction;