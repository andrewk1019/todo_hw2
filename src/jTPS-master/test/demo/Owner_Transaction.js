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
export class Owner_Transaction extends jSTPS_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE

    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     */
    constructor(origOwner, newOwner, list) {
        super();
        this.origOwner = origOwner;
        this.newOwner = newOwner;
        this.list = list;
        // KEEP THESE FOR LATER
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction() {
        this.list.owner = this.newOwner;
    }

    updateList(){
        return this.list;
    }
    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction() {
        this.list.owner = this.origOwner;
    }

    redoTransaction() {
}
    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString() {
        return "Move " + this.amountToAdd;
    }
}
export default Owner_Transaction;