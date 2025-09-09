# Script para arreglar Sigma AI y agregar favicon a todos los archivos HTML
# Usa la plantilla funcional de index.html
# Autor: Sigma Games

Write-Host "Iniciando reparacion de Sigma AI y agregando favicon..." -ForegroundColor Green
Write-Host "Directorio de trabajo: $(Get-Location)" -ForegroundColor Yellow

# Obtener todos los archivos HTML excepto index.html
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

Write-Host "Encontrados $($htmlFiles.Count) archivos HTML para procesar" -ForegroundColor Cyan

# Contadores para el reporte
$processedFiles = 0
$updatedFiles = 0
$errorFiles = 0
$report = @()

# Favicon HTML
$faviconHtml = '  <link rel="icon" type="image/png" href="Fotos/Logo sigma company pequeñopeg.jpeg" />'

# Sigma AI HTML elements (plantilla funcional del index.html)
$sigmaAiHtml = @"
  <div id="sigma-logo">Σ</div>
  <div id="sigma-chatbox">
    <div id="sigma-header">Σ Sigma AI Beta</div>
    <div id="sigma-messages"></div>
    <div id="sigma-input-box">
      <input type="text" id="sigma-input" placeholder="Escribe un mensaje...">
      <button id="sigma-send">Enviar</button>
    </div>
  </div>
"@

# Sigma AI JavaScript (plantilla funcional del index.html)
$sigmaAiJs = @"
  <script>
    // Chatbot mejorado - Plantilla funcional de index.html
    const sigmaLogo = document.getElementById('sigma-logo');
    const sigmaChatbox = document.getElementById('sigma-chatbox');
    const sigmaMessages = document.getElementById('sigma-messages');
    const sigmaInput = document.getElementById('sigma-input');
    const sigmaSend = document.getElementById('sigma-send');

    // Toggle chatbox
    sigmaLogo.addEventListener('click', () => {
      sigmaChatbox.classList.toggle('open');
    });

    // Funcion para agregar mensajes
    function addSigmaMessage(sender, message, isUser = false) {
      const messageDiv = document.createElement('div');
      messageDiv.className = 'sigma-message ' + (isUser ? 'sigma-user-message' : 'sigma-ai-message');
      
      if (isUser) {
        messageDiv.innerHTML = '<strong>Tu:</strong> ' + message;
      } else {
        // Procesar emojis con JoyPixels si esta disponible
        let processedMessage = message;
        if (typeof joypixels !== 'undefined') {
          processedMessage = joypixels.toImage(message);
        }
        messageDiv.innerHTML = '<strong>Sigma AI:</strong> ' + processedMessage;
      }
      
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
        addSigmaMessage("", "¡Hola! 👋 Soy Sigma AI, tu asistente para Sigma Games. ¿Necesitas ayuda con este juego o tienes alguna pregunta? 💬🎮🕹️ ✨");
      }, 2000);
    });
  </script>
"@

# Sigma AI JavaScript libraries
$sigmaAiLibraries = @"
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/emoji-toolkit@11.5.0/lib/js/joypixels.min.js"></script>
  <script src="https://js.puter.com/v2/"></script>
"@

# Funcion para extraer el nombre del juego del archivo
function Get-GameName {
    param([string]$fileName)
    
    $gameName = $fileName -replace '\.html$', ''
    $gameName = $gameName -replace '\.', ' '
    
    # Capitalizar cada palabra
    $words = $gameName.Split(' ')
    $capitalizedWords = @()
    
    foreach ($word in $words) {
        if ($word.Length -gt 0) {
            $capitalizedWords += $word.Substring(0,1).ToUpper() + $word.Substring(1).ToLower()
        }
    }
    
    return $capitalizedWords -join ' '
}

