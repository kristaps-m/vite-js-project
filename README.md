## Chek it out LIVE:

[https://kristaps-vite-js.vercel.app/](kristaps-vite-js.vercel.app/)

### The Project!

I left default ViteJS as Home page <3

<img src="readme_pictures/home_page.jpg" width="500">

To change Task status drag and drop it :)

<img src="readme_pictures/todoapp.jpg" width="500">

If you have not guessed correct pair, it will close after 3 seconds. "Cards" are numbers!

<img src="readme_pictures/card_memory_game.jpg" width="500">

Here you can test the application using "Test mode" (helps solve Memory game faster).You can pick what localStorage data to delete. If you have a lot of `tasks` you can delete all at once from here!

<img src="readme_pictures/about.jpg" width="500">

:exclamation: There also is button for changing Theme from `light` to `dark` <img src="readme_pictures/theme.jpg" width="150">

### TO DO APP

Drag and Drop - [react-dnd.github.io/react-dnd/](https://react-dnd.github.io/react-dnd/)

# React + TypeScript + Vite (I left default ViteJS readme...)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
