const assert = require('assert')

let beforeEachCalled
  , actionCalled
  , afterEachCalled

beforeEach(() => {
  beforeEachCalled = true
  afterEachCalled = false
})

afterEach(() => {
  afterEachCalled = true
})

action('check if action is called', () => {
  actionCalled = true
})

setTimeout(() => {
  assert(actionCalled, 'The "check if action is called" action did not run')
}, 10)

action('check if beforeEach handler was called', () => {
  assert(beforeEachCalled, 'beforeEach handler was not called')
})

action('check if afterEachCalled was set to false', () => {
  assert(afterEachCalled === false, 'afterEachCalled was not reset in beforeEach')
})

setTimeout(() => {
  assert(afterEachCalled, 'The afterEach handler was not called')
}, 10)

let actionWasPerformed = false
action('action to be performed', () => {
  actionWasPerformed = true
})

action('an action can be called with perform', async () => {
  actionWasPerformed = false
  await perform('action to be performed')
  assert(actionWasPerformed, 'perform(actionName) did not perform the action')
})
