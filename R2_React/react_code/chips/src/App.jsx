import React, { useState } from "react";
function ChipsInput() {

  const [value, setValue] = useState("");
  const [chips, setChips] = useState([]);
  const [idCounter, setIdCounter] = useState(1);
  const handleChange = (e) => {
    setValue(e.target.value);

  }

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      const newchip = {
        id: idCounter,
        label: value,
      }
      setValue("")
      setIdCounter(idCounter + 1)
      setChips([...chips, newchip])
    }

  }

  const handleRemoveChip = (i) => {

    setChips(chips.filter(c => c.id !== i))

  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "40px 0" }}>
      <h2>Chips Input</h2>
      <input
        type="text"
        placeholder="Type a chip and press tag"
        style={{ padding: "8px", width: "200px" }}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {
        chips.map((c) => <span style={{ background: '#ccc', borderRadius: '4px', margin: '4px', display: 'inline' }} key={c.id}>{c.label}    <button
          onClick={() => handleRemoveChip(c.id)}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer',
            color: '#999'
          }}

        >
          ×
        </button></span>)
      }
    </div>
  );
}

export default ChipsInput;