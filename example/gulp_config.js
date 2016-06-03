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
  less: {
    src: "src/less/**/*.less",
    dest: "public/css",
    gzip: true,
    autoprefixer: {
      browsers: ["last 3 version"]
    },
    options: {
      paths: [],
      plugins: []
    }
  },
  css: {
    src: "src/css/**/*.css",
    dest: "public/css",
    gzip: true,
    autoprefixer: {
      browsers: ["last 3 version"]
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
    },
    plugins: {
    }
  },
  bower: {
    directory: "./my_bower_components",
    dest: "public/vendors"
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