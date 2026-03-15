# PROJEKT: AEROSALES - Landing Page z Okazjami Lotniczymi
# CEL: Stworzenie strony agregującej okazje lotnicze zgodnie z designem ze screena.

# STACK TECHNICZNY:
- React (Vite)
- Tailwind CSS v4
- Lucide React (Ikony)

# INSTALACJA:
1. npm create vite@latest . -- --template react
2. npm install
3. npm install -D tailwindcss @tailwindcss/postcss postcss
4. npm install lucide-react

# KONFIGURACJA TAILWIND CSS v4:
- W pliku postcss.config.js: export default { plugins: { '@tailwindcss/postcss': {} } }
- W pliku src/index.css: 
  @import "tailwindcss";
  @theme {
    --color-header-dark: #1f1f1f;
    --color-gold-price: #d4a574;
    --color-bg-light: #ffffff;
    --color-text-gray: #6b7280;
    --color-border-light: #e5e7eb;
  }
- BRAK pliku tailwind.config.js

# STRUKTURA PROJEKTU:
src/
├── components/
│   ├── Header.jsx           # Ciemny pasek z logo i PL/PLN
│   ├── Hero.jsx             # Tło lotnisko + "Podróżuj po świecie"
│   ├── SortBar.jsx          # "Sortuj według: Najnowsze" po prawej
│   ├── OffersGrid.jsx       # Grid 3 kolumny
│   └── OfferCard.jsx        # Karta z flagą, datami, ceną, trasą
├── data/
│   └── oferty.json          # 6 ofert (Chania, Korfu, Sofia, Londyn, Pekin, Barcelona)
└── App.jsx                  # Główna strona

# WYMAGANE ELEMENTY (LANDING PAGE):

## 1. HEADER
- Pełna szerokość, tło: #1f1f1f (ciemny szary/czarny)
- Wysokość: ~56-64px
- Lewa strona: tekst "logo" (biały, możliwość podmiany na &lt;img&gt;)
- Prawa strona: ikona Globe (Lucide) + tekst "PL/PLN" (biały, mała czcionka)
- Flexbox: justify-between, items-center
- Padding: px-4 lub px-6

## 2. HERO SECTION
- Szerokość 100%, wysokość ~50vh (lub 400-500px)
- Tło: zdjęcie lotniska/terminala (użyj: https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1920)
- Overlay: bg-black/30 (przyciemnienie dla czytelności tekstu)
- Zawartość wyśrodkowana (flex items-center justify-center):
  * H1: "Podróżuj po świecie" (tekst-4xl/5xl, font-bold, biały, text-center)
  * Podtytuł: "Skorzystaj z naszych promocji lotniczych" (tekst-lg, biały, mt-2, text-center)

## 3. SEKCJA OFERT (Białe tło)
- Kontener: max-w-7xl mx-auto px-4 py-8
- Sort Bar: Wyrównany do prawej strony (flex justify-end)
  * Select dropdown: "Sortuj według: Najnowsze"
  * Wygląd: border border-gray-300, rounded-lg, px-3 py-2, bg-white
  * Strzałka w dół (ChevronDown z Lucide) po prawej wewnątrz selecta lub custom select
- Grid: 
  * grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  * gap: 1.5rem (gap-6)

## 4. KARTA OFERTY (OfferCard)
Karta z białym tłem, rounded-xl, shadow-sm, overflow-hidden:

**Górna część (60% wysokości karty):**
- Tło: obrazek flagi kraju (object-cover, wypełnia całą górę)
- Gradient od dołu: bg-gradient-to-t from-black/60 to-transparent (żeby tekst był czytelny na flagach)
- Tekst na dole po lewej: nazwa miasta (np. "Chania (Kreta)"), biały, font-bold, text-lg, p-4
- Zaokrąglenie tylko górne: rounded-t-xl

