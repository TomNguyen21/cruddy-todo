const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

// var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};



const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, counterString);
      // console.log("counter string", counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////


exports.getNextUniqueId = (callback) => {
  // counter = counter + 1;
  readCounter( (err, data) => {
    //data is currently is 1
    writeCounter(data + 1, (err, counterString) => {
      callback(err, counterString);

    });
  });
  // callback(err, counterString);
  // return zeroPaddedNumber(counter);
};


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, './counter.txt');

// console.log(exports.getNextUniqueId());
// readCounter((err, data)=> {
//   if (err) {
//     console.log('error', err);
//   } else {
//     console.log('data', data);
//   }
// });
// writeCounter(counter, (err, data) => {
//   if (err) {
//     console.log('error', err);
//   } else {
//     counter++;
//     console.log('data', data, ' count: ', counter);
//   }
// });
