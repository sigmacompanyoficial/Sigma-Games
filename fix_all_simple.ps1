# Script simple para agregar Google Analytics y corregir títulos

$files = @(
    "agar.io.html",
    "subway.surfers.html", 
    "happy.wheels.html",
    "shell.shockers.html",
    "zombs.royale.html",
    "doom.html",
    "fnaf.2.html",
    "gta.san.andreas.html",
    "pokemon.esmerald.version.html"
)

$googleAnalytics = @'
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZKNGQZL45"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PZKNGQZL45');
  </script>
  
'@

Write-Host "🔧 Agregando Google Analytics a archivos principales..." -ForegroundColor Yellow

foreach ($file in $files) {
    $filePath = "c:\Users\AYOUB LOUAH\Desktop\sigma games\$file"
    
    if (Test-Path $filePath) {
        Write-Host "📝 Procesando: $file" -ForegroundColor Cyan
        
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Agregar Google Analytics si no existe
        if ($content -notmatch "gtag") {
            $content = $content -replace '(<meta name="viewport"[^>]*>)', "`$1`n$googleAnalytics"
            [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
            Write-Host "  ✅ Google Analytics agregado" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️ Google Analytics ya existe" -ForegroundColor Yellow
        }
    }
}

Write-Host "`n🎉 Proceso completado!" -ForegroundColor Green