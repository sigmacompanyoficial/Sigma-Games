# Script para agregar favicons a todos los archivos HTML

$gameFiles = Get-ChildItem "c:\Users\AYOUB LOUAH\Desktop\sigma games\*.html" | Where-Object { $_.Name -ne "index.html" }

Write-Host "Agregando favicons a archivos HTML..." -ForegroundColor Green

foreach ($file in $gameFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if ($content -notmatch 'rel="icon"') {
        Write-Host "Agregando favicon a: $($file.Name)" -ForegroundColor Yellow
        
        $content = $content -replace '(<title>.*?</title>)', '$1' + "`n  <link rel=`"icon`" type=`"image/png`" href=`"Fotos/Logo sigma company pequeñopeg.jpeg`" />"
        
        Set-Content $file.FullName $content -Encoding UTF8
        Write-Host "Favicon agregado a: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "Favicon ya existe en: $($file.Name)" -ForegroundColor Cyan
    }
}

Write-Host "`nFavicons agregados completamente!" -ForegroundColor Green