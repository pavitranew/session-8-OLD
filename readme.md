# Session Eight

## ES6 Modules

Why Modules??

http://wesbos.com/javascript-modules/

http://exploringjs.com/es6/

app.js:

```js
const ages = [1,1,4,5,6,6,7];
console.log(uniq(ages))
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

$ npm init

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

Require is part of Node: `const lodash = require('lodash');`


## Enter Webpack

```
$ npm install webpack --save-dev
```

app.js:

```
function component () {
  const element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

```
import _ from 'lodash';
```

Remove and add to index:

```
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

```
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

webpack.config.js:

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

```
console.log(uniq(ages))
```

```
devtool: 'source-map',
```

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

Test? https://css-tricks.com/css-modules-part-2-getting-started/

```
const greetings = (text, person) => {
  return `${text}, ${person}. I read you but I’m sorry, I’m afraid I can’t do that.`;
}

export default greetings;
```

```
import greetings from './robot.js'
document.write(greetings("Affirmative", "Dave"));
```

## Size Matters

Add

```
const webpack = require('webpack');
```

require is CommonJS. CommonJS is a project with the goal of specifying an ecosystem for JavaScript outside the browser (for example, on the server or for native desktop applications) like NodeJS. 

https://webpack.github.io/docs/commonjs.html

```
plugins: [
	new webpack.optimize.UglifyJsPlugin()
]
```

Other plugins from webpack: https://webpack.js.org/plugins/

Add a console.log to app.js

```
import { uniq } from 'lodash'

function component () {
  const element = document.createElement('div');

  const ages = [1,1,4,5,6,6,7] 
  element.innerHTML = (uniq(ages));

  console.log(uniq(ages))

  return element;
}

document.body.appendChild(component());
```

Needs mapping.

Add mapping

```
new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false },
  output: { comments: false },
  sourceMap: true
})
```

## Style Sheets - still linked

https://webpack.github.io/docs/stylesheets.html

```
element.innerHTML = `
<div class="ages">
${(uniq(ages))}
</div>
`;
```

```
.ages {
	padding: 1rem;
	background-color: #eee;
}
```

```
<link rel="stylesheet" href="styles.css">
```

```
npm install style-loader css-loader --save-dev
```

```
loaders: [
...
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

```
$ npm install url-loader --save-dev
```

```
$ npm install file-loader --save-dev
```

```
{
	test: /\.(png|jpg|gif)$/,
	loader: 'url-loader'
}
```

Note the base-64 encoded image

https://www.youtube.com/watch?v=WQue1AN93YU

##Importing Exporting

src/config.js

1. Default export:

```
const apiKey = 'abcdef'
export default apiKey
```

import apiKey from './src/config'
console.log(apiKey)

Try:

import foobar from './src/config'

A default export gets renamed to whatever you import it as. A module  can have only one default export.

2. Named exports

Try:

export const apiKey = 'abcdef'

a. Change import:

import {apiKey} from './src/config'

b. Multiple imports:

export const url = 'http://deverell.com'

import {apiKey, url} from './src/config'
console.log(apiKey, url)

c. Functions:

export function sayHi(name){
  console.log( `Hello there ${name}.` )
}

import {apiKey, url, sayHi} from './src/config'
sayHi(Daniel

d. Multiple exports:

const a = 10
const b = 30
export {a, b}

e. Import/export as:

import {apiKey as key, url, sayHi} from './src/config'
export {a as age, b}


## Exercise ES6 Modules

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





## SystemJS

```
{
  "name": "systemjs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "browser-sync start --directory --server  --files '*.js, *.html, *.css'"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.13.0"
  }
}
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
import { sum, kebabCase } from 'npm:lodash';
import { addTax } from './checkout';

console.log(kebabCase('This is kebab case'));

console.log(addTax(100, 0.15));
```


```
export function addTax(amount, taxRate) {
  return amount + (amount * taxRate);
}
```



















































