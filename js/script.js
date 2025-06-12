// Variáveis globais
let currentSong = 0;
let isPlaying = false;
let audio = null;
let playlist = [];

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Esconder o scroll indicator inicialmente
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
    }
    
    // Controlar loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        const mainContent = document.getElementById('main-content');
        mainContent.style.display = 'block';
        
        // Mostrar o scroll indicator após um pequeno delay
        setTimeout(() => {
            if (scrollIndicator) {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
                scrollIndicator.style.transition = 'opacity 0.8s ease';
            }
        }, 1300);
        
        // Inicializar funcionalidades
        initializeCounter();
        initializeMusicPlayer();
        initializeScrollAnimations();
        initializeTimeline();
        initializeGallery();
        initializeTypingEffect();
    }, 3500);
});

// Contador de tempo de relacionamento
function initializeCounter() {
    const startDate = new Date('2023-02-06');
    
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        
        // Animação dos números
        animateNumber('anos', years);
        animateNumber('meses', months);
        animateNumber('dias', days);
    }
    
    updateCounter();
    setInterval(updateCounter, 1000 * 60 * 60); // Atualiza a cada hora
}

function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== targetValue) {
        let start = currentValue;
        const increment = targetValue > start ? 1 : -1;
        const timer = setInterval(() => {
            start += increment;
            element.textContent = start;
            if (start === targetValue) {
                clearInterval(timer);
            }
        }, 50);
    }
}

// Player de música - VERSÃO OTIMIZADA
function initializeMusicPlayer() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    
    // Playlist com suas músicas
    playlist = [
        {
            title: "Imprevisto",
            artist: "Yago Opróprio",
            src: "audio/Imprevisto.mp3"
        },
        {
            title: "Mina do Condomínio",
            artist: "Seu Jorge",
            src: "audio/Mina do Condomínio.mp3"
        },
        {
            title: "Um Amor Puro",
            artist: "Djavan",
            src: "audio/Djavan - Um Amor Puro.mp3"
        },
        {
            title: "Camisa 10",
            artist: "Turma Do Pagode",
            src: "audio/Turma do Pagode - Camisa 10.mp3"
        },
        {
            title: "Vagabundo e a Dama",
            artist: "Oriente",
            src: "audio/Oriente - Vagabundo e a Dama.mp3"
        }
    ];
    
    // Criar apenas um objeto audio - SOLUÇÃO OTIMIZADA
    audio = new Audio();
    audio.volume = 0.7;
    
    // Event listeners apenas uma vez - CORREÇÃO DO PROBLEMA
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('error', handleAudioError);
    
    // Inicializar primeira música
    if (playlist.length > 0) {
        loadSong(currentSong);
    }
    
    // Event listeners dos botões
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', previousSong);
    nextBtn.addEventListener('click', nextSong);
}

function loadSong(songIndex) {
    if (playlist.length === 0) {
        updateSongInfo('Aguardando playlist...', 'Suas músicas especiais');
        return;
    }
    
    const song = playlist[songIndex];
    
    // Pausar áudio atual se estiver tocando
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        document.getElementById('play-btn').textContent = '▶';
    }
    
    // Apenas trocar a source - SOLUÇÃO OTIMIZADA
    audio.src = song.src;
    audio.load(); // Força o carregamento do novo arquivo
    
    updateSongInfo(song.title, song.artist);
    
    // Reset da barra de progresso
    document.getElementById('progress').style.width = '0%';
    document.getElementById('current-time').textContent = '0:00';
}

function updateSongInfo(title, artist) {
    document.getElementById('song-title').textContent = title;
    document.getElementById('song-artist').textContent = artist;
}

function togglePlay() {
    const playBtn = document.getElementById('play-btn');
    
    if (!audio || playlist.length === 0) {
        alert('Nenhuma música disponível para reproduzir.');
        return;
    }
    
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶';
        isPlaying = false;
    } else {
        audio.play().then(() => {
            playBtn.textContent = '⏸';
            isPlaying = true;
        }).catch(error => {
            console.error('Erro ao reproduzir música:', error);
            alert('Erro ao reproduzir a música. Verifique se o arquivo existe.');
        });
    }
}

