# Inserta/actualiza anuncios en TOP, MIDDLE (antes del primer <iframe>) y BOTTOM en todas las páginas .html, evitando duplicados y sin romper scripts

Write-Host "Actualizando anuncios en todas las páginas (top, middle-before-iframe, bottom)..." -ForegroundColor Cyan

# Snippets
$bottomPath = Join-Path (Get-Location) "banner.html"  # contiene bloque BOTTOM (728x90 + social)
if (-not (Test-Path $bottomPath)) { Write-Error "No se encontró banner.html"; exit 1 }
$bottom = Get-Content $bottomPath -Raw -Encoding UTF8

# TOP: 320x50 (mobile) - colocado justo después de <body>
$top = @'
<!-- SIGMA-ADS-TOP START -->
<div id="ad-banner-top-320x50" style="display:flex;justify-content:center;align-items:center;margin:8px 0;">
<script type="text/javascript">
  atOptions = { 'key' : 'dfa22a3670cf79cd19f56b9d24e1a799', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };
</script>
<script type="text/javascript" src="//holidaysverbcloseness.com/dfa22a3670cf79cd19f56b9d24e1a799/invoke.js"></script>
</div>
<!-- SIGMA-ADS-TOP END -->
'@

# MIDDLE: invoke container - insertado justo antes del primer <iframe>
$middle = @'
<!-- SIGMA-ADS-MIDDLE START -->
<script async="async" data-cfasync="false" src="//holidaysverbcloseness.com/12e0dad285155c4bcc223a2d2476327c/invoke.js"></script>
<div id="container-12e0dad285155c4bcc223a2d2476327c" style="display:flex;justify-content:center;margin:12px 0;"></div>
<!-- SIGMA-ADS-MIDDLE END -->
'@

# Opciones de Regex
$RegexOptions = [System.Text.RegularExpressions.RegexOptions]::Singleline -bor [System.Text.RegularExpressions.RegexOptions]::IgnoreCase

# Regex precompilados
$rxTopBlock = [regex]::new('<!--\s*SIGMA-ADS-TOP START\s*-->[\s\S]*?<!--\s*SIGMA-ADS-TOP END\s*-->', $RegexOptions)
$rxMidBlock = [regex]::new('<!--\s*SIGMA-ADS-MIDDLE START\s*-->[\s\S]*?<!--\s*SIGMA-ADS-MIDDLE END\s*-->', $RegexOptions)
$rxBottomBlock = [regex]::new('<!--\s*SIGMA-ADS START\s*-->[\s\S]*?<!--\s*SIGMA-ADS END\s*-->', $RegexOptions)
$rxBodyOpen = [regex]::new('(<body[^>]*>)', $RegexOptions)
$rxBodyClose = [regex]::new('</body>', $RegexOptions)
$rxFirstIframe = [regex]::new('(<iframe\b[^>]*>)', $RegexOptions)
$rxStraySocialBanner = [regex]::new('<!--\s*Social follow\s*&\s*Ad Banner\s*-->[\s\S]*?</div>\s*', $RegexOptions)

$files = Get-ChildItem -Path . -Filter *.html -File
$total = $files.Count
$updated = 0
$skipped = 0

foreach ($f in $files) {
  try {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    $original = $content

    # Limpieza: eliminar banners antiguos "Social follow & Ad Banner" sueltos
    $content = $rxStraySocialBanner.Replace($content, '')

    # 1) TOP: si no existe, insertar tras <body>
    if (-not $rxTopBlock.IsMatch($content)) {
      if ($rxBodyOpen.IsMatch($content)) {
        $content = $rxBodyOpen.Replace($content, "`$1`n$top", 1)
      }
    }

    # 2) MIDDLE: eliminar cualquier bloque anterior donde esté (aunque sea dentro de <script>) y volver a colocar antes del primer <iframe>
    $content = $rxMidBlock.Replace($content, '')
    if ($rxFirstIframe.IsMatch($content)) {
      # Insertar antes del primer <iframe>
      $content = $rxFirstIframe.Replace($content, ("$middle`n" + '`$1'), 1)
    }

    # 3) BOTTOM: insertar/actualizar entre marcadores SIGMA-ADS START/END, o añadir antes de </body>
    if ($rxBottomBlock.IsMatch($content)) {
      $content = $rxBottomBlock.Replace($content, $bottom, 1)
    } else {
      if ($rxBodyClose.IsMatch($content)) {
        $content = $rxBodyClose.Replace($content, ($bottom + "`n</body>"), 1)
      }
    }

    if ($content -ne $original) {
      [System.IO.File]::WriteAllText($f.FullName, $content, [System.Text.Encoding]::UTF8)
      Write-Host "+ Actualizado: $($f.Name)" -ForegroundColor Green
      $updated++
    } else {
      Write-Host "- Sin cambios: $($f.Name)" -ForegroundColor DarkGray
      $skipped++
    }
  } catch {
    Write-Host ("x Error en {0}: {1}" -f $f.Name, $_.Exception.Message) -ForegroundColor Red
  }
}

Write-Host ("Completado. {0} actualizados, {1} sin cambios, {2} total." -f $updated, $skipped, $total) -ForegroundColor Magenta