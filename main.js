'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
// * each key is an array of Numbers: 
// * A is the far-left, 
// * B is the middle, 
// * C is the far-right stack
// * Each number represents the largest to smallest tokens: 
// * 4 is the largest, 
// * 1 is the smallest

// visualize 
// a: b: c: are towers
// a: starting point 
// 4 - 1 are discs 4 being the largest and 1 being the smallest
// large cannot stack on top of small

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
// prints out stacks a: 4, 3, 2, 1 b: c:
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
// move disc to new stack
const movePiece = (startStack, endStack) => {
  // (rl.q - startStack, endStack)move disc from stack

  // stacks[endStack].push(stacks[startStack].pop());

  // add disk to endStack.push() remove disc from startStack .pop() 
  let piece = stacks[startStack].pop()
  // pop the last elements of the starting array

  // and put it on the ending stack array
  stacks[endStack].push(piece)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  // make sure selection for a stack is a b or c

  // check to if the piece that is moving is bigger than the piece already in stack
  if (stacks[startStack].slice(-1) < stacks[endStack].slice(-1) || stacks[endStack] == 0) {
    return true;
  } else {
    return false;
  }
}

// undefined[] empty

// going to need access to the array value of the object
// need variables to store the index values of the last move from start to end stacks

// two if statements - else if 
// if the end stack is empty(undefined), move piece and return true
// if the end stac has a piece, check to see if it's larger than the start piece. If yes return true
// otherwise, return false

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // a win is an array of [4, 3, 2, 1] in the c stack
  // if ture alert "you won" and return true, else return false
  if (stacks["c"].length == 4) {
    return true;
  } else {
    return false;

  }
}
// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)) {
    // make a move
    movePiece(startStack, endStack);

  } else {
    return console.log("Invalid Move");
  }
  // then check if they won
  if (checkForWin()) {
    return console.log("You win");
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, {
        a: [4, 3, 2],
        b: [1],
        c: []
      });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = {
        a: [],
        b: [],
        c: [4, 3, 2, 1]
      };
      assert.equal(checkForWin(), true);
      stacks = {
        a: [1],
        b: [4, 3, 2],
        c: []
      };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}