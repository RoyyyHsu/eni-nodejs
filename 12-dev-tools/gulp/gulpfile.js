'use strict';

//====================================================================

// On commence par définir les chemins important pour la construction
// du projet.

// Dossier contenant les sources du projet.
var SRC_DIR = __dirname + '/src';

// Dossier dans lequel le projet va être construit.
var DIST_DIR = __dirname + '/dist';

// Port sur lequel le serveur web va écouter (0 pour aléatoire).
var SERVER_PORT = 0;

//====================================================================

// Importe Gulp.
var gulp = require('gulp');

// Utilise le module gulp-load-plugins
// (https://github.com/jackfranklin/gulp-load-plugins) pour charger
// automatiquement et seulement quand nécessaire les modules gulp
// utilisés.
//
// Par exemple, le module gulp-jade sera accessible automatiquement
// via `$.jade`;
var $ = require('gulp-load-plugins')();

var resolve = require('path').resolve;

//--------------------------------------------------------------------

// Il est possible d'utiliser directement les fonctions `gulp.src()`
// et `gulp.dest()` mais cela obligerait à spécifier à chaque fois les
// chemins `SRC_DIR` et `DIST_DIR`.
//
// Afin de se simplifier la vie, nous passerons donc par les fonctions
// suivantes qui feront ce travail pour nous.

function src(patterns, base) {
  base = base ? resolve(base, SRC_DIR) : SRC_DIR;

  return gulp.src(patterns, {
    base: base,
    cwd: base,

    // Cette option permet de chaîner les `gulp.src()`.
    passthrough: true,
  });
}

function dest(path) {
  path = path ? resolve(path, DIST_DIR) : DIST_DIR;

  return gulp.dest(path);
}

//====================================================================

// Définie une tâche dédiée à la compilation des pages.
gulp.task(function buildPages() {
  // Récupère les fichiers JADE.
  return src('**/*.jade')

    // Les compile en HTML.
    .pipe($.jade())

    // Récupère les fichiers HTML.
    .pipe(src('**/*.html'))

    // Enregistre tous ces fichiers dans le dossier `DIST_DIR`.
    .pipe(dest())
  ;
});

// Définie une tâche dédiée à la compilation des scripts.
gulp.task(function buildScripts() {
  // Récupère les fichiers JavaScript.
  return src('**/*.js')

    // Les compile en JavaScript ES5.
    .pipe($.babel())

    // Concatène tous ces fichiers dans un seul `script.js`.
    .pipe($.continuousConcat('script.js'))

    // L'enregistre dans `DIST_DIR`.
    .pipe(dest())
  ;
});

// Définie une tâche dédiée à la compilation des styles.
gulp.task(function buildStyles() {
  // Récupère les fichiers Less.
  return src('**/*.less')

    // Les compile en CSS.
    .pipe($.less())

    // Récupère les fichiers CSS.
    .pipe(src('**/*.css'))

    // Concatène tous ces fichiers dans un seul `style.css`.
    .pipe($.continuousConcat('styles.css'))

    // Rajoute les préfixes vendeurs nécessaires pour maximiser la
    // compatibilité de votre CSS avec les navigateurs web du marché
    // (https://github.com/postcss/autoprefixer-core).
    .pipe($.autoprefixer())

    // L'enregistre dans `DIST_DIR`.
    .pipe(dest())
  ;
});

// Définie une tâche qui va lancer en parallèle toutes les tâches de
// compilation..
gulp.task('build', gulp.parallel(
  'buildPages',
  'buildScripts',
  'buildStyles'
));

//--------------------------------------------------------------------

// Définie une tâche qui nettoie (supprime) `DIST_DIR`.
gulp.task(function clean(done) {
  require('rimraf')(DIST_DIR, done);
});

//--------------------------------------------------------------------

// Définie une tâche qui lance un serveur web qui distribue les
// fichiers de `DIST_DIR`.
gulp.task(function server(done) {
  require('connect')()
    .use(require('serve-static')(DIST_DIR))
    .listen(SERVER_PORT, function serverOnListen() {
      var address = this.address();

      var port = address.port;
      address = address.address;

      // Correctly handle IPv6 addresses.
      if (address.indexOf(':') !== -1) {
        address = '['+ address +']';
      }

      console.log('Listening on http://'+ address +':'+ port);
    })
    .on('error', done)
    .on('close', function () {
      done();
    })
  ;
});
