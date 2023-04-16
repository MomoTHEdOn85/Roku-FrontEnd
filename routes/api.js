const express = require('express');  //import the express package
const router = express.Router(); 
const { createProxyMiddleware} = require('http-proxy-middleware');

//Magic Happen with the Swipe card we setup
//more like the student card we have and the access of thing we have with it

//by default, you can't access other websites or their internal contents if you are not the part of that site (have the same origin). This is the default behaviuor for the Web - we spaces are like locked-down buildings. You need special access to retrieve/use APIs, services etc. the htpp-proxy-middleware library is like a seipr card that GIVES you that access with a bit of configuratuon. It tell the third party (in this case )
router.use('/', createProxyMiddleware({
  target:  'http://localhost:5050',
  headers: {
      accept: 'application/json, application/x-www-form-urlencoded'
  },
  changeOrigin: true
}))

module.exports = router;