export function parseContextTable(tableString: string) {
  const rows = tableString.split("\n");

  return rows.map((row) => {
    const columns = row.split(/\s+/);
    return columns;
  });
}

export function parseNamespaceList(tableString: string) {
  return tableString
    .split("\n\n\n")
    .map((item) => item.split("\n"))
    .map((item) => item[0].split(/\s+/))
    .map((item) => item[1]);
}

export function invertRowsAndColumns(matrix: any[][]): any[][] {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  const invertedMatrix: any[][] = [];

  for (let col = 0; col < numCols; col++) {
    const newRow: any[] = [];
    for (let row = 0; row < numRows; row++) {
      newRow.push(matrix[row][col]);
    }
    invertedMatrix.push(newRow);
  }

  return invertedMatrix;
}
