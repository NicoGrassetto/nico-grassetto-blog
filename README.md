# Nico Grassetto - Personal Website & Blog

My personal website and blog, built with Astro. The homepage introduces my work, and the blog is where I write about whatever catches my interest. Feel free to use the code as a template, removing my personal content first.

**Live site:** [www.nicograssetto.com](https://www.nicograssetto.com)

**Blog:** [www.nicograssetto.com/blog/](https://www.nicograssetto.com/blog/)

## Project Structure

```text
/
├── public/
│   ├── assets/          # Homepage styles, scripts, images, fonts, and licenses
│   └── case-studies/    # Static case-study pages with their original .html URLs
├── src/
│   ├── assets/          # Optimized images
│   ├── components/      # Astro components
│   ├── content/
│   │   └── blog/        # Blog posts (Markdown/MDX)
│   ├── layouts/         # Page layouts
│   ├── pages/           # Homepage, blog index, articles, about page, and RSS
│   └── utils/           # Utility functions
├── tests/               # Production URL, RSS, and asset regression checks
└── package.json
```

## Pages and Content

- `/` is the personal landing page in [src/pages/index.astro](src/pages/index.astro).
- `/blog/` lists published articles through [src/pages/blog/index.astro](src/pages/blog/index.astro).
- `/blog/<slug>` keeps the existing article URLs. Posts remain in [src/content/blog/](src/content/blog/); do not rename existing slugs when reorganizing the site.
- `/feed` remains the RSS subscription URL, with unchanged article links and GUIDs.
- `/about` and the existing preview pages remain available.
- `/case-studies/*.html` serves the imported [case studies](public/case-studies/) without changing their URL format.

The landing page and its runtime assets were imported from [NicoGrassetto/homepage](https://github.com/NicoGrassetto/homepage/tree/130cbc1207c2c5b9e9f711e9cbd278372c7c067d). Its styles and scripts are separate from the blog's [Layout.astro](src/layouts/Layout.astro), so homepage animations and styles are not loaded on articles.

The homepage's latest-post announcement, the blog listing, and RSS share [getPublishedPosts](src/utils/getPublishedPosts.ts). They exclude drafts and sort newest first. The existing development-only draft article previews remain unchanged.

## Commands

All commands are run from the root of the project:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build production site to `./dist/`               |
| `npm run preview`         | Preview build locally before deploying           |
| `npm test`                | Build and verify routes, RSS, assets, and links  |

## Deployment

The existing [GitHub Pages workflow](.github/workflows/deploy.yml) builds and deploys the entire site when changes are pushed to `main`, or when manually triggered. No second deployment or homepage-repository checkout is needed.

Keep the custom domain attached to this repository. [astro.config.mjs](astro.config.mjs) retains `site: 'https://www.nicograssetto.com'` and `base: '/'`; `/blog/` is a page route, not the site's base path. Preserve the existing apex/`www` domain handling rather than moving articles to another host.

Before publishing routing changes, run `npm test` and preview the homepage, blog, article back links, case studies, mobile navigation, and contact form. After deployment, verify the custom domain and any older `github.io` links that have been shared.

## Resources

- [Astro Documentation](https://docs.astro.build)

## License

The **code** (components, layouts, configurations) is available under the [MIT License](LICENSE) — use it freely as a template.

The **content** (blog posts, images, and written material in `src/content/`) is © Nico Grassetto. All rights reserved.

Third-party libraries and fonts in [public/assets/](public/assets/) retain their accompanying license notices.
