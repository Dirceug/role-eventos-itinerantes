const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-DT6fU_nm.js","assets/index-C8l_MEH7.js","assets/index-BIH4TKpF.css","assets/index-9ae71ce3-D9oYUShw.js","assets/Navbar-DjX9SrpG.css"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, _ as __vitePreload } from "./index-C8l_MEH7.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-DT6fU_nm.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const RestaurantesComportativos = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "construction-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Em construção" }) })
  ] });
};
export {
  RestaurantesComportativos as default
};
