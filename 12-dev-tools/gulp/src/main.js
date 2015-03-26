// Ce fichier est compilé par Babel (http://babeljs.io/) avant d'être
// distribué, il peut donc contenir du code au format ES6.

{
  let a = 4;
  let b = 5;

  console.log({ a, b });

  // Échange facile grâce à ES6.
  [b, a] = [a, b];

  console.log({ a, b });
}


console.log('Hello world!');
