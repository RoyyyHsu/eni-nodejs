'use strict';

var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('user.create', function onUserCreate(name, age) {
   console.log('nouvel utilisateur %s (%s ans)', name, age);
});

emitter.emit('user.create', 'Adèle', 43);
// > nouvel utilisateur Adèle (43 ans)
