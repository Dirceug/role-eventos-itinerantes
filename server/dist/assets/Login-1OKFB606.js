const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LoginComponent-BoXuRCrq.js","assets/index-CXP7wpmU.js","assets/index-BIH4TKpF.css","assets/firebase-BLyn2qNx.js","assets/index-e84cf44d-BcL1Y4JN.js","assets/ButtonGrande-DSO7TFYV.js","assets/ButtonGrande-8QRTMBCc.css","assets/LoginComponent-CWBv3fBo.css"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, _ as __vitePreload } from "./index-CXP7wpmU.js";
/* empty css               */
const dancing = "/assets/dancing-hCqRaFWV.png";
const LoginComponent = reactExports.lazy(() => __vitePreload(() => import("./LoginComponent-BoXuRCrq.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0));
function Login() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "paginaLogin", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: dancing, alt: "", className: "dancing" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "role", children: "Rolê" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoginComponent, {})
  ] });
}
export {
  Login as default
};
