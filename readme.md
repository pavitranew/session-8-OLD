# Session Eight

## Homework

* If you haven't completed the update pirate functionality yet, please do so

* create a validation strategy for the Add Pirate form (ref. https://www.w3schools.com/angular/angular_validation.asp)

* Using the _pirates directory as a model, integrate a build solution using Babel and Webpack into your assignment.

## Reading

* [Wes Bos](http://wesbos.com/javascript-modules/) on ES6 Modules
* http://exploringjs.com/es6/ (specifically http://exploringjs.com/es6/ch_modules.html)

## ES6 Modules

In `_modules` create `app.js`:

```js
const ages = [1,1,4,5,6,6,7];
console.log(_.uniq(ages))
```

Note the underscore. It uses [lodash's](https://lodash.com/) [uniq](https://lodash.com/docs/4.17.4#uniq) utility.

Create `index.html`:

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

Remove lodash script tag:

```
<!-- <script src="https://unpkg.com/lodash@4.16.6"></script> -->
```

Browser errors: `Unexpected token import`

Cannot use require. 

Require is part of Node: `const lodash = require('lodash');`

require is CommonJS. CommonJS is a project with the goal of specifying an ecosystem for JavaScript outside the browser (for example, on the server or for native desktop applications) like NodeJS. 

https://webpack.github.io/docs/commonjs.html

We want to be able to use and create ES6 modules in our code (without node).

## Aside: Grunt and Gulp

In a previous exercise we had this kind of situation:

```
<script src="https://code.angularjs.org/1.6.2/angular.min.js"></script>
<script src="https://code.angularjs.org/1.6.2/angular-route.min.js"></script>
<script src="js/foodapp.module.js"></script>
<script src="js/foodapp.config.js"></script>
<script src="js/recipes/recipe-list.component.js"></script>
<script src="js/recipes/recipe-detail.component.js"></script>
```

Grunt and Gulp are task runners that perform many functions such as starting a server, SASS compiling, minification, and concatenation.

Demo: a simple sample from a previous semester using `gulp`

N.B. Demo does not include [concatenation and minification](http://stackoverflow.com/questions/21961142/gulp-concat-scripts-in-order)

We have been using npm scripts for most of this so far.

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

Refresh. Not working. 

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

If a config file is present webpack picks it up automatically:

```
$ ./node_modules/.bin/webpack 
```

Let's try an alternate config:

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

and npm run webpack with a --watch flag:

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

Edit index.html to point to the new directory.

Delete the old `dist` directory.

Test in the browser.

Add to app.js:

```
console.log(uniq(ages))
```

Note that Webpack reruns.

Note the line number (1) in the console (minified file).

Add source mapping:

```
module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './app.js'
  },
  output: {
    filename: '_build/bundle.js'
  }
};
```

Stop the npm process and rerun it.

Note the new line number and location in the console.

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

https://www.npmjs.com/package/babel-preset-es2015-native-modules

N.B. We can also use include: `include: __dirname + '/src',`

===== > DON'T USE THIS. IT DOESN'T Babelize!

Alternative:

```
{
  test: /\.js/,
  loader: 'babel',
  include: __dirname + '/src',
},
```

====== > 

Test.

Test with new files to check Babel (make sure the `-p` flag is off).

robot.js:

```
const greetings = (text, person) => {
  return `${text}, ${person}. I read you but I’m sorry, I’m afraid I can’t do that.`;
}

export default greetings;
```

app.js

```
import greetings from './robot.js'
...
function component(){
  ...
  document.write(greetings("Affirmative", "Dave"));
```

To view the Babelized JavaScript remove the -p flag, recompile, open bundle.js and search for `greetings`. 

Remove robots.js and references to it in app.js

## Style Sheets - still linked

https://webpack.github.io/docs/stylesheets.html

Use a template string in app.js:

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

Check:

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
// require('./styles.css');
import styles from './styles.css'
```

Remove the link tag from index.html:

```
<!-- <link rel="stylesheet" href="styles.css"> -->
```

Note that styles are added to the page

We just made a stylesheet a dependency of a JavaScript file!

We made a JavaScript file that requested another CSS file and that code was then embedded within a web page. So in a more realistic example we could create a buttons.js file and make buttons.css a dependency of it, and then import that JavaScript into another file that organises our templates and spits out HTML. 

This is the basis for Angular 2 and React components. 

## Images

http://stackoverflow.com/questions/35369419/how-to-use-images-in-css-with-webpack

```
.ages {
  padding: 1rem;
  background-color: #eee;
  background-image: url(bg.gif);
}
```

Test. Webpack throws up.

```
$ npm install url-loader --save-dev
```

Note the complaint in terminal.

```
$ npm install file-loader --save-dev
```

Add to loaders array in webpack config:

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

```
import foobar from './src/config'
console.log(foobar)
```

A default export gets renamed to whatever you import it as. A module can have only one default export.

2. Named exports

Try:

`export const apiKey = 'abcdef'`

Test: `undefined`

a. Change import:

```
import {apiKey} from './src/config'
console.log(apiKey)
```

{ apiKey } represents a named export.

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

e.1 export as

```
export {a as age, b}
```

`import {age} from './src/config'`

`console.log(age)`

e.2 import as

```
import {apiKey as key, url, sayHi} from './src/config'
```


## Optional Exercise - ES6 Modules

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
$ npm install --save slug base-64
```

In user.js

```
import slug from 'slug';
import base64 from 'base-64'
import { url } from './config'
```

```
function createUrl(name){
  return `${url}/users/${slug(name)}`
}
```

Gravitar - A universally accessible avatar which you can get if you know the user's email. The access point requires a base64 encoding of the email address. e.g.:

```
function gravitar(email){
  // const photoUrl = 'https://www.gravatar.com/avatar/dfc49t8ycntc5cncg-c93'
}
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
const image = gravitar(daniel.email)
console.log(image)
```


## SystemJS

Browserify, rollup and systemjs are common alternatives to Webpack. Since you are writing ES6 modules (and not webpack etc) you are free to use any other system. Webpack is popular among React developers. [SystemJS](https://github.com/systemjs/systemjs) is widely used in Angular 2.

SystemJS uses jspm which allows it to be run in the browser without installing packages.

This makes it good to use when you want to use packages and modules but don't want to set everything up.

cd to systemjs directory.

Needs to run on a server:

```
$ lite-server
```

Note index.html:

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
    System.config({ transpiler: 'babel' });
    System.import('./main.js');
  </script>
</body>
</html>
```

Create main.js:

`console.log('Hello world')`

Test.

```
import { sum, kebabCase } from 'npm:lodash';
console.log(kebabCase('This is kebab case'));
```

Note checkout.js:

```
export function addTax(amount, taxRate) {
  return amount + (amount * taxRate);
}
```

In main.js

```
import { addTax } from './checkout';
console.log(addTax(100, 0.15));
```



## Pirates (continued)

`npm install`

`npm install node-sass concurrently --save-dev`

`"build-sass": "node-sass --watch sass/styles.scss --output static/css/  --source-map true"`

`"boom!": "concurrently \"npm run start\" \"npm run build\" \"npm run build-sass\" "`

```
@import 'imports/mixins';
@import 'imports/variables';
@import 'imports/forms';
@import 'imports/mystyles';

* {
  color: red !important;
}
```

### Validation

Note the classes Angular adds to the input fields as they are manipulated by the user.

static/partials/pirate-list.template.html

Give the form a name:

`<form ng-submit="addPirate(pirate)" name="addform">`

Disable the submit button:

`<button ng-disabled="addform.$invalid" type="submit">Add Pirate</button>`

Note: you can visually identify the button as being disabled using Angular's added information e.g.

```css
button[disabled] {
  background: gray;
}
```

Give the input a name. Add a paragraph with ng-show conditions.

```html
<div class="form-group">
  <label>
    <input ng-model="$ctrl.pirate.name" required ng-minlength="6" placeholder="Name" name="pname" />
    <svg viewBox="0 0 20 20" class="icon">
      <path d="M0 0 L10 10 L0 20"></path>
    </svg>
  </label>
  <p class="error" ng-show="addform.pname.$invalid && addform.pname.$touched">You must enter a name of at least 6 characters.</p>
</div>
```

```css
.error {
    color: red;
} 
```

Note the svg. 

https://www.sitepoint.com/closer-look-svg-path-data/

Please watch this video from [frontend.center](https://www.youtube.com/watch?v=af4ZQJ14yu8)

```
label {
  display: flex;
  height: 2rem;
}

input {
  width: 100%;
  height: 1.6rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid hsl(0%, 0%, 85%);
  order: 1;
}
```


```
input:focus {
  outline: none;
  border-color: hsl(0%, 0%, 25%)
}

.icon {
  width: 1rem;
  opacity: 0;
  transition: all 0.5s;
  transform: translateX(-100%)
  // stroke-dasharray: 0, 20;
  // stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  opacity: 1;
  transform: translateX(0)
  // stroke-dasharray: 28.284, 20;
  // stroke-dashoffset: 0;
}

.ng-valid.ng-not-empty {
  border-color: hsl(166, 72%, 40%)
}

.ng-invalid.ng-dirty {
  border-color: hsl(0, 100%, 40%)
}

```

Using the dash effect:

```
.icon {
  width: 1rem;
  // opacity: 0;
  transition: all 0.5s;
  // transform: translateX(-100%)
  stroke-dasharray: 0, 20;
  stroke-dashoffset: -14.642;
}

.icon path {
  stroke: black;
  fill: none;
  stroke-width: 1px;
}

input:focus + .icon {
  // opacity: 1;
  // transform: translateX(0)
  stroke-dasharray: 28.284, 20;
  stroke-dashoffset: 0;
}

.ng-valid.ng-not-empty {
  border-color: hsl(166, 72%, 40%)
}

.ng-invalid.ng-dirty {
  border-color: hsl(0, 100%, 40%)
}
```


See https://www.w3schools.com/angular/angular_validation.asp for a complete set of examples for Angular validation.

Note the final example that includes `ng-disabled` on the submit button.




### Notes
https://css-tricks.com/css-modules-part-2-getting-started/
https://github.com/mean-fall-2016/session-10









































