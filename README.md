# LotinUp

LotinUp - o'zbek matnini `Lotin <-> Kirill` transliteratsiya qiluvchi Next.js ilova.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

## Mavjud skriptlar

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Theme tizimi (Dark/Light/System)

Loyihada 3 rejimli theme ishlaydi:

- `light`
- `dark`
- `system` (default)

### Qanday ishlaydi

- Theme tanlovi `localStorage`da `theme` kaliti bilan saqlanadi.
- Ilova yuklanganda:
  - agar `localStorage.theme` mavjud bo'lsa, shu qiymat olinadi;
  - bo'lmasa `prefers-color-scheme` bo'yicha aniqlanadi.
- DOM darajasida `html` elementga:
  - `class="dark"` (dark holatda),
  - `data-theme="light|dark"` qo'llanadi.
- Theme almashtirish reloadsiz real-time ishlaydi.
- `system` tanlanganida OS theme runtime o'zgarsa UI ham avtomatik moslashadi.

### FOUC oldini olish

`src/app/layout.tsx` ichida hydrationdan oldin ishlaydigan inline init script mavjud. Shu script boshlang'ich theme'ni oldindan qo'llab, FOUCni kamaytiradi.

### Asosiy fayllar

- `src/components/theme/theme-context.tsx` - `ThemeProvider` va theme state
- `src/components/theme/use-theme.ts` - `useTheme` hook
- `src/components/theme/theme-toggle.tsx` - theme switch UI
- `src/app/layout.tsx` - early-init script + provider ulanishi

### Ulanish

`ThemeProvider` global layoutda ulangan:

```tsx
<ThemeProvider>{children}</ThemeProvider>
```

Client komponentda:

```tsx
import { useTheme } from "@/components/theme/use-theme"
```
