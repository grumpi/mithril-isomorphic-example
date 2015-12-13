'use strict';

var getNamespace = require('continuation-local-storage').getNamespace;
var session = getNamespace('request-session');

var resources = require('../server/resources');


function collect_request(requestName, requestParams, result) {
  if (session.get('resources')) {
    var x = session.get('resources');
    result.then(function (data) {
      x.push({name: requestName, params: requestParams, data: result});
      session.set('resources', x);
    });
  }
}


function load(type, id) {
  if (!resources[type]) {
    throw Error('Resource with type "' + type + '" does not exist');
  }
  var result = resources[type].get(id);
  
  collect_request('load', [type, id], result);
  return result;
}

function loadWhere(type, query) {
  if (!resources[type]) {
    throw Error('Resource with type "' + type + '" does not exist');
  }
  var result = resources[type].query(query);

  collect_request('loadWhere', [type, query], result);
  return result;
}

function remove(model) {
  if (!model.type) {
    throw new Error('model has no type, remove not possible');
  }
  return resources[model.type].destroy(model.id);
}

function save(model) {
  if (!model.type) {
    throw new Error('model has no type, save not possible');
  }
  return resources[model.type].save(model);
}

module.exports = {
  save: save,
  load: load,
  remove: remove,
  loadWhere: loadWhere
};
