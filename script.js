// ======= DADOS DA LOJA =======
const WHATSAPP_NUMERO = "5573999571065";
const NOME_LOJA = "Loja Canetei";

// ======= PRODUTOS (EXEMPLOS, COLE OS SEUS JÁ NO MODELO NOVO) =======
const PRODUTOS = [
  {
    id: 1,
    codigo: "CAN001",
    nome: "Liverpool Home 2024",
    categoria: "premier",
    liga: "Premier League",
    masculino: {
      imagens: [
        "camisas/liverpool-masc-frente.jpg",
        "camisas/liverpool-masc-costas.jpg",
      ],
      tamanhos: ["P", "M", "G", "GG"]
    },
    jogador: {
      imagens: [
        "camisas/liverpool-jogador-frente.jpg",
        "camisas/liverpool-jogador-costas.jpg",
      ],
      tamanhos: ["P", "M", "G", "GG"]
    },
    feminino: {
      imagens: [
        "camisas/liverpool-fem-frente.jpg",
        "camisas/liverpool-fem-costas.jpg",
      ],
      tamanhos: ["PP", "P", "M", "G"]
    }
  },
  // ...adicione outros produtos aqui no mesmo formato...
];

// ============== NÃO PRECISA ALTERAR NADA ABAIXO ===============

const grid   = document.getElementById("grid");
const vazio  = document.getElementById("vazio");
const busca  = document.getElementById("busca");
const filtro = document.getElementById("filtro");
document.getElementById("ano").textContent = new Date().getFullYear();

function linkWhatsApp(mensagem) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return `${base}?text=${encodeURIComponent(mensagem)}`;
}

function htmlBadges(tamanhos = []) {
  return (tamanhos || []).map(t => `<span class="badge">${t}</span>`).join("");
}

function htmlGaleria(imagens = []) {
  if (!Array.isArray(imagens) || imagens.length <= 1) return "";
  return `
    <div class="galeria">
      ${imagens.map((img,i)=>
        `<img class="miniatura ${i===0?'ativa':''}" src="${img}" data-src="${img}" alt="miniatura" onclick="trocarImagem(this)">`
      ).join("")}
    </div>
  `;
}

function render(lista) {
  grid.innerHTML = "";
  if (!lista.length) {
    vazio.classList.remove("hidden");
    return;
  }
  vazio.classList.add("hidden");
  for (const p of lista) {
    // Definindo versão inicial padrão (masculino, se existir)
    let versaoAtual = 'masculino';
    const versoes = [];
    if (p.masculino) versoes.push({nome:"Masculina", key:"masculino"});
    if (p.jogador) versoes.push({nome:"Jogador", key:"jogador"});
    if (p.feminino) versoes.push({nome:"Feminina", key:"feminino"});
    // Pega versão padrão (masculino, senão jogador, senão feminina)
    if      (p.masculino) versaoAtual = 'masculino';
    else if (p.jogador)   versaoAtual = 'jogador';
    else if (p.feminino)  versaoAtual = 'feminino';
    const dadosAtual = p[versaoAtual];
    const imagensBase = Array.isArray(dadosAtual.imagens) && dadosAtual.imagens.length ? dadosAtual.imagens : [];
    const imgPrincipal = imagensBase[0] || "";

    const el = document.createElement("article");
    el.className = "card";
    el.setAttribute("data-id", p.id);

    // Mensagem padrão (versão inicial)
    const msgPadrao = `Olá! Vim pelo catálogo e tenho interesse na camisa código *${p.codigo}* (${versoes.find(v=>v.key===versaoAtual).nome}) - ${p.nome}. Qual o valor e disponibilidade?`;
    const wppPadrao = linkWhatsApp(msgPadrao);

    el.innerHTML = `
      <div class="card__images">
        <img class="card__img" id="img-${p.id}" src="${imgPrincipal}" alt="${p.nome}">
        <div class="galeria-wrapper">
          ${htmlGaleria(imagensBase)}
        </div>
      </div>

      <div class="card__body">
        <div class="card__code">Código: <span class="codigo-atual">${p.codigo} (${versoes.find(v=>v.key===versaoAtual).nome})</span></div>
        <div class="card__title">${p.nome}</div>
        <div class="card__meta"><span>${p.liga}</span></div>

        <div class="variantes">
          ${versoes.map((v,i)=> 
            `<button class="btn-variante ${i===0?'ativa':''}" onclick="selecionarVersao(this, ${p.id}, '${v.key}')">${v.nome}</button>`
          ).join("")}
        </div>
        <div class="badges tamanhos-wrapper">
          ${htmlBadges(dadosAtual.tamanhos)}
        </div>
        <a class="btn btn--buy" href="${wppPadrao}" target="_blank" rel="noopener">Consultar Preço</a>
      </div>
    `;
    grid.appendChild(el);
  }
}

