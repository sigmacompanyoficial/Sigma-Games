# Template completo para todos los juegos con estilo senior

function Create-GameHTML {
    param(
        [string]$fileName,
        [string]$gameName,
        [string]$gameUrl,
        [string]$keywords
    )

    $htmlContent = @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZKNGQZL45"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PZKNGQZL45');
  </script>
  
  <!-- SEO Meta Tags -->
  <title>SIGMA GAMES | $gameName - Juega Gratis Online</title>
  <meta name="description" content="Juega $gameName gratis en Sigma Games. La mejor colección de juegos online sin descargas. Diversión garantizada para toda la familia." />
  <meta name="keywords" content="$keywords, juegos gratis, juegos online, sigma games, entretenimiento" />
  <meta name="author" content="Sigma Games" />
  <meta name="robots" content="index, follow" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="SIGMA GAMES | $gameName - Juega Gratis" />
  <meta property="og:description" content="Juega $gameName gratis en Sigma Games. Sin descargas, sin registro." />
  <meta property="og:image" content="Fotos/Logo sigma company pequeñopeg.jpeg" />
  <meta property="og:url" content="https://sigmgames.com/$fileName" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="es_ES" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SIGMA GAMES | $gameName" />
  <meta name="twitter:description" content="Juega $gameName gratis en Sigma Games" />
  <meta name="twitter:image" content="Fotos/Logo sigma company pequeñopeg.jpeg" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="Fotos/Logo sigma company pequeñopeg.jpeg" />
  <link rel="apple-touch-icon" href="Fotos/Logo sigma company pequeñopeg.jpeg" />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="styles.css" />
  
  <style>
    /* Reset y base */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #0f0f12 0%, #1a1a2e 50%, #16213e 100%);
      color: #e9e9e9; 
      min-height: 100vh;
      overflow-x: hidden;
    }
    
    /* Animaciones premium */
    @keyframes slideInDown {
      from { transform: translateY(-100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes fadeInUp {
      from { transform: translateY(30px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
      50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.6); }
    }
    
    /* Header premium */
    .game-header { 
      display: flex; 
      align-items: center; 
      gap: 20px; 
      padding: 20px 30px; 
      background: rgba(18, 19, 24, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(102, 126, 234, 0.2);
      position: sticky; 
      top: 0; 
      z-index: 100;
      animation: slideInDown 0.8s ease-out;
    }
    
    .game-header .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #e9e9e9;
      font-weight: 700;
      font-size: 18px;
      transition: all 0.3s ease;
    }
    
    .game-header .logo:hover {
      color: #667eea;
      transform: translateY(-2px);
    }
    
    .game-header .logo img {
      height: 35px;
      width: auto;
      border-radius: 8px;
    }
    
    .game-title {
      font-size: 24px;
      font-weight: 600;
      color: #667eea;
      text-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
    }
    
    .spacer { flex: 1; }
    
    .btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 25px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }
    
    .btn:active {
      transform: translateY(-1px);
    }
    
    /* Frame container */
    .frame-wrap { 
      height: calc(100vh - 80px);
      padding: 0;
      position: relative;
      animation: fadeInUp 1s ease-out 0.3s both;
    }
    
    .frame-wrap iframe { 
      width: 100%; 
      height: 100%; 
      display: block; 
      border: 0;
      border-radius: 0;
      background: #0b0d11;
    }
    
    /* Loading overlay */
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #0f0f12 0%, #1a1a2e 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 10;
      transition: opacity 0.5s ease;
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid rgba(102, 126, 234, 0.3);
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .loading-text {
      color: #667eea;
      font-weight: 600;
      font-size: 16px;
    }
    
    /* Estilos para Sigma AI - Diseño Senior */
    #sigma-logo {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 1000;
      font-size: 28px;
      font-weight: 700;
      color: #fff;
      cursor: pointer;
      user-select: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 3px solid rgba(255,255,255,0.1);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3), 0 4px 15px rgba(0,0,0,0.2);
      backdrop-filter: blur(10px);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      animation: float 3s ease-in-out infinite;
    }
    
    #sigma-logo:hover {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4), 0 8px 25px rgba(0,0,0,0.3);
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
      animation: glow 2s ease-in-out infinite;
    }
    
    #sigma-logo:active {
      transform: scale(0.95);
    }
    
    /* Pulso animado cuando hay actividad */
    #sigma-logo.pulse {
      animation: sigmaPulse 2s infinite;
    }
    
    @keyframes sigmaPulse {
      0% { box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3), 0 4px 15px rgba(0,0,0,0.2), 0 0 0 0 rgba(102, 126, 234, 0.4); }
      50% { box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3), 0 4px 15px rgba(0,0,0,0.2), 0 0 0 20px rgba(102, 126, 234, 0); }
      100% { box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3), 0 4px 15px rgba(0,0,0,0.2), 0 0 0 0 rgba(102, 126, 234, 0); }
    }
    
    /* Chatbox con diseño premium */
    #sigma-chatbox {
      position: fixed;
      bottom: 110px;
      right: 30px;
      width: 380px;
      height: 0;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      display: none;
      flex-direction: column;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    #sigma-chatbox.open {
      display: flex;
      height: 500px;
      animation: scaleIn 0.4s ease-out;
    }
    
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    #sigma-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 16px;
      text-align: center;
      font-weight: 600;
      color: white;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .sigma-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .sigma-subtitle {
      font-size: 12px;
      opacity: 0.9;
      font-weight: 400;
    }
    
    #sigma-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: rgba(255, 255, 255, 0.02);
    }
    
    .sigma-message {
      margin-bottom: 16px;
      padding: 12px 16px;
      border-radius: 18px;
      max-width: 85%;
      word-wrap: break-word;
      animation: fadeInUp 0.3s ease-out;
    }
    
    .sigma-user-message {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-left: auto;
      text-align: right;
    }
    
    .sigma-ai-message {
      background: rgba(102, 126, 234, 0.1);
      color: #333;
      border: 1px solid rgba(102, 126, 234, 0.2);
    }
    
    .message-content {
      margin-bottom: 4px;
    }
    
    .message-time {
      font-size: 10px;
      opacity: 0.7;
    }
    
    .typing-dots {
      display: inline-flex;
      gap: 2px;
      margin-left: 8px;
    }
    
    .typing-dots span {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #667eea;
      animation: typingDots 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typingDots {
      0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }
    
    #sigma-input-box {
      display: flex;
      padding: 16px;
      gap: 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 0 0 20px 20px;
    }
    
    #sigma-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid rgba(102, 126, 234, 0.3);
      border-radius: 25px;
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      font-size: 14px;
      outline: none;
      transition: all 0.3s ease;
    }
    
    #sigma-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    #sigma-send {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    #sigma-send:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .game-header {
        padding: 15px 20px;
        gap: 15px;
      }
      
      .game-title {
        font-size: 18px;
      }
      
      .btn {
        padding: 10px 20px;
        font-size: 13px;
      }
      
      .frame-wrap {
        height: calc(100vh - 70px);
      }
      
      #sigma-chatbox {
        width: calc(100vw - 40px);
        right: 20px;
        bottom: 100px;
      }
      
      #sigma-logo {
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <header class="game-header">
    <a class="logo" href="index.html">
      <img src="Fotos/Logo sigma company pequeñopeg.jpeg" alt="Sigma Games Logo" />
      <span>SIGMA GAMES</span>
    </a>
    <div class="game-title">$gameName</div>
    <div class="spacer"></div>
    <button id="btn-fullscreen" class="btn" type="button">🔍 Pantalla Completa</button>
  </header>

  <main class="frame-wrap">
    <div class="loading-overlay" id="loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">Cargando $gameName...</div>
    </div>
    <iframe id="game-frame" src="$gameUrl" allowfullscreen></iframe>
  </main>

  <script>
    // Ocultar loading cuando el iframe carga
    const iframe = document.getElementById('game-frame');
    const loading = document.getElementById('loading');
    
    iframe.addEventListener('load', () => {
      setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
          loading.style.display = 'none';
        }, 500);
      }, 1000);
    });
    
    // Botón de pantalla completa
    const btnFs = document.getElementById('btn-fullscreen');
    const frame = document.getElementById('game-frame');
    
    btnFs.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (frame.requestFullscreen) {
          frame.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
    
    // Actualizar texto del botón según estado
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        btnFs.innerHTML = '🔍 Salir Pantalla Completa';
      } else {
        btnFs.innerHTML = '🔍 Pantalla Completa';
      }
    });
  </script>

  <!-- Sigma AI Chatbot -->
  <div id="sigma-logo">Σ</div>
  <div id="sigma-chatbox">
    <div id="sigma-header">
      <div class="sigma-title">Σ Sigma AI</div>
      <div class="sigma-subtitle">Asistente de $gameName</div>
    </div>
    <div id="sigma-messages"></div>
    <div id="sigma-input-box">
      <input type="text" id="sigma-input" placeholder="Pregúntame sobre $gameName...">
      <button id="sigma-send">Enviar</button>
    </div>
  </div>

  <!-- Librerías para Sigma AI -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/emoji-toolkit@11.5.0/lib/js/joypixels.min.js"></script>
  <script src="https://js.puter.com/v2/"></script>
  
  <script>
    // Sigma AI Chatbot - Estilo Senior
    const sigmaLogo = document.getElementById('sigma-logo');
    const sigmaChatbox = document.getElementById('sigma-chatbox');
    const sigmaMessages = document.getElementById('sigma-messages');
    const sigmaInput = document.getElementById('sigma-input');
    const sigmaSend = document.getElementById('sigma-send');

    sigmaLogo.addEventListener('click', () => {
      sigmaChatbox.classList.toggle('open');
      if (sigmaChatbox.classList.contains('open')) {
        sigmaInput.focus();
      }
    });

    function addSigmaMessage(message, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = `sigma-message `${isUser ? 'sigma-user-message' : 'sigma-ai-message'}`;
      
      const time = new Date().toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      if (isUser) {
        messageDiv.innerHTML = `
          <div class="message-content">
            <strong>Tú:</strong> `${message}`
          </div>
          <div class="message-time">`${time}`</div>
        `;
      } else {
        let processedMessage = message;
        if (typeof joypixels !== 'undefined') {
          processedMessage = joypixels.toImage(message);
        }
        messageDiv.innerHTML = `
          <div class="message-content">
            <strong>Sigma AI:</strong> `${processedMessage}`
          </div>
          <div class="message-time">`${time}`</div>
        `;
      }
      
      sigmaMessages.appendChild(messageDiv);
      sigmaMessages.scrollTop = sigmaMessages.scrollHeight;
    }

    async function sendSigmaMessage() {
      const msg = sigmaInput.value.trim();
      if (!msg) return;
      
      addSigmaMessage(msg, true);
      sigmaInput.value = "";
      
      const typingDiv = document.createElement("div");
      typingDiv.className = "sigma-message sigma-ai-message typing";
      typingDiv.innerHTML = `
        <div class="message-content">
          <strong>Sigma AI:</strong> <em>Escribiendo...</em> 
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      `;
      sigmaMessages.appendChild(typingDiv);
      sigmaMessages.scrollTop = sigmaMessages.scrollHeight;
      
      try {
        if (typeof puter === 'undefined') {
          throw new Error('Puter SDK no está cargado');
        }
        
        const response = await puter.ai.chat(msg, { 
          model: "gpt-4o-mini",
          system_prompt: `Eres Sigma AI, un asistente especializado en el juego $gameName y Sigma Games. Ayuda a los usuarios con:
          - Consejos y trucos para $gameName
          - Información sobre controles y mecánicas
          - Estrategias de juego
          - Preguntas generales sobre gaming
          - Soporte técnico básico
          
          Responde en español, usa emojis apropiados y sé amigable y útil. Mantén las respuestas concisas pero informativas.`
        });
        
        sigmaMessages.removeChild(typingDiv);
        addSigmaMessage(response);
        
      } catch (error) {
        console.error('Error en Sigma AI:', error);
        sigmaMessages.removeChild(typingDiv);
        addSigmaMessage("⚠️ Lo siento, no puedo conectarme en este momento. Intenta de nuevo más tarde. 🤖");
      }
      
      sigmaLogo.classList.add("pulse");
      setTimeout(() => sigmaLogo.classList.remove("pulse"), 2000);
    }
    
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
        addSigmaMessage(`¡Hola! 👋 Soy Sigma AI, tu asistente para $gameName. ¿Necesitas ayuda con controles, trucos o tienes alguna pregunta sobre el juego? 🎮✨`);
      }, 2000);
    });
  </script>
</body>
</html>
"@

    return $htmlContent
}

# Datos de juegos principales
$games = @{
    "agar.io.html" = @{
        name = "Agar.io"
        url = "https://agar-io-online.github.io/file/"
        keywords = "agar.io, multijugador, células, online"
    }
    "minecraft.html" = @{
        name = "Minecraft"
        url = "https://eaglercraft.q13x.com/"
        keywords = "minecraft, construcción, supervivencia, bloques"
    }
    "subway.surfers.html" = @{
        name = "Subway Surfers"
        url = "https://htmlxm.github.io/h8/subway-surfers-newyork/"
        keywords = "subway surfers, correr, endless runner, móvil"
    }
    "happy.wheels.html" = @{
        name = "Happy Wheels"
        url = "https://sreekar617.github.io/hw/index.html"
        keywords = "happy wheels, física, plataformas, violento"
    }
    "shell.shockers.html" = @{
        name = "Shell Shockers"
        url = "https://humanorganising.org/"
        keywords = "shell shockers, fps, huevos, multijugador"
    }
}

Write-Host "🎮 CREANDO JUEGOS CON TEMPLATE COMPLETO 🎮" -ForegroundColor Magenta

foreach ($file in $games.Keys) {
    $game = $games[$file]
    $filePath = "c:\Users\AYOUB LOUAH\Desktop\sigma games\$file"
    
    Write-Host "🔧 Creando: $($game.name)" -ForegroundColor Yellow
    
    $htmlContent = Create-GameHTML -fileName $file -gameName $game.name -gameUrl $game.url -keywords $game.keywords
    
    [System.IO.File]::WriteAllText($filePath, $htmlContent, [System.Text.Encoding]::UTF8)
    
    Write-Host "✅ Completado: $($game.name)" -ForegroundColor Green
}

Write-Host "`n🎉 JUEGOS PRINCIPALES COMPLETADOS CON ESTILO SENIOR!" -ForegroundColor Green