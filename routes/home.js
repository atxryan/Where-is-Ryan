
var express = require('express');
var router = express.Router();

// Foursquare config
var config = {
    'secrets' : {
        'clientId' : 'EHL4FWNLSRX0GS20T3AF5DJ1XNGW1OUE0GCF13JIASGU3UY0',
        'clientSecret' : '3EDJ2MWO5TOL1RLOJYLSL5YZ3M33Y54HL5RWBARC5WRSQJ4L',
        'redirectUrl' : 'http://localhost:1337/callback'
    }
}
var foursquare = require('node-foursquare')(config);

var accessToken = "NYTEX0SQL0GW1U5YI3XGINZ404TIILOKT5PK52RO01WJCWOR";

router.get('/', home);



function home (req, res) {
    
    foursquare.Users.getCheckins('self', null, accessToken, function (error, data) {
        if (error) {
            // testUtil.reportError(logger, test, error);
        }
        else {
            try {
                console.log(data);
                var latest = data.checkins.items[0].venue.name;
                res.render('index', { title: 'Where is Ryan?' , checkins: data.checkins.items});
            } catch (error) {
                /// testUtil.reportError(logger, test, error);
            }
        }
    });
    
}

module.exports = router;