function previousSong() {
    if (playlist.length === 0) return;
    
    currentSong = currentSong > 0 ? currentSong - 1 : playlist.length - 1;
    loadSong(currentSong);
    
    if (isPlaying) {
        audio.play().then(() => {
            document.getElementById('play-btn').textContent = '⏸';
        });
    }
}

function nextSong() {
    if (playlist.length === 0) return;
    
    currentSong = currentSong < playlist.length - 1 ? currentSong + 1 : 0;
    loadSong(currentSong);
    
    if (isPlaying) {
        audio.play().then(() => {
            document.getElementById('play-btn').textContent = '⏸';
        });
    }
}

function updateDuration() {
    const duration = audio.duration;
    if (!isNaN(duration)) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        document.getElementById('duration').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    
    if (!isNaN(currentTime) && !isNaN(duration)) {
        const progress = (currentTime / duration) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
        
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        document.getElementById('current-time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function handleAudioError(error) {
    // Verificação aprimorada para evitar falsos positivos - CORREÇÃO DO PROBLEMA
    if (audio.networkState === audio.NETWORK_NO_SOURCE || 
        (audio.error && audio.error.code !== 0)) {
        
        console.error('Erro no áudio:', error);
        updateSongInfo('Arquivo não encontrado', 'Verifique se os arquivos MP3 estão na pasta "audio/"');
        document.getElementById('play-btn').textContent = '▶';
        isPlaying = false;
        
        // Mostrar instruções no console
        console.log('INSTRUÇÕES PARA CORRIGIR:');
        console.log('1. Certifique-se de que os arquivos de música estão na pasta "audio/"');
        console.log('2. Verifique se os nomes dos arquivos estão corretos:');
        console.log('   - audio/Imprevisto.mp3');
        console.log('   - audio/Mina do Condomínio.mp3');
        console.log('   - audio/Djavan - Um Amor Puro.mp3');
        console.log('   - audio/Turma do Pagode - Camisa 10.mp3');
        console.log('   - audio/Oriente - Vagabundo e a Dama.mp3');
        console.log('3. Os arquivos devem estar no formato MP3');
    }
}

// Animações de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem animar
    document.querySelectorAll('.section-title, .contador-item, .music-player, .timeline-item, .gallery-item, .carta-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Timeline interativa - CORRIGIDA
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const modal = document.getElementById('timeline-modal');
    
    if (!modal) return;
    
    const closeBtn = modal.querySelector('.close');
    
    // Conteúdo específico para cada capítulo
    const timelineContent = {
        'começo': {
            title: 'O Começo de Tudo',
            description: 'Primeiras vezes que saimos, que ficamos. Foi quando nossos olhares se cruzaram e soubemos que algo especial estava começando.',
            images: ['images/primeiro-encontro1.jpg', 'images/primeiro-encontro2.png'],
            message: 'Desde o primeiro momento, eu soube que você era especial. Cada conversa, cada risada, cada momento construiu a base do nosso amor.'
        },
        'namorados': {
            title: 'Nossas Idas a Praia',
            description: 'vezes que fomos há lugares que amamos, a praia.',
            images: ['images/Praia1.jpg', 'images/Praia2.jpg'],
            message: 'Celebrar o amor com você é a coisa mais natural do mundo. Cada momento ao seu lado é um presente.'
        },
        'ano-novo': {
            title: 'Primeiro Fim de Ano Juntos',
            description: 'Começamos um novo ano com novos sonhos e a certeza de que queremos construir o futuro juntos.',
            images: ['images/f1.jpg', 'images/f2.jpg'],
            message: 'Que todos os anos que virão sejam repletos de amor, cumplicidade e felicidade ao seu lado.'
        }
    };
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const contentKey = item.getAttribute('data-content');
            const content = timelineContent[contentKey];
            
            if (content) {
                updateTimelineModal(content);
            } else {
                // Conteúdo padrão se não encontrar
                updateTimelineModal({
                    title: item.querySelector('h3').textContent,
                    description: 'Esta memória especial está sendo preparada com carinho...',
                    images: [],
                    message: 'Em breve, mais detalhes e fotos desta memória especial.'
                });
            }
            
            modal.style.display = 'block';
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function updateTimelineModal(content) {
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalContent = document.querySelector('#timeline-modal .modal-content');
    
    if (modalTitle) modalTitle.textContent = content.title;
    if (modalDescription) {
        modalDescription.innerHTML = `
            <p>${content.description}</p>
            ${content.images.length > 0 ? `
                <div class="modal-images">
                    ${content.images.map(img => `
                        <img src="${img}" alt="${content.title}" style="max-width: 100%; margin: 15px 0; border-radius: 10px;">
                    `).join('')}
                </div>
            ` : ''}
            <div class="modal-message">
                <p><em>${content.message}</em></p>
            </div>
        `;
    }
    
    // Garantir que o scroll comece do topo
    if (modalContent) {
        modalContent.scrollTop = 0;
    }
}

// Galeria de fotos - VERSÃO SIMPLIFICADA E CORRIGIDA
function initializeGallery() {
    // Configurar event listeners globais PRIMEIRO
    setupGalleryModalEvents();
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Garantir que o modal seja criado
    createGalleryModal();
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const placeholder = item.querySelector('.gallery-placeholder');
            
            if (img) {
                // Verificar se é arquivo HEIC
                if (img.src.toLowerCase().includes('.heic')) {
                    openGalleryModal(
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect fill="%23F5F1EB" width="400" height="400"/><text x="200" y="160" text-anchor="middle" font-size="40" fill="%23D4AF37">⚠️</text><text x="200" y="220" text-anchor="middle" font-size="16" fill="%236B6B6B">Formato HEIC</text><text x="200" y="240" text-anchor="middle" font-size="14" fill="%236B6B6B">Não suportado</text></svg>',
                        'Formato não suportado',
                        'Arquivo HEIC Detectado',
                        'Este formato não é suportado pelos navegadores. Converta para JPEG ou PNG.'
                    );
                    return;
                }
                
                // Se tem imagem real
                const overlay = item.querySelector('.gallery-overlay');
                const title = overlay ? overlay.querySelector('h3')?.textContent || 'Momento Especial' : 'Momento Especial';
                const description = overlay ? overlay.querySelector('p')?.textContent || 'Uma memória especial' : 'Uma memória especial';
                
                openGalleryModal(img.src, img.alt, title, description);
            } else if (placeholder) {
                // Se é placeholder
                const title = placeholder.querySelector('p')?.textContent || 'Aguardando Foto';
                const placeholderSvg = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect fill="%23F5F1EB" width="400" height="400"/><text x="200" y="180" text-anchor="middle" font-size="60" fill="%23D4AF37">📸</text><text x="200" y="240" text-anchor="middle" font-size="20" fill="%236B6B6B">Aguardando Foto</text></svg>';
                
                openGalleryModal(placeholderSvg, 'Aguardando Foto', title, 'Esta foto será adicionada em breve...');
            }
        });
    });
}

