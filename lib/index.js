const indent = (string, level) => {
  return string.split('\n').map(line => ' '.repeat(level) + line).join('\n')
}
const chalk = require('chalk')
const log = (...args) => {
  if (process.env.DEBUG_ACTION_TEST) {
    console.log(chalk.cyan('[debug action test]'), ...args)
  }
}

const path = require('path')
const cwd = process.cwd()
const filenames = process.argv.slice(2).map(filename => path.resolve(cwd, filename))

log(`Running tests in ${filenames.join(', ')}`)
log(`Running tests from: ${cwd}`)

const beforeEachHandlers = []
const afterEachHandlers = []
const actionList = []
const actions = {}

global.beforeEach = function (fn) {
  beforeEachHandlers.push(fn)
}

global.afterEach = function (fn) {
  afterEachHandlers.push(fn)
}

global.action = function(name, fn) {
  log(`Registering action: "${name}"`)
  actions[name] = fn
  actionList.push(name)
}

global.perform = function(actionName) {
  return actions[actionName]()
}

for (const filename of filenames) {
  require(filename)
}

setTimeout(async () => {
  for (const actionName of actionList) {
    log('Executing beforeEach handlers')

    for (const fn of beforeEachHandlers) {
      await fn()
    }

    log(`Executing action: ${actionName}`)
    const fn = actions[actionName]

    try {
      await fn()
      console.log(chalk.green(`Pass: "${actionName}"`))
    } catch (error) {
      console.log(chalk.red(`Fail: ${actionName}`))
      if (typeof error === 'string') {
        console.log(chalk.red('[action test] Don\'t throw strings.'))
        console.log()
        console.log(chalk.red(error))
        console.log()
      } else {
        console.log()
        console.log(indent(chalk.red(error.stack), 4))
        console.log()
      }
      process.exit(1)
    }

    for (const fn of afterEachHandlers) {
      await fn()
    }
  }

  process.stdout.write('\n')
})
