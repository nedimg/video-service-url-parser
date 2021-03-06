(function(exports) {

    'use strict';

    var youtube = 'youtube',
        dailymotion = 'dailymotion',
        vimeo = 'vimeo',

        youtubeRegex1 = /(https?:\/\/)?(www\.)?youtube\.com\/watch.*/i,
        youtubeRegex2 = /(https?:\/\/)?(www\.)?youtu\.be\/(.+)(\?.*)?/i,
        youtubeRegex3 = /(https?:\/\/)?(www\.)?youtube\.com\/embed\/(.+)(\?.*)?/i,

        dailymotionRegex1 = /(https?:\/\/)?(www\.)?dailymotion\.com\/video\/([^_]+)_?.*/i,
        dailymotionRegex2 = /(https?:\/\/)?(www\.)?dai\.ly\/([^_]+)(\?.*)?/i,
        dailymotionRegex3 = /(https?:\/\/)?(www\.)?dailymotion\.com\/embed\/video\/([^_]+)(\?.*)?/i,

        //	http://www.dailymotion.com/video/x31olaa_
        //	http://dai.ly/x31olaa
        //	http://www.dailymotion.com/embed/video/x31olaa

        vimeoRegex1 = /(https?:\/\/)?(www\.)?vimeo.com\/channels\/.+\/(.+)(\?.*)?/i,
        vimeoRegex2 = /(https?:\/\/)?(www\.)?player\.vimeo\.com\/video\/(.+)(\?.*)?/i,
        vimeoRegex3 = /(https?:\/\/)?(www\.)?vimeo\.com\/(.+)(\?.*)?/i,

        //	https://vimeo.com/channels/staffpicks/138706287
        //	https://vimeo.com/138706287
        //	https://player.vimeo.com/video/138706287

        parse = function parse(url) {

            var id,
                service,
                groups,
                pos;

            if (youtubeRegex1.test(url) === true) {

                id = url.split('v=')[1];
                service = youtube;

            } else if (youtubeRegex2.test(url) === true) {

                groups = youtubeRegex2.exec(url);
                id = groups[3];
                service = youtube;

            } else if (youtubeRegex3.test(url) === true) {

                groups = youtubeRegex3.exec(url);
                id = groups[3];
                service = youtube;

            } else if (dailymotionRegex1.test(url) === true) {

                groups = dailymotionRegex1.exec(url);
                id = groups[3];
                service = dailymotion;

            } else if (dailymotionRegex2.test(url) === true) {

                groups = dailymotionRegex2.exec(url);
                id = groups[3];
                service = dailymotion;

            } else if (dailymotionRegex3.test(url) === true) {

                groups = dailymotionRegex3.exec(url);
                id = groups[3];
                service = dailymotion;

            } else if (vimeoRegex1.test(url) === true) {

                groups = vimeoRegex1.exec(url);
                id = groups[3];
                service = vimeo;

            } else if (vimeoRegex2.test(url) === true) {

                groups = vimeoRegex2.exec(url);
                id = groups[3];
                service = vimeo;

            } else if (vimeoRegex3.test(url) === true) {

                groups = vimeoRegex3.exec(url);
                id = groups[3];
                service = vimeo;
            }

            if (typeof id === 'undefined') {
                return;
            }

            pos = id.indexOf('?');
            pos = pos === -1 ? id.indexOf('&') : pos;
            id = pos !== -1 ? id.substring(0, pos) : id;

            return {
                service: service,
                videoId: id
            };
        };


    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `VideoServiceUrlParser` as a global function.
    if (typeof exports !== 'undefined') {

        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = parse;
        }

        exports.parse = parse;
    } else {

        // Establish the root object, `window` in the browser, or `exports` on the server.
        this['VideoServiceUrlParser'] = parse;
    }

}(typeof exports === 'object' && exports || this));