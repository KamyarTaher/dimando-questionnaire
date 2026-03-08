This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Dimando Senior Frontend Developer take-home task

## Task

Your task is to implement a fully functional, production-ready questionnaire application based on the provided Figma file.

The application consists of three main page types:

- Homepage
- Questionnaire (multi-step flow)
- Results page

Open `design_file.fig` in Figma and carefully follow all comments and specifications inside the file. The Figma file is the single source of truth for:

- Layout and responsive behavior (mobile → tablet → desktop)
- Component structure
- States (default, hover, active, disabled, completed)
- Validation behavior
- Conditional rendering
- Navigation flow
- Visual design and spacing
- Interaction details (e.g. rating hover behavior)

Your implementation should match the design and behavior described in Figma as closely as possible.

## Instructions

**DO NOT USE AI TO GENERATE ANY CODE**

1. Create a new next project, use Next v16+ with React 19+ app directory with Typescript
2. Setup ESlint, Prettier, StyleLint and Husky
3. Create font size, spacing and color tokens
4. Create components (**DO NOT USE ANY UI LIBRARY**)
   - Button (primary and secondary variants)
   - Rating button
   - Rating button group
   - Radio options
   - Cards
   - Any other components you may need
5. Create layouts for pages (homepage, questionnaires and results)
   - homepage → `/`
   - questionnaire → `/questionnaires/[questionnaireID]/[currentQuestionNumber]`
     Example → `/questionnaire/c3893d5d-6c44-4593-98e9-1182f7e62438/2`
   - results → `/results`
6. Create store(s) you need to keep track of data
   - You can use any modern state management library that supports data persistency with local storage like MobX, Zustand, Jotai, Recoil...
7. Load config data
   - Fetch the data from the [mock API](https://test-config.free.beeceptor.com) and populate store (if not already stored) and make data persistent using local storage
8. Hook everything up and setup routing

## Restrictions

- **DO NOT USE AI TO GENERATE ANY CODE**
- **DO NOT USE ANY UI LIBRARY**

## Assets used

1. Icons → https://fonts.google.com/icons
2. Fonts
   - IBM Plex Serif → https://fonts.google.com/specimen/IBM+Plex+Serif?preview.layout=grid&query=IBM+Plex+Serif
   - Sansation → https://fonts.google.com/specimen/Sansation?preview.layout=grid&query=Sansation

Please install the fonts first so they will render properly in figma
Image included in zip

## Config data mock API

Mock API: https://test-config.free.beeceptor.com

## Bonus points

1. Use scss or less with css variables
2. Accessibility with focus, keyboard controls and aria labels
3. Use strict typescript config
4. Anything you may want to add that would improve the app
