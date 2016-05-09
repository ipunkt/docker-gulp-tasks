module.exports = {
  sass: {
    src: "src/scss/**/*.{sass,scss,css}",
    dest: "public/css",
    gzip: true,
    autoprefixer: {
      browsers: ["last 3 version"]
    },
    options: {
      indentedSyntax: false,
      includePaths: []
    }
  },
  browserify: {
    src: "src/js/entry.js",
    dest: "public/js/bundle.js",
    gzip: true,
    transforms: {
      ractify: {
        extension: "html"
      }
    }
  },
  copy: [
    {
      src: "src/static/**/*",
      base: "/static",
      dest: "public/"
    }
  ],
  clean: {
    path: "public/"
  }
};