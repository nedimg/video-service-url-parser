/*! video-service-url-parser - v0.1.0 - 2015-09-09
* https://github.com/thiagoh/video-service-url-parser
* Copyright (c) 2015 Thiago Andrade; Licensed MIT */
(function(exports) {

	'use strict';

	var youtubeRegex1 = /https?:\/\/(www\.)?youtube\.com\/watch.*/i;
	var youtubeRegex2 = /https?:\/\/(www\.)?youtu\.be\/(.+)(\?.*)?/i;
	var youtubeRegex3 = /https?:\/\/(www\.)?youtube\.com\/embed\/(.+)(\?.*)?/i;
	
	var dailymotionRegex1 = /https?:\/\/(www\.)?dailymotion\.com\/video\/([^_]+)_?.*/i;
	var dailymotionRegex2 = /https?:\/\/(www\.)?dai\.ly\/([^_]+)(\?.*)?/i;
	var dailymotionRegex3 = /https?:\/\/(www\.)?dailymotion\.com\/embed\/video\/([^_]+)(\?.*)?/i;

//	http://www.dailymotion.com/video/x31olaa_
//	http://dai.ly/x31olaa
//	http://www.dailymotion.com/embed/video/x31olaa

	var vimeoRegex1 = /https?:\/\/(www\.)?vimeo.com\/channels\/.+\/(.+)(\?.*)?/i;
	var vimeoRegex2 = /https?:\/\/(www\.)?vimeo\.com\/(.+)(\?.*)?/i;
	var vimeoRegex3 = /https?:\/\/(www\.)?player\.vimeo\.com\/video\/(.+)(\?.*)?/i;
	
//	https://vimeo.com/channels/staffpicks/138706287
//	https://vimeo.com/138706287
//	https://player.vimeo.com/video/138706287

	exports.parse = function(url) {
				
		var id = '';
		var service = '';
		var groups;

		if (youtubeRegex1.test(url) === true) {
			
			id = url.split('v=')[1];
			service = 'youtube';
			
		} else if (youtubeRegex2.test(url) === true) {
			
			groups = youtubeRegex2.exec(url);
			id = groups[2];
			service = 'youtube';
			
		} else if (youtubeRegex3.test(url) === true) {
			
			groups = youtubeRegex3.exec(url);
			id = groups[2];
			service = 'youtube';
			
		} else if (dailymotionRegex1.test(url) === true) {
			
			groups = dailymotionRegex1.exec(url);
			id = groups[2];
			service = 'dailymotion';
			
		} else if (dailymotionRegex2.test(url) === true) {
			
			groups = dailymotionRegex2.exec(url);
			id = groups[2];
			service = 'dailymotion';
			
		} else if (dailymotionRegex3.test(url) === true) {
			
			groups = dailymotionRegex3.exec(url);
			id = groups[2];
			service = 'dailymotion';

		} else if (vimeoRegex1.test(url) === true) {
			
			groups = vimeoRegex1.exec(url);
			id = groups[2];
			service = 'vimeo';
			
		} else if (vimeoRegex2.test(url) === true) {
			
			groups = vimeoRegex2.exec(url);
			id = groups[2];
			service = 'vimeo';
			
		} else if (vimeoRegex3.test(url) === true) {
			
			groups = vimeoRegex3.exec(url);
			id = groups[2];
			service = 'vimeo';
		}
		
		var pos = id.indexOf('?');
		pos = pos === -1 ? id.indexOf('&') : pos;
		id = pos !== -1 ? id.substring(0, pos) : id;
		
		return {
			service: service,
			videoId: id
		};
	};

}(typeof exports === 'object' && exports || this));
