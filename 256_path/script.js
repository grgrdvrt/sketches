const w = 1000;
const h = 1000;

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const siteRadius = 15;
const margin = 2 * siteRadius;
const nSites = 75;

function lerp(a, b, t){
	return a + t * (b - a);
}

function makeSite(x, y){
	return {
		x:x,
		y:y,
	};
}

function renderSites(ctx, sites){
	ctx.save();
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.lineWidth = 1;
	sites.forEach(site => {
		ctx.moveTo(site.x + siteRadius, site.y);
		ctx.arc(site.x, site.y, siteRadius, 0, 2 * Math.PI);
	});
	ctx.stroke();
	ctx.restore();
}

function getSurroundingSlots(x, y){
	if(y % 2){
		return [
			{x: x, y: y - 1}, {x: x + 1, y: y - 1},
			{x: x - 1, y: y}, {x: x + 1, y: y},
			{x: x, y: y + 1}, {x: x + 1, y: y + 1},
		];
	}
	else{
		return [
			{x: x - 1, y: y - 1}, {x: x, y: y - 1},
			{x: x - 1, y: y}, {x: x + 1, y: y},
			{x: x - 1, y: y + 1}, {x: x, y: y + 1},
		];
	}
}

function slotToSite(slot){
	const dist = margin + 2 * siteRadius;
	return makeSite(
		(slot.x + 0.5 * (slot.y % 2 ? 1 : 0)) * dist + 0.5 * w,
		slot.y * dist * Math.sqrt(3) / 2 + 0.5 * h
	);
}

function slotsEq(a, b){
	return a.x === b.x && a.y === b.y;
}


function createSites(nSites){
	const slots = [{x:0, y:0}];
	const openSlots = getSurroundingSlots(0, 0);
	while(slots.length < nSites){
		const id = Math.floor(Math.random() * openSlots.length);
		const slot = openSlots[id];
		openSlots.splice(id, 1);

		const surrounding = getSurroundingSlots(slot.x, slot.y);
		const newOpen = surrounding.filter(s => !openSlots.some(cs => slotsEq(s, cs)) && !slots.some(cs => slotsEq(s, cs)));
		openSlots.push(...newOpen);
		slots.push(makeSite(slot.x, slot.y));
	}
	return slots.map(slotToSite);
}


const sites = createSites(75);


class Line{

	points = []
	direction = Math.sign(Math.random() - 0.5)
	currentSite = {}
	nextSite = {}
	interpolation = 0
	speed = 0.1
	interpolationStep = 0.05
	angleBegin = 0;
	angleEnd = 0;
	thickness = 0;
	history = new Map();

	constructor(nPts, thickness, speed, initialSite){
		this.thickness = thickness;
		this.speed = speed;

		//force the selection of a nextSite
		this.currentSite = this.nextSite = initialSite;
		this.endAngle = (Math.random() * 2 - 1) * Math.PI;
		this.changeSite();
		const radius = 0.5 * this.thickness + siteRadius;
		const x = this.currentSite.x + radius * Math.cos(this.angleBegin);
		const y = this.currentSite.y + radius * Math.sin(this.angleBegin);
		for(let i = 0; i < nPts; i++){
			this.points[i] = {x, y};
		}
	}

	selectNextSite(){
		const neighbors = sites.filter(s => {
			return Math.hypot(s.x - this.currentSite.x, s.y - this.currentSite.y) < (3 * siteRadius + margin)
				&& s !== this.currentSite;
		});
		neighbors.sort((a, b) => {
			return (this.history.get(a) || Math.random()) - (this.history.get(b) || Math.random());
		});
		return neighbors[0];
	}

	changeSite(){
		const prevSite = this.currentSite;
		this.currentSite = this.nextSite;
		this.nextSite = this.selectNextSite(this.currentSite, prevSite);
		this.history.set(this.currentSite, Date.now());

		this.direction *= -1;

		//Compute new angleBegin.
		this.angleBegin = (this.angleEnd + Math.PI) % (2 * Math.PI);
		if(this.angleBegin > Math.PI){
			this.angleBegin -= 2 * Math.PI;
		}

		//Compute next endAngle.
		this.angleEnd = Math.atan2(
			this.nextSite.y -  this.currentSite.y,
			this.nextSite.x -  this.currentSite.x,
		);
		//We want the angle to be in the appropriate direction.
		if(this.direction < 0 && this.angleBegin < this.angleEnd){
			this.angleEnd -= 2 * Math.PI;
		}
		else if(this.direction > 0 && this.angleBegin > this.angleEnd){
			this.angleEnd += 2 * Math.PI;
		}
		if(this.angleBegin === this.angleEnd){
			this.angleEnd = this.angleBegin + 2 * Math.PI * this.direction;
		}

		this.interpolationStep = this.speed / Math.abs(this.angleEnd - this.angleBegin);
	}

	update(){
		//TODO update interpolation
		this.interpolation += this.interpolationStep;
		if(this.interpolation >= 1){
			this.interpolation = 0;
			this.changeSite();
		}

		//Use the last point as the new head to move the line.
		const pt = this.points.pop();
		const angle = lerp(this.angleBegin, this.angleEnd, this.interpolation);
		const radius = 0.5 * this.thickness + siteRadius;
		pt.x = this.currentSite.x + radius * Math.cos(angle);
		pt.y = this.currentSite.y + radius * Math.sin(angle);
		this.points.unshift(pt);
	}

	draw(ctx){
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = this.thickness;
		ctx.lineCap = ctx.lineJoin = "round";
		const pt = this.points[0];
		ctx.moveTo(pt.x, pt.y);
		for(let i = 1; i < this.points.length; i++){
			const pt = this.points[i];
			ctx.lineTo(pt.x, pt.y);
		}
		ctx.strokeStyle = "black";
		ctx.stroke();
		ctx.restore();
	}
}


const line = new Line(
	250,
	margin,
	0.10,
	sites[Math.floor(Math.random() * sites.length)]
)
function update(){
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	renderSites(ctx, sites);
	line.update();
	line.draw(ctx);
	requestAnimationFrame(update);
}

update();
