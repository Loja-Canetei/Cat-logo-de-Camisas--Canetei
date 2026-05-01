const $titulo = document.getElementById("produtoTitulo");
const $img = document.getElementById("produtoImg");
const $gal = document.getElementById("produtoGaleria");
const $wpp = document.getElementById("produtoWpp");
const $prev = document.getElementById("prevImg");
const $next = document.getElementById("nextImg");

// Elementos para descrição (sem preço)
const $descTexto = document.getElementById("produtoDescTexto");
const $codigo = document.getElementById("produtoCodigo");
const $liga = document.getElementById("produtoLiga");
const $material = document.getElementById("produtoMaterial");
const $tamanhos = document.getElementById("produtoTamanhos");

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id") || "0");
const versao = String(params.get("v") || "masculino");
let imgIndex = Math.max(0, Number(params.get("img") || "0"));

const produto = PRODUTOS.find(p => p.id === id);

function render() {
  if (!produto || !produto[versao]) {
    if ($titulo) $titulo.textContent = "Produto não encontrado";
    if ($img) $img.src = IMG_FALLBACK;
    if ($wpp) $wpp.href = linkWhatsApp(`Olá! Vim pelo catálogo da ${NOME_LOJA}. Não encontrei o produto na página, pode me ajudar?`);
    
    // Limpar descrição
    if ($descTexto) $descTexto.textContent = "Produto não encontrado.";
    if ($codigo) $codigo.textContent = "---";
    if ($liga) $liga.textContent = "---";
    if ($material) $material.textContent = "---";
    if ($tamanhos) $tamanhos.textContent = "---";
    
    return;
  }

  const dados = produto[versao];
  const imagens = safeImagens(dados.imagens);
  if (imgIndex >= imagens.length) imgIndex = 0;

  const label = labelVersao(produto, versao);
  const tituloTxt = `${produto.nome} — ${produto.codigo} (${label})`;

  // Atualizar título e imagem principal
  if ($titulo) $titulo.textContent = tituloTxt;
  if ($img) {
    $img.src = imagens[imgIndex] || IMG_FALLBACK;
    $img.onerror = () => { $img.src = IMG_FALLBACK; };
    $img.alt = tituloTxt;
  }

  // Atualizar WhatsApp
  if ($wpp) {
    const msg = `Olá! Vim pelo catálogo da ${NOME_LOJA} e tenho interesse na camisa código *${produto.codigo}* (${label}) - ${produto.nome}. Qual o valor e disponibilidade?`;
    $wpp.href = linkWhatsApp(msg);
  }

  // Atualizar galeria com marca d'água
  if ($gal) {
    $gal.innerHTML = imagens.map((src, i) => `
      <button class="produto-thumb wm-wrap ${i === imgIndex ? "ativa" : ""}" type="button" data-i="${i}" aria-label="ver imagem ${i + 1}">
        <img src="${src}" alt="miniatura ${i + 1}" onerror="this.src='${IMG_FALLBACK}'">
      </button>
    `).join("");
  }

  // Atualizar descrição e detalhes (sem preço)
  if ($descTexto) {
    $descTexto.textContent = produto.descricao || "Descrição não disponível.";
  }
  
  if ($codigo) {
    $codigo.textContent = produto.codigo;
  }
  
  if ($liga) {
    $liga.textContent = produto.liga || produto.categoria || "---";
  }
  
  if ($material) {
    $material.textContent = produto.material || "Consulte";
  }
  
  if ($tamanhos) {
    $tamanhos.textContent = dados.tamanhos?.join(", ") || "---";
  }
}

document.addEventListener("click", (e) => {
  const thumb = e.target.closest?.(".produto-thumb");
  if (thumb) {
    const i = Number(thumb.dataset.i || "0");
    imgIndex = Number.isFinite(i) ? i : 0;
    render();
  }
});

$prev?.addEventListener("click", () => {
  if (!produto || !produto[versao]) return;
  const imagens = safeImagens(produto[versao].imagens);
  imgIndex = (imgIndex - 1 + imagens.length) % imagens.length;
  render();
});

$next?.addEventListener("click", () => {
  if (!produto || !produto[versao]) return;
  const imagens = safeImagens(produto[versao].imagens);
  imgIndex = (imgIndex + 1) % imagens.length;
  render();
});

// Navegação por teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    $prev?.click();
  } else if (e.key === "ArrowRight") {
    $next?.click();
  }
});

render();
