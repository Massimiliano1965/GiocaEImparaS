#!/bin/sh
# Versione web: copia www in "site" e mette un numero di versione sui file, così il browser non usa la copia vecchia
set -e
rm -rf site
cp -r www site
V=$(git rev-parse --short HEAD 2>/dev/null || date +%s)
sed -i -E "s#(src|href)=\"((js|css)/[^\"?]+)\"#\1=\"\2?v=$V\"#g" site/index.html
grep -q "s_app.js?v=" site/index.html