// VERSÃO SIMPLIFICADA - Remove event listeners duplicados
function createGalleryModal() {
    // Verificar se o modal já existe
    if (document.getElementById('gallery-modal')) {
        return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content gallery-modal-content">
            <span class="close gallery-close" style="cursor: pointer; user-select: none;">&times;</span>
            <img id="gallery-modal-image" src="" alt="" style="max-width: 90vw; max-height: 80vh; object-fit: contain;">
            <div class="gallery-modal-info">
                <h3 id="gallery-modal-title">Título</h3>
                <p id="gallery-modal-description">Descrição</p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    console.log('Modal da galeria criado com sucesso');
    
    // Verificar se o botão X foi criado corretamente
    const closeBtn = modal.querySelector('.gallery-close');
    if (closeBtn) {
        console.log('Botão X encontrado:', closeBtn);
        console.log('Texto do botão X:', closeBtn.textContent);
    } else {
        console.error('Botão X não encontrado!');
    }
}

function openGalleryModal(imageSrc, imageAlt, title, description) {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-modal-image');
    const modalTitle = document.getElementById('gallery-modal-title');
    const modalDescription = document.getElementById('gallery-modal-description');
    
    // Verificar se os elementos existem antes de tentar modificá-los
    if (!modal) {
        console.error('Modal da galeria não encontrado');
        return;
    }
    
    if (modalImg) {
        modalImg.src = imageSrc;
        modalImg.alt = imageAlt;
        
        // Aplicar estilos para exibir a imagem em tamanho grande
        modalImg.style.width = 'auto';
        modalImg.style.height = 'auto';
        modalImg.style.maxWidth = '90vw';
        modalImg.style.maxHeight = '80vh';
        modalImg.style.objectFit = 'contain';
        modalImg.style.objectPosition = 'center';
        modalImg.style.display = 'block';
        modalImg.style.margin = '0 auto';
    }
    
    if (modalTitle) {
        modalTitle.textContent = title;
    }
    
    if (modalDescription) {
        modalDescription.textContent = description;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    
    // Verificar se o modal existe antes de tentar fechá-lo
    if (!modal) {
        console.error('Modal da galeria não encontrado para fechar');
        return;
    }
    
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('Modal fechado com sucesso');
}

function setupGalleryModalEvents() {
    // Usar event delegation no document para capturar todos os cliques
    document.addEventListener('click', function(e) {
        // Debug: verificar o que está sendo clicado
        console.log('Clique detectado em:', e.target);
        console.log('Classes do elemento:', e.target.className);
        console.log('ID do elemento:', e.target.id);
        
        // Verificar se é o botão X (múltiplas formas de detectar)
        if (e.target.classList.contains('gallery-close') || 
            e.target.classList.contains('close') ||
            e.target.textContent === '×' ||
            (e.target.closest && e.target.closest('.gallery-close'))) {
            
            console.log('Botão X clicado - fechando modal');
            e.preventDefault();
            e.stopPropagation();
            closeGalleryModal();
            return;
        }
        
        // Verificar se clicou no fundo do modal
        if (e.target.id === 'gallery-modal') {
            console.log('Fundo do modal clicado - fechando modal');
            closeGalleryModal();
        }
    });
    
    // Event listener para ESC (já funciona)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('gallery-modal');
            if (modal && modal.style.display === 'block') {
                console.log('ESC pressionado - fechando modal');
                closeGalleryModal();
            }
        }
    });
    
    console.log('Event listeners da galeria configurados com event delegation');
}

