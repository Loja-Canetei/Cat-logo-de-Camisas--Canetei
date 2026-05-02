// ======= CONFIGURAÇÕES GERAIS =======
const WHATSAPP_NUMERO = "5573999571065";
const NOME_LOJA = "Loja Canetei";

// Imagem fallback quando não carrega
const IMG_FALLBACK =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
    <rect width="100%" height="100%" fill="#eedaf6"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      font-family="Arial" font-size="18" fill="#6b2c91" font-weight="bold">
      Imagem em breve
    </text>
  </svg>`);

// ======= PRODUTOS (SÓ MEXER AQUI PARA ADICIONAR/EDITAR) =======
const PRODUTOS = [
  {
    id: 1,
    codigo: "CAN001",
    nome: "Brasil Amarelo 2026 Copa",
    categoria: "copa2026",
    liga: "Copa do Mundo 2026",
    descricao: "Camisa oficial da Seleção Brasileira para a Copa do Mundo de 2026. Design renovado mantém as cores tradicionais com tecnologia Nike Dri-FIT para máximo conforto e performance. Escudo bordado e detalhes exclusivos da CBF. Ideal para torcer pelo Hexa!",
    material: "100% Poliéster com tecnologia Dri-FIT",
    masculino: {
      imagens: [
     "camisas/brasil-amar-frente-masc.jpg",
        "camisas/brasil-amar-costas-masc.jpg",
        "camisas/brasil-amar-gola-masc.png",
        "camisas/brasil-amar-escudo-masc.png",
        "camisas/brasil-amar-nike-masc.png",
      ],
      tamanhos: ["P", "M", "G", "GG","XG","2XG"],
    },
    jogador: {
      imagens: [
        "camisas/liverpool-jogador-frente.jpg",
        "camisas/liverpool-jogador-costas.jpg"
      ],
      tamanhos: ["P", "M", "G", "GG"],
    },
    feminino: {
      imagens: [
        "camisas/brasil-amar-frente-fem.jpg",
        "camisas/brasil-amar-costas-fem.jpg",
        "camisas/brasil-amar-gola-fem.png",
      ],
      tamanhos: ["P", "M", "G", "GG"],
    },
  },
  
  // PARA ADICIONAR NOVO PRODUTO, COPIE O FORMATO ABAIXO:
  /*
  {
    id: 2, // sempre um número único
    codigo: "CAN002",
    nome: "Real Madrid Branca",
    categoria: "laliga",
    liga: "La Liga",
    descricao: "Camisa oficial do Real Madrid temporada 2024/25. Design clássico em branco com detalhes dourados e escudo bordado. Tecnologia Adidas AEROREADY para ventilação e conforto. Perfeita para os torcedores merengues!",
    preco_ref: "R$ 94,90",
    material: "100% Poliéster reciclado",
    masculino: {
      imagens: [
        "camisas/real-madrid-branca-frente.jpg",
        "camisas/real-madrid-branca-costas.jpg"
      ],
      tamanhos: ["P", "M", "G", "GG"],
    },
    // jogador: { ... }, // opcional
    // feminino: { ... }, // opcional
  },
  */
];

// ======= FUNÇÕES AUXILIARES (NÃO MEXER) =======
function linkWhatsApp(mensagem) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

function safeImagens(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [IMG_FALLBACK];
  return arr.filter(Boolean).map(src => src || IMG_FALLBACK);
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

function labelVersao(produto, versaoKey) {
  const v = getVersoes(produto).find(x => x.key === versaoKey);
  return v?.label || "Produto";
}
