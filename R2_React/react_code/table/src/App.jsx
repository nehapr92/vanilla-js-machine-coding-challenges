import React, { useState } from "react";

const data = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "London" },
  { name: "Carol", age: 28, city: "Paris" },
  { name: "David", age: 35, city: "Berlin" },
  { name: "Eva", age: 22, city: "Rome" },
];

export default function SortableFilterableTable() {
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterText, setFilterText] = useState("");

  const sortedFilteredData = [...data]
    .filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    fontFamily: "sans-serif"
  };

  const inputStyle = {
    padding: "8px",
    width: "100%",
    marginBottom: "10px",
    boxSizing: "border-box"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse"
  };

  const thStyle = {
    cursor: "pointer",
    backgroundColor: "#f2f2f2",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ccc"
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd"
  };

  const hoverRowStyle = {
    backgroundColor: "#f9f9f9"
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        placeholder="Filter..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={inputStyle}
      />

      <table style={tableStyle}>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")} style={thStyle}>Name</th>
            <th onClick={() => handleSort("age")} style={thStyle}>Age</th>
            <th onClick={() => handleSort("city")} style={thStyle}>City</th>
          </tr>
        </thead>
        <tbody>
          {sortedFilteredData.map((row, index) => (
            <tr key={index} style={index % 2 ? hoverRowStyle : {}}>
              <td style={tdStyle}>{row.name}</td>
              <td style={tdStyle}>{row.age}</td>
              <td style={tdStyle}>{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
