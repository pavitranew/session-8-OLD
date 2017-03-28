# Session Eight

## Homework

## Reading

* [Wes Bos](http://wesbos.com/javascript-modules/) on ES6 Modules
* http://exploringjs.com/es6/

## ES6 Modules

app.js:

```js
const ages = [1,1,4,5,6,6,7];
console.log(_.uniq(ages))
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>JS Modules</title>
	<script src="https://unpkg.com/lodash@4.16.6"></script>
</head>
<body>
	<script src="app.js"></script>
</body>
</html>
```

We want to use lodash via the node_modules directory.

```
$ npm init -y
```

```
$ npm install --save lodash
```

Import the required functionality from lodash:

```
import {uniq} from 'lodash';
const ages = [1,1,4,5,6,6,7];
console.log(uniq(ages))
```

Remove lodash 

```
<!-- <script src="https://unpkg.com/lodash@4.16.6"></script> -->
```

"Unexpected token import"

Cannot use require. Require is part of Node: `const lodash = require('lodash');`

require is CommonJS. CommonJS is a project with the goal of specifying an ecosystem for JavaScript outside the browser (for example, on the server or for native desktop applications) like NodeJS. 

https://webpack.github.io/docs/commonjs.html

## Grunt and Gulp

Task runners that perform many functions such as starting a server, SASS compiling, minification, concatenation.

See a sample from a previous semester - `gulp`

We have been using npm scripts for this so far.

[Pros and cons of this approach](https://gist.github.com/elijahmanor/179e47828bf760c218bb3820d929836d)


## Webpack

Performs the same functions of gulp/grunt but with important differences. See [this video](https://www.youtube.com/watch?v=WQue1AN93YU)

```
$ npm install webpack --save-dev
```

app.js:

```js
function component () {
  const element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

```js
import _ from 'lodash';
```

Remove and add to index:

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>JS Modules</title>
	<!-- <script src="https://unpkg.com/lodash@4.16.6"></script> -->
</head>
<body>
	<!-- <script src="app.js"></script> -->
	<script src="dist/bundle.js"></script>
</body>
</html>
```

```sh
$ ./node_modules/.bin/webpack app.js dist/bundle.js
```

Additional example:

```
// import { _ } from 'lodash'
import { uniq } from 'lodash'

function component () {
  var element = document.createElement('div');

  const ages = [1,1,4,5,6,6,7] 
  element.innerHTML = (uniq(ages));

  return element;
}

document.body.appendChild(component());
```

Re-run webpack at prompt.

Note the import of a single piece of functionality.

Create `webpack.config.js`:

```
var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

alt 

```
module.exports = {
  entry: {
    filename: './app.js'
  },
  output: {
    filename: '_build/bundle.js'
  }
};
```


If a config file is present webpack picks it up automatically:

```
$ ./node_modules/.bin/webpack 
```

npm run webpack with a --watch flag:

```
{
  ...
  "scripts": {
    "build": "webpack --watch"
  },
  ...
}
```

Run it with a -p flag

```
"scripts": {
  "build": "webpack -p --watch"
},
```

app.js:

```
console.log(uniq(ages))
```

Note the line number (1) in the minified file.

Add source mapping:

```
devtool: 'source-map',
```

Note the new line number.

We now have the ability to import code from our node_modules - similar to using require in the commonjs-based node environment.

## Babel

```
$ npm install babel-loader babel-core --save-dev
```

```
$ npm install babel-preset-latest --save-dev
```

https://babeljs.io/docs/plugins/preset-latest/

Loaders are small plugins that basically say “When you encounter this kind of file, do this with it”.


```
module: {
	loaders: [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		loader: 'babel-loader',
		query: {
			presets: [
			["es2015", { "modules": false }]
			]
		}
	}
	]
}
```

N.B. We can also include `include: __dirname + '/src',`

Alternative:

```
{
  test: /\.js/,
  loader: 'babel',
  include: __dirname + '/src',
},
```

Test

```
const greetings = (text, person) => {
  return `${text}, ${person}. I read you but I’m sorry, I’m afraid I can’t do that.`;
}

export default greetings;
```

```
import greetings from './robot.js'
...
function component(){
  ...
  document.write(greetings("Affirmative", "Dave"));
```

To view the Babelized JavaScript remove the -p flag, recompile, open bundle.js and search for `greetings`. 

Remove robots.js.

## Style Sheets - still linked

https://webpack.github.io/docs/stylesheets.html

```
element.innerHTML = `
<div class="ages">
${(uniq(ages))}
</div>
`;
```

Create `styles.css`:

```css
.ages {
	padding: 1rem;
	background-color: #eee;
}
```

```html
<link rel="stylesheet" href="styles.css">
```

```sh
$ npm install style-loader css-loader --save-dev
```

The css-loader takes a CSS file and reads off all its dependencies while the style-loader will embed those styles directly into the markup.

```js
    loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [
        ["es2015", { "modules": false }]
        ]
      }
    },
    {
      test: /\.css$/, 
      loader: "style-loader!css-loader" 
    }
    ]
