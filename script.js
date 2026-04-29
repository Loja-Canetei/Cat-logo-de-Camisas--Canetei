// 1) Dados da Loja Canetei
const WHATSAPP_NUMERO = "5573999571065";
const NOME_LOJA = "Loja Canetei";

// 2) Produtos com códigos únicos para identificação
const PRODUTOS = [
  {
    id: 1,
    codigo: "CAN001",
    nome: "Real Madrid Home 2024",
    categoria: "laliga",
    liga: "La Liga",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ffffff/000000?text=Real+Madrid+CAN001",
  },
  {
    id: 2,
    codigo: "CAN002", 
    nome: "Barcelona Away 2024",
    categoria: "laliga",
    liga: "La Liga",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/004d9f/fcb900?text=Barcelona+CAN002",
  },
  {
    id: 3,
    codigo: "CAN003",
    nome: "Manchester City Home 2024",
    categoria: "premier",
    liga: "Premier League",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/6cabdd/ffffff?text=Man+City+CAN003",
  },
  {
    id: 4,
    codigo: "CAN004",
    nome: "Arsenal Home 2024",
    categoria: "premier",
    liga: "Premier League", 
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ef0107/ffffff?text=Arsenal+CAN004",
  },
  {
    id: 5,
    codigo: "CAN005",
    nome: "Inter de Milão Home 2024",
    categoria: "seriea",
    liga: "Serie A",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/0068a8/000000?text=Inter+CAN005",
  },
  {
    id: 6,
    codigo: "CAN006",
    nome: "Juventus Home 2024",
    categoria: "seriea",
    liga: "Serie A",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/000000/ffffff?text=Juventus+CAN006",
  },
  {
    id: 7,
    codigo: "CAN007",
    nome: "Flamengo Home 2024",
    categoria: "brasileirao",
    liga: "Brasileirão",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/dc143c/ffffff?text=Flamengo+CAN007",
  },
  {
    id: 8,
    codigo: "CAN008",
    nome: "Palmeiras Home 2024",
    categoria: "brasileirao", 
    liga: "Brasileirão",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/006f3c/ffffff?text=Palmeiras+CAN008",
  },
  {
    id: 9,
    codigo: "CAN009",
    nome: "Bayern München Home 2024",
    categoria: "bundesliga",
    liga: "Bundesliga",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/dc052d/ffffff?text=Bayern+CAN009",
  },
  {
    id: 10,
    codigo: "CAN010",
    nome: "Borussia Dortmund Home 2024",
    categoria: "bundesliga",
    liga: "Bundesliga", 
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/fde100/000000?text=Dortmund+CAN010",
  },
  {
    id: 11,
    codigo: "CAN011",
    nome: "PSG Home 2024",
    categoria: "ligue1",
    liga: "Ligue 1",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/004170/ffffff?text=PSG+CAN011",
  },
  {
    id: 12,
    codigo: "CAN012",
    nome: "Olympique Marseille Home 2024",
    categoria: "ligue1",
    liga: "Ligue 1",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/009cda/ffffff?text=Marseille+CAN012",
  },
  {
    id: 13,
    codigo: "CAN013",
    nome: "Inter Miami Home 2024",
    categoria: "mls",
    liga: "MLS",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/f7b5cd/000000?text=Inter+Miami+CAN013",
  },
  {
    id: 14,
    codigo: "CAN014",
    nome: "LA Galaxy Home 2024",
    categoria: "mls",
    liga: "MLS",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ffffff/005da6?text=LA+Galaxy+CAN014",
  },
  {
    id: 15,
    codigo: "CAN015",
    nome: "Al Hilal Home 2024",
    categoria: "saudi",
    liga: "Saudi Pro League",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/005ca9/ffffff?text=Al+Hilal+CAN015",
  },
  {
    id: 16,
    codigo: "CAN016",
    nome: "Al Nassr Home 2024",
    categoria: "saudi",
    liga: "Saudi Pro League", 
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ffd700/000000?text=Al+Nassr+CAN016",
  },
  {
    id: 17,
    codigo: "CAN017",
    nome: "Brasil Seleção 2024",
    categoria: "selecoes",
    liga: "Seleções",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ffd700/008000?text=Brasil+CAN017",
  },
  {
    id: 18,
    codigo: "CAN018",
    nome: "Argentina Seleção 2024",
    categoria: "selecoes",
    liga: "Seleções",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/75aadb/ffffff?text=Argentina+CAN018",
  },
  {
    id: 19,
    codigo: "CAN019",
    nome: "Brasil Copa do Mundo 2026",
    categoria: "copa2026",
    liga: "Copa do Mundo 2026",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/00a859/ffd700?text=Brasil+2026+CAN019",
  },
  {
    id: 20,
    codigo: "CAN020",
    nome: "França Copa do Mundo 2026",
    categoria: "copa2026",
    liga: "Copa do Mundo 2026",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/002654/ffffff?text=França+2026+CAN020",
  },
  {
    id: 21,
    codigo: "CAN021",
    nome: "Brasil Retrô 1970",
    categoria: "retros",
    liga: "Retrô",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ffd700/008000?text=Brasil+70+CAN021",
  },
  {
    id: 22,
    codigo: "CAN022",
    nome: "Milan Retrô 2003",
    categoria: "retros",
    liga: "Retrô",
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ac1e2d/000000?text=Milan+03+CAN022",
  }
];

