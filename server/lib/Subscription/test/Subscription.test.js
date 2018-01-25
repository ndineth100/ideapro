const expect = require('expect');
const request = require('supertest');

const Subscription = require('../index');

describe('CLASS/ SubscriptionResponse', () => {
    it('Should create a new SubscriptionResponse', () => {
        var O = new SubscriptionResponse();
        var object = {
            "version": "1.0",
            "requestId": "1234123123",
            "statusCode": "S1000",
            "statusDetail": "SUCCESS",
            "subscriptionStatus": "REGISTERED"
        };
        O.setRequestId(object.requestId);
        O.setStatusCode(object.statusCode)
        O.setVersion(object.version);
        O.setStatusDetail(object.statusDetail);
        O.setSubscriptionStatus(object.subscriptionStatus);
        expect(O.getString()).toEqual(JSON.stringify(object, undefined, 2));
    });

    it('Should create a new SubscriptionResponse 1', () => {
        var O = new SubscriptionResponse();
        var object = {
            "version": "1.0",
            "requestId": "1234123123",
            "statusCode": "S1000",
            "statusDetail": "SUCCESS",
            "subscriptionStatus": "REGISTERED"
        };
        O.setStatusCode(object.statusCode);
        O.setVersion(object.version);
        O.setStatusDetail(object.statusDetail);
        O.setSubscriptionStatus(object.subscriptionStatus);
        expect(O.getString()).not.toEqual(JSON.stringify(object, undefined, 2));
    });
});
