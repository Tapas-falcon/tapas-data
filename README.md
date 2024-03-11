# Tapas Web Monorepo

This is a monorepo created by Turborepo, for all the Tapas Web apps.

## Installation

Install the Turborepo CLI:

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `orders`: a [Next.js](https://nextjs.org/) app for orders system
- `ui`: a stub React component library shared by applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `tailwind-config`: configuration for tailwind css

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd tapas-webs
pnpm build
```

#### docker build

`Dockerfile` for each apps is under the apps/[project] folder (`apps/orders`). To build & run your docker image:
```bash
# build image
docker build -f apps/orders/Dockerfile . -t tapas-webs/orders:231225-01

#run
docker run -p 3333:80 -it tapas-webs/orders:231225-01
```

### Develop

To develop all apps and packages, run the following command:

```
cd tapas-webs
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Development Guide

### Structure

- Create a NextJS project under `/apps` folder
- `/packages` folder contains all the shared projects, including configs, common components (`ui`)

### Tech Stacks

- `React` **^18** is the basic. **Functional** components & `Hooks` is preferred.
- Projects should use `Next.js` 14 with **Pages** route model as recommend.
- Use `NodeJS` **^20**.
- Use `pnpm` as the package manager (`npm i -g pnpm@8`).

### Component Library

- Use `material-ui` as design system and [Joy UI](https://mui.com/joy-ui/getting-started/) as base ui library.
- Develop your pages based on `joy-ui` directly or encapsulate it in `/packages/ui`.

### Styling

- Use [tailwindcss](https://tailwindcss.com/docs/utility-first) for styling (by adding tailwind class name in any elements' `className`).
- For `orders` and `ui`, tailwind is out of the box.
- Use the `sx` prop of `material-ui`, which is the 2nd choice.
- You could also use `Sass` or `CSS Modules`, but **it's not recommended**.
- `clsx` lets you toggle class names easily. eg.
  ```jsx
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-2 py-1 text-sm',
      {
        'bg-gray-100 text-gray-500': status === 'pending',
        'bg-green-500 text-white': status === 'paid',
      },
    )}
  >
  ```
- Google font `Bricolage_Grotesque` required by designer is already configured.

### Pages & layout
- Already use `'@/components/Layout'` in `_app.tsx` for page layout.
- To enable route animation, you have to wrap your page content in `"@/components/PageTransition"`
  ```jsx
  <PageTransition>...</PageTransition>
  ```
- Layout have defined `overflow-hidden` and fill the screen besides `Nav` & `Header`. To scroll your content, you should set `overflow-y-auto` on you content's container. eg.
```jsx
<Box className="flex flex-col md:flex-row w-full h-full overflow-y-auto">...</Box>

// max-md: for only mobile
<PageTransition className='max-md:overflow-y-auto'>...</PageTransition>
```

#### Color with theme

- We have customized the MUI theme in our `ThemeProvider`, which means you should follow MUI's style for theming,
- Use `Sheet` for any container which has background. Set the props `variant`, and `color`
- Use `Box` for common which could use `sx` prop for specify styles
- Use `Typography` for any text, with its props `variant`, `textColor`
- DO NOT use any specific color values, use `var(--joy-*)` instead. Then we could switch theme easily

### State Management

- Use react `useState, useReduce and useContext` for simple use cases.
- Use `Recoil` as global state management tool, which could only work for client component.

### Image & Icon

- Use [Image](https://nextjs.org/docs/pages/building-your-application/optimizing/images) from 'next/image'
- Icons defined in figma are converted to React component under our ui lib `packages/ui/src/icons`
  - Use in applications
  ```jsx
  // import the icon from '@tapas/ui/icons'
  import { EggsIcon } from '@tapas/ui/icons'
  ...
  // use in jsx
  <EggsIcon />
  ```
  - Use in ui lib
  ```jsx
  // import the icon from relative path
  import { AppleIcon } from '../icons'
  ...
  // use in jsx
  <AppleIcon />
  ```



### Utilities

- Already import [ahooks](https://ahooks.js.org/zh-CN/guide) library which contains lots of utility hooks.
- `useRequest` from ahooks for network request. It contains the following abilities:
  - 自动请求/手动请求
  - 轮询
  - 防抖
  - 节流
  - 屏幕聚焦重新请求
  - 错误重试
  - loading delay
  - SWR(stale-while-revalidate)
  - 缓存
- And there is a wrapped axios under `@/api/apiProxy` to work with `useRequest`. For business apis, we should define them under `@/api` folder.

### i18n

Use `next-intl` for i18n.

#### Applications

- Put your translation files under the `i18n` folder of your apps.
- 1st level is the common texts
- Then you could create the directory structure as your pages
- Add the translation for each page as
  ```typescript
  export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
      props: {
        messages: {
          ...(await import(`../../i18n/${locale}.json`)).default,
          ...(await import(`../../i18n/demo/${locale}.json`)).default,
        },
        now: new Date().getTime(),
      },
    }
  }
  ```

### components

Usually components won't contain it owns hard code text. For the business component.
- Use useTranslations from use-intl instead of next-intl `import { useTranslations } from "use-intl"`
- Include a `i18n` under your component's folder.
- Import the translation files
  ```typescript
  import en from './i18n/en'
  import es from './i18n/es'

  const i18n: any = { en, es }
  ```
- Use `WithTrans` to wrap the component and pass the imported resource to it's `message` prop.
- You should export this wrapped component.
  ```typescript
  export default function(props: Prop) {
    return (
      <WithTrans messages={i18n}>
        <Nav {...props}></Nav>
      </WithTrans>
    )
  }
  ```
- The rest is the same as using in applications.
