const periods = {
	1: "1",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	10: "10",
	11: "11",
	12: "E1",
	13: "E2",
	14: "E3",
};

const getPeriodLabel = (period) => {
	if (periods.hasOwnProperty(period)) {
		return periods[period];
	} else {
		return null;
	}
};

export { getPeriodLabel };
