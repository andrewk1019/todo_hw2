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
export class Delete_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     */
    constructor(currentList, key,initItem) {
        // KEEP THESE FOR LATER
        this.item = initItem;
        this.key = key;
        this.list = currentList;
        this.state = true;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.list.items = this.list.items.filter(item => item.key !== this.key)
        for(var i = this.key; i < this.list.items.length; i++){
            this.list.items[i].key--;
          }
    }

    updateList(){
        return this.list;
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.list.items.splice(this.item.key, 0, this.item)
        for(var i = this.key+1; i < this.list.items.length; i++){
            this.list.items[i].key++;
        }
        return this.list;
    }

    redoTransaction() {
        this.list.items = this.list.items.filter(item => item.key !== this.key)
        for(var i = this.key; i < this.list.items.length; i++){
            this.list.items[i].key--;
          }
        return this.list;
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Delete " + this.initItem;
    }
}
export default Delete_Transaction;