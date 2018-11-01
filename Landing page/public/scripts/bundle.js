/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _draggable = __webpack_require__(7);

var _draggable2 = _interopRequireDefault(_draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DragHandler = function () {
    function DragHandler(element, origin) {
        var _this = this;

        var maxDistance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 70;

        _classCallCheck(this, DragHandler);

        this.maxDistance = maxDistance;
        this.inTarget = false;
        this.origin = origin || { x: 0, y: 0 };
        this.targetRect = null;
        this.onEndCb = this.onStartCb = this.onMoveCb = null;
        this.container = element;
        this.container.style.cursor = 'move';
        this.draggable = new _draggable2.default(this.container, {
            useGPU: true,
            limit: {
                x: [0, window.innerWidth],
                y: [0, window.innerHeight]
            },
            onDragStart: function onDragStart(element, x, y, event) {
                _this.container.classList.add('over-droppable');
                _this.targetRect = window.app.game.vase.container.getBoundingClientRect();
                if (_this.onStartCb) {
                    var ret = {
                        element: element,
                        position: element.getBoundingClientRect(),
                        event: event
                    };
                    ret.inTarget = _this.isInRect(ret.position);
                    _this.onStartCb(ret);
                }
            },
            onDrag: function onDrag(element, x, y, event) {
                var ret = {
                    element: element,
                    position: element.getBoundingClientRect(),
                    event: event
                };
                ret.inTarget = _this.isInRect(ret.position);
                if (_this.onMoveCb) _this.onMoveCb(ret);
            },
            onDragEnd: function onDragEnd(element, x, y, event) {
                _this.container.classList.remove('over-droppable');
                var ret = {
                    element: element,
                    position: element.getBoundingClientRect(),
                    event: event
                };
                ret.inTarget = _this.isInRect(ret.position);
                if (ret.inTarget) _this.droppedOnTarget();
                _this.onExitDroppable();
                _this.container.style.transitionDuration = '1s';
                _this.container.style.pointerEvents = 'none';
                _this.container.style.top = '';
                _this.container.style.left = '';
                after(1000, function () {
                    _this.container.style.transitionDuration = '0s';
                    _this.container.style.pointerEvents = 'auto';
                });
                if (_this.onEndCb) _this.onEndCb(ret);
            }
        });
    }

    _createClass(DragHandler, [{
        key: 'onStart',
        value: function onStart(cb) {
            this.onStartCb = cb;
        }
    }, {
        key: 'onMove',
        value: function onMove(cb) {
            this.onMoveCb = cb;
        }
    }, {
        key: 'onEnd',
        value: function onEnd(cb) {
            this.onEndCb = cb;
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.container.style.transitionDuration = '1s';
            this.container.style.right = '';
            this.container.style.bottom = '';
            this.draggable.destroy();
        }
    }, {
        key: 'onEnterDroppable',
        value: function onEnterDroppable() {
            window.app.game.vase.container.classList.add('draggable-over');
        }
    }, {
        key: 'onExitDroppable',
        value: function onExitDroppable() {
            window.app.game.vase.container.classList.remove('draggable-over');
        }
    }, {
        key: 'droppedOnTarget',
        value: function droppedOnTarget() {
            window.app.game.vase.onDrop(this.container);
        }
    }, {
        key: 'isInRect',
        value: function isInRect(position) {
            var rect = this.targetRect;
            var targetCenterX = rect.left + rect.width / 2;
            var targetCenterY = rect.top + rect.height / 2;
            var distance = Math.sqrt(Math.pow(targetCenterX - position.left - this.origin.x, 2) + Math.pow(targetCenterY - position.top - this.origin.y, 2));
            var newInTargetCalculated = distance < this.maxDistance;
            if (this.inTarget && !newInTargetCalculated) this.onExitDroppable();else if (!this.inTarget && newInTargetCalculated) this.onEnterDroppable();
            this.inTarget = newInTargetCalculated;
            return newInTargetCalculated;
        }
    }]);

    return DragHandler;
}();

exports.default = DragHandler;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Game = __webpack_require__(2);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.$ = function (query) {
    return document.querySelector(query);
};
window.$$ = function (query) {
    return document.querySelectorAll(query);
};

window.after = function (time, doWhat) {
    return setTimeout(doWhat, time);
};
window.every = function (time, doWhat) {
    return setInterval(doWhat, time);
};

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.game = new _Game2.default(this);
        this.enterButton = $('.intro button');
        this.outroBox = $('.outro');
        this.init();
    }

    _createClass(App, [{
        key: 'init',
        value: function init() {
            var _this = this;

            window.onload = this.ready.bind(this);
            this.enterButton.addEventListener('click', function () {
                return _this.game.unBox();
            });
        }
    }, {
        key: 'ready',
        value: function ready() {}
    }, {
        key: 'whenGameIsDone',
        value: function whenGameIsDone() {
            var _this2 = this;

            this.game.container.classList.add('done');
            after(1000, function () {
                return _this2.outroBox.classList.add('show');
            });
        }
    }]);

    return App;
}();

window.app = new App();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Box = __webpack_require__(3);

var _Box2 = _interopRequireDefault(_Box);

var _Vase = __webpack_require__(4);

var _Vase2 = _interopRequireDefault(_Vase);

var _Paper = __webpack_require__(5);

var _Paper2 = _interopRequireDefault(_Paper);

var _Soil = __webpack_require__(6);

var _Soil2 = _interopRequireDefault(_Soil);

var _Seed = __webpack_require__(8);

var _Seed2 = _interopRequireDefault(_Seed);

var _Glasses = __webpack_require__(9);

var _Glasses2 = _interopRequireDefault(_Glasses);

var _iPhone = __webpack_require__(10);

