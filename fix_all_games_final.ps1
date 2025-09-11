Write-Host "SIGMA GAMES - ACTUALIZACION MASIVA INICIADA" -ForegroundColor Magenta

# Archivos HTML a procesar
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html"
$totalFiles = $htmlFiles.Count
$currentFile = 0

# Leer bloques externos
$analyticsCode = Get-Content ".\analytics.html" -Raw
$adBannerCode   = Get-Content ".\banner.html" -Raw
$adBlockModalCode = Get-Content ".\adblock.html" -Raw

# Títulos de juegos (ejemplo reducido, completa con todos los tuyos)
$gameTitles = @{
    "11.11.html"="11.11"
    "agar.io.html"="Agar.io"
    "amonug.us.html"="Among Us"
}

foreach ($file in $htmlFiles) {
    $currentFile++
    $fileName = $file.Name
    Write-Host "[$currentFile/$totalFiles] 🔧 Procesando: $fileName" -ForegroundColor Yellow
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $gameTitle = if ($gameTitles.ContainsKey($fileName)) { $gameTitles[$fileName] } else { ($fileName -replace '\.html$', '') -replace '\.', ' ' }

        # Corregir título
        if ($content -match '<title>([^<]*)</title>') {
            $oldTitle = $matches[1]
            if ($oldTitle -eq "Juego" -or $oldTitle -notmatch "SIGMA GAMES") {
                $newTitle = ("SIGMA GAMES | {0} - Juega Gratis" -f $gameTitle)
                $content = $content -replace '<title>[^<]*</title>', "<title>$newTitle</title>"
            }
        }

        # Google Analytics
        if ($content -notmatch "gtag" -and $content -notmatch "G-PZKNGQZL45") {
            $content = $content -replace '(<meta name="viewport"[^>]*>)', "`$1`n$analyticsCode"
        }

        # Corregir logo Σ y favicon
        $content = $content -replace "Î£", [char]0x03A3
        $content = $content -replace 'pequeÃ±opeg\.jpeg', 'pequeñopeg.jpeg'

        # Protección anti-inspección
        if ($content -notmatch "keyCode === 123" -and $content -match "</script>") {
            $protectionScript = @'
document.addEventListener("keydown", function(e){if(e.keyCode===123||(e.ctrlKey&&e.shiftKey&&(e.keyCode===73||e.keyCode===74))||(e.ctrlKey&&e.keyCode===85)){e.preventDefault();return false;}});
document.addEventListener("contextmenu", function(e){e.preventDefault();return false;});
'@
            $lastScriptIndex = $content.LastIndexOf("</script>")
            if ($lastScriptIndex -gt 0) { $content = $content.Insert($lastScriptIndex, $protectionScript) }
        }

        # Insertar banners y modal
        if ($content -match '</body>') {
            $injection = ''
            if ($content -notmatch 'id="adblock-modal"') { $injection += "$adBlockModalCode`n" }
            if ($content -notmatch 'ad-banner-container') { $injection += "$adBannerCode`n" }
            if ($injection -ne '') { $content = [regex]::Replace($content, '</body>', ($injection + '</body>'), 1) }
        }

        # Guardar archivo
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "    ✅ $fileName - COMPLETADO" -ForegroundColor Green
    } catch {
        Write-Host "    ❌ $fileName - Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nACTUALIZACION MASIVA COMPLETADA" -ForegroundColor Green
