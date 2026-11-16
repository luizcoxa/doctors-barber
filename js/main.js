// Sem este arquivo o site continua legível: os links já apontam para o WhatsApp no HTML.

const WHATS = "554588196459";
const link = (texto) => `https://wa.me/${WHATS}?text=${encodeURIComponent(texto)}`;
const PADRAO = "Olá! Vim pelo site e quero agendar um horário.";

document.querySelectorAll("[data-whats]").forEach((a) => {
  a.href = link(PADRAO);
  a.target = "_blank";
  a.rel = "noopener";
});

// Consulta: soma os serviços marcados e leva a escolha pronta para o WhatsApp.
const form = document.getElementById("consulta");
const rotulo = document.getElementById("total-rotulo");
const valor = document.getElementById("total-valor");
const botao = document.getElementById("agendar-escolha");

function atualizar() {
  const marcados = [...form.querySelectorAll("input:checked")];
  const total = marcados.reduce((soma, i) => soma + Number(i.value), 0);
  if (!marcados.length) {
    rotulo.textContent = "Nenhum serviço marcado";
    valor.textContent = "";
    botao.href = link(PADRAO);
    return;
  }
  rotulo.textContent = marcados.length === 1 ? "1 serviço" : `${marcados.length} serviços`;
  valor.textContent = `R$ ${total}`;
  const nomes = marcados.map((i) => i.dataset.nome).join(", ");
  botao.href = link(`Olá! Vim pelo site e quero agendar: ${nomes}. Total: R$ ${total}.`);
}
form.addEventListener("change", atualizar);
atualizar();

// Entrada das partes de cada seção, uma vez, com pequeno atraso entre irmãos.
const obs = new IntersectionObserver((entradas) => {
  entradas.filter((e) => e.isIntersecting).forEach((e, i) => {
    e.target.style.transitionDelay = `${i * 80}ms`;
    e.target.classList.add("visivel");
    obs.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));

// Rolo de filme: duplica os quadros para o loop não ter emenda e alinha os furos à metade do rolo.
for (const janela of document.querySelectorAll(".fila, .tiras, .faixa")) {
  const rolo = janela.querySelector(".rolo");
  const copiar = (quadros) => quadros.forEach((q) => {
    const copia = q.cloneNode(true);
    copia.classList.add("copia");
    copia.setAttribute("aria-hidden", "true");
    rolo.append(copia);
  });
  // Rolos curtos (poucas avaliações) são repetidos até passar da largura da tela; depois tudo é duplicado.
  const originais = [...rolo.children];
  while (rolo.offsetWidth < Math.max(innerWidth, screen.width) * 1.2) copiar(originais);
  copiar([...rolo.children]);
  const alinhar = () => {
    const metade = rolo.offsetWidth / 2;
    rolo.style.setProperty("--passo", `${metade / Math.round(metade / 36)}px`);
  };
  new ResizeObserver(alinhar).observe(rolo);
}
