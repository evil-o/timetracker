export class Cell {
  public rowSpan?: number;

  public colSpan?: number;

  public bgColor?: string;

  public contents: string;

  protected elementType = 'td';

  public appendTo(element: HTMLElement) {
    const td = element.appendChild(document.createElement(this.elementType)) as HTMLTableDataCellElement;
    td.innerHTML = this.contents;
    if (this.colSpan) {
      td.colSpan = this.colSpan;
    }
    if (this.bgColor) {
      td.bgColor = this.bgColor;
    }
  }
}

export class HeaderCell extends Cell {
  protected elementType = 'th';
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

  private appendContents(contents: string[], constructor: any) {
    const row = new Row();
    for (const content of contents) {
      const cell = constructor();
      cell.contents = content;
      row.cells.push(cell);
    }
    this.rows.push(row);
  }

  public appendHeadingRow(...contents: string[]) {
    this.appendContents(contents, () => new HeaderCell());
  }

  public appendRow(...contents: string[]) {
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
      const tr = root.appendChild(document.createElement('tr'));
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
}

export class HtmlTableGenerator {
  public header = new RowCollection();

  public body = new RowCollection();

  public border?: string;

  public appendTo(root: HTMLElement): void {
    const table = root.appendChild(document.createElement('table'));

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
