# pron.github.io

Source for Ron Pressler's GitHub Pages blog. The site is generated with Eleventy and deployed by GitHub Actions.

## Development

Install dependencies and start the local server:

```sh
npm install
npm run serve
```

Create a production build in `_site`:

```sh
npm run build
```

Blog posts live in `src/posts`. Shared page structure lives in `src/_includes`, site styles live in `src/css`, and files copied without processing live in `src/public`.
