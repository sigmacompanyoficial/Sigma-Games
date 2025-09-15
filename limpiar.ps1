# Expresión regular para eliminar el bloque
$regex = '<div class="game-frame-container">[\s\S]*?</div>'

# Recorre todos los archivos .html en la carpeta actual y subcarpetas
Get-ChildItem -Path . -Filter *.html -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Reemplaza el bloque por vacío
    $newContent = [regex]::Replace($content, $regex, '', 'Singleline')

    # Sobrescribe el archivo
    Set-Content -Path $_.FullName -Value $newContent -Encoding UTF8
    Write-Output "Limpieza realizada en: $($_.FullName)"
}
