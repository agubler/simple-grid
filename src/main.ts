import { ProjectorMixin } from '@dojo/widget-core/mixins/Projector';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';

const root = document.querySelector('my-app') || undefined;

const Projector = ProjectorMixin(WidgetBase);
const projector = new Projector();

projector.append(root);
