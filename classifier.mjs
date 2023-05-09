export default {
    "Brak dzieci": [
        /(^|\n|\.).*bez [^.!?]*dzieci.*(\.|$|\n)/gmi,
        /(^|\n|\.).*brak [^.!?]*dzieci.*(\.|$|\n)/gmi,
        /(^|\n|\.)\s*nie [^.!?]*ze? (dzieckiem|dziećmi|dziecmi).*(\.|$|\n)/gmi,
        /(^|\n|\.).*(dzieckiem|dziecmi|dziećmi) [^.!?]*dzi(ę|e)kuj(ę|e)[\.|$|\n]/gmi
    ],
    "Brak zwierząt": [
        /(^|\n|\.).*bez [^.!?]*zwierz(ą|a|on)t.*\./gmi,
        /(^|\n|\.).*brak [^.!?]*zwierz(ą|a|on)t.*\./gmi,
        /(^|\n|\.)\s*[^a-zA-Z]nie [^.!?]*ze? zwierz(ę|e)tami.*(\.|$|\n)/gmi,
        /zakaz [^.!?]*zwierz(ą|a)t/gmi,
        /zwierz(ę|e)ta nie /gmi,
        /(^|\n|\.).*zwierz(ę|e)ta[mi]? [^.!?]*dzi(ę|e)kuj(ę|e)[\.|$|\n]/gmi
    ],
    "Najem okazjonalny": [/naj(mu|em)\s*okazjonaln(y|ego)/gmi],
    "Tylko Polacy": [
        /obywatelstw.*\s*polskim/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]nie.*obcokrajowc.*[\.|$|\n]/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]nie.*zagranicy.*[\.|$|\n]/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]brak\s+zgody.*zagranicy.*[\.|$|\n]/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]brak\s+mo(z|ż)liwo(ś|s)ci.*za\s?granicy.*[\.|$|\n]/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]tylko.*polac.*[\.|$|\n]/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]dla.*polak.*[\.|$|\n]/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]do.*polak.*[\.|$|\n]/gmi,
    ],
    "Nie studenci": [
        /(^|\n|\.)[^\.]*[^a-zA-Z]nie.*student.*[\.|$|\n]/gmi,
        /(^|\n|\.)[^\.]*[^a-zA-Z]nie.*studiuj(a|ą)c.*[\.|$|\n]/gmi,
        /(^|\n|\.).*studentom [^.!?]*dzi(ę|e)kuj(ę|e)[\.|$|\n]/gmi
    ],
    "Praca/zarobki": [
        /umowa\s+o\s+prac(e|ę)/gmi,
        /za(ś|s)wiadczenie\s+o\s+(prac(e|ę|y)|zarobkach)/gmi,
        /wyci(ą|a)g\s+z\s+(konta)/gmi,
        /rachunek\s+z\s+(konta)/gmi,
        /potwierdzenie\s+dochod(u|ów|ow)/gmi,
        /por(ę|e)czyciel/gmi
    ]
}