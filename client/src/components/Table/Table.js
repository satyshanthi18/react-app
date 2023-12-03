import React from "react";

const Table = ({ data, handleEdit, handleDelete, columns }) => {
  data.forEach((dataField, i) => {
    dataField.id = i + 1;
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>S.No</th>
            {columns.map((column) => (
              <th>{column.label}</th>
            ))}
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((dataField, i) => (
              <tr key={dataField.id}>
                <td>{i + 1}</td>
                {columns.map((column) => (
                  <td>{dataField[column.field]}</td>
                ))}
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(dataField.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(dataField._id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