**Dolna część (40% wysokości):**
- Padding: p-4
- Daty: "6 kwietnia 2026 &gt; 15 kwietnia 2026" (text-sm, text-gray-700)
- Wiersz z ikonami (flex justify-between items-center mt-2):
  - Lewa strona:
    * Ikona Clock (Lucide) + tekst "2 godz. 55 min" (text-xs, text-gray-500)
    * Ikona ArrowLeftRight (Lucide) + tekst "bez przesiadek" (text-xs, text-gray-500, ml-2)
  - Prawa strona:
    * Cena: "246 PLN" (text-gold-price, font-bold, text-lg)
- Trasa na dole (flex items-center justify-center mt-3 pt-3 border-t border-gray-100):
  * Kod wylotu: "WMI" (font-bold, text-gray-800)
  * Kropka (•) lub mała ikona Circle
  * Linia przerywana: border-b-2 border-dashed border-gray-300, w-16 lub w-20
  * Ikona samolotu (Plane z Lucide, rotate-90 lub bez, text-gold-price, mx-1)
  * Linia przerywana
  * Kropka
  * Kod przylotu: "CHQ" (font-bold, text-gray-800)

## 5. DANE (src/data/oferty.json):
[
  {
    "id": "1",
    "miasto": "Chania (Kreta)",
    "kraj": "Grecja",
    "flaga": "https://flagcdn.com/w640/gr.png",
    "dataWylotu": "6 kwietnia 2026",
    "dataPowrotu": "15 kwietnia 2026",
    "czas": "2 godz. 55 min",
    "przesiadki": "bez przesiadek",
    "cena": "246 PLN",
    "kodWylotu": "WMI",
    "kodPrzylotu": "CHQ"
  },
  {
    "id": "2", 
    "miasto": "Korfu",
    "kraj": "Grecja",
    "flaga": "https://flagcdn.com/w640/gr.png",
    "dataWylotu": "7 kwietnia 2026",
    "dataPowrotu": "15 kwietnia 2026",
    "czas": "2 godz. 25 min",
    "przesiadki": "bez przesiadek",
    "cena": "203 PLN",
    "kodWylotu": "WMI",
    "kodPrzylotu": "CFU"
  },
  {
    "id": "3",
    "miasto": "Sofia",
    "kraj": "Bułgaria", 
    "flaga": "https://flagcdn.com/w640/bg.png",
    "dataWylotu": "5 czerwca 2026",
    "dataPowrotu": "8 czerwca 2026",
    "czas": "1 godz. 40 min",
    "przesiadki": "bez przesiadek",
    "cena": "132 PLN",
    "kodWylotu": "KRK",
    "kodPrzylotu": "SOF"
  },
  {
    "id": "4",
    "miasto": "Londyn",
    "kraj": "UK",
    "flaga": "https://flagcdn.com/w640/gb.png",
    "dataWylotu": "10 maja 2026",
    "dataPowrotu": "14 maja 2026",
    "czas": "2 godz. 15 min",
    "przesiadki": "bez przesiadek",
    "cena": "189 PLN",
    "kodWylotu": "WAW",
    "kodPrzylotu": "STN"
  },
  {
    "id": "5",
    "miasto": "Pekin",
    "kraj": "Chiny",
    "flaga": "https://flagcdn.com/w640/cn.png",
    "dataWylotu": "1 lipca 2026",
    "dataPowrotu": "15 lipca 2026",
    "czas": "11 godz. 30 min",
    "przesiadki": "1 przesiadka",
    "cena": "1200 PLN",
    "kodWylotu": "WAW",
    "kodPrzylotu": "PEK"
  },
  {
    "id": "6",
    "miasto": "Barcelona",
    "kraj": "Hiszpania",
    "flaga": "https://flagcdn.com/w640/es.png",
    "dataWylotu": "12 sierpnia 2026",
    "dataPowrotu": "20 sierpnia 2026",
    "czas": "2 godz. 40 min",
    "przesiadki": "bez przesiadek",
    "cena": "356 PLN",
    "kodWylotu": "WMI",
    "kodPrzylotu": "BCN"
  }
]

# LOGIKA:
- Strona w pełni responsywna (mobile-first).
- Kod podzielony na osobne komponenty w `src/components/`.
- Karty wyświetlane na podstawie mapowania oferty.json.
- Brak backendu, brak routingu (jedna strona).
- Flagowe obrazki z flagcdn.com (darmowe, szybkie).