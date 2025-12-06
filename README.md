# Nico Grassetto Blog

A personal blog built with Astro featuring articles about Azure, AI development, and software engineering.

## Project Structure

```text
/
├── public/               # Static assets (favicon)
├── src/
│   ├── assets/          # Optimized images
│   ├── components/      # Astro components
│   ├── content/
│   │   └── blog/        # Blog posts (Markdown/MDX)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Site pages
│   └── utils/           # Utility functions
└── package.json
```

## Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build production site to `./dist/`               |
| `npm run preview`         | Preview build locally before deploying           |

## Resources

- [Astro Documentation](https://docs.astro.build)
