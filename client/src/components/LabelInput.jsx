import React from 'react';
import './LabelInput.css';

function LabelInput({ label, type, value, onChange, placeholder, error, name, mask }) {
  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (mask) {
      inputValue = mask(inputValue);
    }
    onChange({ target: { name, value: inputValue } });
  };

  return (
    <div className="label-input">
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          name={name}
        />
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default LabelInput;