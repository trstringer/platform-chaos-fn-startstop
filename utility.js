module.exports.validateParams = (req, logger) => {
    if (!req.query.accessToken && !(req.body && req.body.accessToken)) {
        logger('accessToken not passed');
        return false;
    }

    if (!req.query.resources && !(req.body && req.body.resources)) {
        logger('resources not passed');
        return false;
    }

    return true;
};
