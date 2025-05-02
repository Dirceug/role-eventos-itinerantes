const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Navbar-CUGtS-Ph.js","assets/index-CWX6cuis.js","assets/index-BIH4TKpF.css","assets/index-e84cf44d-C0APv3cj.js","assets/Navbar-DjX9SrpG.css"])))=>i.map(i=>d[i]);
import { j as jsxRuntimeExports, r as reactExports, _ as __vitePreload } from "./index-CWX6cuis.js";
const Navbar = reactExports.lazy(() => __vitePreload(() => import("./Navbar-CUGtS-Ph.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const RestaurantesComportativos = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "construction-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Em construção" }) })
  ] });
};
export {
  RestaurantesComportativos as default
};
