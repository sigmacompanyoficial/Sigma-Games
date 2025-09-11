// Sigma Games - Lógica principal (secciones: Top, Nuevos1, Nuevos2)
// - Total 90 elementos
// - Top juegos: 13 imágenes
// - ¡nuevos juegos!: 34 imágenes
// - !nuevos juegos¡: 43 restantes

const galleryTop = document.getElementById('gallery-top');
const galleryNew1 = document.getElementById('gallery-new-1');
const galleryNew2 = document.getElementById('gallery-new-2');

// Títulos
const titles = Array.from({ length: 90 }, (_, i) => `Juego ${i + 1}`);

// Imágenes (configurables desde index.html)
const imageSources = (Array.isArray(window.imageSources) && window.imageSources.length)
  ? window.imageSources
  : Array.from({ length: 90 }, () => '');

function createCard(index, delayIndex = 0) {
  const title = titles[index];
  const link = document.createElement('a');
  link.className = 'card';
  link.href = `juego ${index + 1}.html`;
  link.setAttribute('aria-label', `${title}`);
  // escalona la animación con pequeñas demoras
  const delay = Math.min(delayIndex * 0.03, 0.6); // hasta 0.6s
  link.style.setProperty('--delay', `${delay}s`);

  const img = document.createElement('img');
  img.alt = title;
  img.decoding = 'async';
  img.loading = 'lazy';
  img.src = imageSources[index];

  const badge = document.createElement('span');
  badge.className = 'title';
  badge.textContent = title;

  link.appendChild(img);
  link.appendChild(badge);
  return link;
}

function renderSections() {
  const fragTop = document.createDocumentFragment();
  const fragNew1 = document.createDocumentFragment();
  const fragNew2 = document.createDocumentFragment();

  // Top: 13 (0..12)
  for (let i = 0; i < 13; i++) fragTop.appendChild(createCard(i, i));

  // Nuevos 1: 34 (13..46)
  let k = 0;
  for (let i = 13; i < 47; i++, k++) fragNew1.appendChild(createCard(i, k));

  // Nuevos 2: resto (47..89) = 43
  k = 0;
  for (let i = 47; i < 90; i++, k++) fragNew2.appendChild(createCard(i, k));

  galleryTop.appendChild(fragTop);
  galleryNew1.appendChild(fragNew1);
  galleryNew2.appendChild(fragNew2);
}

renderSections();

    // Elementos del DOM
    const sigmaLogo = document.getElementById("sigma-logo");
    const sigmaChatbox = document.getElementById("sigma-chatbox");
    const sigmaMessages = document.getElementById("sigma-messages");
    const sigmaInput = document.getElementById("sigma-input");
    const sigmaSend = document.getElementById("sigma-send");
    
    // Toggle abrir/cerrar chat con animación mejorada
    sigmaLogo.addEventListener("click", () => {
      sigmaChatbox.classList.toggle("open");
      sigmaLogo.classList.add("pulse");
      setTimeout(() => sigmaLogo.classList.remove("pulse"), 2000);
    });
    
    // Función para renderizar Markdown + Emojis
    function renderMarkdownWithEmojis(text) {
      try {
        let html = typeof marked !== 'undefined' ? marked.parse(text) : text;
        if (typeof joypixels !== 'undefined') {
          html = joypixels.toImage(html);
        }
        return html;
      } catch (error) {
        console.warn('Error renderizando markdown/emojis:', error);
        return text;
      }
    }
    
    // Añadir mensaje al chat con mejor diseño
    function addSigmaMessage(sender, text, isUser = false) {
      const messageDiv = document.createElement("div");
      messageDiv.className = `sigma-message ${isUser ? 'sigma-user-message' : 'sigma-ai-message'}`;
      
      const content = isUser ? text : renderMarkdownWithEmojis(text);
      messageDiv.innerHTML = isUser ? `<strong>Tú:</strong> ${content}` : `<strong>Sigma AI:</strong> ${content}`;
      
      sigmaMessages.appendChild(messageDiv);
      sigmaMessages.scrollTop = sigmaMessages.scrollHeight;
    }
    
    // Enviar mensaje a Puter AI
    async function sendSigmaMessage() {
      const msg = sigmaInput.value.trim();
      if (!msg) return;
      
      addSigmaMessage("", msg, true);
      sigmaInput.value = "";
      
      const typingDiv = document.createElement("div");
      typingDiv.className = "sigma-message sigma-ai-message";
      typingDiv.innerHTML = "<strong>Sigma AI:</strong> <em>Escribiendo...</em> 💭";
      sigmaMessages.appendChild(typingDiv);
      sigmaMessages.scrollTop = sigmaMessages.scrollHeight;
      
      try {
        if (typeof puter === 'undefined') {
          throw new Error('Puter SDK no está cargado');
        }
        
        const response = await puter.ai.chat(msg, { 
          model: "gpt-4o-mini",
          system_prompt: "Eres Sigma AI, un asistente inteligente especializado en DJ Posaxa. Esta es la página principal de inicio que presenta a DJ Posaxa como experto en música para festes i esdeveniments, especializado en creación de ambientes y remixes únicos. Ofrece mashups en vivo, sesiones de baile personalizadas y música de ambiente. Responde en español/catalán, usa emojis y ayuda con información general sobre sus servicios."
        });
        
        sigmaMessages.removeChild(typingDiv);
        addSigmaMessage("", response);
        
      } catch (error) {
        console.error('Error en Sigma AI:', error);
        sigmaMessages.removeChild(typingDiv);
        addSigmaMessage("", "⚠️ Lo siento, no puedo conectarme en este momento. Intenta de nuevo más tarde. 🤖");
      }
      
      sigmaLogo.classList.add("pulse");
      setTimeout(() => sigmaLogo.classList.remove("pulse"), 1000);
    }
    
    // Event listeners
    sigmaSend.addEventListener("click", sendSigmaMessage);
    sigmaInput.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendSigmaMessage();
      }
    });
    
    // Mensaje de bienvenida
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        addSigmaMessage("", "¡Hola! 👋 Soy Sigma AI, tu asistente para Sigma Games. Puedo ayudarte con información sobre juegos, preguntas frecuentes y cualquier consulta que tengas. ¿En qué puedo ayudarte? 💬🎮🕹️ ✨");
      }, 2000);
    });