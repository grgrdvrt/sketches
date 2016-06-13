function ADSRGenerator(ctx, attack, decay, sustain, release, sustainValue)
{
	this.ctx = ctx;

	this.input = this.output = this.gain;

	this.attack = attack || 0;
	this.decay = decay || 0;
	this.sustain = sustain || 1;
	this.release = release || 0;
	this.sustainValue = sustainValue || 0.9;
}

ADSRGenerator.prototype = {

	apply :function (param)
	{
		var time = this.ctx.currentTime;
		
		param.cancelScheduledValues(time);

		param.setValueAtTime(param.value, time);

		time += this.attack;
		param.linearRampToValueAtTime(1.0, time);

		time += this.decay;
		param.linearRampToValueAtTime(this.sustainValue, time);

		time += this.sustain;
		param.linearRampToValueAtTime(this.sustainValue, time);

		time += this.release;
		param.linearRampToValueAtTime(0, time);
	}
};


function SimpleTone(ctx)
{
	this.ctx = ctx;

  console.log(this.ctx);
	this.oscillator = this.ctx.createOscillator();
	this.gainNode = this.ctx.createGain();
	this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

	//this.ADSRGenerator = new ADSRGenerator(this.ctx, 0.0001, 0.0001, 0.1, 0.7, 0.9);
	this.ADSRGenerator = new ADSRGenerator(this.ctx, 0.1, 0.1, 0.1, 1.9, 0.5);
	this.oscillator.connect(this.gainNode);
	this.gainNode.connect(this.ctx.destination);

	this.tone = 0;
		this.oscillator.start(0);
}


SimpleTone.prototype = {
	play : function(tone)
	{
		if(tone || tone === 0) this.tone = tone;
		this.oscillator.frequency.setValueAtTime(440 * Math.pow(2, this.tone / 12), this.ctx.currentTime);
		this.ADSRGenerator.apply(this.gainNode.gain);
	}
};
