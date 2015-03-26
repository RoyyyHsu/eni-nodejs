'use strict';

var fs = require('fs');

//====================================================================
// Récupération des méta-données.

fs.stat(__filename, function (error, stats) {
  if (error) {
    console.error('stat: échec de récupération des métadonnées', error);
    return;
  }

  var type =
    stats.isFile() ? 'fichier' :
    stats.isDirectory() ? 'dossier' :
    'inconnu'
  ;

  console.log('stat: Ce fichier est de type %s.', type);
  console.log('stat: Il a une taille de %s octets.', stats.size);
});

//====================================================================
// Changement du propriétaire.

fs.chown(__filename, 0, 0, function (error) {
  if (error) {
    console.error('chown: échec du changement de propriétaire', error);
  } else {
    console.log('chown: propriétaire changé');
  }
});

//====================================================================
// Changement des permissions.

fs.chmod(__filename, '644', function (error) {
  if (error) {
    console.error('chmod: échec du changement de mode', error);
  } else {
    console.log('chmod: mode changé');
  }
});

//====================================================================
// Changement des dates d'accès et de modification.

var atime = new Date('2012-09-17');
var mtime = new Date('2012-07-04');

fs.utimes(__filename, atime, mtime, function (error) {
  if (error) {
    console.error('utimes: échec de modification des dates', error);
  } else {
    console.log('utimes: dates modifiées');
  }
});

//====================================================================
// Lecture d'un fichier.

fs.readFile(__filename, function (error, content) {
  // Convertit le tampon de données en chaîne.
  content = String(content);

  if (error) {
    console.error('readFile: échec de lecture', error);
  } else {
    content = content.slice(0, 200).replace(/^/mg, '  | ') + '...';

    console.log('readFile:');
    console.log(content);
  }
});

//====================================================================
// Écriture d'un fichier.

var tmpFile = __dirname + '/tmp-file';

fs.writeFile(tmpFile, 'mon contenu', function (error) {
  if (error) {
    console.error('writeFile: échec de l\'écriture', error);
  } else {
    console.log('writeFile: fichier écrit');
  }

  fs.unlink(tmpFile, function () {});
});

//====================================================================
// Lecture et écriture via les flux.

