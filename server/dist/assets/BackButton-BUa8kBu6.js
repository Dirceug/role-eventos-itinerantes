import { u as useNavigate, j as jsxRuntimeExports } from "./index-Cc20aRZ1.js";
const BackButton = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleBackClick, className: "back-button no-hover", children: "←" });
};
export {
  BackButton as default
};
