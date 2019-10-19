/**
 * jTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jTPS framework.
 * 
 * @author McKilla Gorilla
 * @version 2.0
 */
class jSTPS_Unit_Tests {
    
    /**
     * This JUnit test is for testing the adding of transactions.
     */
    testAdd() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        var tps = new jSTPS();
        var assert = require('assert');
        var num = new Num();       
        assert.equals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        assert.equals(5, num.getNum());
        assert.equals(1, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(1, tps.getUndoSize());
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        assert.equals(15, num.getNum());
        assert.equals(2, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(2, tps.getUndoSize());
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equals(35, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
    }
    
    /**
     * 
     */
    testAndMask() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jSTPS();
        num = new Num();
        assert = require('assert');
        assert.equals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        assert.equals(4, num.getNum());
        assert.equals(2, tps.getSize());
        
        tps.undoTransaction();
        assert.equals(12, num.getNum());
        assert.equals(2, tps.getSize());
        assert.equals(1, tps.getRedoSize());
        assert.equals(1, tps.getUndoSize());

    }
    
    testOrMask() {
        
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    testUndo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jSTPS();
        num = new Num();
        var assert = require('assert');
        assert.equals(num.getNum(), 0);
        assert.equals(!tps.hasTransactionToUndo());
        assert.equals(!tps.hasTransactionToRedo());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(!tps.hasTransactionToRedo());
        assert.equals(35, num.getNum());
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(tps.hasTransactionToRedo());
        assert.equals(15, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(1, tps.getRedoSize());
        assert.equals(2, tps.getUndoSize());
        
        // UNDO ANOTHER
        tps.undoTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(tps.hasTransactionToRedo());
        assert.equals(5, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(2, tps.getRedoSize());
        assert.equals(1, tps.getUndoSize());
        
        // AND ANOTHER
        tps.undoTransaction();
        assert.equals(!tps.hasTransactionToUndo());
        assert.equals(tps.hasTransactionToRedo());
        assert.equals(0, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(3, tps.getRedoSize());
        assert.equals(0, tps.getUndoSize());
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(tps.hasTransactionToRedo());
        assert.equals(0, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(3, tps.getRedoSize());
        assert.equals(0, tps.getUndoSize());
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    testRedo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jSTPS();
        num = new Num();
        var assert = require('assert');
        assert.equals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(tps.hasTransactionToRedo());
        assert.equals(35, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(!tps.hasTransactionToRedo());
        assert.equals(35, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(!tps.hasTransactionToRedo());
        assert.equals(35, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(!tps.hasTransactionToRedo());
        assert.equals(35, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(tps.hasTransactionToRedo());
        assert.equals(15, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(1, tps.getRedoSize());
        assert.equals(2, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        assert.equals(tps.hasTransactionToUndo());
        assert.equals(!tps.hasTransactionToRedo());
        assert.equals(35, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    testClear() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        tps = new jSTPS();
        num = new Num();
        assert.equals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equals(35, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        assert.equals(35, num.getNum());
        assert.equals(0, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equals(70, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        assert.equals(70, num.getNum());
        assert.equals(0, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        assert.equals(105, num.getNum());
        assert.equals(3, tps.getSize());
        assert.equals(0, tps.getRedoSize());
        assert.equals(3, tps.getUndoSize());
    }
}