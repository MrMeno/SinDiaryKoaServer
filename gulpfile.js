vargulp=require('gulp');
varts=require('gulp-typescript');
varuglify=require('gulp-uglify');
//varsourcemap=require('gulp-sourcemaps');
vartsproject=ts.createProject("tsconfig.json");
gulp.task("default",()=>{
gulp.src(['./package.json','./statics','./engine']).pipe(gulp.dest('dist'))
return tsproject.src().pipe(tsproject()).js.pipe(uglify()).pipe(gulp.dest('dist')).unpipe();
})