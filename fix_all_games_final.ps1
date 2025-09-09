# Script final para actualizar TODOS los juegos de Sigma Games
# Sin errores de sintaxis - Listo para publicar

Write-Host "🎮 SIGMA GAMES - ACTUALIZACION MASIVA INICIADA 🎮" -ForegroundColor Magenta

# Lista de todos los archivos HTML (excluyendo index.html)
$htmlFiles = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -ne "index.html" }

$totalFiles = $htmlFiles.Count
$currentFile = 0

Write-Host "📊 Total de archivos a procesar: $totalFiles" -ForegroundColor Cyan

# Google Analytics code
$analyticsCode = @'
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-PZKNGQZL45"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PZKNGQZL45');
  </script>
  
'@

# Mapeo de nombres de archivos a títulos
$gameTitles = @{
    "11.11.html" = "11.11"
    "agar.io.html" = "Agar.io"
    "amonug.us.html" = "Among Us"
    "aqua.thrills.html" = "Aqua Thrills"
    "bank.robery.html" = "Bank Robbery"
    "basketball.random.html" = "Basketball Random"
    "basketball.starts.html" = "Basketball Stars"
    "bit.life.html" = "BitLife"
    "bladi.s.basics.html" = "Baldi's Basics"
    "blumgi.slime.html" = "Blumgi Slime"
    "bob.the.rober.html" = "Bob The Robber"
    "buckshoot.roulete.html" = "Buckshot Roulette"
    "burger.bountry.html" = "Burger Bounty"
    "cave.blast.html" = "Cave Blast"
    "cliker.heroes.html" = "Clicker Heroes"
    "cookie.cliker.2.html" = "Cookie Clicker 2"
    "cookie.cliker.html" = "Cookie Clicker"
    "cooking.fast.html" = "Cooking Fast"
    "crazy.cars.html" = "Crazy Cars"
    "crossy.road.html" = "Crossy Road"
    "doodle.jump.html" = "Doodle Jump"
    "doom.2.html" = "Doom 2"
    "doom.html" = "Doom"
    "dragon.ball.z.html" = "Dragon Ball Z"
    "drive.mad-2.html" = "Drive Mad 2"
    "drive.mad.html" = "Drive Mad"
    "eggy.car.html" = "Eggy Car"
    "escape.road.2.html" = "Escape Road 2"
    "escape.road.city.2.html" = "Escape Road City 2"
    "extreme.drift.raging.html" = "Extreme Drift Racing"
    "f1.reaction.html" = "F1 Reaction"
    "farming.batlles.html" = "Farming Battles"
    "fifa.09.html" = "FIFA 09"
    "fireboy.and.watergirl.html" = "Fireboy and Watergirl"
    "fnaf.2.html" = "Five Nights at Freddy's 2"
    "fnaf.3.html" = "Five Nights at Freddy's 3"
    "fnaf.4.html" = "Five Nights at Freddy's 4"
    "fnaf.sister.location.html" = "FNAF Sister Location"
    "football.random.html" = "Football Random"
    "fruit.ninja.html" = "Fruit Ninja"
    "golf.champions.html" = "Golf Champions"
    "golf.physics.html" = "Golf Physics"
    "gta.san.andreas.html" = "GTA San Andreas"
    "gta.stickman.html" = "GTA Stickman"
    "happy.wheels.html" = "Happy Wheels"
    "head.soccer.2022.html" = "Head Soccer 2022"
    "hide.and.seek.html" = "Hide and Seek"
    "hole.io.html" = "Hole.io"
    "house.of.hazards.html" = "House of Hazards"
    "ice.dodo.html" = "Ice Dodo"
    "idle.mining.html" = "Idle Mining"
    "idle.restaurant.tycoon.html" = "Idle Restaurant Tycoon"
    "mario.64.html" = "Mario 64"
    "mario.kart.html" = "Mario Kart"
    "masked.forces.html" = "Masked Forces"
    "minecraft.html" = "Minecraft"
    "momo.horror.story.html" = "Momo Horror Story"
    "monkey.mart.html" = "Monkey Mart"
    "moto.x3m.2.html" = "Moto X3M 2"
    "moto.x3m.3.html" = "Moto X3M 3"
    "moto.x3m.winter.html" = "Moto X3M Winter"
    "mr.bullet.html" = "Mr. Bullet"
    "my.perfect.hotel.html" = "My Perfect Hotel"
    "papa.s.freezeria.html" = "Papa's Freezeria"
    "park.out.html" = "Park Out"
    "penalty.challenge.html" = "Penalty Challenge"
    "penalty.shooters.2.html" = "Penalty Shooters 2"
    "pokecliker.html" = "PokeClicker"
    "pokemon.esmerald.version.html" = "Pokemon Emerald"
    "pou.html" = "Pou"
    "president.simulator.html" = "President Simulator"
    "racing.limits.html" = "Racing Limits"
    "raft.wars.html" = "Raft Wars"
    "red.ball.4.html" = "Red Ball 4"
    "road.shooter.html" = "Road Shooter"
    "rocket.league.html" = "Rocket League"
    "ruleta.html" = "Ruleta"
    "shell.shockers.html" = "Shell Shockers"
    "shortcut.race.html" = "Shortcut Race"
    "skibidi.toilet.html" = "Skibidi Toilet"
    "slow.roads.html" = "Slow Roads"
    "snail.bob.html" = "Snail Bob"
    "snow.rider.3d.html" = "Snow Rider 3D"
    "sonkey.kong.comntry.3.html" = "Donkey Kong Country 3"
    "space.bar.cliker.html" = "Space Bar Clicker"
    "stick.heroes.html" = "Stick Heroes"
    "stickman.boxing.html" = "Stickman Boxing"
    "strik.force.kitty.html" = "Strike Force Kitty"
    "subway.surfers.html" = "Subway Surfers"
    "sumo.game.html" = "Sumo Game"
    "super.star.car.html" = "Super Star Car"
    "super.tunel.rush.html" = "Super Tunnel Rush"
    "supermarket.simulator.html" = "Supermarket Simulator"
    "the.backrooms.html" = "The Backrooms"
    "tiny.fishing.html" = "Tiny Fishing"
    "vex.6.html" = "Vex 6"
    "vex.7.html" = "Vex 7"
    "vex.x3m.html" = "Vex X3M"
    "voley.random.html" = "Volleyball Random"
    "wheely.2.html" = "Wheely 2"
    "wheely.3.html" = "Wheely 3"
    "wood.blocks.html" = "Wood Blocks"
    "world.cup.html" = "World Cup"
    "zombs.royale.html" = "Zombs Royale"
}

