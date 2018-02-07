function validateParams(req) {
    if (!req.query.accessToken && !(req.body && req.body.accessToken)) {
        return false;
    }

    if (!req.query.resources && !(req.body && req.body.resources)) {
        return false;
    }
}

module.exports = function (context, req) {
    context.log('Beginning start of chaos event');

    if (!validateParams(req)) {
        context.res = {
            status: 400,
            body: "Required params are accessToken and resources"
        };
        context.done();
    }
};
