'use strict';

module.exports = function () {
  $.gulp.task('browserify', function () {
    return $.browserify('source/js/app.js', {debug: true})
        .bundle()
        .pipe($.source('script.js'))
        .pipe($.gulp.dest($.config.root + '/js'));
  });
};