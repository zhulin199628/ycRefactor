//毫秒转 时间
const  changeTime = function(duration){
	let time = 0;
	let s = duration / 1000; // 秒
	if (s < 60) {
		time = "00:"+ aNumber(parseInt(s));
	} else {
		let m = aNumber(parseInt(s / 60)); //  分钟
		let sec = aNumber( Math.round(s % 60)) //  秒;
		time = m + ":" + sec
	}
	return time
}

//单数取0
const aNumber = function(num) {
	return num < 10 ? '0' + num : num;
}

export  {
	changeTime,
	aNumber
}