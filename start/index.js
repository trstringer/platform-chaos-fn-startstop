const chaosFnUtility = require('azure-chaos-fn');
const webSiteManagementClient = require('azure-arm-website');

function stopWebSite(credential, subscriptionId, resourceGroupName, resourceName, logger) {
    const client = new webSiteManagementClient(credential, subscriptionId);
    logger(`Stopping web app ${resourceName} in resource group ${resourceGroupName}`);
    return client.webApps.stop(
        resourceGroupName,
        resourceName
    );
}

module.exports = function (context, req) {
    context.log('Beginning start of chaos event');

    if (!chaosFnUtility.validateParams(req, context.log)) {
        context.res = {
            status: 400,
            body: "Required params are accessToken and resources"
        };
        context.done();
    }
    else {
        context.log('Parameter validation passed');
        context.log('Stopping websites');
        const credential = chaosFnUtility.parsers.accessTokenToCredentials(req);
        const resources = chaosFnUtility.parsers.resourcesToObjects(req);
        Promise.all(resources.map(resource => stopWebSite(
                credential,
                resource.subscriptionId,
                resource.resourceGroupName,
                resource.resourceName,
                context.log
        )))
            .then(() => {
                context.log('Completed stopping websites');
                context.done();
            })
            .catch(err => {
                context.log('Error stopping websites');
                context.log(err);
                context.done();
            });
    }
};
