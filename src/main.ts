import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { SimpleGrid } from './widgets/SimpleGrid';
import * as Chance from 'chance';

const chance = new Chance();
const root = document.querySelector('my-app') || undefined;

function createData() {
	const data = [];
	for (let i = 0; i <= 50; i++) {
		data.push({
			id: i,
			name: chance.name(),
			address: chance.address(),
			birthday: chance.birthday()
		});
	}
	return data;
}

const columns = [
	{ id: 'id' },
	{ id: 'name' },
	{ id: 'address' },
	{ id: 'birthday' }
];

let data: any[] = createData();

const Projector = ProjectorMixin(SimpleGrid);
const projector = new Projector();

function onSortRequest(id: string, direction: 'asc' | 'desc') {
	data = [ ...data ].sort((a: any, b: any) => {
		if (a[id] < b[id]) {
			return -1;
		}
		if (a[id] > b[id]) {
			return 1;
		}
		return 0;
	});

	if (direction === 'desc') {
		data = data.reverse();
	}

	projector.setProperties({ data, columns, onSortRequest });
}

projector.setProperties({ data, columns, onSortRequest });

projector.append(root);
