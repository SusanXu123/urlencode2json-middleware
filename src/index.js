const debug = require('debug')('urlencode2json')

module.exports = (req, res, next) => {
  if(!req.is('application/x-www-form-urlencoded') || req.method != 'POST') {
    debug('skip transform urlencode to json')
    return next()
  }
  Object.keys(req.body).forEach(key => {
    try{
      req.body[key] = JSON.parse(req.body[key])
    }catch (err){
      debug(`fail to parse key '${key}' of req.body to json` )
    }
  })
  next()
}
