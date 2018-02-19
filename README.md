# hyperapp-idle

Notifies your app when the user is idle.

Inspired by [react-idle](https://github.com/ReactTraining/react-idle).

## Installation

```
npm install hyperapp-idle
# or with yarn
yarn add hyperapp-idle
```

## Usage

### With a render prop

```js
import { h, app } from 'hyperapp';
import { Idle } from 'hyperapp-idle';

const state = {
  idle: false
};

const actions = {
  updateIdle = idle => state => ({ idle })
};

const view = (state, actions) => (
  <main>
    <Idle
      onChange={actions.updateIdle}
      idle={state.idle}
      timeoutDuration={2000} // time before user is idle in milliseconds, defaults to 1000
      events={['mousemove', 'keydown']} // array of listened events, defaults to ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
      render={({ idle }) => <div>{idle ? 'You are idle.' : 'You are active.'}</div>}
    />
  </main>
)

app(state, actions, view, document.body);
```

### With component injection

```js
import { h, app } from 'hyperapp';
import { Idle } from 'hyperapp-idle';

const state = {
  idle: false
};

const actions = {
  updateIdle = idle => state => ({ idle })
};

const IdleComponent = ({ idle }) => (
  <div>{idle ? 'You are idle.' : 'You are active.'}</div>
)

const view = (state, actions) => (
  <main>
    <Idle
      onChange={actions.updateIdle}
      idle={state.idle}
      timeoutDuration={2000} // time before user is idle in milliseconds, defaults to 1000
      events={['mousemove', 'keydown']} // array of listenedevents, defaults to ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
      component={IdleComponent}
    />
  </main>
)

app(state, actions, view, document.body);
```

NB: you should not set both component and render props. If you were to do this, the render prop would be ignored.
