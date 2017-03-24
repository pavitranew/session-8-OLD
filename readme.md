# Session Eight

##ES6 Modules

npm init

```
$ npm install --save lodash
```

app.js:

```
const ages = [1,1,4,5,6,6,7];

console.log(uniq(ages))
```

```
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

Unexpected token import


## Tooling - Webpack

```
$ npm install webpack
```

app.js:

```
function component () {
  var element = document.createElement('div');

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
./node_modules/.bin/webpack app.js dist/bundle.js
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
	devtool: 'source-map',
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
./node_modules/.bin/webpack 
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
devtool: 'source-map',
```

```
$ npm install babel-loader babel-core --save-dev
```

```
$ npm install babel-preset-es2015-native-modules --save-dev
```


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

Add

```
const webpack = require('webpack');
```

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
    { test: /\.css$/, loader: "style-loader!css-loader" }
]
```

In app.js

```
require('./styles.css');
```

Note that styles are added to the page

```
<!-- <link rel="stylesheet" href="styles.css"> -->
```

## Images

http://stackoverflow.com/questions/35369419/how-to-use-images-in-css-with-webpack

```
npm install url-loader --save-dev
```

```
{
	test: /\.(png|jpg|gif)$/,
	loader: 'url-loader'
}
```

Note the base-64 encoded image




