```

In app.js

```
require('./styles.css');
```

N.B. We just made a stylesheet a dependency of a JavaScript file!

Note that styles are added to the page

```
<!-- <link rel="stylesheet" href="styles.css"> -->
```

We made a JavaScript file that requested another CSS file and that code was then embedded within a web page. So in a more realistic example we could create a buttons.js file and make buttons.css a dependency of it, and then import that JavaScript into another file that organises our templates and spits out some HTML. 

## Images

http://stackoverflow.com/questions/35369419/how-to-use-images-in-css-with-webpack

```
.ages {
  padding: 1rem;
  background-color: #eee;
  background-image: url(bg.gif);
}
```

Webpack throws up.

```
$ npm install url-loader --save-dev
```

Note the complaint in terminal.

```
$ npm install file-loader --save-dev
```

Add to loaders array:

```
{
	test: /\.(png|jpg|gif)$/,
	loader: 'url-loader'
}
```

Refresh the browser. Note the base-64 encoded image

## Importing Exporting

src/config.js

1. Default export:

```
const apiKey = 'abcdef'
export default apiKey
```

app.js:

```
import apiKey from './src/config'
console.log(apiKey)
```

Try:

`import foobar from './src/config'`

A default export gets renamed to whatever you import it as. A module can have only one default export.

2. Named exports

Try:

`export const apiKey = 'abcdef'`

a. Change import:

import {apiKey} from './src/config'

b. Multiple imports:

`export const url = 'http://deverell.com'`

```
import {apiKey, url} from './src/config'
console.log(apiKey, url)
```

c. Functions:

```
export function sayHi(name){
  console.log( `Hello there ${name}.` )
}
```

```
import {apiKey, url, sayHi} from './src/config'
sayHi('Daniel')
```

d. Multiple exports:

```
const a = 10
const b = 30
export {a, b}
```

e. Import/export as:

```
import {apiKey as key, url, sayHi} from './src/config'
export {a as age, b}
```

`import {age} from './src/config'`

`console.log(age)`

## Exercise ES6 Modules

Named and default export

src/user.js

```
function user(name, email, website){
  return {
    name: name,
    email: email,
    website: website
  }
}
```

Note If the property name and the variable that it is being set to are the same (ES6 object literals):

```
function User(name, email, website){
  return { name, email, website }
}
```

Add a function to create a url (slugify):

```
function createUrl(name){
  // e.g. site.com:/users/daniel-deverell
}
```

```
$ npm install --save slug
```

In user.js

```
import slug from 'slug';
```

```
import { url } from './config'
...
function createUrl(name){
  return `${url}/users/${slug(name)}`
}
```

Gravitar

A universally accessible avatar which you can get if you know the user's email. The access point requires a base64 encoding of the email address. e.g.:

```
function gravitar(email){
  // const photoUrl = 'https://www.gravatar.com/avatar/dfc49t8ycntc5cncg-c93'
}
```

```
$ sudo npm install base-64 --save
```

```
import base64 from 'base-64'
```

```
function gravitar(email){
  const hash = base64.encode(email)
  const photoUrl = `https://www.gravatar.com/avatar/${hash}`
  return photoUrl
}
```

Exporting 2 named exports and one default:

```
export default function User(name, email, website){
  return { name, email, website }
}
export function createUrl(name){
  return `${url}/users/${slug(name)}`
}
export function gravitar(email){
  const hash = base64.encode(email)
  const photoUrl = `https://www.gravatar.com/avatar/${hash}`
  return photoUrl
}
```

Use it in app.js.

1: default:

```
import User from './src/user.js';
```

2: add named exports

```
import User, { createUrl, gravitar } from './src/user.js';
```

```
const daniel = new User('Daniel Deverell', 'daniel.deverell@gmail.com', 'daniel.deverell.com')

console.log(daniel)
```

```
const profile = createUrl(daniel.name)
console.log(profile)
```

```
const image = gravatar(daniel.email)
console.log(image)
```


## SystemJS

Browserify, rollup and systemjs are common alternatives to Webpack. Since you are writing ES6 modules (and not webpack etc) you are able to switch out for any other system. Webpack is popular among React developers. [SystemJS](https://github.com/systemjs/systemjs) is widely used in Angular 2.

It uses jspm which allows it to be run in the browser without installing packages.

Good to use when you want to use packages and modules but don't want to set everything up.

Needs to run on a server:

```
$ npm lite-server
```


```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>System JS</title>
</head>
<body>
  <script src="https://jspm.io/system@0.19.js"></script>
  <script>

  </script>
</body>
</html>

```

```
System.config({ transpiler: 'babel' });
System.import('./main.js');
```

In main.js:

`console.log('Hello world')`

```
import { sum, kebabCase } from 'npm:lodash';
console.log(kebabCase('This is kebab case'));
```

Checkout:

```
export function addTax(amount, taxRate) {
  return amount + (amount * taxRate);
}
```

```
import { addTax } from './checkout';
console.log(addTax(100, 0.15));
```








### Notes
https://css-tricks.com/css-modules-part-2-getting-started/










npm install node-sass --save-dev

"build-sass": "node-sass --watch sass/styles.scss --output static/css/  --source-map true"

npm install concurrently --save-dev

"boom!": "concurrently \"npm run start\" \"npm run build\" \"npm run build-sass\" "


```
@import 'imports/mixins';
@import 'imports/variables';
@import 'imports/forms';
@import 'imports/mystyles'; 

* {
  color: red !important;
}
```































