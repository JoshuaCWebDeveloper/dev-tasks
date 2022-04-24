/* gulpfile.js
 * Glup task-runner configruation for project
 * Dependencies: eslint, gulp, gulp-babel, fancy-log modules
 * Author: Joshua Carter
 * Created: July 04, 2017
 */
"use strict";
//include modules
var ESLintEngine = require("eslint").CLIEngine,
    gulp = require("gulp"),
    babel = require("gulp-babel"),
    log = require("fancy-log");

//create operations object
var Ops = {
    lint: function (cb) {
        //create new cli engine
        var cli = new ESLintEngine({errorOnUnmatchedPattern: false}),
            //execute lint on app directory
            lint = cli.executeOnFiles(["src", "test"]);
        //output results
        log.info(
`

${cli.getFormatter()(lint.results)}
`
        );
        //if there were problems
        if (lint.errorCount || lint.warningCount) {
            //stop this madness
            throw new Error("Lint problems detected, unable to continue.");
        }
        else {
            //good job
            log.info(`Your code is clean.`);
        }
        cb();
    },
    // Transpiles our app
    build: function () {
        return gulp.src('src/**')
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(gulp.dest('build/'));
    }
};


//default gulp task: documentation
gulp.task('default', function () {
    log.info(
`

Available Gulp Commands:
 - lint
 - build
`
    );
});

//lint code using ESLint
gulp.task('lint', Ops.lint);

//build code using webpack and babel
gulp.task('build', Ops.build);
