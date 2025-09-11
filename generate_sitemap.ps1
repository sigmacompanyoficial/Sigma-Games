# Genera sitemap.xml con todas las páginas HTML del directorio raíz
$domain = "https://www.sigmagames.ct.ws"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$files = Get-ChildItem -Path $root -Filter *.html -File | Sort-Object Name

$urls = @()
$urls += "  <url>\n    <loc>$domain/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>"
foreach ($f in $files) {
  if ($f.Name -ieq "index.html") { continue }
  $urls += "  <url><loc>$domain/$($f.Name)</loc></url>"
}

$xml = @("<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
$urls -join "`n",
"</urlset>") -join "`n"

Set-Content -Path (Join-Path $root "sitemap.xml") -Value $xml -Encoding UTF8
Write-Host "sitemap.xml actualizado con $($files.Count) páginas."