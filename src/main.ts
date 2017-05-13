import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { SimpleGrid } from './widgets/SimpleGrid';

const root = document.querySelector('my-app') || undefined;

const columns = [
	{ id: 'id' },
	{ id: 'name' },
	{ id: 'address' },
	{ id: 'birthday' }
];

const data = [];

for (let i = 0; i < 50; i++) {
	data.push({ id: i, name: 'Ant', address: '123 High Street', birthday: new Date() });
}

const Projector = ProjectorMixin(SimpleGrid);
const projector = new Projector();

projector.setProperties({ data, columns });

projector.append(root);
