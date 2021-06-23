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
    tEl.classList.add('table', 'table-bordered');

    let theadEl = document.createElement('thead');
    let thEl = document.createElement('tr');
    tEl.appendChild(theadEl);
    theadEl.appendChild(thEl);

    let tbodyEl = document.createElement('tbody');
    tEl.appendChild(tbodyEl);

    this.columns.forEach((colName) => {
      let tdEl = document.createElement('th');
      tdEl.innerText = colName;
      tdEl.setAttribute('scope', 'col');
      thEl.appendChild(tdEl);
    });

    this.rows.forEach((row) => {
      let trEl = document.createElement('tr');
      row.forEach((val) => {
        let tdEl = document.createElement('td');
        tdEl.innerText = val;
        trEl.appendChild(tdEl);
      });
      tbodyEl.appendChild(trEl);
    });
    return tEl;
  };

  return table;
}

module.exports = Table;
