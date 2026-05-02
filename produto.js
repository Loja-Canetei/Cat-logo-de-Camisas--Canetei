// ===== ELEMENTOS DO DOM =====
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

// ===== PARÂMETROS DA URL =====
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id") || "0");
const versao = String(params.get("v") || "masculino");
let imgIndex = Math.max(0, Number(params.get("img") || "0"));

// ===== BUSCAR PRODUTO =====
const produto = PRODUTOS?.find(p => p.id === id);

/**
 * Atualiza a URL sem recarregar a página
 */
function atualizarURL() {
  if (!produto) return;
  
  const url = new URL(window.location.href);
  url.searchParams.set("id", id.toString());
  url.searchParams.set("v", versao);
  url.searchParams.set("img", imgIndex.toString());
  
  window.history.replaceState(null, "", url.toString());
}

/**
 * Trata erro de imagem e define fallback
 */
function configurarImagemFallback(imgElement, fallbackSrc = IMG_FALLBACK) {
  if (!imgElement) return;
  
  imgElement.onerror = () => {
    if (imgElement.src !== fallbackSrc) {
      imgElement.src = fallbackSrc;
    }
  };
}

/**
 * Garante que a marca d'água seja aplicada na imagem principal
 */
function aplicarMarcaDaguaImagemPrincipal() {
  const wrapper = document.querySelector('.produto-viewer-wm');
  if (wrapper) {
    wrapper.classList.add('wm-wrap');
  }
}

/**
 * Renderiza o produto na página
 */
function render() {
  if (!produto || !produto[versao]) {
    renderProdutoNaoEncontrado();
    return;
  }

  const dados = produto[versao];
  const imagens = safeImagens(dados.imagens);
  
  // Ajustar índice se for maior que o array
  if (imgIndex >= imagens.length) {
    imgIndex = 0;
  }

  const label = labelVersao(produto, versao);
  const tituloCompleto = `${produto.nome} — ${produto.codigo} (${label})`;

  // ===== ATUALIZAR TÍTULO =====
  if ($titulo) {
    $titulo.textContent = tituloCompleto;
  }

  // ===== ATUALIZAR IMAGEM PRINCIPAL COM MARCA D'ÁGUA =====
  if ($img) {
    const imagemSrc = imagens[imgIndex] || IMG_FALLBACK;
    
    // Encontrar o wrapper da imagem (deve ter classe produto-viewer-wm)
    const wrapper = $img.parentElement;
    
    // Garantir que o wrapper tenha a classe wm-wrap
    if (wrapper && wrapper.classList.contains('produto-viewer-wm')) {
      wrapper.classList.add('wm-wrap');
    }
    
    $img.src = imagemSrc;
    $img.alt = tituloCompleto;
    configurarImagemFallback($img);
  }

  // ===== ATUALIZAR LINK DO WHATSAPP =====
  if ($wpp) {
    const mensagem = `Olá! Vim pelo catálogo da ${NOME_LOJA} e tenho interesse na camisa código *${produto.codigo}* (${label}) - ${produto.nome}. Qual o valor e disponibilidade?`;
    $wpp.href = linkWhatsApp(mensagem);
  }

  // ===== RENDERIZAR GALERIA COM MARCA D'ÁGUA =====
  renderGaleria(imagens, tituloCompleto);

  // ===== ATUALIZAR INFORMAÇÕES DO PRODUTO =====
  renderInformacoesProduto(dados);

  // ===== ATUALIZAR ESTADO DOS BOTÕES =====
  atualizarBotoes(imagens.length);

  // ===== GARANTIR MARCA D'ÁGUA NA IMAGEM PRINCIPAL =====
  aplicarMarcaDaguaImagemPrincipal();

  // ===== ATUALIZAR URL =====
  atualizarURL();
}

/**
 * Renderiza a galeria de miniaturas com marca d'água
 */
function renderGaleria(imagens, tituloCompleto) {
  if (!$gal) return;

  const galeriaHTML = imagens
    .map((src, index) => {
      const ativa = index === imgIndex ? "ativa" : "";
      const ariaLabel = `Ver imagem ${index + 1} de ${imagens.length}`;
      
      return `
        <button 
          class="produto-thumb wm-wrap ${ativa}" 
          type="button" 
          data-i="${index}" 
          aria-label="${ariaLabel}"
          title="${ariaLabel}"
        >
          <img 
            src="${src}" 
            alt="${tituloCompleto} - imagem ${index + 1}" 
            onerror="this.src='${IMG_FALLBACK}'"
            loading="lazy"
            decoding="async"
          />
        </button>
      `;
    })
    .join("");

  $gal.innerHTML = galeriaHTML;
}

/**
 * Atualiza as informações do produto (descrição e detalhes)
 */
