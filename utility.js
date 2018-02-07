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

module.exports.parseParams = (req, logger) => {
    const accessToken = req.query.accessToken || req.body.accessToken;
    let resourcesRaw = req.query.resources || req.body.resources;

    let resources = [];

    let i;
    let regexMatch;
    for (i = 0; i < resourcesRaw.length; i++) {
        logger(`... working on ${resourcesRaw[i]}`);
        regexMatch = resourcesRaw[i].match(/(.+)\/(.+)\/(.+)/);
        logger(regexMatch);
        resources.push({
            subscriptionId: regexMatch[1],
            resourceGroupName: regexMatch[2],
            resourceName: regexMatch[3]
        });
    }

    return {
        accessToken,
        resources
    };
};

module.exports.generateCredential = (accessToken) => {
    return {
        accessToken
    };
};
