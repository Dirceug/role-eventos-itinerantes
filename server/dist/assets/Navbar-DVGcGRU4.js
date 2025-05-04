const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CardapioButtonBranco-BQj3C9nI.js","assets/index-Dwuq2f-n.js","assets/index-BIH4TKpF.css","assets/cardapioBranco-Cdq6HB4V.js","assets/CardapioButtonBranco-ojtdmf9f.css","assets/SaldoButtonBranco-BrD1cLz-.js","assets/SaldoButtonBranco-BoJTJFRx.css","assets/ListaPedidosButton-DL2A9yc7.js","assets/ListaPedidosButton-DshhIMYw.css","assets/ListaUsuariosButton-y0kS9aAc.js"])))=>i.map(i=>d[i]);
import { r as reactExports, U as UserContext, u as useNavigate, b as api, j as jsxRuntimeExports, L as Link, _ as __vitePreload } from "./index-Dwuq2f-n.js";
import { i as getAuth, o as signOut } from "./index-9ae71ce3-BWNZJcxD.js";
const CardapioButtonBranco = reactExports.lazy(() => __vitePreload(() => import("./CardapioButtonBranco-BQj3C9nI.js"), true ? __vite__mapDeps([0,1,2,3,4]) : void 0));
const SaldoButtonBranco = reactExports.lazy(() => __vitePreload(() => import("./SaldoButtonBranco-BrD1cLz-.js"), true ? __vite__mapDeps([5,1,2,6]) : void 0));
const ListaPedidosButton = reactExports.lazy(() => __vitePreload(() => import("./ListaPedidosButton-DL2A9yc7.js"), true ? __vite__mapDeps([7,1,2,3,8]) : void 0));
const ListaUsuariosButton = reactExports.lazy(() => __vitePreload(() => import("./ListaUsuariosButton-y0kS9aAc.js"), true ? __vite__mapDeps([9,1,2,8]) : void 0));
function Navbar({ eventId }) {
  const { user, loadingUser } = reactExports.useContext(UserContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = reactExports.useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = reactExports.useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  reactExports.useEffect(() => {
    if (!user) {
      console.error("No user logged in");
    }
  }, [user]);
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Deseja mesmo sair da plataforma?");
    if (confirmation) {
      alert("Gostei de você, volte sempre 😉");
      try {
        await signOut(auth);
        api.remove("authToken");
        navigate("/login");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    } else {
      alert("Que bom, pode continuar a navegação ❤️");
    }
  };
  const userToken = api.get("authToken");
  if (loadingUser) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." });
  }
  const handleCardapioClick = () => {
    navigate("/lista-barracas", { state: { eventId, userId: user ? user.uid : null } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "navbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "hamburger-menu", onClick: toggleHamburgerMenu, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
    ] }),
    isHamburgerMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hamburger-menu-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/usuarios", children: "Totos Eventos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/meus-eventos", children: "Meus Eventos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/restaurantesCorporativos", children: "Restaurantes Corporativos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/eventos/novo", children: "Cadastrar Eventos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/logout", onClick: handleLogout, children: "Logout" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Carregando..." }), children: [
      user && eventId && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CardapioButtonBranco,
        {
          eventId,
          userId: user ? user._id : null,
          label: "Cardápio",
          onClick: handleCardapioClick
        }
      ),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SaldoButtonBranco,
        {
          userId: user._id,
          token: userToken,
          label: "Adicionar Saldo"
        }
      ),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ListaUsuariosButton,
        {
          userId: user._id,
          token: userToken,
          label: "Usuarios"
        }
      ),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ListaPedidosButton,
        {
          userId: user._id,
          token: userToken,
          label: "Lista Pedidos"
        }
      )
    ] }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "navbar-menu", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: user.photoURL,
          alt: user.displayName,
          className: "navbar-user-photo",
          onClick: toggleUserMenu
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: user.displayName }),
      isUserMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "navbar-menu-content", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/perfil", children: "Perfil" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/adicionar-endereco", children: "Adicionar Endereço" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/adicionar-dados-bancários", children: "Adicionar Dados Bancários" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/logout", onClick: handleLogout, children: "Logout" })
      ] })
    ] })
  ] });
}
export {
  Navbar as default
};
