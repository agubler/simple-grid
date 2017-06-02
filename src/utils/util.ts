import * as Chance from 'chance';

const chance = new Chance();

export function createData(rows: number) {
	const data = [];
	for (let i = 0; i < rows; i++) {
		data.push({
			id: i,
			name: chance.name(),
			address: chance.address(),
			birthday: chance.birthday()
		});
	}
	return data;
}

export function sort(id: string) {
	return function(a: any, b: any) {
		if (a[id] < b[id]) {
			return -1;
		}
		if (a[id] > b[id]) {
			return 1;
		}
		return 0;
	};
}
