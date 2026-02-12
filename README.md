# Tower of Hanoi — React Components

Набір React-компонентів для навчального проєкту «Tower of Hanoi». Мета — демонстрація
компонентної архітектури, Storybook-історій та згенерованої документації.

---

## Автор

Oleksandr Ishchuk — ishuk.sasha2005@gmail.com

---

## Швидкий старт

Встановіть залежності та запустіть в режимі розробки:

```bash
npm install
npm run dev
```

Запуск Storybook (UI-компоненти):

```bash
npm run storybook
# відкрити http://localhost:6006
```

Збірка продакшену та локальний перегляд:

```bash
npm run build
npm run preview
```

---

## Ключові команди

- `npm run dev` — запуск Vite для розробки
- `npm run build` — збірка проєкту
- `npm run preview` — локальний перегляд збірки
- `npm run storybook` — запустити Storybook
- `npm run build-storybook` — зібрати Storybook
- `npm run docs` — згенерувати JSDoc документацію (налаштовано в `jsdoc.json` → `docs/jsdoc`)
- `npm run license-check` — згенерувати `license-report.txt`

---

## Файли та документація

- `LICENSE` / `docs/LICENSE.html` — ліцензія (MIT).
- `PRIVACY.md` / `docs/PRIVACY.html` — політика приватності (GDPR).
- `license-report.txt` — звіт від `license-checker` у корені.
- `docs/` — згенерована документація (відкривати `docs/index.html`).
- `.storybook/` — конфіг Storybook; історії в `src/components/*/*.stories.*`.

---

## Cookie / Конфіденційність (GDPR)

Компонент згоди на cookie: `src/components/CookieConsent/CookieConsent.jsx`.
Він зберігає вибір у `localStorage` та ініціалізує модуль аналітики лише за згодою.

Документ політики: `PRIVACY.md` (є локальна HTML-версія в `docs/PRIVACY.html`).

---

## Storybook

Налаштовано Storybook; у проекті є приклади історій для `Button` і `Card`.
Перевірте візуально: `npm run storybook` → http://localhost:6006

---

## Внесок

1. Зробіть форк репозиторію.
2. Створіть будь яку гілку <`branch/your-branch`>
3. Додайте зміни
4. Відкрийте Pull Request

---

## Контакти

Oleksandr Ishchuk — ishuk.sasha2005@gmail.com

---
