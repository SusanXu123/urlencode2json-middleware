[![Build Status](https://travis-ci.org/SusanXu123/urlencode2json-middleware.svg?branch=master)](https://travis-ci.org/SusanXu123/urlencode2json-middleware)  [![Coverage Status](https://coveralls.io/repos/github/SusanXu123/urlencode2json-middleware/badge.svg?branch=master)](https://coveralls.io/github/SusanXu123/urlencode2json-middleware?branch=master)



## Installation

```bash
$ npm install urlencode2json-middleware
```

## Usage

urlencode2json-middleware is a middleware to enhance express bodyparser to parse string to crrect json type.

Example _app.js_:

```js
const express = require('express')
const bodyParser = require('body-parser')
const urlencode2json = require('urlencode2json-middleware')

const app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(urlencode2json)
```

When a post request as below send to server
```bash
POST / HTTP/1.1
Host: ******
Content-Type: application/x-www-form-urlencoded

user=tobi&arg_bool=true&arg_number=3&arg_bool_str="true"&arg_number_str="33"&arg_null=null&arg_null_str="null"

```

By default, `bodyParser.urlencoded` can not distinguish `number`, `boolean`, `null` with `string`, and will parse data to `request.body` like below:
```js
request.body === {
  "user":"tobi",
  "arg_bool":"true",
  "arg_number":"3",
  "arg_bool_str":"true",
  "arg_number_str":"33",
  "arg_null":"null",
  "arg_null_str":"null",
}

```

This middleware will enhance `bodyParser.urlencoded` to paser default to correct primary type, and will paser data to `request.body` like below:

```js
request.body === {
  "user":"tobi",
  "arg_bool":true,
  "arg_number":3,
  "arg_bool_str":"true",
  "arg_number_str":"33",
  "arg_null":null,
  "arg_null_str":"null",
}
