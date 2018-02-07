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
    const resourcesRaw = req.query.resources || req.body.resources;
    let resources = [];

    logger(`accessToken: ${accessToken}`);
    logger(`resourcesRaw: ${resourcesRaw}`);

    let i;
    let regexMatch;
    for (i = 0; i < resourcesRaw.length; i++) {
        regexMatch = resourcesRaw[i].match(/(\w+)\/(\w+)\/(\w+)/);
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
