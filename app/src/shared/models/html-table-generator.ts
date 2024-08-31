export interface ICell {
    rowSpan?: number;

    colSpan?: number;

    bgColor?: string;

    contents: string;

    align?: "left" | "right";
}

export class Cell implements ICell {
    public rowSpan?: number;

    public colSpan?: number;

    public bgColor?: string;

    public align?: "left" | "right";

    public contents = "";

    protected elementType = "td";

    public copyFrom(origin: ICell) {
        this.rowSpan = origin.rowSpan;
        this.colSpan = origin.colSpan;
        this.bgColor = origin.bgColor;
        this.contents = origin.contents;
        this.align = origin.align;
    }

    public appendTo(element: HTMLElement) {
        const td = element.appendChild(
            document.createElement(this.elementType)
        ) as HTMLTableDataCellElement;
        td.innerHTML = this.contents;
        if (this.colSpan) {
            td.colSpan = this.colSpan;
        }
        if (this.bgColor) {
            td.bgColor = this.bgColor;
        }
        if (this.align) {
            td.align = this.align;
        }
    }
}

export class HeaderCell extends Cell {
    protected override elementType = "th";
}

export class Row {
    cells: Cell[] = [];

    public appendCell() {
        const cell = new Cell();
        this.cells.push(cell);
        return cell;
    }

    public appendHeading() {
        const heading = new HeaderCell();
        this.cells.push(heading);
        return heading;
    }
}

export class RowCollection {
    public rows: Row[] = [];

    public appendHeadingRow(...contents: (string | ICell)[]) {
        this.appendContents(contents, () => new HeaderCell());
    }

    public appendRow(...contents: (string | ICell)[]) {
        this.appendContents(contents, () => new Cell());
    }

    public appendHeadingSpan(contents: string, span: number) {
        const row = this.createRow();
        const cell = row.appendHeading();
        cell.contents = contents;
        cell.colSpan = span;
        return cell;
    }

    public appendSpan(contents: string, span: number) {
        const row = this.createRow();
        const cell = row.appendCell();
        cell.contents = contents;
        cell.colSpan = span;
        return cell;
    }

    public appendTo(root: HTMLElement) {
        for (const row of this.rows) {
            const tr = root.appendChild(document.createElement("tr"));
            for (const cell of row.cells) {
                cell.appendTo(tr);
            }
        }
    }

    public createRow() {
        const row = new Row();
        this.rows.push(row);
        return row;
    }

    private appendContents(
        contents: (string | ICell)[],
        constructor: () => Cell
    ) {
        const row = new Row();
        for (const c of contents) {
            const cell = constructor();
            if (typeof c === "string") {
                cell.contents = c;
            } else {
                cell.copyFrom(c as ICell);
            }
            row.cells.push(cell);
        }
        this.rows.push(row);
    }
}

export class HtmlTableGenerator {
    public header = new RowCollection();

    public body = new RowCollection();

    public border?: string;

    public appendTo(root: HTMLElement): void {
        const table = root.appendChild(document.createElement("table"));

        if (this.border) {
            table.border = this.border;
        }

        if (this.header.rows) {
            const thead = table.createTHead();
            this.header.appendTo(thead);
        }

        if (this.body.rows) {
            const tbody = table.createTBody();
            this.body.appendTo(tbody);
        }
    }
}
