//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  // Stil tercihleri
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  arrowParens: "always",
  tabWidth: 2,
  printWidth: 80,
  bracketSpacing: true,
  endOfLine: "lf",

  // Eklentiler
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],

  // Import sırası (sort-imports eklentisi için)
  importOrder: [
    "^path$",
    "^vite$",
    "^@vitejs/(.*)$",
    "^react$",
    "^react-dom/client$",
    "^react/(.*)$",
    "^globals$",
    "^zod$",
    "^axios$",
    "^date-fns$",
    "^react-hook-form$",
    "^use-intl$",
    "^@radix-ui/(.*)$",
    "^@hookform/resolvers/zod$",
    "^@tanstack/react-query$",
    "^@tanstack/react-router$",
    "^@tanstack/react-table$",
    "<THIRD_PARTY_MODULES>",
    "^@/assets/(.*)",
    "^@/api/(.*)$",
    "^@/stores/(.*)$",
    "^@/lib/(.*)$",
    "^@/utils/(.*)$",
    "^@/constants/(.*)$",
    "^@/context/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/layouts/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/errors/(.*)$",
    "^@/components/(.*)$",
    "^@/features/(.*)$",
    "^[./]",
  ],
};

export default config;