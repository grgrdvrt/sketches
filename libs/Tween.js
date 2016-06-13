function Tween(obj)
{
	this.target = obj;
	this.isStarted = false;
}

Tween.prototype = {
	to : function(duration, props, onComplete, delay)
	{
		this.cancel();
		this.duration = 1000 * duration;
		this.endProps = props;
		this.onComplete = onComplete;
		if(!delay) delay = 0;
		
		this.beginProps = {};
		for(var prop in this.endProps)
			this.beginProps[prop] = this.target[prop];
		
		setTimeout(tools.delegate(this.start, this), delay * 1000);
	},
	
	start : function()
	{
		this.isStarted = true;
		this.beginTime = Date.now();
		this._tick();
	},
	
	_tick : function()
	{
		this._onUpdate();
		if(this.isStarted)
			tools.requestAnimationFrame.call(window, tools.delegate(this._tick, this));
	},
	
	_onUpdate : function()
	{
		var timeDiff = Date.now() - this.beginTime;
		var ratio = timeDiff / this.duration;
		var isFinished = ratio > 1;
		if(isFinished)ratio = 1;
		this.setRatio(ratio);
	},
	
	setRatio : function(ratio)
	{
		for(var prop in this.endProps)
		{
			this.target[prop] = this.beginProps[prop] + ratio * (this.endProps[prop] - this.beginProps[prop]);
		}
	},
	
	cancel : function()
	{
		this.isStarted = false;
		if(this.timer) tools.cancelAnimationFrame(this.timer);
	}
}
