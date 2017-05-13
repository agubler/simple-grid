import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin, ThemeableProperties } from '@dojo/widget-core/mixins/Themeable';

import * as css from './styles/grid.m.css';

export interface SimpleGridProperties extends WidgetProperties {
	data: any[];
	columns: any[];
}

@theme(css)
export class SimpleGrid extends ThemeableMixin(WidgetBase)<SimpleGridProperties> {
	protected render(): DNode {
		const { data, columns } = this.properties;
		return v('div', { classes: this.classes(css.grid) }, [
			w(SimpleGridHeader, { columns }),
			w(SimpleGridBody, { data, columns })
		]);
	}
}

export interface SimpleGridHeaderProperties extends WidgetProperties {
	columns: any[];
}

@theme(css)
export class SimpleGridHeader extends ThemeableMixin(WidgetBase)<SimpleGridHeaderProperties> {
	protected render(): DNode {
		const { columns } = this.properties;

		return v('div', { classes: this.classes(css.row, css.header) }, columns.map((column) => {
			return v('div', { classes: this.classes(css.cell) }, [ column.id ]);
		}));
	}
}

export interface SimpleGridBodyProperties extends WidgetProperties {
	data: any[];
	columns: any[];
}

@theme(css)
export class SimpleGridBody extends ThemeableMixin(WidgetBase)<SimpleGridBodyProperties> {
	protected render(): DNode {
		const { data, columns } = this.properties;
		return v('div', { classes: this.classes(css.body) }, data.map((row) => {
			return w(SimpleGridRow, { key: row.id, data: row, columns });
		}));
	}
}

export interface SimpleGridRowProperties extends WidgetProperties {
	data: any;
	columns: any[];
}

@theme(css)
export class SimpleGridRow extends ThemeableMixin(WidgetBase)<SimpleGridRowProperties> {
	protected render(): DNode {
		const { data, columns } = this.properties;

		return v('div', { classes: this.classes(css.row) }, columns.map((column) => {
			const item = data[column.id];
			return w(SimpleGridCell, { key: column.id, item, column });
		}));
	}
}

export interface SimpleGridCellProperties extends WidgetProperties {
	item: any;
	column: any;
}

@theme(css)
export class SimpleGridCell extends ThemeableMixin(WidgetBase)<SimpleGridCellProperties> {
	protected render(): DNode {
		const { item, column } = this.properties;

		return v('div', { classes: this.classes(css.cell) }, [ item.toString() ]);
	}
}
