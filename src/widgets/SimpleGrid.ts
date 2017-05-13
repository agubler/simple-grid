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

	private _selectedRow: string;

	private _selectRow(id: string) {
		this._selectedRow = id;
		this.invalidate();
	}

	protected render(): DNode {
		const { data, columns } = this.properties;
		return v('div', { classes: this.classes(css.body) }, data.map((row) => {
			return w(SimpleGridRow, {
				key: row.id,
				data: row,
				columns,
				onSelectRequest: this._selectRow,
				selected: this._selectedRow === row.id
			});
		}));
	}
}

export interface SimpleGridRowProperties extends WidgetProperties {
	data: any;
	columns: any[];
	onSelectRequest: (id: string) => void;
	selected: boolean;
}

@theme(css)
export class SimpleGridRow extends ThemeableMixin(WidgetBase)<SimpleGridRowProperties> {

	private _onClick(event: MouseEvent) {
		this.properties.onSelectRequest(this.properties.data.id);
	}

	protected render(): DNode {
		const { data, columns, selected } = this.properties;

		return v('div', {
			classes: this.classes(css.row, selected ? css.selected : null),
			onclick: this._onClick
		}, columns.map((column) => {
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