// Trocar imagem principal ao clicar na miniatura
window.trocarImagem = function(miniatura) {
  const card = miniatura.closest(".card");
  const main = card.querySelector(".card__img");
  const nova = miniatura.dataset.src;
  if (!nova || !main) return;
  main.src = nova;
  card.querySelectorAll(".miniatura").forEach(m => m.classList.remove("ativa"));
  miniatura.classList.add("ativa");
};

// Trocar versão (masculina, jogador, feminina)
window.selecionarVersao = function(botao, idProduto, versao) {
  const card = botao.closest(".card");
  const produto = (window.PRODUTOS || []).find(p => p.id === idProduto);
  if (!produto) return;
  const dados = produto[versao];
  if (!dados) return;
  // Botão ativo
  card.querySelectorAll(".btn-variante").forEach(b => b.classList.remove("ativa"));
  botao.classList.add("ativa");
  // Código mostrado
  const nomeVersao = botao.textContent.trim();
  const codigoEl = card.querySelector(".codigo-atual");
  if (codigoEl) codigoEl.textContent = `${produto.codigo} (${nomeVersao})`;
  // Tamanhos
  const tamanhosEl = card.querySelector(".tamanhos-wrapper");
  if (tamanhosEl) tamanhosEl.innerHTML = htmlBadges(dados.tamanhos);
  // Galeria/imagem
  const imagens = Array.isArray(dados.imagens) && dados.imagens.length ? dados.imagens : [];
  const mainImg = card.querySelector(".card__img");
  if (mainImg && imagens.length) mainImg.src = imagens[0];
  const galeriaWrap = card.querySelector(".galeria-wrapper");
  if (galeriaWrap) galeriaWrap.innerHTML = htmlGaleria(imagens);
  // WhatsApp
  const btnComprar = card.querySelector(".btn--buy");
  const msg = `Olá! Vim pelo catálogo e tenho interesse na camisa código *${produto.codigo}* (${nomeVersao}) - ${produto.nome}. Qual o valor e disponibilidade?`;
  if (btnComprar) btnComprar.href = linkWhatsApp(msg);
};

// Filtro/busca
function aplicarFiltros() {
  const termo = (busca.value || "").toLowerCase().trim();
  const cat = filtro.value;
  const lista = (window.PRODUTOS || []).filter(p => {
    const okTermo =
      !termo ||
      (p.nome || "").toLowerCase().includes(termo) ||
      (p.liga || "").toLowerCase().includes(termo) ||
      (p.codigo || "").toLowerCase().includes(termo);
    const okCat = cat === "todos" ? true : p.categoria === cat;
    return okTermo && okCat;
  });
  render(lista);
}
busca.addEventListener("input", aplicarFiltros);
filtro.addEventListener("change", aplicarFiltros);

document.getElementById("wppTopo").href =
  linkWhatsApp("Olá! Vim pelo catálogo da Loja Canetei e gostaria de ver as camisas disponíveis!");

render(window.PRODUTOS || []);
