# Script final para actualizar TODOS los archivos de Sigma Games
Write-Host "SIGMA GAMES - ACTUALIZACION MASIVA INICIADA" -ForegroundColor Magenta

$files = Get-ChildItem -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }
$count = 0
$updated = 0

foreach ($file in $files) {
    $count++
    Write-Host "[$count] Procesando: $($file.Name)" -ForegroundColor Yellow
    
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $modified = $false
        
        # 1. Corregir títulos que solo dicen "Juego"
        if ($content -match '<title>Juego</title>') {
            $gameName = ($file.BaseName -replace '\.', ' ')
            $newTitle = "SIGMA GAMES | $gameName - Juega Gratis Online"
            $content = $content -replace '<title>Juego</title>', "<title>$newTitle</title>"
            $modified = $true
            Write-Host "  Titulo corregido: $newTitle" -ForegroundColor Green
        }
        
        # 2. Corregir logo Sigma corrupto
        if ($content -contains 'Î£') {
            $content = $content -replace 'Î£', 'Σ'
            $modified = $true
            Write-Host "  Logo Sigma corregido" -ForegroundColor Green
        }
        
        # 3. Agregar Google Analytics si no existe
        if ($content -notmatch 'gtag' -and $content -match '<head>') {
            $analyticsCode = @"

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZKNGQZL45"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PZKNGQZL45');
  </script>
"@
            $content = $content -replace '<head>', "<head>$analyticsCode"
            $modified = $true
            Write-Host "  Google Analytics agregado" -ForegroundColor Green
        }
        
        # 4. Corregir path del favicon
        if ($content -match 'pequeÃ±opeg') {
            $content = $content -replace 'pequeÃ±opeg', 'pequeñopeg'
            $modified = $true
            Write-Host "  Favicon path corregido" -ForegroundColor Green
        }
        
        # Guardar archivo si hubo cambios
        if ($modified) {
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            $updated++
            Write-Host "  ARCHIVO ACTUALIZADO" -ForegroundColor Green
        } else {
            Write-Host "  Sin cambios necesarios" -ForegroundColor Gray
        }
        
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "" -ForegroundColor White
Write-Host "PROCESO COMPLETADO!" -ForegroundColor Green
Write-Host "Archivos procesados: $count" -ForegroundColor Cyan
Write-Host "Archivos actualizados: $updated" -ForegroundColor Cyan
Write-Host "SIGMA GAMES LISTO PARA PUBLICAR!" -ForegroundColor Magenta