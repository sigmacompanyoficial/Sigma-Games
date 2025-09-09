# Crea 15 plantillas nuevas basadas en game-template-complete.html
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$template = Get-Content (Join-Path $root 'game-template-complete.html') -Raw

# Nombres de ejemplo (puedes cambiar luego)
$games = @(
  'city.racing','sky.rivals','pixel.shooter','island.survival','block.puzzle',
  'ninja.adventure','galaxy.defender','farm.tycoon','soccer.stars','street.basket',
  'wizard.duel','tower.defense','sand.rally','space.trader','parkour.runner'
)

$i = 1
foreach ($g in $games) {
  $nameParts = $g -split '\.'
  $pretty = ($nameParts -join ' ') -replace '(?<=^|\s)([a-z])', { $_.Groups[1].Value.ToUpper() }
  $file = "$g.html"
  $img = 'juegos001.jpg'
  $content = $template
  $content = $content -replace '\[GAME_NAME\]', [Regex]::Escape($pretty)
  $content = $content -replace '\[GAME_FILE\]', [Regex]::Escape($file)
  $content = $content -replace '\[GAME_IMAGE\]', [Regex]::Escape($img)
  $content = $content -replace '\[GAME_URL\]', [Regex]::Escape($g)

  Set-Content -Path (Join-Path $root $file) -Value $content -Encoding UTF8
  Write-Host "Creado $file"
}

Write-Host 'Plantillas creadas. Ejecuta generate_sitemap.ps1 para actualizar el sitemap.'