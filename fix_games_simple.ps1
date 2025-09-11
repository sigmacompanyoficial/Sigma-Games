# Script simple para arreglar juegos uno por uno

$gameFiles = @(
    "mario.64.html", "agar.io.html", "minecraft.html", "subway.surfers.html", 
    "happy.wheels.html", "shell.shockers.html", "zombs.royale.html"
)

Write-Host "Arreglando juegos principales..." -ForegroundColor Green

foreach ($file in $gameFiles) {
    $filePath = "c:\Users\AYOUB LOUAH\Desktop\sigma games\$file"
    
    if (Test-Path $filePath) {
        Write-Host "Procesando: $file" -ForegroundColor Yellow
        
        # Leer contenido original para extraer URL del iframe
        $originalContent = Get-Content $filePath -Raw -Encoding UTF8
        $iframeUrl = "about:blank"
        
        if ($originalContent -match 'src="([^"]+)"') {
            $iframeUrl = $matches[1]
        }
        
        # Determinar nombre del juego
        $gameName = switch ($file) {
            "mario.64.html" { "Mario 64" }
            "agar.io.html" { "Agar.io" }
            "minecraft.html" { "Minecraft" }
            "subway.surfers.html" { "Subway Surfers" }
            "happy.wheels.html" { "Happy Wheels" }
            "shell.shockers.html" { "Shell Shockers" }
            "zombs.royale.html" { "Zombs Royale" }
            default { "Juego" }
        }
        
        Write-Host "URL encontrada: $iframeUrl" -ForegroundColor Cyan
        Write-Host "Nombre del juego: $gameName" -ForegroundColor Cyan
        
        # Crear contenido base
        $htmlContent = @"
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <title>SIGMA GAMES | $gameName - Juega Gratis Online</title>
  <meta name="description" content="Juega $gameName gratis en Sigma Games. La mejor coleccion de juegos online sin descargas." />
  <link rel="icon" type="image/png" href="Fotos/Logo sigma company pequeñopeg.jpeg" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="styles.css" />
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #0f0f12 0%, #1a1a2e 50%, #16213e 100%);
      color: #e9e9e9; 
      min-height: 100vh;
    }
    
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
    }
    
    .frame-wrap { 
      height: calc(100vh - 80px);
      position: relative;
    }
    
    .frame-wrap iframe { 
      width: 100%; 
      height: 100%; 
      display: block; 
      border: 0;
      background: #0b0d11;
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
    <button id="btn-fullscreen" class="btn" type="button">Pantalla Completa</button>
  </header>

  <main class="frame-wrap">
    <iframe id="game-frame" src="$iframeUrl" allowfullscreen></iframe>
  </main>

  <script>
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
  </script>
</body>
</html>
"@

        # Guardar archivo
        Set-Content $filePath $htmlContent -Encoding UTF8
        Write-Host "Completado: $file" -ForegroundColor Green
    } else {
        Write-Host "No encontrado: $file" -ForegroundColor Red
    }
}

Write-Host "`nJuegos principales arreglados!" -ForegroundColor Green