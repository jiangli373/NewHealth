var ParticipantProvider = require('../config/participantProvider.js').participantProvider;
var participantProvider = new ParticipantProvider;
var ObjectID = require('mongodb').ObjectID;


exports.list = function (req, res) {
    console.log('------------list--------------');
    var skip = 0, limit = 10, count = 10;
    participantProvider.count({}, function (err, result) {
        if (err) {
            console.log('find error!', err);
        }
        if (result) {
            count = result;
            console.log('the collection has ' + count + ' data');
        }
        participantProvider.find({}, {skip:skip, limit:limit}, function (err, result) {
            if (err) {console.log('find error!', err);}
            var pages = Math.ceil(count / limit);
            res.send(result);
        });
    });
};
exports.userPage = function (req, res) {
    var data = req.body;
    var skip = (parseInt(data.page) - 1) * parseInt(data.limit);

    participantProvider.find({}, {skip:skip, limit:data.limit}, function (err, result) {
        if (err) {console.log('find error!', err.message);}
        console.log('find success' + JSON.stringify(result));
        res.send({ status:'success',users:result});
    });
};


exports.createUser = function (req, res) {
    var user = req.body;
    var message = {name:user.name, password:user.password,creditno:user.creditno,birth:user.birth, activity:user.activity,sex:user.sex, height:user.height, phoneno:user.phoneno, email:user.email, city:user.city, country:user.country, comment:user.comment};
    console.log('insert user message', JSON.stringify(message));
    participantProvider.insert(message, {}, function (err, result) {
        if (err) {
            console.log('insert error!', err.message);
        }
        else {
            console.log('insert success');
            res.send({ status:'success'})
        }
    });

};

exports.showDetail = function (req, res) {

    participantProvider.findOne({_id:new ObjectID(req.params.id)}, {password:0}, function (err, result) {
        if (err) {
            console.log("userProvider.findOne err: ", err);
            res.send({err:err});
        } else {
            console.log("exports.getUser userProvider.findOne result: ", result);
            res.send(result);
        }
    });
};
