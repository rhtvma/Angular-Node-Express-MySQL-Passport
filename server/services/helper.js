const uuidv4 = require('uuid/v4'),
    uuidv5 = require('uuid/v5'),
    moment = require('moment'),
    config = require('config'),
    nJwt = require('njwt');

/**
 *Collaboration Roles
 */
exports.collaborationRoles = {
    EDITOR: 'editor',
    VIEWER: 'viewer',
    PREVIEWER: 'previewer',
    UPLOADER: 'uploader',
    PREVIEWER_UPLOADER: 'previewer uploader',
    VIEWER_UPLOADER: 'viewer uploader',
    CO_OWNER: 'co-owner',
    OWNER: 'owner'
}

/**
 * USER OBJECT FIELDS
 */
const userObjectFields = 'address,avatar_url,created_at,job_title,language,login,max_upload_size,modified_at,name,phone,space_amount,space_used,status,timezone,role';
exports.userObjectFields = userObjectFields;

const groupObjectFields = 'id,name,type,description';
exports.groupObjectFields = groupObjectFields;

/*
 * Session verification
 */
exports.validateUserSession = function (req) {
    if (!!req.session && !!((req.session) || {}).id && !!((req.session) || {}).userID)
        return true;
    return false;
};
/*
 * Admin Session verification
 */
exports.validateAdminSession = function (req) {
    if (!!req.session && !!((req.session) || {}).id && !!((req.session) || {}).isAdmin)
        return true;
    return false;
};

/**
 * To Generate GUID / UUID / Hash
 * @param strKey OPTIONAL
 * @returns {*}
 * @constructor
 */
const UUID5 = (strKey) => {
    return uuidv5((strKey || '#uuid5'), uuidv4());
};

const UUID4 = (strKey) => {
    return uuidv4();
};

const JWT = (str) => {
    var claims = {
        iss: "https://tcmcontentcloud.com",  // The URL of your service
        sub: "",    // The UID of the user in your system
        scope: "users",

        iat: Date.now(),
        exp: (new Date().getTime() + config.get('jwt.expiryInMiliseconds'))
    }

    var jwt = nJwt.create(claims, config.get('jwt.secret')/*str || UUID5(config.get('jwt.secret'))*/, "HS256");
    var token = jwt.compact();
    return token;
}

const verifyToken = (token) => {
    return nJwt.verify(token, config.get('jwt.secret'), "HS256");
}

const randomString = (digit) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < digit; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
exports.randomString = randomString;
exports.uuid = UUID4;
exports.uuid5 = UUID5;
exports.njwt = JWT;
exports.verifyToken = verifyToken;


exports.equilityHandlebarHelper = (operandA, operator, operandB, options) => {
    if (operator == '==' || operator == '===')
        return operandA == operandB ? options.fn(this) : options.inverse(this);
};

exports.ifOrCondition = (operandA1, operatorA, operandA2, operandB1, operatorB, operandB2, options) => {
    if (operatorA == '==' || operatorA == '===')
        return ((operandA1 == operandA2) || (operandB1 == operandB2)) ? options.fn(this) : options.inverse(this);
}
exports.calculateExpiryDate = (days) => {
    var today = new Date();
    var datePlus = moment(today, "DD-MM-YYYY")
        .add(parseInt(days), 'd') //replace 2 with number of days you want to add
        .toDate(); //convert it to a Javascript Date Object if you like
    // return moment(datePlus).format('L');
    return moment(datePlus).format("YYYY-MM-DD HH:mm:ss");
}
exports.mysqlDate = () => {
    return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
}

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send({'err': 'Please Login'});
    }
}
exports.ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.status(400).send({'err': 'Only Administrator Access'});
    }
}

function uniqueNumberCreator() {
    var date = Date.now();

    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }

    return date;
}

var uniqueNumber = {}
uniqueNumber.previous = 0;
exports.uniqueNumber = () => {
    return uniqueNumberCreator();
}
;
// Serial Key
exports.generateSerialKeys = (length, separator) => {
    separator = separator || '-';
    let license = new Array(length + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, length);
    return license.toUpperCase().replace(/(\w{4})/g, '$1' + separator).substr(0, length + Math.round(length / 4) - 1);
// console.log(generateSerialKeys(24, ' ')); // JXG5 QDER DNXK O6R0 JXG5 QDER
}

//Picking a Random element from a stream
exports.pickRandomProperty = (obj) => {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1 / ++count)
            result = prop;
    return result;
}

/**
 * Enlist below methods in module.
 */

// var shared = {
//     atob: function (a) {
//         var b;
//         return b = new Buffer(a).toString('base64');
//     },
//     btoa: function (b) {
//         var a;
//         return a = new Buffer(b, 'base64').toString('ascii');
//     },
//     toCamelCase: function (str) {
//         str = str.toLowerCase();
//         return str.charAt(0).toUpperCase() + str.slice(1);
//     }
// };
// var pwdEncipher = function (passphrase, salt, iteration, length, crypter, callback) {
//     if (!passphrase || (passphrase == null) || (passphrase.length < 1) || typeof passphrase !== "string") {
//         callback('Invalid Passphrase!', null);
//         return;
//     }
//     crypter.pbkdf2(passphrase, salt, iteration, length, callback);
// };
// var pass = function (config, cipher, req, res, next) {
//     pwdEncipher(req.query.word, config.coder.salt, config.coder.iteration, config.coder.length, cipher.crypter, function (e, hxString) {
//         var o = null;
//         if (!hxString)
//             o = null;
//         else
//             o = hxString.toString('hex');
//         res.send({err: (e || null), result: (o || 'Error')});
//     });
// };
// var isParsableJson = function(stringified){
//     try {
//         JSON.parse(stringified);
//     } catch (e) {
//         return false;
//     }
//     return true;
// }
// atob: function (req, res, next) {
//     var txt = req.query.ascii;
//     var b64 = shared.atob(txt);
//     res.send({err: null, result: b64});
// },
// btoa: function (req, res, next) {
//     var hx = req.query.base64;
//     var ptxt = shared.btoa(hx);
//     res.send({err: null, result: ptxt});
// },
// enclose: function (cipher, req, res, next) {
//     var out = cipher.encodeText(req.query.text);
//     res.send({err: null, result: out || 'Error'});
// },
// disclose: function (cipher, req, res, next) {
//     var out = cipher.decodeText(req.query.hex);
//     res.send({err: null, result: out || 'Error'});
// }