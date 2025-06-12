# Site Surpresa de Dia dos Namorados 💕

## Para você, Bruna - Nossa História

Este é um website romântico e interativo criado especialmente como presente de Dia dos Namorados. O site conta a história do relacionamento de Allefe e Bruna de forma elegante e emocionante.

## 🎨 Características do Site

### Design e Estilo
- **Paleta de cores romântica**: Bege, branco, rosa quartzo e dourado
- **Tipografia elegante**: Combinação de fontes cursivas (Great Vibes) e modernas (Poppins)
- **Animações suaves**: Loading screen, scroll animations e efeitos hover
- **Totalmente responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### Seções Incluídas

1. **Loading Screen Animado**
   - Iniciais "A & B" com coração pulsante
   - Transição suave para o conteúdo principal

2. **Seção Hero**
   - Título principal "Para você, Bruna."
   - Subtítulo romântico com assinatura
   - Indicador de scroll animado

3. **Contador de Tempo**
   - Calcula automaticamente anos, meses e dias desde 06/02/2023
   - Atualização dinâmica em tempo real
   - Design elegante com cartões animados

4. **Player de Música**
   - Interface customizada e minimalista
   - Controles de play/pause, anterior/próximo
   - Barra de progresso e informações da música
   - Pronto para receber playlist personalizada

5. **Linha do Tempo Interativa**
   - Marcos importantes do relacionamento
   - Clique nos pontos para ver detalhes
   - Design vertical elegante com animações

6. **Galeria de Fotos**
   - Layout em grid responsivo
   - Efeitos hover e zoom
   - Modal para visualização em tela cheia
   - Pronta para receber fotos do casal

7. **Carta de Amor**
   - Texto romântico personalizado
   - Efeito de digitação animado
   - Design elegante com aspas decorativas

8. **Seção Final**
   - Mensagem de encerramento
   - Gradiente dourado elegante
   - Assinatura romântica

## 🛠️ Como Personalizar

### Adicionando Suas Fotos

1. **Para a Seção Hero:**
   - Substitua o background SVG no CSS por uma foto do casal
   - Edite a linha no arquivo `css/styles.css`:
   ```css
   background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
               url('../images/hero-photo.jpg');
   ```

2. **Para a Galeria:**
   - Adicione suas fotos na pasta `images/`
   - Substitua os placeholders no HTML por:
   ```html
   <img src="images/foto1.jpg" alt="Descrição da foto">
   ```

3. **Para a Timeline:**
   - Adicione fotos dos marcos importantes na pasta `images/`
   - Edite o JavaScript para incluir as imagens nos modais

### Adicionando Sua Playlist

1. **Músicas Locais:**
   - Adicione arquivos de áudio na pasta `audio/`
   - Edite o array `playlist` no arquivo `js/script.js`:
   ```javascript
   const playlist = [
       {
           title: "Nome da Música",
           artist: "Nome do Artista",
           src: "audio/musica1.mp3"
       },
       // Adicione mais músicas...
   ];
   ```

2. **Streaming (Spotify, YouTube, etc.):**
   - Para links de streaming, você precisará usar as APIs específicas
   - Ou incorporar players externos

### Personalizando Textos

1. **Carta de Amor:**
   - Edite o conteúdo da div `#carta-texto` no arquivo `index.html`
   - Mantenha a estrutura de parágrafos para o efeito de animação

2. **Timeline:**
   - Adicione ou edite os marcos no HTML
   - Inclua datas e descrições específicas do seu relacionamento

3. **Nomes e Datas:**
   - Altere a data de início do relacionamento no JavaScript
   - Personalize nomes e assinaturas em todo o site

## 📱 Compatibilidade

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)
- ✅ Responsivo para todas as resoluções

## 🚀 Como Usar

1. **Desenvolvimento Local:**
   - Abra o arquivo `index.html` em qualquer navegador
   - Ou use um servidor local para melhor performance

2. **Hospedagem:**
   - Faça upload de todos os arquivos para um servidor web
   - Ou use serviços como Netlify, Vercel, GitHub Pages

## 📁 Estrutura de Arquivos

```
site-surpresa-namorados/
├── index.html              # Arquivo principal
├── css/
│   └── styles.css          # Estilos CSS
├── js/
│   └── script.js           # JavaScript interativo
├── images/                 # Pasta para suas fotos
└── audio/                  # Pasta para suas músicas
```

## 💡 Dicas Importantes

1. **Otimização de Imagens:**
   - Use formatos JPG para fotos
   - Comprima as imagens para web (recomendado: máximo 1MB cada)
   - Mantenha proporções adequadas

2. **Áudio:**
   - Use formato MP3 para melhor compatibilidade
   - Mantenha arquivos pequenos para carregamento rápido

3. **Personalização:**
   - Teste sempre em diferentes dispositivos
   - Mantenha backup dos arquivos originais
   - Faça alterações graduais e teste cada mudança

## ❤️ Mensagem Final

Este site foi criado com muito carinho e atenção aos detalhes. Cada animação, cada cor, cada palavra foi pensada para criar uma experiência única e emocionante.

Que este presente digital seja apenas o começo de muitas outras surpresas e momentos especiais juntos!

**Com amor,**  
**Seu desenvolvedor romântico** 💕

---

*Criado em 10 de junho de 2025*

