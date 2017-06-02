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

export const rootStyles = {
	width: '1000px',
	height: '500px',
	'overflow-y': 'scroll',
	'border': '1px solid #ddd'
};

export const gridStyles = {
	width: '1000px',
	height: '500px',
	'overflow-y': 'scroll',
	'border': '1px solid #ddd'
};

export const rowStyles = {
	display: 'flex'

};
export const cellStyles = {
	flex: '1',
	border: '1px solid #ddd',
	'border-top-style': 'none',
	'border-right-style': 'none'
};
