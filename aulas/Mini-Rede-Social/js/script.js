// 1. FUNÇÃO PARA APLICAR O TEMA AO CARREGAR
function aplicarTemaSalvo() {
    const temaSalvo = localStorage.getItem("tema") || "light"; // Padrão é light
    document.documentElement.setAttribute('data-bs-theme', temaSalvo);
    
    // Se estiver na página de configuração, marca o switch corretamente
    const s = document.getElementById('darkSwitch');
    if (s) {
        s.checked = (temaSalvo === "dark");
    }
}

// 2. FUNÇÃO PARA ALTERNAR E SALVAR
function alternarModoNoturno() {
    const html = document.documentElement;
    const temaAtual = html.getAttribute('data-bs-theme');
    const novoTema = (temaAtual === 'light') ? 'dark' : 'light';

    html.setAttribute('data-bs-theme', novoTema);
    localStorage.setItem("tema", novoTema); // SALVA NA MEMÓRIA DO NAVEGADOR
}

// Executa assim que a página abre
aplicarTemaSalvo();

// Se o switch existir na página (Configuração), adiciona o evento de clique
document.addEventListener("DOMContentLoaded", () => {
    const s = document.getElementById('darkSwitch');
    if (s) {
        s.addEventListener('change', alternarModoNoturno);
    }
});