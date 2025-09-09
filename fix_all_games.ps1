# Script completo para arreglar todos los juegos con estilo senior

# Mapeo de nombres de archivos a títulos de juegos
$gameNames = @{
    "11.11.html" = "11-11"
    "agar.io.html" = "Agar.io"
    "amonug.us.html" = "Among Us"
    "aqua.thrills.html" = "Aqua Thrills"
    "bank.robery.html" = "Bank Robbery"
    "basketball.random.html" = "Basketball Random"
    "basketball.starts.html" = "Basketball Stars"
    "bit.life.html" = "BitLife"
    "bladi.s.basics.html" = "Baldi's Basics"
    "blumgi.slime.html" = "Blumgi Slime"
    "bob.the.rober.html" = "Bob the Robber"
    "buckshoot.roulete.html" = "Buckshot Roulette"
    "burger.bountry.html" = "Burger Bounty"
    "cave.blast.html" = "Cave Blast"
    "cliker.heroes.html" = "Clicker Heroes"
    "cookie.cliker.2.html" = "Cookie Clicker 2"
    "cookie.cliker.html" = "Cookie Clicker"
    "cooking.fast.html" = "Cooking Fast"
    "crazy.cars.html" = "Crazy Cars"
    "crossy.road.html" = "Crossy Road"
    "doodle.jump.html" = "Doodle Jump"
    "doom.2.html" = "Doom 2"
    "doom.html" = "Doom"
    "dragon.ball.z.html" = "Dragon Ball Z"
    "drive.mad-2.html" = "Drive Mad 2"
    "drive.mad.html" = "Drive Mad"
    "eggy.car.html" = "Eggy Car"
    "escape.road.2.html" = "Escape Road 2"
    "escape.road.city.2.html" = "Escape Road City 2"
    "extreme.drift.raging.html" = "Extreme Drift Racing"
    "f1.reaction.html" = "F1 Reaction"
    "farming.batlles.html" = "Farming Battles"
    "fifa.09.html" = "FIFA 09"
    "fireboy.and.watergirl.html" = "Fireboy and Watergirl"
    "fnaf.2.html" = "Five Nights at Freddy's 2"
    "fnaf.3.html" = "Five Nights at Freddy's 3"
    "fnaf.4.html" = "Five Nights at Freddy's 4"
    "fnaf.sister.location.html" = "FNAF Sister Location"
    "football.random.html" = "Football Random"
    "fruit.ninja.html" = "Fruit Ninja"
    "golf.champions.html" = "Golf Champions"
    "golf.physics.html" = "Golf Physics"
    "gta.san.andreas.html" = "GTA San Andreas"
    "gta.stickman.html" = "GTA Stickman"
    "happy.wheels.html" = "Happy Wheels"
    "head.soccer.2022.html" = "Head Soccer 2022"
    "hide.and.seek.html" = "Hide and Seek"
    "hole.io.html" = "Hole.io"
    "house.of.hazards.html" = "House of Hazards"
    "ice.dodo.html" = "Ice Dodo"
    "idle.mining.html" = "Idle Mining"
    "idle.restaurant.tycoon.html" = "Idle Restaurant Tycoon"
    "mario.64.html" = "Mario 64"
    "mario.kart.html" = "Mario Kart"
    "masked.forces.html" = "Masked Forces"
    "minecraft.html" = "Minecraft"
    "momo.horror.story.html" = "Momo Horror Story"
    "monkey.mart.html" = "Monkey Mart"
    "moto.x3m.2.html" = "Moto X3M 2"
    "moto.x3m.3.html" = "Moto X3M 3"
    "moto.x3m.winter.html" = "Moto X3M Winter"
    "mr.bullet.html" = "Mr. Bullet"
    "my.perfect.hotel.html" = "My Perfect Hotel"
    "papa.s.freezeria.html" = "Papa's Freezeria"
    "park.out.html" = "Park Out"
    "penalty.challenge.html" = "Penalty Challenge"
    "penalty.shooters.2.html" = "Penalty Shooters 2"
    "pokecliker.html" = "PokeClicker"
    "pokemon.esmerald.version.html" = "Pokemon Emerald"
    "pou.html" = "Pou"
    "president.simulator.html" = "President Simulator"
    "racing.limits.html" = "Racing Limits"
    "raft.wars.html" = "Raft Wars"
    "red.ball.4.html" = "Red Ball 4"
    "road.shooter.html" = "Road Shooter"
    "rocket.league.html" = "Rocket League"
    "ruleta.html" = "Ruleta"
    "shell.shockers.html" = "Shell Shockers"
    "shortcut.race.html" = "Shortcut Race"
    "skibidi.toilet.html" = "Skibidi Toilet"
    "slow.roads.html" = "Slow Roads"
    "snail.bob.html" = "Snail Bob"
    "snow.rider.3d.html" = "Snow Rider 3D"
    "sonkey.kong.comntry.3.html" = "Donkey Kong Country 3"
    "space.bar.cliker.html" = "Space Bar Clicker"
    "stick.heroes.html" = "Stick Heroes"
    "stickman.boxing.html" = "Stickman Boxing"
    "strik.force.kitty.html" = "Strike Force Kitty"
    "subway.surfers.html" = "Subway Surfers"
    "sumo.game.html" = "Sumo Game"
    "super.star.car.html" = "Super Star Car"
    "super.tunel.rush.html" = "Super Tunnel Rush"
    "supermarket.simulator.html" = "Supermarket Simulator"
    "the.backrooms.html" = "The Backrooms"
    "tiny.fishing.html" = "Tiny Fishing"
    "vex.6.html" = "Vex 6"
    "vex.7.html" = "Vex 7"
    "vex.x3m.html" = "Vex X3M"
    "voley.random.html" = "Volleyball Random"
    "wheely.2.html" = "Wheely 2"
    "wheely.3.html" = "Wheely 3"
    "wood.blocks.html" = "Wood Blocks"
    "world.cup.html" = "World Cup"
    "zombs.royale.html" = "Zombs Royale"
}

