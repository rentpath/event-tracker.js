# EventTracker
A library for capturing and distributing event tracking data.

## Installation
```bash
$ npm i --save 'git+ssh://git@github.com:rentpath/event-tracker.js.git'
```

## Usage
Create a new `EventTracker` instance, specifying which providers, trackers, and reducers to use.
```javascript
const tracker = EventTracker.create({
  providers: [
    ['Tealium', { env: 'dev', account: 'rentpath', profile: 'rent.com' }]
  ],
  trackers: [
    'Click',
    'Select'
  ],
  reducers: [
    'Session',
    'Element'
  ]
})
```

## Configuration
Each `EventTracker` instance needs to be configured to use at least a single provider, and optionally one or more trackers and reducers.

### Providers
Providers are 3rd party tag analytics services that offer custom event tracking, such as Tealium, Google Tag Manager or Adobe. In the context of `EventTracker` they are implemented as proxy adapters to the API's offered by each service.

#### `Tealium`
[Tealium](http://tealium.com) is a real-time data platform and tag management service. It is the only provider currently supported natively by `EventTracker`.

##### Options
| Option | Type | Default | Description         |
| --- | --- | --- | ---
| `env` | string | `dev` | The TealiumIQ environment.  Options are `dev`, 'qa', `prod`.
| `account` | string | `rentpath` | The TealiumIQ account name.
| `profile` | string | `null` | The TealiumIQ profile name.


### Trackers
Trackers are observers that listen for native DOM events, and record corresponding tracking actions. The following trackers are currently supported:

#### `View`
Records a `view` action on page load (`DOMContentLoaded`).
#### `Click`
Records a `click` action on all native click events.
#### `Select`
Records a `select` action on all native `change` events.
#### `Form`
Records a `submit` action on all native `submit` events.

### Reducers
Named after the `reduce` method found in many programming languages, reducers are utilities for adding additional information to each tracking event that gets dispatched.  They are called `reducers` because they are implemented as functions that receive the data payload as an argument, and whatever they return gets sent to the provider adapter.  The following reducers are currently supported:

#### `Device`
Adds information about the device being used.

##### Provided Data
| Field | Description
| --- | ---
| screen_type | The type of device being used, determined by screen size.
| screen_resolution | The device screen size.
| operating_system | The device operating system.

##### Options
| Option | Type | Default | Description         |
| --- | --- | --- | ---
| `breakpoints` | object | `{ mobile: 0, tablet: 768, desktop: 1024 }` | An object whose keys represent screen types, and values represent breakpoint thresholds.

#### `Browser`
Adds information about the browser being used.

##### Provided Data
| Field | Description
| --- | ---
| browser | The browser type (e.g. Chrome)
| browser_size | The browser size (width x height)
| browser_version | The browser version

#### `Request`
Adds information about the current page request.

##### Provided Data
| Field | Description
| --- | ---
| url | The url of the current page.
| path | The pathname of the current url.
| hash | The url hash.
| domain | The current domain.
| query_string | The query string on the current url.

#### `Meta`
Adds data collected from meta tags.

##### Options
| Option | Type | Default | Description         |
| --- | --- | --- | ---
| `filter` | string | `null` | A DOM selector used to filter which meta tags to use.

#### `Session`
Adds session/visitor ID.

##### Options
| Option | Type | Default | Description         |
| --- | --- | --- | ---
| `visitorKey` | string | `rp_visitor_id` | The name of the cookie used to store the visitor ID.
| `sessionKey` | string | `rp_session_id` | The name of the cookie used to store the session ID.
| `visitorAge` | int | `86400 * 365 * 5 * 1000` (5 years) | The expiry age of the visitor cookie in milliseconds.
| `sessionAge` | int | `30 * 60 * 1000` (30 minutes) | The expiry age of the session cookie in milliseconds.

##### Provided Data
| Field | Description
| --- | ---
| visitor_id | The unique ID used to identify a user.
| visit_id | A unique ID used to identify a user session.

#### `Element`
Adds data collected from `data` tags placed on DOM nodes associated with native events (e.g. `click` events).

##### Options
| Option | Type | Default | Description         |
| --- | --- | --- | ---
| `tagPrefix` | string | `data-tag_` | The beginning part of the node attribute used to extract data.


## API
#####EventTracker.create(config)
Creates a new tracker instance.
```javascript
const tracker = EventTracker.create({ ... })
```

#####tracker.track(action, [props])
Records a custom user action.
```javascript
tracker.track('user_registration', { userId: 123 })
```

#####tracker.view([props])
Records a page view action.
```javascript
tracker.view({ page: 'home' })
```

#####tracker.include(props, merge = true)
Attaches additional data to every subsequent tracking event.  Data is merged by default if called multiple times, unless the `merge` argument is false, in which case any existing data is overwritten. *Note: data does not persist between separate page loads.*
```javascript
tracker.include({ browser: 'Chrome' })
```

## Development

#### Scripts
* `npm run compile` - Compiles the module to disk (~/lib).
* `npm run compile:watch` - Same as `npm run compile` but watches files for changes.
* `npm run lint` - Lints all files.
* `npm run lint:fix` - Lints all files and attempts to fix any issues.
* `npm run test` - Runs unit tests.
* `npm run test:watch` - Same as `npm test` but watches files for changes.
* `npm run test:cov` - Generates a test coverage report.

#### Distribution
Execute one of the following commands
```bash
npm version patch -m "bump to %s"
npm version minor -m "bump to %s"
npm version major -m "bump to %s"
```
