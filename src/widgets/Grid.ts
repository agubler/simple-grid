import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';

export class Grid extends WidgetBase {
	protected render(): DNode {
		return v('div', [ 'I want to be a grid when I grow up' ]);
	}
}