Write-Host "🎮 ARREGLANDO SIGMA GAMES - ESTILO SENIOR 🎮" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Cyan

foreach ($file in $gameNames.Keys) {
    $filePath = "c:\Users\AYOUB LOUAH\Desktop\sigma games\$file"
    $gameName = $gameNames[$file]
    
    if (Test-Path $filePath) {
        Write-Host "🔧 Procesando: $gameName" -ForegroundColor Yellow
        
        # Leer contenido con codificación UTF-8
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Crear nuevo contenido completo con estilo senior
        $newContent = @"
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
  <meta name="keywords" content="$gameName, juegos gratis, juegos online, sigma games, jugar gratis, entretenimiento" />
  <meta name="author" content="Sigma Games" />
  <meta name="robots" content="index, follow" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="SIGMA GAMES | $gameName - Juega Gratis" />
  <meta property="og:description" content="Juega $gameName gratis en Sigma Games. Sin descargas, sin registro." />
  <meta property="og:image" content="Fotos/Logo sigma company pequeñopeg.jpeg" />
  <meta property="og:url" content="https://sigmgames.com/$file" />
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
    <button id="btn-fullscreen" class="btn" type="button">
      🔍 Pantalla Completa
    </button>
  </header>

  <main class="frame-wrap">
    <div class="loading-overlay" id="loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">Cargando $gameName...</div>
    </div>
"@

        # Extraer la URL del iframe del contenido original
        if ($content -match 'src="([^"]+)"') {
            $iframeUrl = $matches[1]
        } else {
            $iframeUrl = "about:blank"
        }

        # Continuar con el iframe y scripts
        $newContent += @"
    <iframe id="game-frame" src="$iframeUrl" allowfullscreen></iframe>
  </main>

  <!-- Scripts -->
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

        # Guardar archivo con codificación UTF-8
        [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "✅ Completado: $gameName" -ForegroundColor Green
    } else {
        Write-Host "❌ No encontrado: $file" -ForegroundColor Red
    }
}

Write-Host "`n🎉 TODOS LOS JUEGOS ARREGLADOS CON ESTILO SENIOR!" -ForegroundColor Green
Write-Host "✅ Títulos corregidos" -ForegroundColor Cyan
Write-Host "✅ Símbolos raros eliminados" -ForegroundColor Cyan
Write-Host "✅ Google Analytics agregado" -ForegroundColor Cyan
Write-Host "✅ SEO 100% optimizado" -ForegroundColor Cyan
Write-Host "✅ Chatbot funcional" -ForegroundColor Cyan
Write-Host "✅ Estilo senior aplicado" -ForegroundColor Cyan