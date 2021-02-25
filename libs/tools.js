var tools = function ()
{
	function mixin(from, to)
	{
		for(var k in from) to[k] = from[k];
	}

	function Signal(){this.listeners = [];}

	Signal.prototype = {

		add : function(callback, scope)
		{
			if(!callback)throw new Error("no callback specified");
			var args = Array.prototype.slice.call(arguments, 2);
			var n = this.listeners.length;
			for(var i = 0; i < n; i++)
			{
				var listener = this.listeners[i];
				if(listener.callback == callback && listener.scope == scope)
				{
					listener.args = args;
					return;
				}
			}
			this.listeners.push({callback:callback, scope:scope, args:args});
		},

		remove : function(callback, scope)
		{
			var n = this.listeners.length;
			for(var i = 0; i < n; i++)
			{
				var listener = this.listeners[i];
				if(listener.callback == callback && listener.scope == scope)
				{
					this.listeners.splice(i, 1);
					return;
				}
			}
		},

		dispatch : function()
		{
			var args = Array.prototype.slice.call(arguments);
			var n = this.listeners.length;
			for(var i = 0; i < n; i++)
			{
				var listener = this.listeners[i];
				listener.callback.apply(listener.scope, args.concat(listener.args));
			}
		},

		dispose : function() { this.listeners = []; }
	};




	function delegate(method, scope)
	{
		if(!method)throw new Error("no method specified");
		var args = Array.prototype.slice.call(arguments, 2);
		return function() {
      var params = Array.prototype.slice.call(arguments);
      method.apply(scope, params.concat(args));
    };
	}



	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;

	var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame;





	function Tween(duration) { this.init(duration); }

	Tween.prototype = {
		init : function(duration)
		{
			this.duration = duration;
			this.begin = Date.now();
		},
		valueOf : function()
		{
			return Math.min(1, (Date.now() - this.begin) / (1000 * this.duration));
		}
	};





	function Stage(w, h, addToBody)
	{
		this.canvas = document.createElement("canvas");
		this.resize(w, h);
		if(addToBody || addToBody === undefined)
		{
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(this.canvas);
		}
		this.out = this.canvas.getContext("2d");
		this.onResize = new Signal();
	}

	Stage.prototype = {

		resize : function(w, h)
		{
			this.canvas.width = this.width = w;
			this.canvas.height = this.height = h;
		},

		autoSize : function(callback, scope)
		{
			if(callback) this.onResize.add(callback, scope);
			window.onresize = delegate(this._onResize, this);
			this._onResize();
		},

		_onResize : function()
		{
			this.resize(window.innerWidth || document.body.clientWidth,
						 window.innerHeight || document.body.clientHeight);
			this.onResize.dispatch();
		},

		clear : function()
		{
			this.out.save();
			this.out.setTransform(1, 0, 0, 1, 0, 0);
			this.out.clearRect(0, 0, this.width, this.height);
			this.out.restore();
		}
	};




	function Loop(callback, scope, autoPlay)
	{
		this.onUpdate = new Signal();
		if(callback)
		{
			this.onUpdate.add(callback, scope);
			if(autoPlay || autoPlay === undefined)
				this.play();
		}
	}

	Loop.prototype = {

		isPaused : true,

		play : function()
		{
			if(!this.isPaused) return;
			this.isPaused = false;
			this._onUpdate();
		},

		_onUpdate : function()
		{
			//can cause the loop to be paused
			this.onUpdate.dispatch();
			if(!this.isPaused)
				this._requestFrame = requestAnimationFrame(this._onUpdate.bind(this));
		},

		pause : function()
		{
			this.isPaused = true;
			cancelAnimationFrame(this._requestFrame);
		},

		dispose : function()
		{
			this.onUpdate.dispose();
			pause();
		}
	};





	function Mouse(target)
	{
		this.x = this.y = 0;
		this.oldX = this.oldY = 0;
		this.isDown = false;
		this.target = target || document;

		this.onDown = new Signal();
		this.onUp = new Signal();
		this.onMove = new Signal();

		this._moveCallback = delegate(this._onMouseMove, this);
		this._downCallback = delegate(this._onMouseDown, this);
		this._upCallback = delegate(this._onMouseUp, this);
		this.target.onmousemove = this._moveCallback;
		this.target.onmousedown = this._downCallback;
		this.target.onmouseup = this._upCallback;
	}

	Mouse.prototype = {

		_onMouseMove : function(e)
		{
			var ev = e || window.event;//Moz:IE
			if (ev.pageX)
			{
				//Mozilla or compatible
				this.x = ev.pageX;
				this.y = ev.pageY;
			}
			else if(ev.clientX)
			{
				//IE or compatible
				this.x = ev.clientX;
				this.y = ev.clientY;
			}
			this.x -= this.target.offsetLeft;
			this.y -= this.target.offsetTop;

			//synchronization problems with main loop
			//this.savePos();
			this.onMove.dispatch();
		},

		_onMouseDown : function(e)
		{
			this.isDown = true;
			this.savePos();
			this.onDown.dispatch();
		},

		_onMouseUp : function(e)
		{
			this.isDown = false;
			this.savePos();
			this.onUp.dispatch();
		},

		savePos : function()
		{
			this.oldX = this.x;
			this.oldY = this.y;
		},

		point : function(pt)
		{
			pt = pt || {};
			pt.x = this.x;
			pt.y = this.y;
			return pt;
		},

		dispose : function()
		{
			this.onDown.dispose();
			this.onUp.dispose();
			this.onMove.dispose();

			if(this.target.onmousemove == this._moveCallback)
				this.target.onmousemove = null;
			if(this.target.onmousedown == this._downCallback)
				this.target.onmousedown = null;
			if(this.target.onmouseup == this._upCallback)
				this.target.onmouseup = null;
		}
	};






	function Keyboard()
	{
		this._keys = {};
		this._preventDefaultKeys = [];
		this.onDown = new Signal();
		this.onUp = new Signal();
		this._downCallback = delegate(this._onKeyDown, this);
		this._upCallback = delegate(this._onKeyUp, this);
		document.addEventListener("keydown", this._downCallback);
		document.addEventListener("keyup", this._upCallback);
	}

	Keyboard.prototype = {

		_onKeyDown : function(e)
		{
			e = e || window.event;
			this._keys[e.keyCode] = true;
			this._call(this.onDown, e.keyCode);
		},

		_onKeyUp : function(e)
		{
			e = e || window.event;
			this._keys[e.keyCode] = false;
			this._call(this.onUp, e.keyCode);
		},

		_call : function(signal, keyCode)
		{
			var listeners = signal.listeners;
			var n = listeners.length;
			for(var i = 0; i < n; i++)
			{
				var listener = listeners[i];
				if(!listener.args[0])
					listener.callback.apply(listener.scope, [keyCode].concat(listener.args));
				else if(listener.args[0] == keyCode)
					listener.callback.apply(listener.scope, listener.args);
			}
		},

		isDown : function(key) { return this._keys[key] || false; },

		dispose : function()
		{
			this.onDown.dispose();
			this.onUp.dispose();
			document.removeEventListener("keydown", this._downCallback);
			document.removeEventListener("keyup", this._upCallback);
		},

		preventDefault : function(keys)
		{
			if(keys) this._preventDefaultKeys = this._preventDefaultKeys.concat(keys);
			else this._preventDefaultKeys = [-1];
		},

		_doPreventDefault : function(e)
		{
			var k = this._preventDefaultKeys;
			if(k.indexOf(e.keyCode) != -1 || k[0] == -1)
				e.preventDefault();
		}
	};

	return {
			delegate:delegate,
			Stage:Stage,
			Mouse:Mouse,
			Keyboard:Keyboard,
			Tween:Tween,
			Loop:Loop,
			Signal:Signal,
			mixin:mixin,
			requestAnimationFrame:requestAnimationFrame,
			cancelAnimationFrame:cancelAnimationFrame
		};
}();

/*
tools.delegate(callback, scope);

var stage = new tools.Stage(800, 600);
var loop = new Loop(onUpdate, this);
loop.pause();
stage.width;
stage.height;
stage.out;

var mouse = new tools.Mouse(stage.canvas);
mouse.x
mouse.y
mouse.isDown
mouse.onDown.add(onMouseDown, this);
mouse.onUp.add(onMouseUp, this);

var keyboard = new tools.Keyboard();
keyboard.onDown.add(onDown, this);
keyboard.onUp.add(onKeyUp, this);
keyboard.onUp.add(onKey32Up, this, 32);
keyboard.isDown(33);*/
