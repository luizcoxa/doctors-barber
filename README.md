# Site da Doctor's Barber

Site estático de uma página: serviços com preços, fotos de clientes, produtos, depoimentos e agendamento pelo WhatsApp.

## Estrutura

```
sites/
├── index.html         # todo o conteúdo (textos, preços, produtos, depoimentos)
├── css/style.css      # cores e fontes em :root, layout de desktop e celular
├── js/main.js         # soma dos serviços marcados, link do WhatsApp, animações
├── img/
│   ├── lugar/         # fachada, letreiro e fotos de atendimento
│   ├── clientes/      # fotos de clientes (recortadas dos stories)
│   └── produtos/      # fotos dos produtos à venda
├── referencias/
│   ├── links.md               # sites usados como inspiração
│   └── instagram-originais/   # fotos originais baixadas do Instagram
└── README.md
```

## Como editar

- **Preço ou serviço:** em `index.html`, na lista dentro de `<form id="consulta">`. Altere o `value` (usado na soma) e o texto `R$` da mesma linha.
- **WhatsApp:** constante `WHATS` em `js/main.js` e os links `wa.me` do `index.html`.
- **Cores:** variáveis no topo de `css/style.css`.
- **Fotos:** substitua o arquivo em `img/` mantendo o nome, ou troque o `src` no HTML.

## Linguagens e por quê

| Linguagem | Por quê |
|---|---|
| HTML5 | Todo o conteúdo fica no HTML: aparece no Google e funciona mesmo se o JavaScript falhar. |
| CSS3 | Layout e animações com recursos nativos (Grid, variáveis). Sem build. |
| JavaScript puro | Só a soma dos serviços, o link do WhatsApp e as entradas ao rolar. Sem framework. |

Descartados: React/Next (build e dependências para uma página), WordPress (PHP, banco e plugins) e backend próprio (o agendamento é pelo WhatsApp).

## Rodar e publicar

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. Para publicar, envie a pasta para GitHub Pages, Netlify ou Vercel (não inclua `referencias/` nem `.taste-skill/`).