const grid = document.getElementById("grid");
const vazio = document.getElementById("vazio");
const busca = document.getElementById("busca");
const filtro = document.getElementById("filtro");

// Definir ano atual
document.getElementById("ano").textContent = new Date().getFullYear();

// Função para criar link do WhatsApp
function linkWhatsApp(mensagem) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

// Função para renderizar produtos
function render(lista) {
  grid.innerHTML = "";

  if (!lista.length) {
    vazio.classList.remove("hidden");
    return;
  }
  vazio.classList.add("hidden");

  for (const p of lista) {
    const el = document.createElement("article");
    el.className = "card";

    // Mensagem personalizada com código
    const msg = `Olá! Vim pelo catálogo e tenho interesse na camisa código *${p.codigo}* - ${p.nome}. Qual o valor e disponibilidade?`;
    const wpp = linkWhatsApp(msg);

    el.innerHTML = `
      <img class="card__img" src="${p.imagem}" alt="${p.nome}">
      <div class="card__body">
        <div class="card__code">Código: ${p.codigo}</div>
        <div class="card__title">${p.nome}</div>
        <div class="card__meta">
          <span>${p.liga}</span>
        </div>
        <div class="badges">
          ${p.tamanhos.map(t => `<span class="badge">${t}</span>`).join("")}
        </div>
        <a class="btn btn--buy" href="${wpp}" target="_blank" rel="noopener">Consultar Preço</a>
      </div>
    `;

    grid.appendChild(el);
  }
}

// Função para aplicar filtros
function aplicarFiltros() {
  const termo = (busca.value || "").toLowerCase().trim();
  const cat = filtro.value;

  const lista = PRODUTOS.filter(p => {
    const okTermo =
      !termo ||
      p.nome.toLowerCase().includes(termo) ||
      p.liga.toLowerCase().includes(termo) ||
      p.codigo.toLowerCase().includes(termo);

    const okCat = cat === "todos" ? true : p.categoria === cat;

    return okTermo && okCat;
  });

  render(lista);
}

// Event listeners
busca.addEventListener("input", aplicarFiltros);
filtro.addEventListener("change", aplicarFiltros);

// WhatsApp do cabeçalho
document.getElementById("wppTopo").href = linkWhatsApp("Olá! Vim pelo catálogo da Loja Canetei e gostaria de ver as camisas disponíveis!");

// Renderizar produtos inicialmente
render(PRODUTOS);
