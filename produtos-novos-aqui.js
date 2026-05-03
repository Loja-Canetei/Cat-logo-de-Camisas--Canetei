/* =========================
   LIGAS / CATEGORIAS (FILTRO)
   Baseado no seu HTML + produtos existentes

   CATEGORIAS (campo "categoria"):
   - copa2026    => Copa do Mundo 2026
   - laliga      => La Liga  
   - premier     => Premier League
   - seriea      => Serie A
   - bundesliga  => Bundesliga
   - ligue1      => Ligue 1
   - brasileirao => Brasileirão
   - mls         => MLS
   - saudi       => Saudi Pro League
   - selecoes    => Seleções
   - retros      => Retrô

   LIGAS (campo "liga"):
   - "Copa do Mundo 2026"
   - "La Liga"
   - "Premier League"
   - "Serie A"
   - "Bundesliga"
   - "Ligue 1"
   - "Brasileirão"
   - "MLS"
   - "Saudi Pro League"
   - "Seleções"
   - "Retrô"

   ⚠️ IMPORTANTE:
   - categoria = value do filtro (ex.: "copa2026", "premier")
   - liga = texto para exibição (ex.: "Copa do Mundo 2026", "Premier League")
========================= */
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
      tamanhos: ["P", "M", "G", "GG","XG","2XG(G2)"],
    },
    jogador: {
      imagens: [
        "camisas/liverpool-jogador-frente.jpg",
        "camisas/liverpool-jogador-costas.jpg"
      ],
      tamanhos: ["P", "M", "G", "GG","XG","2XG(G2)"],
    },
    feminino: {
      imagens: [
        "camisas/brasil-amar-frente-fem.jpg",
        "camisas/brasil-amar-costas-fem.jpg",
        "camisas/brasil-amar-gola-fem.png",
         "camisas/brasil-amar-escudo-masc.png",
      ],
      tamanhos: ["P", "M", "G", "GG"],
    },
  }
  ,
  
  {
  id: 2,                 // ⚠️ Sempre único! Próximo número disponível
  codigo: "CAN002",       // ⚠️ Sempre único! Ex: "CAM-008"
  nome: "Brasil Azul 2026 Copa",
  descricao: "Camisa oficial da Seleção Brasileira para a Copa do Mundo de 2026. Design nas cores secundária e com a famosa tecnologia Nike Dri-FIT para máximo conforto e performance. Escudo bordado e detalhes exclusivos da CBF. Ideal para torcer pelo Hexa!",
  categoria: "copa2026",
    liga: "Copa do Mundo 2026",
  material: "NIKE Dry-Fit",     // ou "Poliéster", etc.

  masculino: {
    imagens: [
      "camisas/brasil-azul-frente-masc.jpg",
     "camisas/brasil-azul-escudo-masc.png",
      "camisas/brasil-azul-costas-masc.jpg",
      // Quantas quiser! Só seguir a ordem.
    ],
    tamanhos: ["P", "M", "G", "GG","XG", "2XG(G2)"]
  },

  feminino: {
    imagens: [
     "camisas/brasil-azul-frente-fem.jpg",
       "camisas/brasil-azul-costas-fem.jpg",
       "camisas/brasil-azul-escudo-fem.png",
      // Quantas quiser!
    ],
    tamanhos: ["P", "M", "G", "GG"]
  },

  jogador: {
    imagens: [
      "imagens/produto-XXX/jog-1.jpg",
      "imagens/produto-XXX/jog-2.jpg"
      // Quantas quiser!
    ],
    tamanhos: ["P", "M", "G", "GG","XG", "2XG(G2)"]
  }
},
 {
    id: 3,                    // ⚠️ sempre único (próximo número)
    codigo: "CAN003",           // ⚠️ sempre único (CAN001, CAN002...)
    nome: "Cropped Amarelo Brasil Copa 2026",
    descricao: "Camisa oficial da seleção brasileira para a copa do mundo de 2026 na versão cropped com acabamentos e tecido do modelo jogador. Símbolo da nike e escudo CBF silkados.",
    categoria: "copa2026",        // ⚠️ usar value do filtro (laliga, premier, copa2026...)
    liga: "Copa do Mundo 2026",            // texto bonito para exibir
    material: "NIKE Dry-Fit",

   
    feminino: {
      imagens: [
        "camisas/brasil-amar-cropped-frente.jpg",
        "camisas/brasil-amar-cropped-costas.jpg"
      ],
      tamanhos: ["P", "M", "G", "GG"]
    },

   
    }
  },
   {
    id: 4,                    // ⚠️ sempre único (próximo número)
    codigo: "CAN004",           // ⚠️ sempre único (CAN001, CAN002...)
    nome: "Top Amarelo Brasil Copa 2026",
    descricao: "Camisa oficial da seleção brasileira para a copa do mundo de 2026 na versão top com acabamentos e tecido do modelo jogador. Símbolo da nike e escudo CBF silkados.",
    categoria: "copa2026",        // ⚠️ usar value do filtro (laliga, premier, copa2026...)
    liga: "Copa do Mundo 2026",            // texto bonito para exibir
    material: "NIKE Dry-Fit",

   
    feminino: {
      imagens: [
        "camisas/brasil-amar-top-frente.jpg",
        "camisas/brasil-amar-top-costas.jpg"
      ],
      tamanhos: ["P", "M", "G", "GG"]
    },

  
    }
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
