// build.js
// Bundles and minifies CSS and JS for the Portfolio project
const esbuild = require('esbuild');
const path = require('path');

// CSS bundle (single entry)
esbuild.build({
  entryPoints: ['assets/css/all.css'],
  bundle: true,
  minify: true,
  outfile: 'assets/css/bundle.min.css',
  logLevel: 'info',
  loader: { '.css': 'css' },
}).catch(() => process.exit(1));

// JS bundle (single entry)
esbuild.build({
  entryPoints: ['assets/js/all.js'],
  bundle: true,
  minify: true,
  outfile: 'assets/js/bundle.min.js',
  logLevel: 'info',
}).catch(() => process.exit(1));
