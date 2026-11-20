# morten-frandsen.github.io

Personal site for Morten Frandsen: a short profile, a project showcase, and a blog. It's built with plain HTML, CSS, and a little JavaScript, so GitHub Pages can serve it directly from the `main` branch with no build step.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Any static file server works; opening `index.html` directly in a browser also works, though using a local server better matches GitHub Pages.

Note: Python's simple server doesn't automatically show `404.html` for unknown paths. That behavior is provided by GitHub Pages when the site is deployed.

## Structure

```text
.
├── index.html              # Home / profile
├── projects/index.html     # Project showcase (with tag filters)
├── blog/index.html         # Post listing
├── posts/                  # Individual blog posts
├── 404.html                # Custom not-found page
├── assets/
│   ├── css/style.css       # All styles, including light/dark themes
│   ├── js/main.js          # Theme toggle, filters, nav state, reveal animation
│   ├── images/             # Project screenshots and other images
│   └── favicon.svg
├── robots.txt
├── sitemap.xml
└── README.md
```

## Adding a project

1. Open `projects/index.html`.
2. Copy one of the `<article class="card project-card reveal" …>` blocks.
3. Update the title, description, tags, and links.
4. Set `data-tags` to a space-separated list of filters, for example:
   `data-tags="web typescript"`. Available filters are defined in the `.filter-bar`
   near the top of the file. Add a new `<button data-filter="…">` there if needed.

The featured projects on the home page are separate cards in `index.html`; update those too if you want them to stay in sync.

## Adding a blog post

1. Copy one of the files in `posts/` and give it a descriptive name, e.g.
   `posts/my-new-post.html`.
2. Update the `<title>`, meta description, and canonical URL in `<head>`.
3. Update the date, reading time, and tags in `.article-header`.
4. Write the body inside `<div class="prose">`. Headings, lists, links, code blocks,
   blockquotes, and images are already styled.
5. Add a row to `blog/index.html` linking to the new post, and optionally add one
   to the "Recent posts" section of `index.html`.
6. Add the new URL to `sitemap.xml`.

Posts are plain HTML files for now. If you later want to write in Markdown, the simplest upgrade path is Jekyll (native to GitHub Pages) or a small static-site generator. The current markup is intentionally easy to migrate.

## Things to replace

Search the files for `TODO` to find placeholders. The main ones are:

- Your real email address in `index.html`. GitHub, LinkedIn, and Salesforce Trailhead links are already in place in the hero and in the "Profiles & certifications" section.
- Real repository or demo URLs on the remaining placeholder project cards. Lunar Lander is already linked.
- Individual Salesforce certification links, if you want specific credentials called out beyond the Trailhead profile.
- The about text and skill list in `index.html`.
- The starter posts in `posts/` — they are examples, not real writing.
- `sitemap.xml` and canonical URLs if you move to a custom domain.

## Deployment

The site is meant to be served from the root of the `main` branch:

1. Push changes to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**, then select `main` and `/ (root)`.

GitHub Pages will publish the site at <https://morten-frandsen.github.io/>. Changes usually appear within a minute or two.

## Design notes

- Responsive layout, from small phones up to wide screens.
- Light and dark themes, following the OS preference until the visitor chooses one.
  The choice is saved in `localStorage`.
- Reduced-motion support, skip link, visible focus states, semantic headings, and
  a custom 404 page.
- No runtime dependencies, no external fonts, and no CDN requests.

## Credits

- Gymnasium screenshots (Lunar Lander and CartPole): [Gymnasium documentation](https://gymnasium.farama.org/) (Farama Foundation). They are stored locally in `assets/images/`.
