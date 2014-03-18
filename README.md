gulp-wrapper
============

Basically `gulp-header` & `gulp-footer` together.
With the addition that the filename is revealed to the user.

So for example I can wrap an HTML file with `<script>` template tags and specify the filename id.
( I use it with angular so I can have regular HTML files in development, but make a bundle of all the templates in one HTML on production )

```
<div>
  my template HTML is here
</div>
```

so in my `gulpfile.js` I can do

```javascript
...
var wrapper = require('gulp-wrapper');

...
gulp.src('template.html')
    .pipe(wrapper({
       header: '<script type="text/ng-template" id="${filename}">\n',
       footer: '</script>\n'
    }))
    .pipe(gulp.dest('out'));
```

the result is :
```
<script type="text/ng-template" id="template.html">
<div>
  my template HTML is here
</div>
</script>
```
