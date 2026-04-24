// =============================================
// CartoonGram - script.js
// =============================================

// 1. TEMA: aplica ao carregar qualquer página
function aplicarTemaSalvo() {
  const tema = localStorage.getItem('tema') || 'light';
  document.documentElement.setAttribute('data-bs-theme', tema);
  const sw = document.getElementById('darkSwitch');
  if (sw) sw.checked = (tema === 'dark');
}

function alternarModoNoturno() {
  const html = document.documentElement;
  const novo = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', novo);
  localStorage.setItem('tema', novo);
}

aplicarTemaSalvo();

document.addEventListener('DOMContentLoaded', () => {

  // Switch de tema (página de configurações)
  const sw = document.getElementById('darkSwitch');
  if (sw) sw.addEventListener('change', alternarModoNoturno);

  // =============================================
  // FEED - posts iniciais de exemplo
  // =============================================
  const postsIniciais = [
    {
      nome: 'Julia Beatriz',
      avatar: 'https://img.quizur.com/f/img6019625ad2d8a2.14565371.jpg',
      tempo: '2 min atrás',
      texto: '✨ Primeiro dia no novo projeto! Muito animada com os desafios que vêm por aí. #Dev #Agro',
      likes: 24,
      liked: false
    },
    {
      nome: 'Marcos Lima',
      avatar: 'https://i.pravatar.cc/150?img=12',
      tempo: '15 min atrás',
      texto: '🌱 Tecnologia e agricultura juntas fazendo história. O futuro é agora!',
      likes: 41,
      liked: false
    },
    {
      nome: 'Ana Clara',
      avatar: 'https://i.pravatar.cc/150?img=47',
      tempo: '1h atrás',
      texto: '☕ Café, código e muita dedicação. Quem mais está assim hoje? 🙋‍♀️',
      likes: 88,
      liked: true
    }
  ];

  const feed = document.getElementById('feed');
  if (feed) {
    postsIniciais.forEach((p, i) => {
      feed.insertAdjacentHTML('beforeend', criarPostHTML(p, i));
    });
    atualizarEventosPosts();
  }

  // =============================================
  // PUBLICAR novo post
  // =============================================
  const btnPublicar = document.getElementById('btnPublicar');
  if (btnPublicar) {
    btnPublicar.addEventListener('click', publicar);
  }

  const textarea = document.getElementById('textoPost');
  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') publicar();
    });
    // Auto resize
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 140) + 'px';
    });
  }

  // =============================================
  // FORMULÁRIO CONFIGURAÇÕES
  // =============================================
  const editForm = document.getElementById('editForm');
  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = editForm.querySelector('button[type="submit"]');
      btn.textContent = '✓ Salvo!';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Salvar Alterações';
        btn.disabled = false;
      }, 2000);
    });
  }

});

// =============================================
// CRIAR HTML DE UM POST
// =============================================
function criarPostHTML(p, index = 0) {
  const likedClass = p.liked ? 'liked' : '';
  const heartIcon  = p.liked ? 'bi-heart-fill' : 'bi-heart';
  return `
    <div class="post-card" style="animation-delay:${index * 0.07}s">
      <div class="post-header">
        <img src="${p.avatar}" class="post-avatar" alt="${p.nome}" onerror="this.src='https://i.pravatar.cc/150?u=${p.nome}'">
        <div>
          <div class="post-username">${p.nome}</div>
          <div class="post-time">${p.tempo}</div>
        </div>
      </div>
      <div class="post-body">${p.texto}</div>
      <div class="post-footer">
        <button class="action-btn btn-like ${likedClass}" data-likes="${p.likes}">
          <i class="bi ${heartIcon}"></i>
          <span>${p.likes}</span>
        </button>
        <button class="action-btn">
          <i class="bi bi-chat"></i>
          <span>Comentar</span>
        </button>
        <button class="action-btn ms-auto" onclick="compartilhar('${p.texto.substring(0,30)}...')">
          <i class="bi bi-send"></i>
        </button>
      </div>
    </div>`;
}

// =============================================
// EVENTOS DOS POSTS (like)
// =============================================
function atualizarEventosPosts() {
  document.querySelectorAll('.btn-like').forEach(btn => {
    btn.addEventListener('click', function () {
      const isLiked = this.classList.contains('liked');
      const span    = this.querySelector('span');
      const icon    = this.querySelector('i');
      let count     = parseInt(this.dataset.likes);

      if (isLiked) {
        count--;
        this.classList.remove('liked');
        icon.className = 'bi bi-heart';
      } else {
        count++;
        this.classList.add('liked');
        icon.className = 'bi bi-heart-fill';
      }

      span.textContent    = count;
      this.dataset.likes  = count;
    });
  });
}

// =============================================
// PUBLICAR
// =============================================
function publicar() {
  const t = document.getElementById('textoPost');
  if (!t || !t.value.trim()) {
    t && t.focus();
    return;
  }

  const novoPost = {
    nome:   'Julia Beatriz',
    avatar: 'https://img.quizur.com/f/img6019625ad2d8a2.14565371.jpg',
    tempo:  'Agora mesmo',
    texto:  t.value.trim(),
    likes:  0,
    liked:  false
  };

  const feed = document.getElementById('feed');
  feed.insertAdjacentHTML('afterbegin', criarPostHTML(novoPost, 0));
  atualizarEventosPosts();
  t.value = '';
  t.style.height = 'auto';

  // Pequena animação no card recém-criado
  const primeiro = feed.querySelector('.post-card');
  primeiro.style.border = '1.5px solid var(--pink)';
  setTimeout(() => { primeiro.style.border = ''; }, 1200);
}

// =============================================
// COMPARTILHAR (simulação)
// =============================================
function compartilhar(texto) {
  if (navigator.share) {
    navigator.share({ title: 'CartoonGram', text: texto, url: window.location.href });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      mostrarToast('Link copiado! 🔗');
    });
  }
}

// =============================================
// TOAST
// =============================================
function mostrarToast(msg) {
  let toast = document.getElementById('cg-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cg-toast';
    toast.style.cssText = `
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%) translateY(20px);
      background:var(--text); color:var(--surface); padding:10px 20px;
      border-radius:30px; font-size:0.875rem; font-weight:500;
      box-shadow:0 4px 20px rgba(0,0,0,0.2); z-index:9999;
      opacity:0; transition:all 0.3s ease; pointer-events:none;
      font-family:'DM Sans',sans-serif;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2500);
}
