const {createReadStream} = require('fs')
const {stream} = require('got')
const {send} = require('micro')
const url = require('url')

const {NODE_ENV} = process.env

module.exports = async (req, res) => {
  const {pathname} = url.parse(req.url)

  if ('/app.js' === pathname) {
    res.setHeader('Content-Type', 'application/javascript')
    return send(res, 200, createReadStream('./public/app.js'))
  }

  if ('/coins' === pathname) {
    res.setHeader('Content-Type', 'application/json')
    
    return send(res, 200, stream("https://api.livecoin.net/info/coinInfo"))
  }

  res.setHeader('Content-Type', 'text/html')
  return send(res, 200, createReadStream('./public/index.html'))
}
