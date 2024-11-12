import React, { useState } from "react";

function Select({ onChange, itens, name }) {
  return (
    <label>
      {name}:
      <select onChange={(e) => onChange(e.target.value)}>
        {itens.map((e) => (
          <option value={e.vbalue}>{e.label}</option>
        ))}
      </select>
    </label>
  );
}

export default Select;
