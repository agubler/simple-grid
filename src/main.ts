import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Grid } from './widgets/Grid';

import * as util from './utils/util';

const columns = [
	{ id: 'id' },
	{ id: 'name' },
	{ id: 'address' },
	{ id: 'birthday' }
];

const rows = util.createData(200);

const Projector = ProjectorMixin(Grid);
const projector = new Projector();

projector.setProperties({ rows, columns });

projector.append();
