const request = require('request');

function Subscription(applicationId, password, version, url, urlQuerySubscription){
        this.applicationId = applicationId;
        this.password = password;
        this.version = version;
        this.url = url;
        this.urlQuerySubscription = urlQuerySubscription;

    // get applicatioId(){
    //     return this.applicationId;
    // }

}
//Subscription.prototype.applicationId;

// Subscription.prototype.subscriptionNotification = (req, res, callback) => {
//     callback(req.body);
//     res.send({
//         "statusCode": "S1000",
//         "statusDetail": "Success"
//     });
// };

Subscription.prototype.subscriptionNotification = (req, res, callback) => {
    try {
        callback(req.body.applicationId, req.body.frequency, req.body.status, req.body.subscriberId);
        res.send({
            "statusCode": "S1000",
            "statusDetail": "Success"
        });
    }
    catch(e) {
        res.status(500).send({
            "statusCode": "E1000",
            "statusDetail": "Error"
        });
    }
};
//subscribe the user
Subscription.prototype.Subscribe = function (SubscriberId ,callback) {
        const SubscriptionRequest = {
            "applicationId" : this.applicationId,
            "password": this.password,
            "version": this.version,
            "action": "1",
            "subscriberId": SubscriberId
        };
        request({
            url: this.url,
            method: "POST",
            json: SubscriptionRequest
        }, (error, response) => {
            if (!error && response.statusCode === 200) {
                callback(response.body);
            }
            else {
                console.log(error);
                throw Error.SdpException;
            }
        });
};

//unsubscribe the user
Subscription.prototype.UnSubscribe = function (SubscriberId ,callback) {
    const SubscriptionRequest = {
        "applicationId" : this.applicationId,
        "password": this.password,
        "version": this.version,
        "action": "0",
        "subscriberId": SubscriberId
    };
    request({
        url: this.url,
        method: "POST",
        json: SubscriptionRequest
    }, (error, response) => {
        if (!error && response.statusCode === 200) {
            callback(response.body.statusCode, response.body.statusDetail);
        }
        else {
            console.log(error);
            throw Error.SdpException;
        }
    });
};



module.exports = {Subscription};