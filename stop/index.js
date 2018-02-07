const validateParams = require('../utility').validateParams;

module.exports = function (context, req) {
    context.log('Beginning stop of chaos event');

    if (!validateParams(req, context.log)) {
        context.res = {
            status: 400,
            body: "Required params are accessToken and resources"
        };
        context.done();
    }
    else {
        context.log('Parameter validation passed');
        context.done();
    }
};
