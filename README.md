# Migration Control Client

Client application for the taz research project.

## Installation


### Database/ REST Client

- Clone `https://github.com/digitalmemex/dm4-migration-control`
- Download a build of deepametha and the plugin.
- Copy plugin into `deepametha/bundle-deploy`
- Run deepametha
- Login into the backend with username `admin` and no password
- Copy Session Hash shown in the shell
- Run `dm4-migration-control/scripts/import.sh <session-hash>` and wait


#### Available endpoints

- `/migrationcontrol/v1/de/countriesoverview`
- `/migrationcontrol/v1/de/country/<country-id>`
- `/migrationcontrol/v1/de/detentioncenters`
- `/migrationcontrol/v1/de/backgroundoverview`
- `/migrationcontrol/v1/de/background/<background-id>`
- `/migrationcontrol/v1/de/imprint`
- `/migrationcontrol/v1/de/theses/`


### Client

`npm install`


#### Development builds

`npm run build`

Watch for changes:

`npm run watch`

#### Production builds

`ENV='production' npm run build`
