import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { Grid } from './widgets/Grid';

const Projector = ProjectorMixin(Grid);
const projector = new Projector();

projector.append();
