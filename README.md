# Nico Grassetto Blog

My personal corner of the internet where I write about whatever catches my interest. Feel free to use this as a template for your own blog — just remove my articles first.

**Live site:** [nicograssetto.github.io/nico-grassetto-blog](https://nicograssetto.github.io/nico-grassetto-blog)

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

## License

The **code** (components, layouts, configurations) is available under the [MIT License](LICENSE) — use it freely as a template.

The **content** (blog posts, images, and written material in `src/content/`) is © Nico Grassetto. All rights reserved.
