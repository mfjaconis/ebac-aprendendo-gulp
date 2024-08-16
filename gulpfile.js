const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");

compilaSass = () => {
	return gulp
		.src("./source/scripts/*.js")
		.src("./source/styles/main.scss")
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: "compressed",
			}),
		)
		.pipe(sourcemaps.write("./maps"))
		.pipe(gulp.dest(".build/styles"));
};

comprimeImagens = () => {
	return gulp
		.src("./source/img/*")
		.pipe(imagemin())
		.pipe(gulp.dest("./build/img"));
};

comprimeJavaScript = () => {
	return gulp
		.src("./source/scripts/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("./build/scripts"));
};

exports.default = () => {
	gulp.watch(
		"./source/styles/*.scss",
		{ ignoreInitial: false },
		gulp.series(compilaSass),
	);
	gulp.watch(
		"./source/img/*",
		{ ignoreInitial: false },
		gulp.series(comprimeImagens),
	);
	gulp.watch(
		"./source/scripts/*.js",
		{ ignoreInitial: false },
		gulp.series(comprimeJavaScript),
	);
};
