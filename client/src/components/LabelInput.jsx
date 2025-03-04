import React from 'react';
import './LabelInput.css';

function LabelInput({ label, type, value, onChange, placeholder }) {
  return (
    <div className="label-input">
      <label>
        {label}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}/>
      </label>
    </div>
  );
}

export default LabelInput;