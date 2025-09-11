# Script simple para arreglar Sigma AI y agregar favicon
# Limpieza completa y reemplazo con plantilla funcional
# Autor: Sigma Games

Write-Host "Iniciando reparacion simple de Sigma AI y favicon..." -ForegroundColor Green

# Obtener todos los archivos HTML excepto index.html
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

Write-Host "Encontrados $($htmlFiles.Count) archivos HTML para procesar" -ForegroundColor Cyan

$processedFiles = 0
$updatedFiles = 0

# Favicon HTML
$faviconHtml = '  <link rel="icon" type="image/png" href="Fotos/Logo sigma company pequeñopeg.jpeg" />'

# Sigma AI completo (HTML + JS)
$sigmaAiComplete = @"
  <div id="sigma-logo">Σ</div>
  <div id="sigma-chatbox">
    <div id="sigma-header">Σ Sigma AI Beta</div>
    <div id="sigma-messages"></div>
    <div id="sigma-input-box">
      <input type="text" id="sigma-input" placeholder="Escribe un mensaje...">
      <button id="sigma-send">Enviar</button>
    </div>
  </div>

  <script>
    // Chatbot funcional
    const sigmaLogo = document.getElementById('sigma-logo');
    const sigmaChatbox = document.getElementById('sigma-chatbox');
    const sigmaMessages = document.getElementById('sigma-messages');
    const sigmaInput = document.getElementById('sigma-input');
    const sigmaSend = document.getElementById('sigma-send');

    sigmaLogo.addEventListener('click', () => {
      sigmaChatbox.classList.toggle('open');
    });

    function addSigmaMessage(sender, message, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'sigma-message ' + (isUser ? 'sigma-user-message' : 'sigma-ai-message');
      
      if (isUser) {
        messageDiv.innerHTML = '<strong>Tu:</strong> ' + message;
      } else {
        let processedMessage = message;
        if (typeof joypixels !== 'undefined') {
          processedMessage = joypixels.toImage(message);
        }
        messageDiv.innerHTML = '<strong>Sigma AI:</strong> ' + processedMessage;
      }
      
      sigmaMessages.appendChild(messageDiv);
      sigmaMessages.scrollTop = sigmaMessages.scrollHeight;
    }

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
          throw new Error('Puter SDK no esta cargado');
        }
        
        const response = await puter.ai.chat(msg, { 
          model: "gpt-4o-mini",
          system_prompt: "Eres Sigma AI, un asistente inteligente especializado en Sigma Games. Ayuda a los usuarios con informacion sobre juegos, consejos de juego, y responde preguntas generales. Responde en español, usa emojis y se amigable."
        });
        
        sigmaMessages.removeChild(typingDiv);
        addSigmaMessage("", response);
        
      } catch (error) {
        console.error('Error en Sigma AI:', error);
        sigmaMessages.removeChild(typingDiv);
        addSigmaMessage("", "⚠️ Lo siento, no puedo conectarme en este momento. Intenta de nuevo mas tarde. 🤖");
      }
      
      sigmaLogo.classList.add("pulse");
      setTimeout(() => sigmaLogo.classList.remove("pulse"), 1000);
    }
    
    sigmaSend.addEventListener("click", sendSigmaMessage);
    sigmaInput.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendSigmaMessage();
      }
    });
    
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(() => {
        addSigmaMessage("", "¡Hola! 👋 Soy Sigma AI, tu asistente para Sigma Games. ¿Necesitas ayuda con este juego o tienes alguna pregunta? 💬🎮🕹️ ✨");
      }, 2000);
    });
  </script>
"@

# Librerias de Sigma AI
$sigmaLibraries = @"
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/emoji-toolkit@11.5.0/lib/js/joypixels.min.js"></script>
  <script src="https://js.puter.com/v2/"></script>
"@

foreach ($file in $htmlFiles) {
    $processedFiles++
    $fileName = $file.Name
    
    Write-Host "Procesando: $fileName" -ForegroundColor Yellow
    
    try {
        # Leer contenido
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        
        # 1. Agregar/actualizar favicon
        if ($content -notmatch 'rel="icon".*href="Fotos/Logo sigma company pequeñopeg\.jpeg"') {
            if ($content -match '<link rel="icon"[^>]*>') {
                $content = $content -replace '<link rel="icon"[^>]*>', $faviconHtml
            } else {
                $content = $content -replace "</head>", "$faviconHtml`n</head>"
            }
        }
        
        # 2. Agregar librerias si no existen
        if ($content -notmatch "marked\.min\.js") {
            $content = $content -replace "</head>", "$sigmaLibraries`n</head>"
        }
        
        # 3. LIMPIEZA COMPLETA de Sigma AI existente
        # Remover todos los elementos sigma existentes
        $content = $content -replace '<div id="sigma-[^"]*"[^>]*>.*?</div>', '', 'Singleline'
        $content = $content -replace '<script[^>]*>[\s\S]*?sigma[\s\S]*?</script>', '', 'IgnoreCase'
        
        # Limpiar lineas vacias multiples
        $content = $content -replace "`n`n`n+", "`n`n"
        
        # 4. Agregar Sigma AI funcional antes de </body>
        $content = $content -replace "</body>", "$sigmaAiComplete`n</body>"
        
        # Verificar cambios
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            $updatedFiles++
            Write-Host "  $fileName - ACTUALIZADO" -ForegroundColor Green
        } else {
            Write-Host "  $fileName - Sin cambios" -ForegroundColor Blue
        }
        
    } catch {
        Write-Host "  ERROR en $fileName`: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nPROCESO COMPLETADO" -ForegroundColor Magenta
Write-Host "Archivos procesados: $processedFiles" -ForegroundColor Cyan
Write-Host "Archivos actualizados: $updatedFiles" -ForegroundColor Green

# Verificacion rapida
Write-Host "`nVerificando algunos archivos..." -ForegroundColor Yellow

$sampleFiles = @("mario.64.html", "agar.io.html", "minecraft.html")
foreach ($sample in $sampleFiles) {
    if (Test-Path $sample) {
        $content = Get-Content -Path $sample -Raw -Encoding UTF8
        $hasFavicon = $content -match 'rel="icon".*href="Fotos/Logo sigma company pequeñopeg\.jpeg"'
        $hasSigmaAI = $content -match 'id="sigma-logo"' -and $content -match 'addSigmaMessage'
        
        $status = if ($hasFavicon -and $hasSigmaAI) { "OK" } else { "PROBLEMA" }
        $color = if ($status -eq "OK") { "Green" } else { "Red" }
        
        Write-Host "  $sample - $status" -ForegroundColor $color
    }
}

Write-Host "`nScript completado!" -ForegroundColor Green