function handleGalleryModalClick(e) {
    // Verificar se o clique foi no botão X do modal da galeria
    if (e.target.matches('#gallery-modal .gallery-close') || 
        e.target.matches('.gallery-close')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Clique no botão X detectado');
        closeGalleryModal();
        return;
    }
    
    // Verificar se o clique foi no fundo do modal
    if (e.target.id === 'gallery-modal') {
        console.log('Clique no fundo do modal detectado');
        closeGalleryModal();
    }
}

function handleGalleryModalKeydown(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('gallery-modal');
        if (modal && modal.style.display === 'block') {
            console.log('Tecla ESC pressionada');
            closeGalleryModal();
        }
    }
}

// Efeito de digitação na carta
function initializeTypingEffect() {
    const cartaTexto = document.getElementById('carta-texto');
    if (!cartaTexto) return;
    
    const paragraphs = cartaTexto.querySelectorAll('p');
    
    // Observar quando a seção da carta entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypingEffect(paragraphs);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const cartaSection = document.getElementById('carta');
    if (cartaSection) {
        observer.observe(cartaSection);
    }
}

function startTypingEffect(paragraphs) {
    // Esconder todos os parágrafos inicialmente
    paragraphs.forEach(p => {
        p.style.opacity = '0';
    });
    
    // Mostrar parágrafos um por um com delay
    paragraphs.forEach((p, index) => {
        setTimeout(() => {
            p.style.opacity = '1';
            p.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, index * 800);
    });
}

// Smooth scroll para links internos
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Parallax effect para hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
