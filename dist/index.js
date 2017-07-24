'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var indent = function indent(string, level) {
  return string.split('\n').map(function (line) {
    return ' '.repeat(level) + line;
  }).join('\n');
};
var chalk = require('chalk');
var log = function log() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (process.env.DEBUG_ACTION_TEST) {
    var _console;

    (_console = console).log.apply(_console, [chalk.cyan('[debug action test]')].concat(args));
  }
};

var path = require('path');
var cwd = process.cwd();
var filenames = process.argv.slice(2).map(function (filename) {
  return path.resolve(cwd, filename);
});

log('Running tests in ' + filenames.join(', '));
log('Running tests from: ' + cwd);

var beforeEachHandlers = [];
var afterEachHandlers = [];
var actionList = [];
var actions = {};

global.beforeEach = function (fn) {
  beforeEachHandlers.push(fn);
};

global.afterEach = function (fn) {
  afterEachHandlers.push(fn);
};

global.action = function (name, fn) {
  log('Registering action: "' + name + '"');
  actions[name] = fn;
  actionList.push(name);
};

global.perform = function (actionName) {
  return actions[actionName]();
};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = filenames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var filename = _step.value;

    require(filename);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

setTimeout(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, actionName, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _fn, fn, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _fn2;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 3;
          _iterator2 = actionList[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 76;
            break;
          }

          actionName = _step2.value;

          log('Executing beforeEach handlers');

          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context.prev = 11;
          _iterator3 = beforeEachHandlers[Symbol.iterator]();

        case 13:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context.next = 20;
            break;
          }

          _fn = _step3.value;
          _context.next = 17;
          return _fn();

        case 17:
          _iteratorNormalCompletion3 = true;
          _context.next = 13;
          break;

        case 20:
          _context.next = 26;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context['catch'](11);
          _didIteratorError3 = true;
          _iteratorError3 = _context.t0;

        case 26:
          _context.prev = 26;
          _context.prev = 27;

          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }

        case 29:
          _context.prev = 29;

          if (!_didIteratorError3) {
            _context.next = 32;
            break;
          }

          throw _iteratorError3;

        case 32:
          return _context.finish(29);

        case 33:
          return _context.finish(26);

        case 34:

          log('Executing action: ' + actionName);
          fn = actions[actionName];
          _context.prev = 36;
          _context.next = 39;
          return fn();

        case 39:
          console.log(chalk.green('Pass: "' + actionName + '"'));
          _context.next = 47;
          break;

        case 42:
          _context.prev = 42;
          _context.t1 = _context['catch'](36);

          console.log(chalk.red('Fail: ' + actionName));
          if (typeof _context.t1 === 'string') {
            console.log(chalk.red('[action test] Don\'t throw strings.'));
            console.log();
            console.log(chalk.red(_context.t1));
            console.log();
          } else {
            console.log();
            console.log(indent(chalk.red(_context.t1.stack), 4));
            console.log();
          }
          process.exit(1);

        case 47:
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context.prev = 50;
          _iterator4 = afterEachHandlers[Symbol.iterator]();

        case 52:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context.next = 59;
            break;
          }

          _fn2 = _step4.value;
          _context.next = 56;
          return _fn2();

        case 56:
          _iteratorNormalCompletion4 = true;
          _context.next = 52;
          break;

        case 59:
          _context.next = 65;
          break;

        case 61:
          _context.prev = 61;
          _context.t2 = _context['catch'](50);
          _didIteratorError4 = true;
          _iteratorError4 = _context.t2;

        case 65:
          _context.prev = 65;
          _context.prev = 66;

          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }

        case 68:
          _context.prev = 68;

          if (!_didIteratorError4) {
            _context.next = 71;
            break;
          }

          throw _iteratorError4;

        case 71:
          return _context.finish(68);

        case 72:
          return _context.finish(65);

        case 73:
          _iteratorNormalCompletion2 = true;
          _context.next = 5;
          break;

        case 76:
          _context.next = 82;
          break;

        case 78:
          _context.prev = 78;
          _context.t3 = _context['catch'](3);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t3;

        case 82:
          _context.prev = 82;
          _context.prev = 83;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 85:
          _context.prev = 85;

          if (!_didIteratorError2) {
            _context.next = 88;
            break;
          }

          throw _iteratorError2;

        case 88:
          return _context.finish(85);

        case 89:
          return _context.finish(82);

        case 90:

          process.stdout.write('\n');

        case 91:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[3, 78, 82, 90], [11, 22, 26, 34], [27,, 29, 33], [36, 42], [50, 61, 65, 73], [66,, 68, 72], [83,, 85, 89]]);
})));