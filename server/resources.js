'use strict';

var Promise = require('promise');

module.exports = {
  dog: {
    get: function(id) {
      if (id == 123) {
  
        return new Promise(function(resolve) {
          resolve({
            id: id,
            name: 'Dolly'
          });
        });
      } else {
        return new Promise(function(resolve) {
          resolve({
            id: id,
            name: 'Molly <script>alert("Molly is evil!");</script>'
          });
        });
      }
    }
  }
};
