// ============== FUNÇÕES AUXILIARES ===============

const $grid = document.getElementById("grid");
const $vazio = document.getElementById("vazio");
const $busca = document.getElementById("busca");
const $filtro = document.getElementById("filtro");
const $ano = document.getElementById("ano");
const $wppTopo = document.getElementById("wppTopo");

if ($ano) $ano.textContent = String(new Date().getFullYear());

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function htmlBadges(tamanhos = []) {
  if (!Array.isArray(tamanhos) || tamanhos.length === 0) {
    return `<span class="badge">Consulte</span>`;
  }
  return tamanhos.map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("");
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

function abrirProdutoPage({ produtoId, versao, imgIndex }) {
  const url = new URL("produto.html", window.location.href);
  url.searchParams.set("id", String(produtoId));
  url.searchParams.set("v", String(versao));
  url.searchParams.set("img", String(imgIndex));
  window.location.href = url.toString();
}

// ============== RENDERIZAÇÃO ===============

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

    const labelInicial = versoes.find(v => v.key === versaoInicial)?.label || "Produto";

    const msg = `Olá! Vim pelo catálogo da ${NOME_LOJA} e tenho interesse na camisa código *${p.codigo}* (${labelInicial}) - ${p.nome}. Qual o valor e disponibilidade?`;

    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = String(p.id);
    card.dataset.versao = String(versaoInicial || "");

    card.innerHTML = `
      <div class="card__images">
        <img class="card__img" id="img-${p.id}" src="${escapeHtml(imgPrincipal)}" 
             alt="${escapeHtml(p.nome)}" onerror="this.src='${IMG_FALLBACK}'" loading="lazy">
        <div class="galeria-wrapper">
          ${htmlGaleria(imagens, p.id)}
        </div>
      </div>

      <div class="card__body">
        <div class="card__code">
          Código: <span class="codigo-atual">${escapeHtml(p.codigo)} (${escapeHtml(labelInicial)})</span>
        </div>

        <div class="card__title">${escapeHtml(p.nome)}</div>
        <div class="card__meta"><span>${escapeHtml(p.liga || "")}</span></div>

        <div class="variantes" role="group" aria-label="versões">
          ${versoes
            .map(
              v =>
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

// ============== EVENTOS ===============

document.addEventListener("click", e => {
  // Clique em miniatura
  const miniBtn = e.target.closest?.(".miniatura");
  if (miniBtn) {
    const card = miniBtn.closest(".card");
    const main = card?.querySelector(".card__img");
    const src = miniBtn.dataset.src;

    if (main && src) {
      main.src = src;
      card.querySelectorAll(".miniatura").forEach(b => b.classList.remove("ativa"));
      miniBtn.classList.add("ativa");
    }
    return;
  }

  // Clique na imagem principal: abre página do produto
  const mainImg = e.target.closest?.(".card__img");
  if (mainImg) {
    const card = mainImg.closest(".card");
    const produtoId = Number(card?.dataset?.id);
    const versao = String(card?.dataset?.versao || getVersaoInicial(PRODUTOS.find(p => p.id === produtoId)) || "masculino");

    // descobre índice da imagem pela miniatura ativa
    const ativa = card?.querySelector(".miniatura.ativa");
    let imgIndex = 0;
    if (ativa) {
      const thumbs = Array.from(card.querySelectorAll(".miniatura"));
      const idx = thumbs.indexOf(ativa);
      imgIndex = idx >= 0 ? idx : 0;
    }

    if (produtoId) abrirProdutoPage({ produtoId, versao, imgIndex });
    return;
  }

  // Clique em botão de variante
  const btnVar = e.target.closest?.(".btn-variante");
  if (btnVar) {
    const card = btnVar.closest(".card");
    const idProduto = Number(btnVar.dataset.produto);
    const versao = btnVar.dataset.versao;

    const produto = PRODUTOS.find(p => p.id === idProduto);
    if (!produto || !versao || !produto[versao]) return;

    const versoes = getVersoes(produto);
    const label = versoes.find(v => v.key === versao)?.label || "Produto";
    const dados = produto[versao];

    // guardar versão atual no card
    card.dataset.versao = versao;

    // Atualizar botão ativo
    card.querySelectorAll(".btn-variante").forEach(b => b.classList.remove("ativa"));
    btnVar.classList.add("ativa");

    // Atualizar código
    const codigoEl = card.querySelector(".codigo-atual");
    if (codigoEl) codigoEl.textContent = `${produto.codigo} (${label})`;

    // Atualizar tamanhos
    const tamanhosEl = card.querySelector(".tamanhos-wrapper");
    if (tamanhosEl) tamanhosEl.innerHTML = htmlBadges(dados.tamanhos);

    // Atualizar imagens
    const imagens = safeImagens(dados.imagens);
    const mainImgEl = card.querySelector(".card__img");
    if (mainImgEl) mainImgEl.src = imagens[0] || IMG_FALLBACK;

    const galeriaWrap = card.querySelector(".galeria-wrapper");
    if (galeriaWrap) galeriaWrap.innerHTML = htmlGaleria(imagens, idProduto);

    // Atualizar link WhatsApp
    const btnComprar = card.querySelector(".btn--buy");
    const msg = `Olá! Vim pelo catálogo da ${NOME_LOJA} e tenho interesse na camisa código *${produto.codigo}* (${label}) - ${produto.nome}. Qual o valor e disponibilidade?`;
    if (btnComprar) btnComprar.href = linkWhatsApp(msg);

    return;
  }
});

// Filtros
function aplicarFiltros() {
  const termo = ($busca?.value || "").toLowerCase().trim();
  const cat = $filtro?.value || "todos";

  const lista = PRODUTOS.filter(p => {
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

// WhatsApp do topo
if ($wppTopo) {
  $wppTopo.href = linkWhatsApp(
    `Olá! Vim pelo catálogo da ${NOME_LOJA} e gostaria de ver as camisas disponíveis!`
  );
}

// ============== INICIALIZAÇÃO ===============
render(PRODUTOS);
