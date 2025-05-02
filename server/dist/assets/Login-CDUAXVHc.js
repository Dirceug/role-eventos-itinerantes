const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LoginComponent-CnKMzmpK.js","assets/index-CWX6cuis.js","assets/index-BIH4TKpF.css","assets/firebase-C86Ry2b6.js","assets/index-e84cf44d-C0APv3cj.js","assets/ButtonGrande-D7WhkQcb.js","assets/ButtonGrande-8QRTMBCc.css","assets/LoginComponent-CWBv3fBo.css"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, _ as __vitePreload } from "./index-CWX6cuis.js";
/* empty css               */
const dancing = "/assets/dancing-hCqRaFWV.png";
const LoginComponent = reactExports.lazy(() => __vitePreload(() => import("./LoginComponent-CnKMzmpK.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7]) : void 0));
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
