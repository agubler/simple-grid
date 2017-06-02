import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { theme, ThemeableMixin } from '@dojo/widget-core/mixins/Themeable';

import { RowData, Column } from './../interfaces';

import * as css from './styles/grid.m.css';

interface GridProperties extends WidgetProperties {
	rows: RowData[];
	columns: Column[];
}

@theme(css)
export class Grid extends ThemeableMixin(WidgetBase)<GridProperties> {
	protected render(): DNode {
		const { rows, columns } = this.properties;

		return v('div', { classes: this.classes(css.grid) }, [
			w(Header, { columns }),
			w(Body, { rows, columns })
		]);
	}
}

interface BodyProperties extends WidgetProperties {
	rows: RowData[];
	columns: Column[];
}

@theme(css)
export class Body extends ThemeableMixin(WidgetBase)<BodyProperties> {

	private _selectedId: string;

	private _onSeletRequest(id: string) {
		this._selectedId = id;
		this.invalidate();
	}

	protected render(): DNode {
		const { rows, columns } = this.properties;

		return v('div', { classes: this.classes(css.body) }, rows.map((data) => {
			return w(Row, { key: data.id, data, columns, onSelectedRequest: this._onSeletRequest, selected: data.id === this._selectedId });
		}));
	}
}

interface HeaderProperties extends WidgetProperties {
	columns: Column[];
}

@theme(css)
export class Header extends ThemeableMixin(WidgetBase)<HeaderProperties> {
	protected render(): DNode {
		const { columns } = this.properties;

		return v('div', { classes: this.classes(css.header) }, [
			v('div', { classes: this.classes(css.row)}, columns.map((column) => {
				return v('div', { classes: this.classes(css.cell)}, [ column.id ]);
			}))
		]);
	}
}

interface RowProperties extends WidgetProperties {
	data: RowData;
	columns: Column[];
	onSelectedRequest: (id: string) => void;
	selected: boolean;
}

@theme(css)
class Row extends ThemeableMixin(WidgetBase)<RowProperties> {

	private _onClick() {
		this.properties.onSelectedRequest(this.properties.data.id);
	}

	render(): DNode {
		const { data, columns, selected } = this.properties;

		return v('div', { classes:  this.classes(css.row, selected ? css.selected : null ), onclick: this._onClick }, columns.map((column) => {
			const item = String(data[column.id]);

			return w(Cell, { key: column.id }, [ item ]);
		}));
	}
}

@theme(css)
class Cell extends ThemeableMixin(WidgetBase)<WidgetProperties> {

	render(): DNode {
		console.log('cell render');
		return v('div', { classes: this.classes(css.cell) }, this.children);

	}
}
