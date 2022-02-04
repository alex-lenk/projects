'use strict'
import gulp from 'gulp'

const {series, watch, src, dest, lastRun} = gulp

// Define "require"
import {createRequire} from "module";

const require = createRequire(import.meta.url);

import twig from 'gulp-twig'
import browserSync from 'browser-sync'
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import cleanCSS from 'gulp-clean-css'

const uglifyEs = require('gulp-uglify-es').default
import newer from 'gulp-newer'
import svgMin from 'gulp-svgmin'
import svgStore from 'gulp-svgstore'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import TerserPlugin from 'terser-webpack-plugin'

const pathFiles = {
  html: {
    src: ['./src/html/*.html'],
    build: './build',
    watch: './src/html/*.html'
  },
  css: {
    src: './src/styles/*.scss',
    build: './build/assets/css/',
    watch: './src/styles/**/*.scss'
  },
  js: {
    src: './src/js/*.js',
    build: './build/assets/js/',
    watch: './src/js/*.js'
  },
  img: {
    src: './src/img/**/*.+(png|jpg|jpeg|svg)',
    build: './build/assets/img/',
    watch: './src/img/**/*.+(png|jpg|jpeg|svg)'
  },
  fonts: {
    src: './src/fonts/*.*',
    build: './build/assets/fonts/',
    watch: './src/fonts/*.**'
  },
  favicon: {
    src: './src/favicon/*.*',
    build: './build/assets/favicon/',
    watch: './src/favicon/*.**'
  }
}

const html = () => {
  return src(pathFiles.html.src)
    .pipe(dest(pathFiles.html.build))
    .pipe(browserSync.stream())
}

const scss = () => {
  return src(pathFiles.css.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(pathFiles.css.build))
    .pipe(browserSync.stream())
}

const js = () => {
  return src(pathFiles.js.src)
    .pipe(dest(pathFiles.js.build))
    .pipe(browserSync.stream())
}

const myServer = () => {
  browserSync.init({
    server: {
      baseDir: pathFiles.html.build
    },
    port: 3553,
    notify: false,
    tunnel: true
  })
  watch(pathFiles.html.watch, {usePolling: true}, html);
  watch(pathFiles.css.watch, scss);
  watch(pathFiles.js.watch, js);
}
const fonts = () => {
  return src(pathFiles.fonts.src)
    .pipe(dest(pathFiles.fonts.build))
    .pipe(browserSync.stream())
}

function __svgSpriteLandings() {
  return src('./src/img/sprite-landings/*.svg')
    .pipe(svgMin(() => {
      return {
        plugins: [
          {
            name: 'cleanupIDs',
            parmas: {
              prefix: 'sprite-landings',
              minify: true
            }
          }
        ]
      }
    }))
    .pipe(svgStore())
    .pipe(dest(pathFiles.img.build));
}

export {html}
export {scss}
export {js}
export {myServer}
export {fonts}
export {__svgSpriteLandings}

const defaultGulp = series(html, scss, js, myServer, fonts);

export {defaultGulp}
