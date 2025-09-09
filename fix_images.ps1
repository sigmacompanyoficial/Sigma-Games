$ErrorActionPreference = 'Stop'
$base = 'c:\Users\AYOUB LOUAH\Desktop\sigma games'
$index = Join-Path $base 'index.html'

[string]$html = Get-Content -Raw -Path $index -Encoding UTF8

# 1) Normaliza Fotos/fotos a 'Fotos/'
$html = $html -replace 'src="fotos/','src="Fotos/'

# 2) Rellena src vacíos si existe un archivo que coincide por número de juego
$missing = @{}
$missing['22'] = 'Fotos/juegos022.jpg'
$missing['24'] = 'Fotos/juegos024.jpg'
$missing['28'] = 'Fotos/juegos028.jpg'
$missing['31'] = 'Fotos/juegos031.jpg'
$missing['32'] = 'Fotos/juegos032.jpg'
$missing['35'] = 'Fotos/juegos035.jpg'
$missing['39'] = 'Fotos/juegos039.png'
$missing['43'] = 'Fotos/juegos043.jpg'
$missing['44'] = 'Fotos/juegos044.jpg'

$html = [System.Text.RegularExpressions.Regex]::Replace($html, '<a class="card" href="([^"]+)" aria-label="Juego (\d+)">\s*<img src=""', {
  param($m)
  $n = $m.Groups[2].Value
  if ($missing.ContainsKey($n)) {
    $src = $missing[$n]
    return $m.Value.Replace('src=""', 'src="' + $src + '"')
  }
  return $m.Value
})

Set-Content -Path $index -Value $html -Encoding UTF8
Write-Host 'Imágenes normalizadas y placeholders aplicados (si había)'