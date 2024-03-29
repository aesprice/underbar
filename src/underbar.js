/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined){
      return array[array.length - 1]
    }else{
      if (n < array.length){
        return array.slice(array.length - n, n + 1);
      }else{
        //Don't let the index loop around, just return the whole array if n is bigger than the array
        return array;
      }
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){ //Check for array specifically
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }else if(typeof(collection) === "object"){ //Check for non-array object
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }else{
      //Error if not some sort of collection of values
      console.error("Expected either an array or an object");
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var positives = [];

    _.each(collection, function(item){
      if(test(item)){ //Check passed-in comparison on each iteration through the array, and add to our list if true
        positives.push(item);
      }
    });

    return positives;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    var failTest = function(num){
      return !test(num); //Reverse the boolean from the test condition; we want a failure to yield a 'positive' result
    };

    return _.filter(collection, failTest); //Now filter for failures instead of successes
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqueArray = [];

    var repeats = function(compareVal, compareArray){ //Function to check if something already exists in our success list
      var repeat = false;

      _.each(compareArray, function(item){ 
        if(item === compareVal){ //If any values in our success list match what we're looking for, set repeat to true and stop searching
          repeat = true;
          return;
        }
      });

      return repeat;
    };

    _.each(array, function(item){
      if(!repeats(item, uniqueArray)){ //If we find no repeats, we can add this value to our success list
        uniqueArray.push(item);
      }
    });

    return uniqueArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];

    _.each(collection, function(item){ //Adds each result of our iterator function to a list of results
      results.push(iterator(item));
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var results = [];

    _.each(collection, function(item){
      if(typeof(functionOrKey) === "function"){
        item = functionOrKey.apply(item, args); //If a method was passed in, the apply that method to the items in the collection
      }else{
        item = item[functionOrKey].apply(item, args); //Otherwise, try to find the method in the item class and apply it
      }
      results.push(item);
    });

    return results;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var total = accumulator;

    _.each(collection, function(item){
      if (total === undefined){
        total = collection[0];
      }else{
        total = iterator(total, item);
      }
    })

    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if(!iterator){
      iterator = _.identity; //If iterator function doesn't exist, just check the value of the item
    }

    return _.reduce(collection, function(verify, item){

      if(verify && iterator(item)){
        return true; //Only return true if this item AND all previous items have passed
      }else{
        return false;
      }
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(!iterator){
      iterator = _.identity; //If iterator function doesn't exist, just check the value of the item
    }

    var reverseTest = function(item){
      return !iterator(item); //Reverse the boolean from the test condition; we want a failure to yield a 'positive' result
    };

    if(_.every(collection, reverseTest)){
      return false; //If all items fail, then and only then is _.some a failure
    }else{
      return true;
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(object){
      _.each(object, function(item, key){
        obj[key] = item; // Loop through every item in every object argument we find, then write each item into the original object
      });
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(object){
      _.each(object, function(item, key){
        if(obj[key] === undefined){  // Only write in the new item if it doesn't already exist in the original object
          obj[key] = item;
        }
      });
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var results = {}; // Keep a list of all previous results

    return function(){
      var arg = arguments[0]; // Short name for first argument of 'func'  :)

      if(results[arg] != undefined){
        return results[arg]; // If previous result for this argument exists, just read that from our results list
      }else{
        results[arg] = func.apply(this, arguments); // If previous result doesn't exist, calculate the result and remember it for next time
        return results[arg];
      }
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.apply(arguments).slice(2, arguments.length); // Separate the arguments for func() from our _.delay arguments

    return setTimeout(function(){func.apply(undefined, args)}, wait); // Use setTimeout to apply our args array to func after the given interval
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffledArray = array.slice(0, array.length);

    var shufflePass = function(array){
      // Switch every item in the array with a random other item
      _.each(shuffledArray, function(item, key){
        var newPlace = Math.floor(Math.random() * shuffledArray.length); // newPlace is index for random switching item (the current item's new home)
        var tradeItem = shuffledArray[newPlace]; // tradeItem is the actual value that's going to move to the current index
        shuffledArray[newPlace] = item;
        shuffledArray[key] = tradeItem;
      });
    };

    // Pass through the array a few times to make sure we get mixed up good and proper.
    shufflePass(shuffledArray);
    shufflePass(shuffledArray);
    shufflePass(shuffledArray);

    return shuffledArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
