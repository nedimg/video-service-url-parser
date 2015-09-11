# video-service-url-parser

FIXME
exports strategy not working

Video Service URL Parser

## Getting Started
### On the server
Install the module with: `npm install video-service-url-parser`

```javascript
var video_service_url_parser = require('video-service-url-parser');
/*
  {
    service: 'youtube',
    videoId: 'uFHIEynduqM'
  }
*/
video_service_url_parser.parse("https://www.youtube.com/watch?v=uFHIEynduqM"); 
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/thiagoh/video-service-url-parser/master/dist/video-service-url-parser.min.js
[max]: https://raw.github.com/thiagoh/video-service-url-parser/master/dist/video-service-url-parser.js

In your web page:

```html
<script src="dist/video-service-url-parser.min.js"></script>
<script>
/*
  {
    service: 'youtube',
    videoId: 'uFHIEynduqM'
  }
*/
.parse("https://www.youtube.com/watch?v=uFHIEynduqM"); 
</script>
```

In your code, you can attach video-service-url-parser's methods to any object.

```html
<script>
var exports = Bocoup.utils;
</script>
<script src="dist/video-service-url-parser.min.js"></script>
<script>
/*
  {
    service: 'youtube',
    videoId: 'uFHIEynduqM'
  }
*/
Bocoup.utils.parse();
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Thiago Andrade  
Licensed under the MIT license.
