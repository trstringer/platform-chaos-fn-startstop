const chaosFnUtility = require('platform-chaos');
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
    chaosFnUtility.auditer.initialize(context, { eventName: 'startWebSite', resources: req.body.resources.join(',')})
    context.log('Beginning stop of chaos event');
    context.log('Starting websites');
    const credential = chaosFnUtility.parsers.accessTokenToCredentials(req);
    const resources = chaosFnUtility.parsers.resourcesToObjects(req);
    Promise.all(resources.map(resource => startWebSite(
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
};
