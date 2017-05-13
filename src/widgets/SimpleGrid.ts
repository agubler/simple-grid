import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';

export interface SimpleGridProperties extends WidgetProperties {
	data: any[];
	columns: any[];
}

export class SimpleGrid extends WidgetBase<SimpleGridProperties> {
	protected render(): DNode {
		const { data, columns } = this.properties;
		return v('div', {
			styles: {
				width: '1000px',
				height: '500px',
				border: '1px solid #ddd',
				overflow: 'scroll'
			}
		}, data.map((row) => {
			return w(SimpleGridRow, { key: row.id, data: row, columns });
		}));
	}
}

export interface SimpleGridRowProperties extends WidgetProperties {
	data: any;
	columns: any[];
}

export class SimpleGridRow extends WidgetBase<SimpleGridRowProperties> {
	protected render(): DNode {
		const { data, columns } = this.properties;

		return v('div', {
			styles: {
				display: 'flex'
			}
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

export class SimpleGridCell extends WidgetBase<SimpleGridCellProperties> {
	protected render(): DNode {
		const { item, column } = this.properties;

		return v('div', {
			styles: {
				flex: '1',
				border: '1px solid #ddd',
				'border-top-style': 'none'
			}
		}, [ item.toString() ]);
	}
}
