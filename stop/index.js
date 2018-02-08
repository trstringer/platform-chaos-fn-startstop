const chaosFnUtility = require('azure-chaos-fn');
const webSiteManagementClient = require('azure-arm-website');

function startWebSite(credential, subscriptionId, resourceGroupName, resourceName, logger) {
    const client = new webSiteManagementClient(credential, subscriptionId);
    logger(`Starting web app ${resourceName} in resource group ${resourceGroupName}`);
    return client.webApps.start(
        resourceGroupName,
        resourceName
    );
}

module.exports = function (context, req) {
    context.log('Beginning stop of chaos event');

    if (!chaosFnUtility.validateParams(req, context.log)) {
        context.res = {
            status: 400,
            body: "Required params are accessToken and resources"
        };
        context.done();
    }
    else {
        context.log('Parameter validation passed');
        context.log('Starting websites');
        const parsedParams = chaosFnUtility.parseParams(req, context.log);
        const credential = chaosFnUtility.generateCredential(parsedParams.accessToken);
        Promise.all(parsedParams.resources.map(resource => startWebSite(
                credential,
                resource.subscriptionId,
                resource.resourceGroupName,
                resource.resourceName,
                context.log
        )))
            .then(() => {
                context.log('Completed starting websites');
                context.done();
            })
            .catch(err => {
                context.log('Error starting websites');
                context.log(err);
                context.done();
            });
    }
};
