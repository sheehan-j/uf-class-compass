const BlockTimes = {
	1: { start: "7:25 AM", end: "8:15 AM" },
	2: { start: "8:30 AM", end: "9:20 AM" },
	3: { start: "9:35 AM", end: "10:25 AM" },
	4: { start: "10:40 AM", end: "11:30 AM" },
	5: { start: "11:45 AM", end: "12:35 PM" },
	6: { start: "12:50 PM", end: "1:40 PM" },
	7: { start: "1:55 PM", end: "2:45 PM" },
	8: { start: "3:00 PM", end: "3:50 PM" },
	9: { start: "4:05 PM", end: "4:55 PM" },
	10: { start: "5:10 PM", end: "6:00 PM" },
	11: { start: "6:15 PM", end: "7:05 PM" },
	12: { start: "7:20 PM", end: "8:10 PM" },
	13: { start: "8:20 PM", end: "9:10 PM" },
	14: { start: "9:20PM", end: "10:10 PM" },
};

const getPeriodTimes = (period) => {
	if (BlockTimes.hasOwnProperty(period)) {
		return BlockTimes[period];
	} else {
		return null;
	}
};
export { getPeriodTimes };
