function Table(columns) {
  let table = {
    columns: columns,
    rows: [],
  };

  table.push = function (rows) {
    this.rows.push(rows);
  };

  table.render = function () {
    let tEl = document.createElement('table');
    let thEl = document.createElement('tr');
    tEl.appendChild(thEl);

    this.columns.forEach((colName) => {
      let tdEl = document.createElement('th');
      tdEl.innerText = colName;
      thEl.appendChild(tdEl);
    });

    this.rows.forEach((row) => {
      let trEl = document.createElement('tr');
      row.forEach((val) => {
        let tdEl = document.createElement('td');
        tdEl.innerText = val;
        trEl.appendChild(tdEl);
      });
      tEl.appendChild(trEl);
    });
    return tEl;
  };

  return table;
}

module.exports = Table;
