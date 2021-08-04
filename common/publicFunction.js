//这里存放公共的方法
export const FUN = {
	//-----------------------------------------------对时间操作的方法---------------------------------------------
	/**
	 * @param {Object} i
	 * 毫秒值转日期(无年份)
	 */
	toDataNoYear(i) {
		if (i != null || i != 0) {
			var date = new Date(i)
			// var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			return M + D
		} else {
			return "——"
		}
	},
	/**
	 * @param {Object} i
	 * 毫秒值转日期
	 */
	toData(i) {
		if (i != null || i != 0) {
			var date = new Date(i)
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
			return Y + M + D
		} else {
			return "——"
		}
	},
	/**
	 * @param {Object} i
	 * 毫秒值转时间日期
	 */
	toDateTime(i) {
		if (i != null || i != 0) {
			var date = new Date(i)
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
			var H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return Y + M + D + H + m + S
		} else {
			return "——"
		}
	},
	/**
	 * @param {Object} i
	 * 毫秒值转时间
	 */
	toDate(i) {
		if (i != null || i != 0) {
			var date = new Date(i)
			var H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
			var S = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return H + m + S
		} else {
			return "——"
		}
	},
	/**
	 * @param {Object} str
	 * 时间转秒数 如: 00:05:20-->320
	 */
	toSecond(str) {
		var time = str.split(":")
		time = +time[2] + (+time[1] * 60) + (+time[0] * 3600)
		return time
	},
	/**
	 * @param {Object} sec
	 * 秒数转时间 如: 320-->00:05:20
	 */
	toTime(sec) {
		if (typeof(sec) == "number") {
			var hours = Math.floor(sec / 3600)
			var minutes = Math.floor(sec % 3600 / 60)
			var seconds = Math.floor(sec % 3600 % 60)

			var hourStr = String(hours)
			var minStr = String(minutes)
			var secStr = String(seconds)

			if (hours <= 9) hourStr = "0" + hourStr
			if (minutes <= 9) minStr = "0" + minStr
			if (seconds <= 9) secStr = "0" + secStr

			return hourStr + ":" + minStr + ":" + secStr
		} else {
			return sec
		}
	},
	/**
	 * @param {Object} num
	 * 格式化时长 如: 320-->5:20
	 */
	format(num) {
		return '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 -
			String(
				Math.floor(num % 60)).length) + Math.floor(num % 60)
	},
	/**
	 * @param {Object} str
	 * 时间转秒数 如: 05:20-->320
	 */
	unformat(str) {
		var time = str.split(":")
		time = +time[1] + (+time[0] * 60)
		return time
	},
	/**
	 * @param {Object} i
	 * 时间转分秒值 如: 00:05:20-->05'20''
	 */
	toMin(i) {
		if (typeof(i) == "string") {
			var s = i.split(":")[2]
			var m = i.split(":")[1]
			return m + "'" + s + "''"
		} else {
			return i
		}
	},
	//---------------------------------------------------------------------------------------------------------

	//----------------------------------------------------对数组操作的方法--------------------------------------
	/**
	 * @param {Object} arr
	 * @param {Object} obj
	 * 根据value获取数组下标
	 */
	getArrayIndex(arr, obj) {
		var i = arr.length;
		while (i--) {
			if (arr[i] === obj) {
				return i;
			}
		}
		return -1;
	},

	changeNumber(num) {
		let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
		let unit = ["", "十", "百", "千", "万"];
		num = parseInt(num);
		let getWan = (temp) => {
			let strArr = temp.toString().split("").reverse();
			let newNum = "";
			for (var i = 0; i < strArr.length; i++) {
				newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" :
					changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
			}
			return newNum;
		}
		let overWan = Math.floor(num / 10000);
		let noWan = num % 10000;
		if (noWan.toString().length < 4) noWan = "0" + noWan;
		return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
	},
	//   秒转  0'0''
	formatNumber(num) {
		if (num < 10) {
			return '0' + num
		}
		return num
	},
	formatSeconds(value) {
		let min = FUN.formatNumber(parseInt(value / 60) % 60);
		let second = FUN.formatNumber(value % 60);
		return `${min}'${second}''`
	},
}
