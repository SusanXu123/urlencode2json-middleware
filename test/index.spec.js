const request = require('supertest')
const {createServer} = require('./helper')

describe('post with urlencode data should be transform to json', () => {
  let server
   before(function () {
     server = createServer()
   })

   it('send empty body should be parsed to {}', function (done) {
     request(server)
     .post('/')
     .expect(200, '{}', done)
   })

   it('send application/json should be skiped', function (done) {
     request(server)
     .post('/')
     .set('Content-Type', 'application/json')
     .send('{"user":"tobi"}')
     .expect(200, '{"user":"tobi"}', done)
   })

   it('send x-www-form-urlencoded should be parsed correct ', function (done) {
     const body = [
       'user=tobi',
       'arg_bool=true',
       'arg_number=3',
       'arg_bool_str="true"',
       'arg_number_str="33"',
       'arg_null=null',
       'arg_null_str="null"',
       'arg_undefined=undefined',
       'arg_undefined_str="undefined"'
     ].join('&')
     const expectedRes = JSON.stringify({
       "user":"tobi",
       "arg_bool":true,
       "arg_number":3,
       "arg_bool_str":"true",
       "arg_number_str":"33",
       "arg_null":null,
       "arg_null_str":"null",
       "arg_undefined":"undefined",
       "arg_undefined_str":"undefined"
     })
     request(server)
     .post('/')
     .set('Content-Type', 'application/x-www-form-urlencoded')
     .send(body)
     .expect(200, expectedRes, done)
   })
})
