# EventTracker

## Installation
```bash
$ npm i --save 'git+ssh://git@github.com:rentpath/event-tracker.js.git'
```

## Usage
```javascript
import Tracker from 'event-tracker'

const tealiumConfig = {
  env: 'dev',
  account: 'rentpath',
  profile: 'rent.com'
}

const tracker = Tracker.create({
  providers: [
    ['Tealium', tealiumConfig]
  ],
  trackers: [
    'View',
    'Click',
    'Select'
  ],
  reducers: [
    'Session',
    'Browser',
    'Device',
    'Element'
  ]
})
```

## Scripts
* `npm run compile` - Compiles the module to disk (~/lib).
* `npm run compile:watch` - Same as `npm run compile` but watches files for changes.
* `npm run lint` - Lints all files.
* `npm run lint:fix` - Lints all files and attempts to fix any issues.
* `npm run test` - Runs unit tests.
* `npm run test:watch` - Same as `npm test` but watches files for changes.
* `npm run test:cov` - Generates a test coverage report.

## Distribution
Execute one of the following commands
```bash
npm version patch -m "bump to %s"
npm version minor -m "bump to %s"
npm version major -m "bump to %s"
```