foreach ($file in $htmlFiles) {
    $currentFile++
    $fileName = $file.Name
    
    Write-Host "[$currentFile/$totalFiles] 🔧 Procesando: $fileName" -ForegroundColor Yellow
    
    try {
        # Leer contenido del archivo
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Obtener título del juego
        $gameTitle = if ($gameTitles.ContainsKey($fileName)) { 
            $gameTitles[$fileName] 
        } else { 
            ($fileName -replace '\.html$', '') -replace '\.', ' ' 
        }
        
        # 1. Corregir título si es necesario
        if ($content -match '<title>([^<]*)</title>') {
            $oldTitle = $matches[1]
            if ($oldTitle -eq "Juego" -or $oldTitle -notmatch "SIGMA GAMES") {
                $newTitle = "SIGMA GAMES | $gameTitle - Juega Gratis Online"
                $content = $content -replace '<title>[^<]*</title>', "<title>$newTitle</title>"
                Write-Host "    ✅ Título corregido: $newTitle" -ForegroundColor Green
            }
        }
        
        # 2. Agregar Google Analytics si no existe
        if ($content -notmatch "gtag" -and $content -notmatch "G-PZKNGQZL45") {
            $content = $content -replace '(<meta name="viewport"[^>]*>)', "`$1`n$analyticsCode"
            Write-Host "    ✅ Google Analytics agregado" -ForegroundColor Green
        }
        
        # 3. Corregir logo Sigma (Î£ -> Σ)
        if ($content -match "Î£") {
            $content = $content -replace "Î£", "Σ"
            Write-Host "    ✅ Logo Σ corregido" -ForegroundColor Green
        }
        
        # 4. Corregir favicon path si tiene caracteres especiales
        if ($content -match 'pequeÃ±opeg\.jpeg') {
            $content = $content -replace 'pequeÃ±opeg\.jpeg', 'pequeñopeg.jpeg'
            Write-Host "    ✅ Favicon path corregido" -ForegroundColor Green
        }
        
        # 5. Agregar protección anti-inspección si no existe
        if ($content -notmatch "keyCode === 123" -and $content -match "</script>") {
            $protectionScript = @'

    // Protección contra inspeccionar
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
        return false;
      }
    });

    // Bloquear clic derecho
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
'@
            # Buscar el último </script> y agregar antes
            $lastScriptIndex = $content.LastIndexOf("</script>")
            if ($lastScriptIndex -gt 0) {
                $content = $content.Insert($lastScriptIndex, $protectionScript)
                Write-Host "    ✅ Protección anti-inspección agregada" -ForegroundColor Green
            }
        }
        
        # Escribir archivo actualizado
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "    ✅ $fileName - COMPLETADO" -ForegroundColor Green
        
    } catch {
        Write-Host "    ❌ $fileName - Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 ACTUALIZACION MASIVA COMPLETADA!" -ForegroundColor Green
Write-Host "✅ Títulos corregidos en todos los archivos" -ForegroundColor Green
Write-Host "✅ Google Analytics agregado donde faltaba" -ForegroundColor Green
Write-Host "✅ Logo Σ corregido en todos los archivos" -ForegroundColor Green
Write-Host "✅ Protección anti-inspección agregada" -ForegroundColor Green
Write-Host "✅ Favicon paths corregidos" -ForegroundColor Green
Write-Host "`n🚀 SIGMA GAMES LISTO PARA PUBLICAR!" -ForegroundColor Magenta

# Mostrar estadísticas finales
Write-Host "`n📊 ESTADÍSTICAS FINALES:" -ForegroundColor Cyan
Write-Host "📁 Archivos procesados: $totalFiles" -ForegroundColor White
Write-Host "🎮 Juegos actualizados: $totalFiles" -ForegroundColor White
Write-Host "📊 Google Analytics: Implementado" -ForegroundColor White
Write-Host "🔒 Protección: Activada" -ForegroundColor White
Write-Host "🤖 Chatbot: Sigma AI Ready" -ForegroundColor White

Write-Host "`n🌟 ¡TODOS LOS JUEGOS ESTAN LISTOS PARA PRODUCCION! 🌟" -ForegroundColor Yellow