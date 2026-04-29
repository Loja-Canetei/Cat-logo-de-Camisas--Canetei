// ======= CONFIGURAÇÕES =======
const WHATSAPP_NUMERO = "5573999571065";
const NOME_LOJA = "Loja Canetei";

// Imagem fallback (pode trocar por uma sua, ex: "sem-foto.jpg")
const IMG_FALLBACK =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <rect width="100%" height="100%" fill="#e9e9ee"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="44" fill="#666">
      Sem imagem
    </text>
  </svg>`);

// ======= PRODUTOS (EDITE AQUI) =======
const PRODUTOS = [
  {
    id: 1,
    codigo: "CAN001",
    nome: "Liverpool Home 2024",
    categoria: "premier",
    liga: "Premier League",
    masculino: {
      imagens: [
        // ATENÇÃO: ajuste os caminhos para onde suas imagens realmente estão no GitHub Pages
        "camisas/liverpool-masc-frente.jpg",
        "camisas/liverpool-masc-costas.jpg",
      ],
      tamanhos: ["P", "M", "G", "GG"],
    },
    jogador: {
      imagens: [
        "camisas/liverpool-jogador-frente.jpg",
        "camisas/liverpool-jogador-costas.jpg",
      ],
      tamanhos: ["P", "M", "G", "GG"],
    },
    feminino: {
      imagens: [
        "camisas/liverpool-fem-frente.jpg",
        "camisas/liverpool-fem-costas.jpg",
      ],
      tamanhos: ["PP", "P", "M", "G"],
    },
  },
];

// ============== NÃO PRECISA ALTERAR ABAIXO ===============

const $grid = document.getElementById("grid");
const $vazio = document.getElementById("vazio");
const $busca = document.getElementById("busca");
const $filtro = document.getElementById("filtro");
const $ano = document.getElementById("ano");
const $wppTopo = document.getElementById("wppTopo");

if ($ano) $ano.textContent = String(new Date().getFullYear());

function linkWhatsApp(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getVersoes(produto) {
  const versoes = [];
  if (produto.masculino) versoes.push({ key: "masculino", label: "Masculina" });
  if (produto.jogador) versoes.push({ key: "jogador", label: "Jogador" });
  if (produto.feminino) versoes.push({ key: "feminino", label: "Feminina" });
  return versoes;
}

function getVersaoInicial(produto) {
  if (produto.masculino) return "masculino";
  if (produto.jogador) return "jogador";
  if (produto.feminino) return "feminino";
  return null;
}

function safeImagens(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [IMG_FALLBACK];
  return arr.filter(Boolean);
}

function htmlBadges(tamanhos = []) {
  if (!Array.isArray(tamanhos) || tamanhos.length === 0) return `<span class="badge">Consulte</span>`;
  return tamanhos.map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join("");
}

function htmlGaleria(imagens = [], produtoId = "") {
  const imgs = safeImagens(imagens);
  if (imgs.length <= 1) return "";

  return `
    <div class="galeria" aria-label="miniaturas">
      ${imgs
        .map(
          (img, i) => `
          <button class="miniatura ${i === 0 ? "ativa" : ""}" type="button"
                  data-produto="${produtoId}" data-src="${escapeHtml(img)}"
                  aria-label="ver imagem ${i + 1}">
            <img src="${escapeHtml(img)}" alt="miniatura ${i + 1}"
                 onerror="this.src='${IMG_FALLBACK}'">
          </button>
        `
        )
        .join("")}
    </div>
  `;
}

function render(lista) {
  if (!$grid) return;

  $grid.innerHTML = "";

  if (!Array.isArray(lista) || lista.length === 0) {
    if ($vazio) $vazio.classList.remove("hidden");
    return;
  }
  if ($vazio) $vazio.classList.add("hidden");

  for (const p of lista) {
    const versoes = getVersoes(p);
    const versaoInicial = getVersaoInicial(p);
    const dados = versaoInicial ? p[versaoInicial] : null;

    const imagens = safeImagens(dados?.imagens);
    const imgPrincipal = imagens[0] || IMG_FALLBACK;

    const labelInicial = versoes.find((v) => v.key === versaoInicial)?.label || "Produto";

    const msg = `Olá! Vim pelo catálogo da ${NOME_LOJA} e tenho interesse na camisa código *${p.codigo}* (${labelInicial}) - ${p.nome}. Qual o valor e disponibilidade?`;

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = String(p.id);

    card.innerHTML = `
      <div class="card__images">
        <img class="card__img" id="img-${p.id}" src="${escapeHtml(imgPrincipal)}" alt="${escapeHtml(p.nome)}"
             onerror="this.src='${IMG_FALLBACK}'" loading="lazy">
        <div class="galeria-wrapper">
          ${htmlGaleria(imagens, p.id)}
        </div>
      </div>

      <div class="card__body">
        <div class="card__code">
          Código:
          <span class="codigo-atual">${escapeHtml(p.codigo)} (${escapeHtml(labelInicial)})</span>
        </div>

        <div class="card__title">${escapeHtml(p.nome)}</div>
        <div class="card__meta"><span>${escapeHtml(p.liga || "")}</span></div>

        <div class="variantes" role="group" aria-label="versões">
          ${versoes
            .map(
              (v) =>
                `<button class="btn-variante ${v.key === versaoInicial ? "ativa" : ""}"
                         type="button" data-versao="${escapeHtml(v.key)}"
                         data-produto="${escapeHtml(p.id)}">${escapeHtml(v.label)}</button>`
            )
            .join("")}
        </div>

        <div class="badges tamanhos-wrapper">
          ${htmlBadges(dados?.tamanhos)}
        </div>

        <a class="btn btn--buy" href="${linkWhatsApp(msg)}" target="_blank" rel="noopener">
          Consultar Preço
        </a>
      </div>
    `;

    $grid.appendChild(card);
  }
}

// Delegação de eventos (sem onclick no HTML)
document.addEventListener("click", (e) => {
  const miniBtn = e.target.closest?.(".miniatura");
  if (miniBtn) {
    const card = miniBtn.closest(".card");
    const main = card?.querySelector(".card__img");
    const src = miniBtn.dataset.src;

    if (main && src) {
      main.src = src;
      card.querySelectorAll(".miniatura").forEach((b) => b.classList.remove("ativa"));
      miniBtn.classList.add("ativa");
    }
    return;
  }

  const btnVar = e.target.closest?.(".btn-variante");
  if (btnVar) {
    const card = btnVar.closest(".card");
    const idProduto = Number(btnVar.dataset.produto);
    const versao = btnVar.dataset.versao;

    const produto = PRODUTOS.find((p) => p.id === idProduto);
    if (!produto || !versao || !produto[versao]) return;

    const versoes = getVersoes(produto);
    const label = versoes.find((v) => v.key === versao)?.label || "Produto";
    const dados = produto[versao];

    // Botão ativo
    card.querySelectorAll(".btn-variante").forEach((b) => b.classList.remove("ativa"));
    btnVar.classList.add("ativa");

    // Código
    const codigoEl = card.querySelector(".codigo-atual");
    if (codigoEl) codigoEl.textContent = `${produto.codigo} (${label})`;

    // Tamanhos
    const tamanhosEl = card.querySelector(".tamanhos-wrapper");
    if (tamanhosEl) tamanhosEl.innerHTML = htmlBadges(dados.tamanhos);

    // Imagens/galeria
    const imagens = safeImagens(dados.imagens);
    const mainImg = card.querySelector(".card__img");
    if (mainImg) mainImg.src = imagens[0] || IMG_FALLBACK;

    const galeriaWrap = card.querySelector(".galeria-wrapper");
    if (galeriaWrap) galeriaWrap.innerHTML = htmlGaleria(imagens, idProduto);

    // WhatsApp
    const btnComprar = card.querySelector(".btn--buy");
    const msg = `Olá! Vim pelo catálogo da ${NOME_LOJA} e tenho interesse na camisa código *${produto.codigo}* (${label}) - ${produto.nome}. Qual o valor e disponibilidade?`;
    if (btnComprar) btnComprar.href = linkWhatsApp(msg);

    return;
  }
});

function aplicarFiltros() {
  const termo = ($busca?.value || "").toLowerCase().trim();
  const cat = $filtro?.value || "todos";

  const lista = PRODUTOS.filter((p) => {
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

$busca?.addEventListener("input", aplicarFiltros);
$filtro?.addEventListener("change", aplicarFiltros);

if ($wppTopo) {
  $wppTopo.href = linkWhatsApp(
    `Olá! Vim pelo catálogo da ${NOME_LOJA} e gostaria de ver as camisas disponíveis!`
  );
}

// Inicializa
render(PRODUTOS);
