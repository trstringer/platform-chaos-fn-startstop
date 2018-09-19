const chaosFnUtility = require('platform-chaos');
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
    chaosFnUtility.auditer.initialize(context, { eventName: 'stopWebSite', resources: req.body.resources.join(',')})
    context.log('Beginning start of chaos event');
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
};