function renderInformacoesProduto(dados) {
  if ($descTexto) {
    $descTexto.textContent = produto.descricao || "Descrição não disponível.";
  }
  
  if ($codigo) {
    $codigo.textContent = produto.codigo || "---";
  }
  
  if ($liga) {
    $liga.textContent = produto.liga || produto.categoria || "---";
  }
  
  if ($material) {
    $material.textContent = produto.material || "Consulte";
  }
  
  if ($tamanhos) {
    const tamanhosList = dados.tamanhos?.length 
      ? dados.tamanhos.join(", ") 
      : "Consulte disponibilidade";
    $tamanhos.textContent = tamanhosList;
  }
}

/**
 * Atualiza o estado dos botões de navegação
 */
function atualizarBotoes(totalImagens) {
  if ($prev) {
    $prev.disabled = totalImagens <= 1;
    $prev.setAttribute("aria-label", `Imagem anterior (${imgIndex + 1} de ${totalImagens})`);
  }
  
  if ($next) {
    $next.disabled = totalImagens <= 1;
    $next.setAttribute("aria-label", `Próxima imagem (${imgIndex + 1} de ${totalImagens})`);
  }
}

/**
 * Renderiza estado de produto não encontrado
 */
function renderProdutoNaoEncontrado() {
  if ($titulo) {
    $titulo.textContent = "Produto não encontrado";
  }
  
  if ($img) {
    $img.src = IMG_FALLBACK;
    $img.alt = "Produto não encontrado";
    configurarImagemFallback($img);
  }
  
  if ($wpp) {
    const mensagem = `Olá! Vim pelo catálogo da ${NOME_LOJA}. Não encontrei o produto na página, pode me ajudar?`;
    $wpp.href = linkWhatsApp(mensagem);
  }
  
  if ($gal) {
    $gal.innerHTML = "";
  }
  
  // Limpar informações
  if ($descTexto) $descTexto.textContent = "Produto não encontrado.";
  if ($codigo) $codigo.textContent = "---";
  if ($liga) $liga.textContent = "---";
  if ($material) $material.textContent = "---";
  if ($tamanhos) $tamanhos.textContent = "---";
  
  // Desabilitar botões
  if ($prev) $prev.disabled = true;
  if ($next) $next.disabled = true;
}

/**
 * Navega para a imagem anterior
 */
function navegarAnterior() {
  if (!produto || !produto[versao]) return;
  
  const imagens = safeImagens(produto[versao].imagens);
  if (imagens.length <= 1) return;
  
  imgIndex = (imgIndex - 1 + imagens.length) % imagens.length;
  render();
}

/**
 * Navega para a próxima imagem
 */
function navegarProxima() {
  if (!produto || !produto[versao]) return;
  
  const imagens = safeImagens(produto[versao].imagens);
  if (imagens.length <= 1) return;
  
  imgIndex = (imgIndex + 1) % imagens.length;
  render();
}

/**
 * Seleciona uma imagem específica da galeria
 */
function selecionarImagem(index) {
  if (!produto || !produto[versao]) return;
  
  const imagens = safeImagens(produto[versao].imagens);
  const novoIndex = Number(index);
  
  if (Number.isFinite(novoIndex) && novoIndex >= 0 && novoIndex < imagens.length) {
    imgIndex = novoIndex;
    render();
  }
}

// ===== EVENT LISTENERS =====

// Clique nas miniaturas da galeria
document.addEventListener("click", (event) => {
  const thumb = event.target.closest?.(".produto-thumb");
  if (thumb) {
    event.preventDefault();
    const index = thumb.dataset.i;
    selecionarImagem(index);
  }
});

// Botões de navegação
$prev?.addEventListener("click", (event) => {
  event.preventDefault();
  navegarAnterior();
});

$next?.addEventListener("click", (event) => {
  event.preventDefault();
  navegarProxima();
});

// Navegação por teclado
document.addEventListener("keydown", (event) => {
  // Só funcionar se não estivermos em um input
  if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
    return;
  }
  
  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault();
      navegarAnterior();
      break;
      
    case "ArrowRight":
      event.preventDefault();
      navegarProxima();
      break;
      
    case "Escape":
      // Voltar para a página anterior
      if (document.referrer && document.referrer.includes(window.location.origin)) {
        window.history.back();
      } else {
        window.location.href = "index.html";
      }
      break;
  }
});

// Prevenir comportamento padrão em imagens (evitar arrastar)
document.addEventListener("dragstart", (event) => {
  if (event.target.tagName === "IMG") {
    event.preventDefault();
  }
});

// ===== INICIALIZAÇÃO =====
// Renderizar assim que o script carregar
render();

// Adicionar meta description dinâmico
if (produto && produto[versao]) {
  const metaDescription = document.createElement("meta");
  metaDescription.name = "description";
  metaDescription.content = `${produto.nome} - ${produto.codigo}. ${produto.descricao || 'Camisas de time originais na Loja Canetei.'}`;
  document.head.appendChild(metaDescription);
}

// Log para debug (remover em produção)
console.log("Produto carregado:", {
  id: id,
  versao: versao,
  imgIndex: imgIndex,
  produto: produto?.nome || "Não encontrado",
  totalImagens: produto?.[versao]?.imagens?.length || 0
});
