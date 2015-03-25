'use strict';

var character = {
  firstname: 'Bruce',
  lastname: 'Wayne',
};

// exports et module.exports pointent toujours sur la même valeur !
exports = module.exports = character;