# Procesar cada archivo HTML
foreach ($file in $htmlFiles) {
    $processedFiles++
    $fileName = $file.Name
    $gameName = Get-GameName $fileName
    
    Write-Host "Procesando: $fileName -> $gameName" -ForegroundColor Yellow
    
    try {
        # Leer el contenido del archivo
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        $changes = @()
        
        # 1. Verificar y agregar favicon
        if ($content -notmatch 'rel="icon".*href="Fotos/Logo sigma company pequeñopeg\.jpeg"') {
            # Buscar si ya existe un favicon y reemplazarlo, o agregarlo antes de </head>
            if ($content -match '<link rel="icon"[^>]*>') {
                $content = $content -replace '<link rel="icon"[^>]*>', $faviconHtml
                $changes += "Favicon actualizado"
            } else {
                $content = $content -replace "</head>", "$faviconHtml`n</head>"
                $changes += "Favicon agregado"
            }
        }
        
        # 2. Verificar y agregar librerias de Sigma AI si no existen
        if ($content -notmatch "marked\.min\.js|emoji-toolkit|js\.puter\.com") {
            # Agregar las librerias antes del cierre de </head>
            $content = $content -replace "</head>", "$sigmaAiLibraries`n</head>"
            $changes += "Librerias de Sigma AI agregadas"
        }
        
        # 3. Limpiar Sigma AI existente (HTML y JavaScript) para reemplazarlo con la version funcional
        # Remover elementos HTML existentes de Sigma AI
        $content = $content -replace '<div id="sigma-logo"[^>]*>.*?</div>', '', 'Singleline'
        $content = $content -replace '<div id="sigma-chatbox"[^>]*>.*?</div>', '', 'Singleline'
        
        # Remover JavaScript existente de Sigma AI (buscar bloques que contengan sigma)
        $content = $content -replace '<script[^>]*>[\s\S]*?sigma[\s\S]*?</script>', '', 'IgnoreCase'
        
        # 4. Agregar la version funcional de Sigma AI antes del cierre de </body>
        $content = $content -replace "</body>", "$sigmaAiHtml`n$sigmaAiJs`n</body>"
        $changes += "Sigma AI funcional agregado"
        
        # Verificar si hubo cambios
        if ($content -ne $originalContent) {
            # Guardar el archivo actualizado
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            $updatedFiles++
            
            $report += [PSCustomObject]@{
                Archivo = $fileName
                Juego = $gameName
                Cambios = $changes -join ", "
                Estado = "Actualizado"
            }
            
            Write-Host "  $fileName actualizado correctamente" -ForegroundColor Green
        } else {
            $report += [PSCustomObject]@{
                Archivo = $fileName
                Juego = $gameName
                Cambios = "Sin cambios necesarios"
                Estado = "Ya actualizado"
            }
            
            Write-Host "  $fileName ya estaba actualizado" -ForegroundColor Blue
        }
        
    } catch {
        $errorFiles++
        $report += [PSCustomObject]@{
            Archivo = $fileName
            Juego = $gameName
            Cambios = "Error: $($_.Exception.Message)"
            Estado = "Error"
        }
        
        Write-Host "  Error procesando $fileName`: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Mostrar reporte final
Write-Host "`nREPORTE FINAL" -ForegroundColor Magenta
Write-Host "=============" -ForegroundColor Magenta
Write-Host "Archivos procesados: $processedFiles" -ForegroundColor Cyan
Write-Host "Archivos actualizados: $updatedFiles" -ForegroundColor Green
Write-Host "Archivos sin cambios: $($processedFiles - $updatedFiles - $errorFiles)" -ForegroundColor Blue
Write-Host "Archivos con errores: $errorFiles" -ForegroundColor Red

# Mostrar tabla detallada
Write-Host "`nDETALLE POR ARCHIVO:" -ForegroundColor Yellow
$report | Format-Table -AutoSize

# Verificacion final
Write-Host "`nVERIFICACION FINAL:" -ForegroundColor Magenta
Write-Host "Verificando que todos los archivos tengan favicon y Sigma AI funcional..." -ForegroundColor Yellow

$verificationResults = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $gameName = Get-GameName $file.Name
    
    $hasFavicon = $content -match 'rel="icon".*href="Fotos/Logo sigma company pequeñopeg\.jpeg"'
    $hasSigmaAI = $content -match 'id="sigma-logo"' -and $content -match 'id="sigma-chatbox"'
    $hasSigmaLibraries = $content -match "marked\.min\.js" -and $content -match "emoji-toolkit" -and $content -match "js\.puter\.com"
    $hasSigmaJs = $content -match "addSigmaMessage" -and $content -match "sendSigmaMessage"
    
    $allGood = $hasFavicon -and $hasSigmaAI -and $hasSigmaLibraries -and $hasSigmaJs
    
    $verificationResults += [PSCustomObject]@{
        Archivo = $file.Name
        "Favicon" = if ($hasFavicon) { "SI" } else { "NO" }
        "Sigma AI HTML" = if ($hasSigmaAI) { "SI" } else { "NO" }
        "Sigma AI JS" = if ($hasSigmaJs) { "SI" } else { "NO" }
        "Librerias" = if ($hasSigmaLibraries) { "SI" } else { "NO" }
        "Estado Final" = if ($allGood) { "Completo" } else { "Incompleto" }
    }
}

$verificationResults | Format-Table -AutoSize

$completeFiles = ($verificationResults | Where-Object { $_."Estado Final" -eq "Completo" }).Count
$incompleteFiles = $verificationResults.Count - $completeFiles

Write-Host "`nRESUMEN DE VERIFICACION:" -ForegroundColor Magenta
Write-Host "Archivos completamente actualizados: $completeFiles" -ForegroundColor Green
Write-Host "Archivos con problemas: $incompleteFiles" -ForegroundColor Yellow

if ($incompleteFiles -eq 0) {
    Write-Host "`nEXITO TOTAL! Todos los archivos HTML han sido reparados correctamente." -ForegroundColor Green
    Write-Host "Caracteristicas implementadas en todos los archivos:" -ForegroundColor Green
    Write-Host "   • Favicon correcto (Logo sigma company pequeñopeg.jpeg)" -ForegroundColor White
    Write-Host "   • Sigma AI funcional (plantilla de index.html)" -ForegroundColor White
    Write-Host "   • Librerias necesarias (Marked, JoyPixels, Puter)" -ForegroundColor White
    Write-Host "   • CSS de Sigma AI (ya presente en styles.css)" -ForegroundColor White
} else {
    Write-Host "`nAlgunos archivos necesitan revision manual." -ForegroundColor Yellow
}

Write-Host "`nScript completado. Sigma AI reparado y favicon agregado!" -ForegroundColor Green