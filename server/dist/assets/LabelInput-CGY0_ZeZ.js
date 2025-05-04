import { j as jsxRuntimeExports } from "./index-Chp7mPQo.js";
function LabelInput({ label, type, value, onChange, placeholder, error, name, mask }) {
  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (mask) {
      inputValue = mask(inputValue);
    }
    onChange({ target: { name, value: inputValue } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "label-input", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
      label,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type,
          value,
          onChange: handleChange,
          placeholder,
          name
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "error-message", children: error })
  ] });
}
export {
  LabelInput as L
};
