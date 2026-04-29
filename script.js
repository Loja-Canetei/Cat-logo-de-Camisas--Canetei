// 1) Coloque seu WhatsApp aqui (formato: 55 + DDD + número)
const WHATSAPP_NUMERO = "5573999571065"; // exemplo: "5573999999999"

// 2) Seus produtos (edite à vontade)
const PRODUTOS = [
  {
    id: 1,
    nome: "Flamengo Home 2024",
    categoria: "brasileirao",
    liga: "Brasileirão",
    preco: 89.9,
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/dc143c/ffffff?text=Flamengo",
  },
  {
    id: 2,
    nome: "Real Madrid Home 2024",
    categoria: "europeu",
    liga: "La Liga",
    preco: 129.9,
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ffffff/000000?text=Real+Madrid",
  },
  {
    id: 3,
    nome: "Brasil Seleção 2024",
    categoria: "selecoes",
    liga: "Seleções",
    preco: 149.9,
    tamanhos: ["P", "M", "G", "GG"],
    imagem: "https://via.placeholder.com/800x600/ffd400/0b7a3b?text=Brasil",
  },
];

const grid = document.getElementById("grid");
const vazio = document.getElementById("vazio");
const busca = document.getElementById("busca");
const filtro = document.getElementById("filtro");

document.getElementById("ano").textContent = new Date().getFullYear();

function formatBRL(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function linkWhatsApp(mensagem) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

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

    const msg = `Olá! Tenho interesse na camisa: ${p.nome}. Ainda tem disponível?`;
    const wpp = linkWhatsApp(msg);

    el.innerHTML = `
      <img class="card__img" src="${p.imagem}" alt="${p.nome}">
      <div class="card__body">
        <div class="card__title">${p.nome}</div>
        <div class="card__meta">
          <span>${p.liga}</span>
          <span class="price">${formatBRL(p.preco)}</span>
        </div>
        <div class="badges">
          ${p.tamanhos.map(t => `<span class="badge">${t}</span>`).join("")}
        </div>
        <a class="btn btn--buy" href="${wpp}" target="_blank" rel="noopener">Comprar no WhatsApp</a>
      </div>
    `;

    grid.appendChild(el);
  }
}

function aplicarFiltros() {
  const termo = (busca.value || "").toLowerCase().trim();
  const cat = filtro.value;

  const lista = PRODUTOS.filter(p => {
    const okTermo =
      !termo ||
      p.nome.toLowerCase().includes(termo) ||
      p.liga.toLowerCase().includes(termo);

    const okCat = cat === "todos" ? true : p.categoria === cat;

    return okTermo && okCat;
  });

  render(lista);
}

busca.addEventListener("input", aplicarFiltros);
filtro.addEventListener("change", aplicarFiltros);

document.getElementById("wppTopo").href = linkWhatsApp("Olá! Vim pelo catálogo e quero ver as camisas disponíveis.");

render(PRODUTOS);
