var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var copy = require('gulp-copy');
var replace = require('gulp-string-replace');
// var otherGulpFunction = require('gulp-other-function');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var inlinesource = require('gulp-inline-source');
var del = require('del');

require('./src/page/hd/gulphd.js');

gulp.task('hd', gulpSequence('copy:hdcurrent', 'copy:hdimg', 'renameHdHtml'));

