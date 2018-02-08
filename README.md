# Azure Chaos Web App Start and Stop

This is the extension for [azure-chaos](https://github.com/bengreenier/azure-chaos) that starts and stops a web app.

This is meant to be deployed as an Azure Function.

## Setup

1. Clone this repository to your localhost
1. Create an Azure Function App in your subscription
1. Setup deployment from a local git repository
1. Add the remote Azure repository to your local git repository (`git remote add azure <git_repo_url_from_portal>`)
1. Push to the remote: `git push azure master`
