import { r as reactExports, U as UserContext, u as useNavigate, j as jsxRuntimeExports, b as api } from "./index-Chp7mPQo.js";
import { l as lodashExports } from "./lodash-FGX2TSDs.js";
import { a as axios } from "./index-ZD4TjlMZ.js";
import { J as Joi } from "./joi-browser.min-BvS7fu-Z.js";
import BackButton from "./BackButton-joDupiEB.js";
const schema = Joi.object({
  nome: Joi.string().max(100).required().messages({
    "string.empty": "O nome do evento é obrigatório.",
    "string.max": "O nome do evento deve ter no máximo 100 caracteres."
  }),
  descricao: Joi.string().max(2e3).required().messages({
    "string.empty": "A descrição do evento é obrigatória.",
    "string.max": "A descrição deve ter no máximo 2000 caracteres."
  }),
  data: Joi.date().iso().required().messages({
    "date.base": "A data é obrigatória e deve ser uma data válida.",
    "date.iso": "A data deve estar no formato ISO."
  }),
  status: Joi.string().valid("Ativo", "Inativo", "Pausado").required().messages({
    "any.only": "O status deve ser Ativo, Inativo ou Pausado.",
    "string.empty": "O status é obrigatório."
  }),
  endereco: Joi.object({
    apelido: Joi.string().min(3).max(50).required().messages({
      "string.empty": "O apelido do endereço é obrigatório.",
      "string.min": "O apelido deve ter no mínimo 3 caracteres.",
      "string.max": "O apelido deve ter no máximo 50 caracteres."
    }),
    cep: Joi.string().pattern(/^\d{5}-\d{3}$/).required().messages({
      "string.empty": "O CEP é obrigatório.",
      "string.pattern.base": "O CEP deve estar no formato 00.000-000."
    }),
    logradouro: Joi.string().min(3).max(50).required().messages({
      "string.empty": "O logradouro é obrigatório.",
      "string.min": "O logradouro deve ter no mínimo 3 caracteres.",
      "string.max": "O logradouro deve ter no máximo 50 caracteres."
    }),
    numero: Joi.string().min(1).max(20).required().messages({
      "string.empty": "O número é obrigatório.",
      "string.min": "O número deve ter no mínimo 1 caractere.",
      "string.max": "O número deve ter no máximo 20 caracteres."
    }),
    complemento: Joi.string().min(3).max(50).required().messages({
      "string.empty": "O complemento é obrigatório.",
      "string.min": "O complemento deve ter no mínimo 3 caracteres.",
      "string.max": "O complemento deve ter no máximo 50 caracteres."
    }),
    bairro: Joi.string().min(3).max(50).required().messages({
      "string.empty": "O bairro é obrigatório.",
      "string.min": "O bairro deve ter no mínimo 3 caracteres.",
      "string.max": "O bairro deve ter no máximo 50 caracteres."
    }),
    cidade: Joi.string().min(3).max(50).required().messages({
      "string.empty": "A cidade é obrigatória.",
      "string.min": "A cidade deve ter no mínimo 3 caracteres.",
      "string.max": "A cidade deve ter no máximo 50 caracteres."
    }),
    estado: Joi.string().length(2).required().messages({
      "string.empty": "O estado é obrigatório.",
      "string.length": "O estado deve ter exatamente 2 caracteres."
    }),
    pontoReferencia: Joi.string().min(3).max(50).required().messages({
      "string.empty": "O ponto de referência é obrigatório.",
      "string.min": "O ponto de referência deve ter no mínimo 3 caracteres.",
      "string.max": "O ponto de referência deve ter no máximo 50 caracteres."
    }),
    status: Joi.string().valid("ativo", "inativo", "pausado").required().messages({
      "any.only": "O status deve ser Ativo, Inativo ou Pausado."
    })
  }).required(),
  dataEvento: Joi.array().items(
    Joi.object({
      dataAbertura: Joi.date().iso().required().messages({
        "date.base": "A data de abertura deve ser uma data válida.",
        "date.iso": "A data de abertura deve estar no formato ISO.",
        "any.required": "A data de abertura é obrigatória."
      }),
      dataFechamento: Joi.date().iso().required().messages({
        "date.base": "A data de fechamento deve ser uma data válida.",
        "date.iso": "A data de fechamento deve estar no formato ISO.",
        "any.required": "A data de fechamento é obrigatória."
      }),
      horaAbertura: Joi.string().pattern(/^\d{2}:\d{2}$/).messages({
        "string.pattern.base": "A hora de abertura deve estar no formato HH:mm."
      }),
      horaFechamento: Joi.string().pattern(/^\d{2}:\d{2}$/).messages({
        "string.pattern.base": "A hora de fechamento deve estar no formato HH:mm."
      })
    })
  ).min(1).required()
});
Joi.object({
  nome: Joi.string().min(3).max(50).required().messages({
    "string.empty": "O nome da barraca é obrigatório.",
    "string.min": "O nome da barraca deve ter no mínimo 3 caracteres.",
    "string.max": "O nome da barraca deve ter no máximo 50 caracteres."
  }),
  descricao: Joi.string().min(20).max(500).required().messages({
    "string.empty": "A descrição da barraca é obrigatória.",
    "string.min": "A descrição deve ter no mínimo 20 caracteres.",
    "string.max": "A descrição deve ter no máximo 500 caracteres."
  }),
  responsaveis: Joi.array().items(Joi.object({
    _id: Joi.string().required(),
    displayName: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required()
  })).min(1).required(),
  funcionarios: Joi.array().items(Joi.object({
    _id: Joi.string().required(),
    displayName: Joi.string().required()
  })),
  pratos: Joi.array().items(Joi.object({
    nome: Joi.string().min(3).max(50).required(),
    ingredientes: Joi.string().min(3).max(200).required(),
    valor: Joi.number().greater(0).required(),
    imagem: Joi.string().allow(""),
    estoque: Joi.number().integer().min(0).required(),
    status: Joi.string().valid("Ativo").default("Ativo"),
    tempoPreparo: Joi.number().greater(0).required()
  })).min(1).required()
});
const EventForm = () => {
  const { user } = reactExports.useContext(UserContext);
  const navigate = useNavigate();
  const [nome, setNome] = reactExports.useState("");
  const [descricao, setDescricao] = reactExports.useState("");
  const [data, setData] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("Ativo");
  const [endereco, setEndereco] = reactExports.useState({
    apelido: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    pontoReferencia: "",
    status: "ativo"
  });
  const [dataEvento, setDataEvento] = reactExports.useState([
    { dataAbertura: "", horaAbertura: "", dataFechamento: "", horaFechamento: "" }
  ]);
  const [errors, setErrors] = reactExports.useState({});
  const [isEditingOrganizers, setIsEditingOrganizers] = reactExports.useState(false);
  const [isEditingResponsaveisBarraca, setIsEditingResponsaveisBarraca] = reactExports.useState(false);
  const [novoResponsavelBarraca, setNovoResponsavelBarraca] = reactExports.useState("");
  const [responsaveisBarraca, setResponsaveisBarraca] = reactExports.useState([]);
  const [isEditingFuncionariosBarraca, setIsEditingFuncionariosBarraca] = reactExports.useState(false);
  const [novoFuncionarioBarraca, setNovoFuncionarioBarraca] = reactExports.useState("");
  const [funcionariosBarraca, setFuncionariosBarraca] = reactExports.useState([]);
  const [novoResponsavel, setNovoResponsavel] = reactExports.useState("");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [users, setUsers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const [organizadoresAdicionais, setOrganizadoresAdicionais] = reactExports.useState([]);
  const [usersResponsaveisBarraca, setUsersResponsaveisBarraca] = reactExports.useState([]);
  const [loadingResponsaveisBarraca, setLoadingResponsaveisBarraca] = reactExports.useState(false);
  const [messageResponsaveisBarraca, setMessageResponsaveisBarraca] = reactExports.useState("");
  const [usersFuncionariosBarraca, setUsersFuncionariosBarraca] = reactExports.useState([]);
  const [loadingFuncionariosBarraca, setLoadingFuncionariosBarraca] = reactExports.useState(false);
  const [messageFuncionariosBarraca, setMessageFuncionariosBarraca] = reactExports.useState("");
  const [barracas, setBarracas] = reactExports.useState([]);
  const formatIdentifier2 = reactExports.useCallback((value) => {
    const cleanedValue = value.replace(/[^0-9A-Za-z]/g, "").toUpperCase();
    let formattedValue = "";
    for (let i = 0; i < Math.min(cleanedValue.length, 5); i++) {
      formattedValue += cleanedValue[i];
      if ((i === 1 || i === 3) && i < cleanedValue.length - 1) {
        formattedValue += "-";
      }
    }
    return formattedValue;
  }, []);
  const toggleEditOrganizers = () => {
    setIsEditingOrganizers((prev) => !prev);
  };
  const toggleEditResponsaveisBarraca = () => {
    setIsEditingResponsaveisBarraca((prev) => !prev);
  };
  const toggleEditFuncionariosBarraca = () => {
    setIsEditingFuncionariosBarraca((prev) => !prev);
  };
  const addResponsavelBarraca = (responsavel) => {
    const exists = responsaveisBarraca.some((r) => r._id === responsavel._id);
    if (!exists) {
      setResponsaveisBarraca((prev) => [...prev, responsavel]);
    }
  };
  const addFuncionarioBarraca = (funcionario) => {
    const exists = funcionariosBarraca.some((f) => f._id === funcionario._id);
    if (!exists) {
      setFuncionariosBarraca((prev) => [...prev, funcionario]);
    }
  };
  const fetchUsers = async (query) => {
    const sanitizedQuery = query.replace(/-/g, "");
    if (sanitizedQuery.length < 3) {
      setMessage("Digite pelo menos 3 caracteres para buscar.");
      setUsers([]);
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const token = api.get("authToken");
      const response = await fetch(`${"http://52.14.179.20"}/users/search?identifier=${sanitizedQuery}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) {
        if (response.status === 404) {
          setMessage("Nenhum usuário encontrado com esse identificador.");
          return [];
        } else {
          return [];
          setMessage("Erro ao buscar usuários. Tente novamente.");
        }
        setUsers([]);
        return;
      }
      const data2 = await response.json();
      return Array.isArray(data2) ? data2 : [data2];
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setMessage("Erro ao buscar usuários.");
    } finally {
      setLoading(false);
    }
  };
  const handleNovoResponsavelChange = reactExports.useCallback((e) => {
    const formattedValue = formatIdentifier2(e.target.value);
    setNovoResponsavel(formattedValue);
    const sanitizedValue = e.target.value.replace(/-/g, "");
    if (sanitizedValue.length === 5) {
      fetchUsers(sanitizedValue).then((results) => {
        setUsers(results);
        if (results.length === 0) {
          setMessage("Nenhum usuário encontrado.");
        } else {
          setMessage("");
        }
      });
    } else {
      setUsers([]);
      setMessage("Digite 5 caracteres para buscar.");
    }
  }, [fetchUsers]);
  const handleNovoResponsavelBarracaChange = reactExports.useCallback((e) => {
    const formattedValue = formatIdentifier2(e.target.value);
    setNovoResponsavelBarraca(formattedValue);
    const sanitizedValue = e.target.value.replace(/-/g, "");
    if (sanitizedValue.length === 5) {
      fetchUsers(sanitizedValue).then((results) => {
        setUsersResponsaveisBarraca(results);
      });
    } else {
      setUsersResponsaveisBarraca([]);
      setMessageResponsaveisBarraca("Digite 5 caracteres para buscar.");
    }
  }, [fetchUsers]);
  const handleNovoFuncionarioBarracaChange = reactExports.useCallback((e) => {
    const formattedValue = formatIdentifier2(e.target.value);
    setNovoFuncionarioBarraca(formattedValue);
    const sanitizedValue = e.target.value.replace(/-/g, "");
    if (sanitizedValue.length === 5) {
      fetchUsers(sanitizedValue).then((results) => {
        setUsersFuncionariosBarraca(results);
      });
    } else {
      setUsersFuncionariosBarraca([]);
      setMessageFuncionariosBarraca("Digite 5 caracteres para buscar.");
    }
  }, [fetchUsers]);
  reactExports.useCallback(
    lodashExports.debounce((query) => fetchUsers(query), 500, { leading: false, trailing: true }),
    []
  );
  const handleEnderecoChange = (field, value) => {
    setEndereco((prev) => ({ ...prev, [field]: value }));
  };
  const handleDataEventoChange = (index, field, value) => {
    const newDataEvento = [...dataEvento];
    if (field === "dataAbertura" || field === "dataFechamento") {
      newDataEvento[index][field] = value;
      newDataEvento[index][`hora${field.charAt(4).toUpperCase() + field.slice(5)}`] = value.split("T")[1];
    } else {
      newDataEvento[index][field] = value;
    }
    setDataEvento(newDataEvento);
  };
  const addDataEvento = () => {
    setDataEvento([
      ...dataEvento,
      { dataAbertura: "", horaAbertura: "", dataFechamento: "", horaFechamento: "" }
    ]);
  };
  const validate = () => {
    const event = {
      nome,
      descricao,
      data,
      status,
      endereco,
      dataEvento,
      barracas
    };
    const { error } = schema.validate(event, { abortEarly: false });
    if (error) {
      console.log("Validation Errors:", error.details);
      const errorMessages = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path.join(".")] = detail.message;
      });
      setErrors(errorMessages);
      return false;
    }
    setErrors({});
    return true;
  };
  for (const barraca of barracas) {
    if (!barraca.nome || !barraca.descricao) {
      setErrors((prev) => ({
        ...prev,
        barracas: "Todas as barracas devem ter nome e descrição."
      }));
      return false;
    }
  }
  const addOrganizer = (organizer) => {
    const exists = organizadoresAdicionais.some((o) => o._id === organizer._id);
    console.log("Organizadores Adicionais:", organizadoresAdicionais);
    if (!exists) {
      setOrganizadoresAdicionais((prev) => [...prev, organizer]);
    }
  };
  const addBarraca = () => {
    setBarracas((prev) => [
      ...prev,
      {
        nome: "",
        descricao: "",
        responsaveis: [],
        funcionarios: [],
        pratos: []
      }
    ]);
  };
  const removeBarraca = (index) => {
    setBarracas((prev) => prev.filter((_, i) => i !== index));
  };
  const updateBarraca = (barracaIndex, field, value, pratoIndex = null) => {
    setBarracas((prev) => {
      const updated = [...prev];
      if (pratoIndex !== null && field.startsWith("pratos")) {
        const pratoField = field.split(".")[1];
        updated[barracaIndex].pratos[pratoIndex][pratoField] = value;
      } else {
        updated[barracaIndex][field] = value;
      }
      return updated;
    });
  };
  const addPrato = (barracaIndex) => {
    setBarracas((prev) => {
      const updated = [...prev];
      updated[barracaIndex].pratos.push({
        nome: "",
        ingredientes: "",
        valor: 0,
        imagem: "",
        estoque: 0,
        status: "Ativo",
        tempoPreparo: 0
      });
      return updated;
    });
  };
  const removePrato = (barracaIndex, pratoIndex) => {
    setBarracas((prev) => {
      const updated = [...prev];
      updated[barracaIndex].pratos = updated[barracaIndex].pratos.filter((_, i) => i !== pratoIndex);
      return updated;
    });
  };
  const removeOrganizer = (organizerId) => {
    setOrganizadoresAdicionais((prev) => prev.filter((o) => o._id !== organizerId));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const token = api.get("authToken");
    const organizadores = [
      {
        nome: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        identifier: user.identifier,
        uid: user._id,
        status: "Ativo"
      },
      ...organizadoresAdicionais.map((organizer) => ({
        nome: organizer.displayName,
        email: organizer.email,
        photoURL: organizer.photoURL,
        identifier: organizer.identifier,
        uid: organizer._id,
        status: "Ativo"
      }))
    ];
    const event = {
      nome,
      descricao,
      data,
      endereco,
      dataEvento,
      barracas,
      status,
      organizadores
    };
    try {
      const apiUrl = "http://52.14.179.20";
      await axios.post(`${apiUrl}/events`, event, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      navigate("/eventos");
    } catch (error) {
      console.error("Erro ao criar evento:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "event-form", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BackButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Cadastre seu evento" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bloco", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Nome do Responsável: ",
        user.displayName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: user.photoURL || "/src/img/icones/userCracha.png",
            alt: "Responsável",
            className: "imgResponsavel"
          }
        ),
        formatIdentifier2(user.identifier)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: toggleEditOrganizers,
          children: "Buscar usuários"
        }
      ),
      isEditingOrganizers && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Código Itentificador :",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: novoResponsavel,
              placeholder: "XX-XX-X",
              onChange: handleNovoResponsavelChange,
              className: "codigoUsuario"
            }
          )
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Carregando..." }),
        message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "message", children: message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-results", children: users.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: users.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "user-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user2.photoURL || "../img/icones/userCracha.png",
              alt: user2.displayName,
              className: "imgResponsavel"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
            " ",
            user2.displayName,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
            " ",
            user2.email,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => addOrganizer(user2),
                type: "button",
                children: "Adicionar Organizador"
              }
            )
          ] })
        ] }, user2._id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nenhum usuário encontrado." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Organizadores Adicionais:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: organizadoresAdicionais.map((organizer) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "organizer-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: organizer.photoURL || "../img/icones/userCracha.png",
            alt: organizer.displayName,
            className: "imgOrganizadorAdicional",
            style: { width: "50px", height: "50px", borderRadius: "50%" }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
          " ",
          organizer.displayName,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => removeOrganizer(organizer._id),
              type: "button",
              children: "Remover"
            }
          )
        ] })
      ] }, organizer._id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Nome do evento:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: nome,
            onChange: (e) => setNome(e.target.value),
            required: true
          }
        ),
        errors["nome"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["nome"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Descrição:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: descricao,
            onChange: (e) => setDescricao(e.target.value),
            required: true
          }
        ),
        errors["descricao"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["descricao"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Data:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "datetime-local",
            value: data,
            onChange: (e) => setData(e.target.value),
            required: true
          }
        ),
        errors["data"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["data"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Status:",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), required: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Ativo", children: "Ativo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Inativo", children: "Inativo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Pausado", children: "Pausado" })
        ] }),
        errors["status"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["status"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Endereço" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Nome do local:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.apelido,
            onChange: (e) => handleEnderecoChange("apelido", e.target.value),
            placeholder: "Nome do local",
            required: true
          }
        ),
        errors["endereco.apelido"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.apelido"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "CEP:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.cep,
            onChange: (e) => handleEnderecoChange("cep", e.target.value),
            maxLength: "9",
            placeholder: "00.000-000",
            required: true
          }
        ),
        errors["endereco.cep"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.cep"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Logradouro:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.logradouro,
            onChange: (e) => handleEnderecoChange("logradouro", e.target.value),
            placeholder: "'Rua Esta' ou 'Avenida Aquela'",
            required: true
          }
        ),
        errors["endereco.logradorou"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.logradouro"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Número:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.numero,
            onChange: (e) => handleEnderecoChange("numero", e.target.value),
            placeholder: "000",
            required: true
          }
        ),
        errors["endereco.numero"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.numero"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Complemento:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.complemento,
            onChange: (e) => handleEnderecoChange("complemento", e.target.value),
            placeholder: "Complemento",
            required: true
          }
        ),
        errors["endereco.complemento"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.complemento"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Bairro:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.bairro,
            onChange: (e) => handleEnderecoChange("bairro", e.target.value),
            placeholder: "Bairro",
            required: true
          }
        ),
        errors["endereco.bairro"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.bairro"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Cidade:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.cidade,
            onChange: (e) => handleEnderecoChange("cidade", e.target.value),
            placeholder: "Cidade",
            required: true
          }
        ),
        errors["endereco.cidade"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.cidade"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Estado:",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: endereco.estado,
            onChange: (e) => handleEnderecoChange("estado", e.target.value),
            required: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Selecione o estado" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "AC", children: "AC" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "AL", children: "AL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "AP", children: "AP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "AM", children: "AM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "BA", children: "BA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "CE", children: "CE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "DF", children: "DF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ES", children: "ES" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "GO", children: "GO" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MA", children: "MA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MT", children: "MT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MS", children: "MS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "MG", children: "MG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PA", children: "PA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PB", children: "PB" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PR", children: "PR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PE", children: "PE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "PI", children: "PI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "RJ", children: "RJ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "RN", children: "RN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "RS", children: "RS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "RO", children: "RO" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "RR", children: "RR" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SC", children: "SC" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SP", children: "SP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "SE", children: "SE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "TO", children: "TO" })
            ]
          }
        ),
        errors["endereco.estado"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.estado"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Ponto de Referência:",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: endereco.pontoReferencia,
            onChange: (e) => handleEnderecoChange("pontoReferencia", e.target.value),
            placeholder: "Ponto de referência",
            required: true
          }
        ),
        errors["endereco.pontoReferencia"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.pontoReferencia"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Status:",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: endereco.status,
            onChange: (e) => handleEnderecoChange("status", e.target.value),
            required: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ativo", children: "Ativo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "inativo", children: "Inativo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pausado", children: "Pausado" })
            ]
          }
        ),
        errors["endereco.status"] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors["endereco.status"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Horário de Funcionamento" }),
      dataEvento.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "data-evento", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Data e Hora de Abertura:",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              value: item.dataAbertura,
              onChange: (e) => handleDataEventoChange(index, "dataAbertura", e.target.value),
              required: true
            }
          ),
          errors[`dataEvento.${index}.dataAbertura`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors[`dataEvento.${index}.dataAbertura`] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Data e Hora de Fechamento:",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "datetime-local",
              value: item.dataFechamento,
              onChange: (e) => handleDataEventoChange(index, "dataFechamento", e.target.value),
              required: true
            }
          ),
          errors[`dataEvento.${index}.dataFechamento`] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error", children: errors[`dataEvento.${index}.dataFechamento`] })
        ] })
      ] }, index)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: addDataEvento, children: "Adicionar outra data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "adicionarBarracas", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Adicionar barracas" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Barracas" }),
        barracas.map((barraca, barracaIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "barraca", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            "Barraca ",
            barracaIndex + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            "Nome da Barraca:",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: barraca.nome || "",
                onChange: (e) => updateBarraca(barracaIndex, "nome", e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            "Descrição da Barraca:",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: barraca.descricao || "",
                onChange: (e) => updateBarraca(barracaIndex, "descricao", e.target.value),
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Responsáveis Pela barraca" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => toggleEditResponsaveisBarraca(),
              children: "Buscar usuários"
            }
          ),
          isEditingResponsaveisBarraca && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Código Itentificador :",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: novoResponsavelBarraca,
                  placeholder: "XX-XX-X",
                  onChange: handleNovoResponsavelBarracaChange,
                  className: "codigoUsuario"
                }
              )
            ] }),
            loadingResponsaveisBarraca && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Carregando..." }),
            messageResponsaveisBarraca && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "message", children: messageResponsaveisBarraca }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-results", children: usersResponsaveisBarraca.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: usersResponsaveisBarraca.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "user-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: user2.photoURL || "../img/icones/userCracha.png",
                  alt: user2.displayName,
                  className: "imgResponsavel"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
                " ",
                user2.displayName,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
                " ",
                user2.email,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => addResponsavelBarraca(user2),
                    type: "button",
                    children: "Adicionar Organizador Barraca"
                  }
                )
              ] })
            ] }, user2._id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nenhum usuário encontrado." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: responsaveisBarraca.map((responsavel, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            responsavel.displayName,
            " (",
            responsavel.email,
            ")",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setResponsaveisBarraca(
              (prev) => prev.filter((r) => r._id !== responsavel._id)
            ), children: "Remover" })
          ] }, index)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Funcionários" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: toggleEditFuncionariosBarraca,
              children: "Buscar usuários"
            }
          ),
          isEditingFuncionariosBarraca && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Código Itentificador :",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: novoFuncionarioBarraca,
                  placeholder: "XX-XX-X",
                  onChange: handleNovoFuncionarioBarracaChange,
                  className: "codigoUsuario"
                }
              )
            ] }),
            loadingFuncionariosBarraca && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Carregando..." }),
            messageFuncionariosBarraca && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "message", children: messageFuncionariosBarraca }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "search-results", children: usersFuncionariosBarraca.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: usersFuncionariosBarraca.map((user2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "user-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: user2.photoURL || "../img/icones/userCracha.png",
                  alt: user2.displayName,
                  className: "imgResponsavel"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nome:" }),
                " ",
                user2.displayName,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
                " ",
                user2.email,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => addFuncionarioBarraca(user2),
                    type: "button",
                    children: "Adicionar Funcionário Barraca"
                  }
                )
              ] })
            ] }, user2._id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nenhum usuário encontrado." }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: funcionariosBarraca.map((funcionario, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            funcionario.displayName,
            " (",
            funcionario.email,
            ")",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setFuncionariosBarraca(
                  (prev) => prev.filter((f) => f._id !== funcionario._id)
                ),
                children: "Remover"
              }
            )
          ] }, index)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Pratos" }),
          barraca.pratos.map((prato, pratoIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prato", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Nome:",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: prato.nome || "",
                  onChange: (e) => updateBarraca(barracaIndex, "pratos.nome", e.target.value, pratoIndex),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Ingredientes:",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  value: prato.ingredientes || "",
                  onChange: (e) => updateBarraca(barracaIndex, "pratos.ingredientes", e.target.value, pratoIndex),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Valor:",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: prato.valor || "",
                  onChange: (e) => updateBarraca(barracaIndex, "pratos.valor", e.target.value, pratoIndex),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Estoque:",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: prato.estoque || "",
                  onChange: (e) => updateBarraca(barracaIndex, "pratos.estoque", e.target.value, pratoIndex),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
              "Tempo de Preparo:",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "number",
                  value: prato.tempoPreparo || "",
                  onChange: (e) => updateBarraca(barracaIndex, "pratos.tempoPreparo", e.target.value, pratoIndex),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removePrato(barracaIndex, pratoIndex), children: "Remover Prato" })
          ] }, pratoIndex)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => addPrato(barracaIndex), children: "Adicionar Prato" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeBarraca(barracaIndex), children: "Remover Barraca" })
        ] }, barracaIndex)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: addBarraca, children: "Adicionar Barraca" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", children: "Criar Evento" })
    ] })
  ] });
};
export {
  EventForm as default
};