var _iPhone2 = _interopRequireDefault(_iPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(app) {
        _classCallCheck(this, Game);

        this.app = app;
        this.container = $('.game');
        this.box = new _Box2.default('.game .box');
        this.vase = new _Vase2.default('.game .vase', this);
        this.paper = new _Paper2.default('.game .paper', this);
        this.soil = new _Soil2.default('.game .soil');
        this.seed = new _Seed2.default('.game .seed');
        this.glasses = new _Glasses2.default('.game .glasses');
        this.iphone = new _iPhone2.default('.game .iphone');
    }

    _createClass(Game, [{
        key: 'unBox',
        value: function unBox() {
            var _this = this;

            $('.intro').classList.add('hide');
            this.box.open().then(function () {
                after(500, function () {
                    after(200, function () {
                        return _this.seed.comeOut();
                    });
                    after(1000, function () {
                        return _this.soil.comeOut();
                    });
                    after(2000, function () {
                        return _this.vase.comeOut();
                    });
                    after(2100, function () {
                        return _this.paper.comeOut();
                    });
                    after(2500, function () {
                        return _this.glasses.comeOut();
                    });
                    after(7000, function () {
                        return _this.paper.next();
                    });
                });
            });
        }
    }, {
        key: 'onDone',
        value: function onDone() {
            var _this2 = this;

            this.paper.bold();
            after(2000, function () {
                _this2.seed.getOut();
                _this2.soil.getOut();
                _this2.paper.getOut();
                _this2.glasses.getOut();
                after(1000, function () {
                    return _this2.app.whenGameIsDone();
                });
            });
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
    function Box(query) {
        _classCallCheck(this, Box);

        this.container = $(query);
        this.closeBoxImage = $(query + ' .closed');
        window.addEventListener('resize', this.fixSizes.bind(this));
    }

    _createClass(Box, [{
        key: 'goBack',
        value: function goBack() {
            this.container.classList.add('back');
        }
    }, {
        key: 'fixSizes',
        value: function fixSizes() {
            window.areaDistFromTop = this.closeBoxImage.getBoundingClientRect().top;
            $('.game > .area').style.top = areaDistFromTop + 'px';
            $('.game > .area').style.height = window.innerHeight - areaDistFromTop + 'px';
        }
    }, {
        key: 'open',
        value: function open() {
            var _this = this;

            return new Promise(function (resolve) {
                _this.goBack();
                after(1200, function () {
                    _this.container.classList.add('open');
                    _this.fixSizes();
                    resolve();
                });
            });
        }
    }, {
        key: 'close',
        value: function close() {
            this.fixSizes();
            this.container.classList.remove('open');
        }
    }]);

    return Box;
}();

exports.default = Box;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vaseEvolutionQueue = ['empty', 'soiled', 'seeded', 'filled', 'wet', 'green-little', 'green-medium', 'green-full'];
var levels = ['soil', 'seed', 'soil', 'water', 'water', 'water'];

var Vase = function () {
    function Vase(query, game) {
        _classCallCheck(this, Vase);

        this.game = game;
        this.container = $(query);
        this.state = 'empty';
    }

    _createClass(Vase, [{
        key: 'comeOut',
        value: function comeOut() {
            var _this = this;

            this.container.classList.add('out');
            after(2000, function () {
                _this.container.style.transitionDuration = '0.3s';
            });
        }
    }, {
        key: 'next',
        value: function next() {
            var nextIndex = vaseEvolutionQueue.indexOf(this.state) + 1;
            this.state = vaseEvolutionQueue[Math.min(nextIndex, vaseEvolutionQueue.length - 1)];
            if (this.state === 'wet') {
                after(600, this.game.iphone.unlock(10000));
                after(300, this.next.bind(this));
            }
            if (!['wet', 'green-little', 'green-medium'].includes(this.state)) this.game.paper.next();
        }
    }, {
        key: 'onDrop',
        value: function onDrop(element) {
            var dropped = element.getAttribute('data-name');
            if (dropped === levels[0]) {
                levels.shift();
                this.next();
            }
        }
    }, {
        key: 'state',
        set: function set(to) {
            this._state = to;
            this.container.setAttribute('data-state', to);
        },
        get: function get() {
            return this._state;
        }
    }]);

    return Vase;
}();

exports.default = Vase;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Paper = function () {
    function Paper(query, game) {
        _classCallCheck(this, Paper);

        this.game = game;
        this.container = $(query);
        this.items = $$(query + ' li');
        this.itemIndex = 0;
    }

    _createClass(Paper, [{
        key: 'comeOut',
        value: function comeOut() {
            this.container.classList.add('out');
        }
    }, {
        key: 'getOut',
        value: function getOut() {
            this.container.classList.add('out-page');
        }
    }, {
        key: 'bold',
        value: function bold() {
            var _this = this;

            this.container.classList.add('bold');
            after(2000, function () {
                return _this.container.classList.remove('bold');
            });
        }
    }, {
        key: 'next',
        value: function next() {
            var _this2 = this;

            var duration = this.itemIndex === 0 ? 0 : 1000;
            var indexIterator = this.itemIndex;
            if (this.itemIndex > 0) {
                while (indexIterator > 0) {
                    indexIterator--;
                    this.items[indexIterator].classList.add('tick');
                }
            }
            if (this.itemIndex < this.items.length) after(duration, function () {
                _this2.bold();
                if (!_this2.items[_this2.itemIndex].classList.contains('tick')) {
                    _this2.items[_this2.itemIndex].classList.add('active');
                }
                _this2.itemIndex++;
            });else {
                this.game.onDone();
            }
        }
    }]);

    return Paper;
}();

exports.default = Paper;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DragHandler = __webpack_require__(0);

var _DragHandler2 = _interopRequireDefault(_DragHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Soil = function () {
    function Soil(query) {
        var _this = this;

        _classCallCheck(this, Soil);

        this.container = $(query);
        window.addEventListener('resize', function () {
            _this.container.style.top = '';
            _this.container.style.left = '';
        });
    }

    _createClass(Soil, [{
        key: 'getOut',
        value: function getOut() {
            this.draggable.destroy();
            this.container.classList.add('out-page');
        }
    }, {
        key: 'makeDraggable',
        value: function makeDraggable() {
            this.container.style.transitionDuration = '0s';
            this.draggable = new _DragHandler2.default(this.container, { x: 100, y: 0 }, 150);
        }
    }, {
        key: 'comeOut',
        value: function comeOut() {
            this.container.classList.add('out');
            after(1000, this.makeDraggable.bind(this));
        }
    }]);

    return Soil;
}();

exports.default = Soil;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

!function(a,b){ true?module.exports=b():"function"==typeof define&&define.amd?define([],b):a.Draggable=b()}(this,function(){"use strict";function a(a,b){var c=this,d=k.bind(c.start,c),e=k.bind(c.drag,c),g=k.bind(c.stop,c);if(!f(a))throw new TypeError("Draggable expects argument 0 to be an Element");b=k.assign({},i,b),k.assign(c,{element:a,handle:b.handle&&f(b.handle)?b.handle:a,handlers:{start:{mousedown:d,touchstart:d},move:{mousemove:e,mouseup:g,touchmove:e,touchend:g}},options:b}),c.initialize()}function b(a){return parseInt(a,10)}function c(a){return"currentStyle"in a?a.currentStyle:getComputedStyle(a)}function d(a){return a instanceof Array}function e(a){return void 0!==a&&null!==a}function f(a){return a instanceof Element||"undefined"!=typeof HTMLDocument&&a instanceof HTMLDocument}function g(a){return a instanceof Function}function h(){}var i={grid:0,filterTarget:null,limit:{x:null,y:null},threshold:0,setCursor:!1,setPosition:!0,smoothDrag:!0,useGPU:!0,onDrag:h,onDragStart:h,onDragEnd:h},j={transform:function(){for(var a=" -o- -ms- -moz- -webkit-".split(" "),b=document.body.style,c=a.length;c--;){var d=a[c]+"transform";if(d in b)return d}}()},k={assign:function(){for(var a=arguments[0],b=arguments.length,c=1;b>c;c++){var d=arguments[c];for(var e in d)a[e]=d[e]}return a},bind:function(a,b){return function(){a.apply(b,arguments)}},on:function(a,b,c){if(b&&c)k.addEvent(a,b,c);else if(b)for(var d in b)k.addEvent(a,d,b[d])},off:function(a,b,c){if(b&&c)k.removeEvent(a,b,c);else if(b)for(var d in b)k.removeEvent(a,d,b[d])},limit:function(a,b){return d(b)?(b=[+b[0],+b[1]],a<b[0]?a=b[0]:a>b[1]&&(a=b[1])):a=+b,a},addEvent:"attachEvent"in Element.prototype?function(a,b,c){a.attachEvent("on"+b,c)}:function(a,b,c){a.addEventListener(b,c,!1)},removeEvent:"attachEvent"in Element.prototype?function(a,b,c){a.detachEvent("on"+b,c)}:function(a,b,c){a.removeEventListener(b,c)}};return k.assign(a.prototype,{setOption:function(a,b){var c=this;return c.options[a]=b,c.initialize(),c},get:function(){var a=this.dragEvent;return{x:a.x,y:a.y}},set:function(a,b){var c=this,d=c.dragEvent;return d.original={x:d.x,y:d.y},c.move(a,b),c},dragEvent:{started:!1,x:0,y:0},initialize:function(){var a,b=this,d=b.element,e=(b.handle,d.style),f=c(d),g=b.options,h=j.transform,i=b._dimensions={height:d.offsetHeight,left:d.offsetLeft,top:d.offsetTop,width:d.offsetWidth};g.useGPU&&h&&(a=f[h],"none"===a&&(a=""),e[h]=a+" translate3d(0,0,0)"),g.setPosition&&(e.display="block",e.left=i.left+"px",e.top=i.top+"px",e.bottom=e.right="auto",e.margin=0,e.position="absolute"),g.setCursor&&(e.cursor="move"),b.setLimit(g.limit),k.assign(b.dragEvent,{x:i.left,y:i.top}),k.on(b.handle,b.handlers.start)},start:function(a){var b=this,c=b.getCursor(a),d=b.element;b.useTarget(a.target||a.srcElement)&&(a.preventDefault?a.preventDefault():a.returnValue=!1,b.dragEvent.oldZindex=d.style.zIndex,d.style.zIndex=1e4,b.setCursor(c),b.setPosition(),b.setZoom(),k.on(document,b.handlers.move))},drag:function(a){var b=this,c=b.dragEvent,d=b.element,e=b._cursor,f=b._dimensions,g=b.options,h=f.zoom,i=b.getCursor(a),j=g.threshold,k=(i.x-e.x)/h+f.left,l=(i.y-e.y)/h+f.top;!c.started&&j&&Math.abs(e.x-i.x)<j&&Math.abs(e.y-i.y)<j||(c.original||(c.original={x:k,y:l}),c.started||(g.onDragStart(d,k,l,a),c.started=!0),b.move(k,l)&&g.onDrag(d,c.x,c.y,a))},move:function(a,b){var c=this,d=c.dragEvent,e=c.options,f=e.grid,g=c.element.style,h=c.limit(a,b,d.original.x,d.original.y);return!e.smoothDrag&&f&&(h=c.round(h,f)),h.x!==d.x||h.y!==d.y?(d.x=h.x,d.y=h.y,g.left=h.x+"px",g.top=h.y+"px",!0):!1},stop:function(a){var b,c=this,d=c.dragEvent,e=c.element,f=c.options,g=f.grid;k.off(document,c.handlers.move),e.style.zIndex=d.oldZindex,f.smoothDrag&&g&&(b=c.round({x:d.x,y:d.y},g),c.move(b.x,b.y),k.assign(c.dragEvent,b)),c.dragEvent.started&&f.onDragEnd(e,d.x,d.y,a),c.reset()},reset:function(){this.dragEvent.started=!1},round:function(a){var b=this.options.grid;return{x:b*Math.round(a.x/b),y:b*Math.round(a.y/b)}},getCursor:function(a){return{x:(a.targetTouches?a.targetTouches[0]:a).clientX,y:(a.targetTouches?a.targetTouches[0]:a).clientY}},setCursor:function(a){this._cursor=a},setLimit:function(a){var b=this,c=function(a,b){return{x:a,y:b}};if(g(a))b.limit=a;else if(f(a)){var d=b._dimensions,h=a.scrollHeight-d.height,i=a.scrollWidth-d.width;b.limit=function(a,b){return{x:k.limit(a,[0,i]),y:k.limit(b,[0,h])}}}else if(a){var j={x:e(a.x),y:e(a.y)};b.limit=j.x||j.y?function(b,c){return{x:j.x?k.limit(b,a.x):b,y:j.y?k.limit(c,a.y):c}}:c}else b.limit=c},setPosition:function(){var a=this,c=a.element,d=c.style;k.assign(a._dimensions,{left:b(d.left)||c.offsetLeft,top:b(d.top)||c.offsetTop})},setZoom:function(){for(var a=this,b=a.element,d=1;b=b.offsetParent;){var e=c(b).zoom;if(e&&"normal"!==e){d=e;break}}a._dimensions.zoom=d},useTarget:function(a){var b=this.options.filterTarget;return b instanceof Function?b(a):!0},destroy:function(){k.off(this.handle,this.handlers.start),k.off(document,this.handlers.move)}}),a});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DragHandler = __webpack_require__(0);

var _DragHandler2 = _interopRequireDefault(_DragHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Seed = function () {
    function Seed(query) {
        var _this = this;

        _classCallCheck(this, Seed);

        this.container = $(query);
        window.addEventListener('resize', function () {
            _this.container.style.top = '';
            _this.container.style.left = '';
        });
    }

    _createClass(Seed, [{
        key: 'getOut',
        value: function getOut() {
            this.draggable.destroy();
            this.container.classList.add('out-page');
        }
    }, {
        key: 'makeDraggable',
        value: function makeDraggable() {
            this.container.style.transitionDuration = '0s';
            this.draggable = new _DragHandler2.default(this.container, { x: 50, y: 0 });
        }
    }, {
        key: 'comeOut',
        value: function comeOut() {
            this.container.classList.add('out');
            after(1000, this.makeDraggable.bind(this));
        }
    }]);

    return Seed;
}();

exports.default = Seed;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DragHandler = __webpack_require__(0);

var _DragHandler2 = _interopRequireDefault(_DragHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Glasses = function () {
    function Glasses(query) {
        var _this = this;

        _classCallCheck(this, Glasses);

        this.container = $(query);
        window.addEventListener('resize', function () {
            _this.container.style.top = '';
            _this.container.style.left = '';
        });
    }

    _createClass(Glasses, [{
        key: 'getOut',
        value: function getOut() {
            this.draggable.destroy();
            this.container.classList.add('out-page');
        }
    }, {
        key: 'makeDraggable',
        value: function makeDraggable() {
            this.container.style.transitionDuration = '0s';
            this.draggable = new _DragHandler2.default(this.container, { x: 0, y: 80 });
        }
    }, {
        key: 'comeOut',
        value: function comeOut() {
            this.container.classList.add('out');
            after(2000, this.makeDraggable.bind(this));
        }
    }]);

    return Glasses;
}();

exports.default = Glasses;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var iPhone = function () {
    function iPhone(query) {
        _classCallCheck(this, iPhone);

        this.container = $(query);
        this.clock = $(query + ' .clock');
        this.container.addEventListener('click', this.toggle.bind(this));
        this.lockingTimeout = null;
        this.animationRunningTimeout = null;
        this.locked = true;
    }

    _createClass(iPhone, [{
        key: 'unlock',
        value: function unlock(timeToLockAgain) {
            if (this.locked) {
                if (this.animationRunningTimeout) clearTimeout(this.animationRunningTimeout);
                this.locked = false;
                this.clock.classList.remove('pause');
                this.container.classList.add('unlock');
                if (timeToLockAgain) this.lockingTimeout = after(timeToLockAgain, this.lock.bind(this));
            }
        }
    }, {
        key: 'lock',
        value: function lock() {
            var _this = this;

            if (!this.locked) {
                this.locked = true;
                if (this.animationRunningTimeout) clearTimeout(this.animationRunningTimeout);
                this.animationRunningTimeout = after(300, function () {
                    return _this.clock.classList.add('pause');
                });
                this.container.classList.remove('unlock');
            }
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.lockingTimeout) clearTimeout(this.lockingTimeout);
            this.locked ? this.unlock(2000) : this.lock();
        }
    }]);

    return iPhone;
}();

exports.default = iPhone;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODZhYjdhZDg4MThlZWM4OGNhMzIiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RyYWdIYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0JveC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGFwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NvaWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RyYWdnYWJsZS9kaXN0L2RyYWdnYWJsZS5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NlZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dsYXNzZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lQaG9uZS5qcyJdLCJuYW1lcyI6WyJEcmFnSGFuZGxlciIsImVsZW1lbnQiLCJvcmlnaW4iLCJtYXhEaXN0YW5jZSIsImluVGFyZ2V0IiwieCIsInkiLCJ0YXJnZXRSZWN0Iiwib25FbmRDYiIsIm9uU3RhcnRDYiIsIm9uTW92ZUNiIiwiY29udGFpbmVyIiwic3R5bGUiLCJjdXJzb3IiLCJkcmFnZ2FibGUiLCJ1c2VHUFUiLCJsaW1pdCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsIm9uRHJhZ1N0YXJ0IiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHAiLCJnYW1lIiwidmFzZSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJldCIsInBvc2l0aW9uIiwiaXNJblJlY3QiLCJvbkRyYWciLCJvbkRyYWdFbmQiLCJyZW1vdmUiLCJkcm9wcGVkT25UYXJnZXQiLCJvbkV4aXREcm9wcGFibGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwb2ludGVyRXZlbnRzIiwidG9wIiwibGVmdCIsImFmdGVyIiwiY2IiLCJyaWdodCIsImJvdHRvbSIsImRlc3Ryb3kiLCJvbkRyb3AiLCJyZWN0IiwidGFyZ2V0Q2VudGVyWCIsIndpZHRoIiwidGFyZ2V0Q2VudGVyWSIsImhlaWdodCIsImRpc3RhbmNlIiwiTWF0aCIsInNxcnQiLCJwb3ciLCJuZXdJblRhcmdldENhbGN1bGF0ZWQiLCJvbkVudGVyRHJvcHBhYmxlIiwiJCIsInF1ZXJ5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJCQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGltZSIsImRvV2hhdCIsInNldFRpbWVvdXQiLCJldmVyeSIsInNldEludGVydmFsIiwiQXBwIiwiZW50ZXJCdXR0b24iLCJvdXRyb0JveCIsImluaXQiLCJvbmxvYWQiLCJyZWFkeSIsImJpbmQiLCJhZGRFdmVudExpc3RlbmVyIiwidW5Cb3giLCJHYW1lIiwiYm94IiwicGFwZXIiLCJzb2lsIiwic2VlZCIsImdsYXNzZXMiLCJpcGhvbmUiLCJvcGVuIiwidGhlbiIsImNvbWVPdXQiLCJuZXh0IiwiYm9sZCIsImdldE91dCIsIndoZW5HYW1lSXNEb25lIiwiQm94IiwiY2xvc2VCb3hJbWFnZSIsImZpeFNpemVzIiwiYXJlYURpc3RGcm9tVG9wIiwiUHJvbWlzZSIsInJlc29sdmUiLCJnb0JhY2siLCJ2YXNlRXZvbHV0aW9uUXVldWUiLCJsZXZlbHMiLCJWYXNlIiwic3RhdGUiLCJuZXh0SW5kZXgiLCJpbmRleE9mIiwibWluIiwibGVuZ3RoIiwidW5sb2NrIiwiaW5jbHVkZXMiLCJkcm9wcGVkIiwiZ2V0QXR0cmlidXRlIiwic2hpZnQiLCJ0byIsIl9zdGF0ZSIsInNldEF0dHJpYnV0ZSIsIlBhcGVyIiwiaXRlbXMiLCJpdGVtSW5kZXgiLCJkdXJhdGlvbiIsImluZGV4SXRlcmF0b3IiLCJjb250YWlucyIsIm9uRG9uZSIsIlNvaWwiLCJtYWtlRHJhZ2dhYmxlIiwiU2VlZCIsIkdsYXNzZXMiLCJpUGhvbmUiLCJjbG9jayIsInRvZ2dsZSIsImxvY2tpbmdUaW1lb3V0IiwiYW5pbWF0aW9uUnVubmluZ1RpbWVvdXQiLCJsb2NrZWQiLCJ0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QUNIO0FBQ0o7OztpQ0FDUztBQUNOLGdCQUFJLEtBQUsrRixjQUFULEVBQXlCSSxhQUFhLEtBQUtKLGNBQWxCO0FBQ3pCLGlCQUFLRSxNQUFMLEdBQWMsS0FBS3hCLE1BQUwsQ0FBWSxJQUFaLENBQWQsR0FBa0MsS0FBSzJCLElBQUwsRUFBbEM7QUFDSDs7Ozs7O2tCQUdVUixNIiwiZmlsZSI6Ii4vcHVibGljL3NjcmlwdHMvYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODZhYjdhZDg4MThlZWM4OGNhMzIiLCJpbXBvcnQgRHJhZ2dhYmxlIGZyb20gJ2RyYWdnYWJsZSdcclxuXHJcbmNsYXNzIERyYWdIYW5kbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG9yaWdpbiwgbWF4RGlzdGFuY2UgPSA3MCkge1xyXG4gICAgICAgIHRoaXMubWF4RGlzdGFuY2UgPSBtYXhEaXN0YW5jZVxyXG4gICAgICAgIHRoaXMuaW5UYXJnZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9yaWdpbiA9IG9yaWdpbiB8fCB7eDogMCwgeTogMH07XHJcbiAgICAgICAgdGhpcy50YXJnZXRSZWN0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uRW5kQ2IgPSB0aGlzLm9uU3RhcnRDYiA9IHRoaXMub25Nb3ZlQ2IgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSBuZXcgRHJhZ2dhYmxlKHRoaXMuY29udGFpbmVyLCB7XHJcbiAgICAgICAgICAgIHVzZUdQVTogdHJ1ZSxcclxuICAgICAgICAgICAgbGltaXQ6IHtcclxuICAgICAgICAgICAgICAgIHg6IFswLCB3aW5kb3cuaW5uZXJXaWR0aF0sXHJcbiAgICAgICAgICAgICAgICB5OiBbMCwgd2luZG93LmlubmVySGVpZ2h0XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRyYWdTdGFydDogKGVsZW1lbnQsIHgsIHksIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdmVyLWRyb3BwYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXRSZWN0ID0gd2luZG93LmFwcC5nYW1lLnZhc2UuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25TdGFydENiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXQuaW5UYXJnZXQgPSB0aGlzLmlzSW5SZWN0KHJldC5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblN0YXJ0Q2IocmV0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRyYWc6IChlbGVtZW50LCB4LCB5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmV0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0LmluVGFyZ2V0ID0gdGhpcy5pc0luUmVjdChyZXQucG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25Nb3ZlQ2IpIHRoaXMub25Nb3ZlQ2IocmV0KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvbkRyYWdFbmQ6IChlbGVtZW50LCB4LCB5LCBldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnb3Zlci1kcm9wcGFibGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJldCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldC5pblRhcmdldCA9IHRoaXMuaXNJblJlY3QocmV0LnBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQuaW5UYXJnZXQpIHRoaXMuZHJvcHBlZE9uVGFyZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXhpdERyb3BwYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzFzJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSAnJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSAnJztcclxuICAgICAgICAgICAgICAgIGFmdGVyKDEwMDAsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMHMnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYXV0bydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub25FbmRDYikgdGhpcy5vbkVuZENiKHJldClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgb25TdGFydCAoY2IpIHtcclxuICAgICAgICB0aGlzLm9uU3RhcnRDYiA9IGNiXHJcbiAgICB9XHJcbiAgICBvbk1vdmUgKGNiKSB7XHJcbiAgICAgICAgdGhpcy5vbk1vdmVDYiA9IGNiXHJcbiAgICB9XHJcbiAgICBvbkVuZCAoY2IpIHtcclxuICAgICAgICB0aGlzLm9uRW5kQ2IgPSBjYlxyXG4gICAgfVxyXG4gICAgZGVzdHJveSAoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzFzJztcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICcnO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmJvdHRvbSA9ICcnO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlLmRlc3Ryb3koKVxyXG4gICAgfVxyXG4gICAgb25FbnRlckRyb3BwYWJsZSAoKSB7XHJcbiAgICAgICAgd2luZG93LmFwcC5nYW1lLnZhc2UuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2RyYWdnYWJsZS1vdmVyJylcclxuICAgIH1cclxuICAgIG9uRXhpdERyb3BwYWJsZSAoKSB7XHJcbiAgICAgICAgd2luZG93LmFwcC5nYW1lLnZhc2UuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdnYWJsZS1vdmVyJylcclxuICAgIH1cclxuICAgIGRyb3BwZWRPblRhcmdldCAoKSB7XHJcbiAgICAgICAgd2luZG93LmFwcC5nYW1lLnZhc2Uub25Ecm9wKHRoaXMuY29udGFpbmVyKVxyXG4gICAgfVxyXG4gICAgaXNJblJlY3QgKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IHRoaXMudGFyZ2V0UmVjdDtcclxuICAgICAgICBjb25zdCB0YXJnZXRDZW50ZXJYID0gcmVjdC5sZWZ0ICsgcmVjdC53aWR0aC8yO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldENlbnRlclkgPSByZWN0LnRvcCArIHJlY3QuaGVpZ2h0LzI7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoXHJcbiAgICAgICAgICAgIE1hdGgucG93KCh0YXJnZXRDZW50ZXJYIC0gcG9zaXRpb24ubGVmdCAtIHRoaXMub3JpZ2luLngpLCAyKSArXHJcbiAgICAgICAgICAgIE1hdGgucG93KCh0YXJnZXRDZW50ZXJZIC0gcG9zaXRpb24udG9wIC0gdGhpcy5vcmlnaW4ueSksIDIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBuZXdJblRhcmdldENhbGN1bGF0ZWQgPSBkaXN0YW5jZSA8IHRoaXMubWF4RGlzdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaW5UYXJnZXQgJiYgIW5ld0luVGFyZ2V0Q2FsY3VsYXRlZCkgdGhpcy5vbkV4aXREcm9wcGFibGUoKTtcclxuICAgICAgICBlbHNlIGlmICghdGhpcy5pblRhcmdldCAmJiBuZXdJblRhcmdldENhbGN1bGF0ZWQpIHRoaXMub25FbnRlckRyb3BwYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuaW5UYXJnZXQgPSBuZXdJblRhcmdldENhbGN1bGF0ZWQ7XHJcbiAgICAgICAgcmV0dXJuIG5ld0luVGFyZ2V0Q2FsY3VsYXRlZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmFnSGFuZGxlclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9EcmFnSGFuZGxlci5qcyIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSdcclxuXHJcbndpbmRvdy4kID0gKHF1ZXJ5KSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcclxud2luZG93LiQkID0gKHF1ZXJ5KSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KTtcclxuXHJcbndpbmRvdy5hZnRlciA9ICh0aW1lLCBkb1doYXQpID0+IHNldFRpbWVvdXQoZG9XaGF0LCB0aW1lKTtcclxud2luZG93LmV2ZXJ5ID0gKHRpbWUsIGRvV2hhdCkgPT4gc2V0SW50ZXJ2YWwoZG9XaGF0LCB0aW1lKTtcclxuXHJcbmNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gbmV3IEdhbWUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5lbnRlckJ1dHRvbiA9ICQoJy5pbnRybyBidXR0b24nKTtcclxuICAgICAgICB0aGlzLm91dHJvQm94ID0gJCgnLm91dHJvJyk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBpbml0ICgpIHtcclxuICAgICAgICB3aW5kb3cub25sb2FkID0gdGhpcy5yZWFkeS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZW50ZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmdhbWUudW5Cb3goKSlcclxuICAgIH1cclxuICAgIHJlYWR5ICgpIHtcclxuXHJcbiAgICB9XHJcbiAgICB3aGVuR2FtZUlzRG9uZSAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkb25lJyk7XHJcbiAgICAgICAgYWZ0ZXIoMTAwMCwgKCkgPT4gdGhpcy5vdXRyb0JveC5jbGFzc0xpc3QuYWRkKCdzaG93JykpXHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy5hcHAgPSBuZXcgQXBwO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9BcHAuanMiLCJpbXBvcnQgQm94IGZyb20gJy4vQm94J1xyXG5pbXBvcnQgVmFzZSBmcm9tICcuL1Zhc2UnXHJcbmltcG9ydCBQYXBlciBmcm9tICcuL1BhcGVyJ1xyXG5pbXBvcnQgU29pbCBmcm9tICcuL1NvaWwnXHJcbmltcG9ydCBTZWVkIGZyb20gJy4vU2VlZCdcclxuaW1wb3J0IEdsYXNzZXMgZnJvbSAnLi9HbGFzc2VzJ1xyXG5pbXBvcnQgaVBob25lIGZyb20gJy4vaVBob25lJ1xyXG5cclxuY2xhc3MgR2FtZSB7XHJcbiAgICBjb25zdHJ1Y3RvciAoYXBwKSB7XHJcbiAgICAgICAgdGhpcy5hcHAgPSBhcHA7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSAkKCcuZ2FtZScpO1xyXG4gICAgICAgIHRoaXMuYm94ID0gbmV3IEJveCgnLmdhbWUgLmJveCcpO1xyXG4gICAgICAgIHRoaXMudmFzZSA9IG5ldyBWYXNlKCcuZ2FtZSAudmFzZScsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucGFwZXIgPSBuZXcgUGFwZXIoJy5nYW1lIC5wYXBlcicsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuc29pbCA9IG5ldyBTb2lsKCcuZ2FtZSAuc29pbCcpO1xyXG4gICAgICAgIHRoaXMuc2VlZCA9IG5ldyBTZWVkKCcuZ2FtZSAuc2VlZCcpO1xyXG4gICAgICAgIHRoaXMuZ2xhc3NlcyA9IG5ldyBHbGFzc2VzKCcuZ2FtZSAuZ2xhc3NlcycpO1xyXG4gICAgICAgIHRoaXMuaXBob25lID0gbmV3IGlQaG9uZSgnLmdhbWUgLmlwaG9uZScpO1xyXG4gICAgfVxyXG4gICAgdW5Cb3ggKCkge1xyXG4gICAgICAgICQoJy5pbnRybycpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcclxuICAgICAgICB0aGlzLmJveC5vcGVuKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGFmdGVyKDUwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWZ0ZXIoMjAwLCAoKSA9PiB0aGlzLnNlZWQuY29tZU91dCgpKTtcclxuICAgICAgICAgICAgICAgIGFmdGVyKDEwMDAsICgpID0+IHRoaXMuc29pbC5jb21lT3V0KCkpO1xyXG4gICAgICAgICAgICAgICAgYWZ0ZXIoMjAwMCwgKCkgPT4gdGhpcy52YXNlLmNvbWVPdXQoKSk7XHJcbiAgICAgICAgICAgICAgICBhZnRlcigyMTAwLCAoKSA9PiB0aGlzLnBhcGVyLmNvbWVPdXQoKSk7XHJcbiAgICAgICAgICAgICAgICBhZnRlcigyNTAwLCAoKSA9PiB0aGlzLmdsYXNzZXMuY29tZU91dCgpKTtcclxuICAgICAgICAgICAgICAgIGFmdGVyKDcwMDAsICgpID0+IHRoaXMucGFwZXIubmV4dCgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvbkRvbmUgKCkge1xyXG4gICAgICAgIHRoaXMucGFwZXIuYm9sZCgpO1xyXG4gICAgICAgIGFmdGVyKDIwMDAsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZWVkLmdldE91dCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNvaWwuZ2V0T3V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFwZXIuZ2V0T3V0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2xhc3Nlcy5nZXRPdXQoKTtcclxuICAgICAgICAgICAgYWZ0ZXIoMTAwMCwgKCkgPT4gdGhpcy5hcHAud2hlbkdhbWVJc0RvbmUoKSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9HYW1lLmpzIiwiY2xhc3MgQm94IHtcclxuICAgIGNvbnN0cnVjdG9yIChxdWVyeSkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gJChxdWVyeSk7XHJcbiAgICAgICAgdGhpcy5jbG9zZUJveEltYWdlID0gJChxdWVyeSArICcgLmNsb3NlZCcpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmZpeFNpemVzLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgZ29CYWNrICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdiYWNrJylcclxuICAgIH1cclxuICAgIGZpeFNpemVzICgpIHtcclxuICAgICAgICB3aW5kb3cuYXJlYURpc3RGcm9tVG9wID0gdGhpcy5jbG9zZUJveEltYWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICAkKCcuZ2FtZSA+IC5hcmVhJykuc3R5bGUudG9wID0gYXJlYURpc3RGcm9tVG9wICsgJ3B4JztcclxuICAgICAgICAkKCcuZ2FtZSA+IC5hcmVhJykuc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIGFyZWFEaXN0RnJvbVRvcCkgKyAncHgnXHJcbiAgICB9XHJcbiAgICBvcGVuICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nb0JhY2soKTtcclxuICAgICAgICAgICAgYWZ0ZXIoMTIwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3BlbicpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpeFNpemVzKCk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGNsb3NlICgpIHtcclxuICAgICAgICB0aGlzLmZpeFNpemVzKCk7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJveFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9Cb3guanMiLCJjb25zdCB2YXNlRXZvbHV0aW9uUXVldWUgPSBbJ2VtcHR5JywgJ3NvaWxlZCcsICdzZWVkZWQnLCAnZmlsbGVkJywgJ3dldCcsICdncmVlbi1saXR0bGUnLCAnZ3JlZW4tbWVkaXVtJywgJ2dyZWVuLWZ1bGwnXTtcclxubGV0IGxldmVscyA9IFsnc29pbCcsICdzZWVkJywgJ3NvaWwnLCAnd2F0ZXInLCAnd2F0ZXInLCAnd2F0ZXInXTtcclxuXHJcbmNsYXNzIFZhc2Uge1xyXG4gICAgY29uc3RydWN0b3IgKHF1ZXJ5LCBnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9ICQocXVlcnkpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSAnZW1wdHknXHJcbiAgICB9XHJcbiAgICBzZXQgc3RhdGUgKHRvKSB7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0bztcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhdGUnLCB0bylcclxuICAgIH1cclxuICAgIGdldCBzdGF0ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlXHJcbiAgICB9XHJcbiAgICBjb21lT3V0ICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdXQnKTtcclxuICAgICAgICBhZnRlcigyMDAwLCAoKSA9PiB7IHRoaXMuY29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwLjNzJyB9KVxyXG4gICAgfVxyXG4gICAgbmV4dCAoKSB7XHJcbiAgICAgICAgY29uc3QgbmV4dEluZGV4ID0gdmFzZUV2b2x1dGlvblF1ZXVlLmluZGV4T2YodGhpcy5zdGF0ZSkgKyAxO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB2YXNlRXZvbHV0aW9uUXVldWVbTWF0aC5taW4obmV4dEluZGV4LCB2YXNlRXZvbHV0aW9uUXVldWUubGVuZ3RoIC0gMSldO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSAnd2V0Jykge1xyXG4gICAgICAgICAgICBhZnRlcig2MDAsIHRoaXMuZ2FtZS5pcGhvbmUudW5sb2NrKDEwMDAwKSk7XHJcbiAgICAgICAgICAgIGFmdGVyKDMwMCwgdGhpcy5uZXh0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIVsnd2V0JywgJ2dyZWVuLWxpdHRsZScsICdncmVlbi1tZWRpdW0nXS5pbmNsdWRlcyh0aGlzLnN0YXRlKSkgdGhpcy5nYW1lLnBhcGVyLm5leHQoKVxyXG4gICAgfVxyXG4gICAgb25Ecm9wIChlbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgZHJvcHBlZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnKTtcclxuICAgICAgICBpZiAoZHJvcHBlZCA9PT0gbGV2ZWxzWzBdKSB7XHJcbiAgICAgICAgICAgIGxldmVscy5zaGlmdCgpO1xyXG4gICAgICAgICAgICB0aGlzLm5leHQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVmFzZVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9WYXNlLmpzIiwiY2xhc3MgUGFwZXIge1xyXG4gICAgY29uc3RydWN0b3IgKHF1ZXJ5LCBnYW1lKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9ICQocXVlcnkpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMgPSAkJChxdWVyeSArICcgbGknKTtcclxuICAgICAgICB0aGlzLml0ZW1JbmRleCA9IDA7XHJcbiAgICB9XHJcbiAgICBjb21lT3V0ICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdXQnKVxyXG4gICAgfVxyXG4gICAgZ2V0T3V0ICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdXQtcGFnZScpXHJcbiAgICB9XHJcbiAgICBib2xkICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdib2xkJyk7XHJcbiAgICAgICAgYWZ0ZXIoMjAwMCwgKCkgPT4gdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYm9sZCcpKVxyXG4gICAgfVxyXG4gICAgbmV4dCAoKSB7XHJcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLml0ZW1JbmRleCA9PT0gMCA/IDAgOiAxMDAwO1xyXG4gICAgICAgIGxldCBpbmRleEl0ZXJhdG9yID0gdGhpcy5pdGVtSW5kZXg7XHJcbiAgICAgICAgaWYgKHRoaXMuaXRlbUluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICB3aGlsZSAoaW5kZXhJdGVyYXRvciA+IDApIHtcclxuICAgICAgICAgICAgICAgIGluZGV4SXRlcmF0b3ItLTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaW5kZXhJdGVyYXRvcl0uY2xhc3NMaXN0LmFkZCgndGljaycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLml0ZW1JbmRleCA8IHRoaXMuaXRlbXMubGVuZ3RoKSBhZnRlcihkdXJhdGlvbiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmJvbGQoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLml0ZW1zW3RoaXMuaXRlbUluZGV4XS5jbGFzc0xpc3QuY29udGFpbnMoJ3RpY2snKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1t0aGlzLml0ZW1JbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pdGVtSW5kZXgrK1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUub25Eb25lKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhcGVyXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BhcGVyLmpzIiwiaW1wb3J0IERyYWdIYW5kbGVyIGZyb20gJy4vRHJhZ0hhbmRsZXInXHJcblxyXG5jbGFzcyBTb2lsIHtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXJ5KSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSAkKHF1ZXJ5KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9ICcnO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRPdXQgKCkge1xyXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdXQtcGFnZScpXHJcbiAgICB9XHJcbiAgICBtYWtlRHJhZ2dhYmxlICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMHMnO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IERyYWdIYW5kbGVyKHRoaXMuY29udGFpbmVyLCB7eDogMTAwLCB5OiAwfSwgMTUwKTtcclxuICAgIH1cclxuICAgIGNvbWVPdXQgKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ291dCcpO1xyXG4gICAgICAgIGFmdGVyKDEwMDAsIHRoaXMubWFrZURyYWdnYWJsZS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTb2lsXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1NvaWwuanMiLCIhZnVuY3Rpb24oYSxiKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1iKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXSxiKTphLkRyYWdnYWJsZT1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBhKGEsYil7dmFyIGM9dGhpcyxkPWsuYmluZChjLnN0YXJ0LGMpLGU9ay5iaW5kKGMuZHJhZyxjKSxnPWsuYmluZChjLnN0b3AsYyk7aWYoIWYoYSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkRyYWdnYWJsZSBleHBlY3RzIGFyZ3VtZW50IDAgdG8gYmUgYW4gRWxlbWVudFwiKTtiPWsuYXNzaWduKHt9LGksYiksay5hc3NpZ24oYyx7ZWxlbWVudDphLGhhbmRsZTpiLmhhbmRsZSYmZihiLmhhbmRsZSk/Yi5oYW5kbGU6YSxoYW5kbGVyczp7c3RhcnQ6e21vdXNlZG93bjpkLHRvdWNoc3RhcnQ6ZH0sbW92ZTp7bW91c2Vtb3ZlOmUsbW91c2V1cDpnLHRvdWNobW92ZTplLHRvdWNoZW5kOmd9fSxvcHRpb25zOmJ9KSxjLmluaXRpYWxpemUoKX1mdW5jdGlvbiBiKGEpe3JldHVybiBwYXJzZUludChhLDEwKX1mdW5jdGlvbiBjKGEpe3JldHVyblwiY3VycmVudFN0eWxlXCJpbiBhP2EuY3VycmVudFN0eWxlOmdldENvbXB1dGVkU3R5bGUoYSl9ZnVuY3Rpb24gZChhKXtyZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5fWZ1bmN0aW9uIGUoYSl7cmV0dXJuIHZvaWQgMCE9PWEmJm51bGwhPT1hfWZ1bmN0aW9uIGYoYSl7cmV0dXJuIGEgaW5zdGFuY2VvZiBFbGVtZW50fHxcInVuZGVmaW5lZFwiIT10eXBlb2YgSFRNTERvY3VtZW50JiZhIGluc3RhbmNlb2YgSFRNTERvY3VtZW50fWZ1bmN0aW9uIGcoYSl7cmV0dXJuIGEgaW5zdGFuY2VvZiBGdW5jdGlvbn1mdW5jdGlvbiBoKCl7fXZhciBpPXtncmlkOjAsZmlsdGVyVGFyZ2V0Om51bGwsbGltaXQ6e3g6bnVsbCx5Om51bGx9LHRocmVzaG9sZDowLHNldEN1cnNvcjohMSxzZXRQb3NpdGlvbjohMCxzbW9vdGhEcmFnOiEwLHVzZUdQVTohMCxvbkRyYWc6aCxvbkRyYWdTdGFydDpoLG9uRHJhZ0VuZDpofSxqPXt0cmFuc2Zvcm06ZnVuY3Rpb24oKXtmb3IodmFyIGE9XCIgLW8tIC1tcy0gLW1vei0gLXdlYmtpdC1cIi5zcGxpdChcIiBcIiksYj1kb2N1bWVudC5ib2R5LnN0eWxlLGM9YS5sZW5ndGg7Yy0tOyl7dmFyIGQ9YVtjXStcInRyYW5zZm9ybVwiO2lmKGQgaW4gYilyZXR1cm4gZH19KCl9LGs9e2Fzc2lnbjpmdW5jdGlvbigpe2Zvcih2YXIgYT1hcmd1bWVudHNbMF0sYj1hcmd1bWVudHMubGVuZ3RoLGM9MTtiPmM7YysrKXt2YXIgZD1hcmd1bWVudHNbY107Zm9yKHZhciBlIGluIGQpYVtlXT1kW2VdfXJldHVybiBhfSxiaW5kOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGZ1bmN0aW9uKCl7YS5hcHBseShiLGFyZ3VtZW50cyl9fSxvbjpmdW5jdGlvbihhLGIsYyl7aWYoYiYmYylrLmFkZEV2ZW50KGEsYixjKTtlbHNlIGlmKGIpZm9yKHZhciBkIGluIGIpay5hZGRFdmVudChhLGQsYltkXSl9LG9mZjpmdW5jdGlvbihhLGIsYyl7aWYoYiYmYylrLnJlbW92ZUV2ZW50KGEsYixjKTtlbHNlIGlmKGIpZm9yKHZhciBkIGluIGIpay5yZW1vdmVFdmVudChhLGQsYltkXSl9LGxpbWl0OmZ1bmN0aW9uKGEsYil7cmV0dXJuIGQoYik/KGI9WytiWzBdLCtiWzFdXSxhPGJbMF0/YT1iWzBdOmE+YlsxXSYmKGE9YlsxXSkpOmE9K2IsYX0sYWRkRXZlbnQ6XCJhdHRhY2hFdmVudFwiaW4gRWxlbWVudC5wcm90b3R5cGU/ZnVuY3Rpb24oYSxiLGMpe2EuYXR0YWNoRXZlbnQoXCJvblwiK2IsYyl9OmZ1bmN0aW9uKGEsYixjKXthLmFkZEV2ZW50TGlzdGVuZXIoYixjLCExKX0scmVtb3ZlRXZlbnQ6XCJhdHRhY2hFdmVudFwiaW4gRWxlbWVudC5wcm90b3R5cGU/ZnVuY3Rpb24oYSxiLGMpe2EuZGV0YWNoRXZlbnQoXCJvblwiK2IsYyl9OmZ1bmN0aW9uKGEsYixjKXthLnJlbW92ZUV2ZW50TGlzdGVuZXIoYixjKX19O3JldHVybiBrLmFzc2lnbihhLnByb3RvdHlwZSx7c2V0T3B0aW9uOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcztyZXR1cm4gYy5vcHRpb25zW2FdPWIsYy5pbml0aWFsaXplKCksY30sZ2V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5kcmFnRXZlbnQ7cmV0dXJue3g6YS54LHk6YS55fX0sc2V0OmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcyxkPWMuZHJhZ0V2ZW50O3JldHVybiBkLm9yaWdpbmFsPXt4OmQueCx5OmQueX0sYy5tb3ZlKGEsYiksY30sZHJhZ0V2ZW50OntzdGFydGVkOiExLHg6MCx5OjB9LGluaXRpYWxpemU6ZnVuY3Rpb24oKXt2YXIgYSxiPXRoaXMsZD1iLmVsZW1lbnQsZT0oYi5oYW5kbGUsZC5zdHlsZSksZj1jKGQpLGc9Yi5vcHRpb25zLGg9ai50cmFuc2Zvcm0saT1iLl9kaW1lbnNpb25zPXtoZWlnaHQ6ZC5vZmZzZXRIZWlnaHQsbGVmdDpkLm9mZnNldExlZnQsdG9wOmQub2Zmc2V0VG9wLHdpZHRoOmQub2Zmc2V0V2lkdGh9O2cudXNlR1BVJiZoJiYoYT1mW2hdLFwibm9uZVwiPT09YSYmKGE9XCJcIiksZVtoXT1hK1wiIHRyYW5zbGF0ZTNkKDAsMCwwKVwiKSxnLnNldFBvc2l0aW9uJiYoZS5kaXNwbGF5PVwiYmxvY2tcIixlLmxlZnQ9aS5sZWZ0K1wicHhcIixlLnRvcD1pLnRvcCtcInB4XCIsZS5ib3R0b209ZS5yaWdodD1cImF1dG9cIixlLm1hcmdpbj0wLGUucG9zaXRpb249XCJhYnNvbHV0ZVwiKSxnLnNldEN1cnNvciYmKGUuY3Vyc29yPVwibW92ZVwiKSxiLnNldExpbWl0KGcubGltaXQpLGsuYXNzaWduKGIuZHJhZ0V2ZW50LHt4OmkubGVmdCx5OmkudG9wfSksay5vbihiLmhhbmRsZSxiLmhhbmRsZXJzLnN0YXJ0KX0sc3RhcnQ6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcyxjPWIuZ2V0Q3Vyc29yKGEpLGQ9Yi5lbGVtZW50O2IudXNlVGFyZ2V0KGEudGFyZ2V0fHxhLnNyY0VsZW1lbnQpJiYoYS5wcmV2ZW50RGVmYXVsdD9hLnByZXZlbnREZWZhdWx0KCk6YS5yZXR1cm5WYWx1ZT0hMSxiLmRyYWdFdmVudC5vbGRaaW5kZXg9ZC5zdHlsZS56SW5kZXgsZC5zdHlsZS56SW5kZXg9MWU0LGIuc2V0Q3Vyc29yKGMpLGIuc2V0UG9zaXRpb24oKSxiLnNldFpvb20oKSxrLm9uKGRvY3VtZW50LGIuaGFuZGxlcnMubW92ZSkpfSxkcmFnOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMsYz1iLmRyYWdFdmVudCxkPWIuZWxlbWVudCxlPWIuX2N1cnNvcixmPWIuX2RpbWVuc2lvbnMsZz1iLm9wdGlvbnMsaD1mLnpvb20saT1iLmdldEN1cnNvcihhKSxqPWcudGhyZXNob2xkLGs9KGkueC1lLngpL2grZi5sZWZ0LGw9KGkueS1lLnkpL2grZi50b3A7IWMuc3RhcnRlZCYmaiYmTWF0aC5hYnMoZS54LWkueCk8aiYmTWF0aC5hYnMoZS55LWkueSk8anx8KGMub3JpZ2luYWx8fChjLm9yaWdpbmFsPXt4OmsseTpsfSksYy5zdGFydGVkfHwoZy5vbkRyYWdTdGFydChkLGssbCxhKSxjLnN0YXJ0ZWQ9ITApLGIubW92ZShrLGwpJiZnLm9uRHJhZyhkLGMueCxjLnksYSkpfSxtb3ZlOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcyxkPWMuZHJhZ0V2ZW50LGU9Yy5vcHRpb25zLGY9ZS5ncmlkLGc9Yy5lbGVtZW50LnN0eWxlLGg9Yy5saW1pdChhLGIsZC5vcmlnaW5hbC54LGQub3JpZ2luYWwueSk7cmV0dXJuIWUuc21vb3RoRHJhZyYmZiYmKGg9Yy5yb3VuZChoLGYpKSxoLnghPT1kLnh8fGgueSE9PWQueT8oZC54PWgueCxkLnk9aC55LGcubGVmdD1oLngrXCJweFwiLGcudG9wPWgueStcInB4XCIsITApOiExfSxzdG9wOmZ1bmN0aW9uKGEpe3ZhciBiLGM9dGhpcyxkPWMuZHJhZ0V2ZW50LGU9Yy5lbGVtZW50LGY9Yy5vcHRpb25zLGc9Zi5ncmlkO2sub2ZmKGRvY3VtZW50LGMuaGFuZGxlcnMubW92ZSksZS5zdHlsZS56SW5kZXg9ZC5vbGRaaW5kZXgsZi5zbW9vdGhEcmFnJiZnJiYoYj1jLnJvdW5kKHt4OmQueCx5OmQueX0sZyksYy5tb3ZlKGIueCxiLnkpLGsuYXNzaWduKGMuZHJhZ0V2ZW50LGIpKSxjLmRyYWdFdmVudC5zdGFydGVkJiZmLm9uRHJhZ0VuZChlLGQueCxkLnksYSksYy5yZXNldCgpfSxyZXNldDpmdW5jdGlvbigpe3RoaXMuZHJhZ0V2ZW50LnN0YXJ0ZWQ9ITF9LHJvdW5kOmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucy5ncmlkO3JldHVybnt4OmIqTWF0aC5yb3VuZChhLngvYikseTpiKk1hdGgucm91bmQoYS55L2IpfX0sZ2V0Q3Vyc29yOmZ1bmN0aW9uKGEpe3JldHVybnt4OihhLnRhcmdldFRvdWNoZXM/YS50YXJnZXRUb3VjaGVzWzBdOmEpLmNsaWVudFgseTooYS50YXJnZXRUb3VjaGVzP2EudGFyZ2V0VG91Y2hlc1swXTphKS5jbGllbnRZfX0sc2V0Q3Vyc29yOmZ1bmN0aW9uKGEpe3RoaXMuX2N1cnNvcj1hfSxzZXRMaW1pdDpmdW5jdGlvbihhKXt2YXIgYj10aGlzLGM9ZnVuY3Rpb24oYSxiKXtyZXR1cm57eDphLHk6Yn19O2lmKGcoYSkpYi5saW1pdD1hO2Vsc2UgaWYoZihhKSl7dmFyIGQ9Yi5fZGltZW5zaW9ucyxoPWEuc2Nyb2xsSGVpZ2h0LWQuaGVpZ2h0LGk9YS5zY3JvbGxXaWR0aC1kLndpZHRoO2IubGltaXQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm57eDprLmxpbWl0KGEsWzAsaV0pLHk6ay5saW1pdChiLFswLGhdKX19fWVsc2UgaWYoYSl7dmFyIGo9e3g6ZShhLngpLHk6ZShhLnkpfTtiLmxpbWl0PWoueHx8ai55P2Z1bmN0aW9uKGIsYyl7cmV0dXJue3g6ai54P2subGltaXQoYixhLngpOmIseTpqLnk/ay5saW1pdChjLGEueSk6Y319OmN9ZWxzZSBiLmxpbWl0PWN9LHNldFBvc2l0aW9uOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxjPWEuZWxlbWVudCxkPWMuc3R5bGU7ay5hc3NpZ24oYS5fZGltZW5zaW9ucyx7bGVmdDpiKGQubGVmdCl8fGMub2Zmc2V0TGVmdCx0b3A6YihkLnRvcCl8fGMub2Zmc2V0VG9wfSl9LHNldFpvb206ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcyxiPWEuZWxlbWVudCxkPTE7Yj1iLm9mZnNldFBhcmVudDspe3ZhciBlPWMoYikuem9vbTtpZihlJiZcIm5vcm1hbFwiIT09ZSl7ZD1lO2JyZWFrfX1hLl9kaW1lbnNpb25zLnpvb209ZH0sdXNlVGFyZ2V0OmZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMub3B0aW9ucy5maWx0ZXJUYXJnZXQ7cmV0dXJuIGIgaW5zdGFuY2VvZiBGdW5jdGlvbj9iKGEpOiEwfSxkZXN0cm95OmZ1bmN0aW9uKCl7ay5vZmYodGhpcy5oYW5kbGUsdGhpcy5oYW5kbGVycy5zdGFydCksay5vZmYoZG9jdW1lbnQsdGhpcy5oYW5kbGVycy5tb3ZlKX19KSxhfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZHJhZ2dhYmxlL2Rpc3QvZHJhZ2dhYmxlLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRHJhZ0hhbmRsZXIgZnJvbSAnLi9EcmFnSGFuZGxlcidcclxuXHJcbmNsYXNzIFNlZWQge1xyXG4gICAgY29uc3RydWN0b3IocXVlcnkpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9ICQocXVlcnkpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJyc7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdldE91dCAoKSB7XHJcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUuZGVzdHJveSgpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnb3V0LXBhZ2UnKVxyXG4gICAgfVxyXG4gICAgbWFrZURyYWdnYWJsZSAoKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBzJztcclxuICAgICAgICB0aGlzLmRyYWdnYWJsZSA9IG5ldyBEcmFnSGFuZGxlcih0aGlzLmNvbnRhaW5lciwge3g6IDUwLCB5OiAwfSk7XHJcbiAgICB9XHJcbiAgICBjb21lT3V0ICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdXQnKTtcclxuICAgICAgICBhZnRlcigxMDAwLCB0aGlzLm1ha2VEcmFnZ2FibGUuYmluZCh0aGlzKSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VlZFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TZWVkLmpzIiwiaW1wb3J0IERyYWdIYW5kbGVyIGZyb20gJy4vRHJhZ0hhbmRsZXInXHJcblxyXG5jbGFzcyBHbGFzc2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXJ5KSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSAkKHF1ZXJ5KTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50b3AgPSAnJztcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUubGVmdCA9ICcnO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBnZXRPdXQgKCkge1xyXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdXQtcGFnZScpXHJcbiAgICB9XHJcbiAgICBtYWtlRHJhZ2dhYmxlICgpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMHMnO1xyXG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IERyYWdIYW5kbGVyKHRoaXMuY29udGFpbmVyLCB7eDogMCwgeTogODB9KTtcclxuICAgIH1cclxuICAgIGNvbWVPdXQgKCkge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ291dCcpO1xyXG4gICAgICAgIGFmdGVyKDIwMDAsIHRoaXMubWFrZURyYWdnYWJsZS5iaW5kKHRoaXMpKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHbGFzc2VzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0dsYXNzZXMuanMiLCJjbGFzcyBpUGhvbmUge1xyXG4gICAgY29uc3RydWN0b3IocXVlcnkpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9ICQocXVlcnkpO1xyXG4gICAgICAgIHRoaXMuY2xvY2sgPSAkKHF1ZXJ5ICsgJyAuY2xvY2snKTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMubG9ja2luZ1RpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uUnVubmluZ1RpbWVvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubG9ja2VkID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgdW5sb2NrICh0aW1lVG9Mb2NrQWdhaW4pIHtcclxuICAgICAgICBpZiAodGhpcy5sb2NrZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW9uUnVubmluZ1RpbWVvdXQpIGNsZWFyVGltZW91dCh0aGlzLmFuaW1hdGlvblJ1bm5pbmdUaW1lb3V0KTtcclxuICAgICAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdwYXVzZScpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd1bmxvY2snKTtcclxuICAgICAgICAgICAgaWYgKHRpbWVUb0xvY2tBZ2FpbikgdGhpcy5sb2NraW5nVGltZW91dCA9IGFmdGVyKHRpbWVUb0xvY2tBZ2FpbiwgdGhpcy5sb2NrLmJpbmQodGhpcykpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbG9jayAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvY2tlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFuaW1hdGlvblJ1bm5pbmdUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5hbmltYXRpb25SdW5uaW5nVGltZW91dCk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uUnVubmluZ1RpbWVvdXQgPSBhZnRlcigzMDAsICgpID0+IHRoaXMuY2xvY2suY2xhc3NMaXN0LmFkZCgncGF1c2UnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3VubG9jaycpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdG9nZ2xlICgpIHtcclxuICAgICAgICBpZiAodGhpcy5sb2NraW5nVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMubG9ja2luZ1RpbWVvdXQpO1xyXG4gICAgICAgIHRoaXMubG9ja2VkID8gdGhpcy51bmxvY2soMjAwMCkgOiB0aGlzLmxvY2soKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaVBob25lXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2lQaG9uZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=