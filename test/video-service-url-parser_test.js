'use strict';

var parser = require('../lib/video-service-url-parser.js');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports['parse'] = {
	setUp: function(done) {
		// setup here
		done();
	},
	boundaries_test: function(test) {

		test.equal(parser.parse(), undefined, "Should be undefined");
		test.equal(parser.parse(null), undefined, "Should be undefined");
		test.equal(parser.parse(1), undefined, "Should be undefined");
		test.equal(parser.parse(0), undefined, "Should be undefined");
		test.equal(parser.parse(-1), undefined, "Should be undefined");
		test.equal(parser.parse(''), undefined, "Should be undefined");
		test.equal(parser.parse(' '), undefined, "Should be undefined");
		test.equal(parser.parse('_yNe_WPM9sM'), undefined, "Should be undefined");
		
		test.done();
	},
	known_services_test: function(test) {

		var test_cases = [
			{	url: "https://www.youtube.com/watch?v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://www.youtube.com/embed/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://www.youtube.com/embed/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "https://www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.dailymotion.com/video/x31olaa_",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://www.dailymotion.com/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://dai.ly/x31olaa",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://dai.ly/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://www.dailymotion.com/embed/video/x31olaa",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://www.dailymotion.com/embed/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "https://vimeo.com/channels/staffpicks/138706287",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://vimeo.com/channels/staffpicks/138706287?t=123&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://vimeo.com/channels/staffpicks/138706287?&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://vimeo.com/138706287",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://vimeo.com/138706287?t=123&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://vimeo.com/138706287?&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://player.vimeo.com/video/138706287",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://player.vimeo.com/video/138706287?t=123&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "https://player.vimeo.com/video/138706287?&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},





			{	url: "www.youtube.com/watch?v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "www.youtube.com/embed/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "www.youtube.com/embed/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://youtu.be/_yNe_WPM9sM?t=16",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.youtube.com/embed/_yNe_WPM9sM?t=123",
				service: 'youtube', 
				videoId: '_yNe_WPM9sM'
			},
			{	url: "http://www.dailymotion.com/video/x31olaa_",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://www.dailymotion.com/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://dai.ly/x31olaa",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://dai.ly/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://www.dailymotion.com/embed/video/x31olaa",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "http://www.dailymotion.com/embed/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
				service: 'dailymotion', 
				videoId: 'x31olaa'
			},
			{	url: "vimeo.com/channels/staffpicks/138706287",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "vimeo.com/channels/staffpicks/138706287?t=123&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "vimeo.com/channels/staffpicks/138706287?&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "vimeo.com/138706287",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "vimeo.com/138706287?t=123&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "vimeo.com/138706287?&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "player.vimeo.com/video/138706287",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "player.vimeo.com/video/138706287?t=123&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
			{	url: "player.vimeo.com/video/138706287?&foo=bar",
				service: 'vimeo', 
				videoId: '138706287'
			},
		];

		//test.expect(1);

		for (var i = 0; i < test_cases.length; i++) {

			var obj = parser.parse(test_cases[i].url);

			test.notEqual(obj, undefined, "Url: '" + test_cases[i].url + "'' leads to undefined service");
			test.equal(obj.service, test_cases[i].service, "Value should be " + test_cases[i].service + ". Url: '" + test_cases[i].url + "'");
			test.equal(obj.videoId, test_cases[i].videoId, "Value should be " + test_cases[i].videoId + ". Url: '" + test_cases[i].url + "'");
		}
		
		test.done();
	},
	unknown_services_test: function(test) {

		var test_cases = [
			"https://www.youtubex.com/watch?v=_yNe_WPM9sM",
			"https://www.youtubex.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef",
			"https://youtu.bex/_yNe_WPM9sM",
			"https://youtu.bex/_yNe_WPM9sM?t=16",
			"https://www.youtubex.com/embed/_yNe_WPM9sM",
			"https://www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"http://www.youtubex.com/watch?v=_yNe_WPM9sM",
			"http://www.youtubex.com/watch?v=_yNe_WPM9sM&feature=youtu.bex&aef",
			"http://youtu.bex/_yNe_WPM9sM",
			"http://youtu.bex/_yNe_WPM9sM?t=16",
			"http://www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"https://www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
			"https://www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.bex&aef",
			"https://youtu.bex/_yNe_WPM9sM",
			"https://youtu.bex/_yNe_WPM9sM?t=16",
			"https://www.youtubex.com/embed/_yNe_WPM9sM",
			"https://www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"http://www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
			"http://www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.bex&aef",
			"http://youtu.bex/_yNe_WPM9sM",
			"http://youtu.bex/_yNe_WPM9sM?t=16",
			"http://www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"http://www.dailymotionx.com/video/x31olaa_",
			"http://www.dailymotionx.com/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
			"http://dai.lyx/x31olaa",
			"http://dai.lyx/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
			"http://www.dailymotionx.com/embed/video/x31olaa",
			"http://www.dailymotionx.com/embed/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
			"https://vimeox.com/channels/staffpicks/138706287",
			"https://vimeox.com/channels/staffpicks/138706287?t=123&foo=bar",
			"https://vimeox.com/channels/staffpicks/138706287?&foo=bar",
			"https://vimeox.com/138706287",
			"https://vimeox.com/138706287?t=123&foo=bar",
			"https://vimeox.com/138706287?&foo=bar",
			"https://player.vimeox.com/video/138706287",
			"https://player.vimeox.com/video/138706287?t=123&foo=bar",
			"https://player.vimeox.com/video/138706287?&foo=bar",
			"www.youtubex.com/watch?v=_yNe_WPM9sM",
			"www.youtubex.com/watch?v=_yNe_WPM9sM&feature=youtu.bex&aef",
			"youtu.bex/_yNe_WPM9sM",
			"youtu.bex/_yNe_WPM9sM?t=16",
			"www.youtubex.com/embed/_yNe_WPM9sM",
			"www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"http://www.youtubex.com/watch?v=_yNe_WPM9sM",
			"http://www.youtubex.com/watch?v=_yNe_WPM9sM&feature=youtu.bex&aef",
			"http://youtu.bex/_yNe_WPM9sM",
			"http://youtu.bex/_yNe_WPM9sM?t=16",
			"http://www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
			"www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.bex&aef",
			"youtu.bex/_yNe_WPM9sM",
			"youtu.bex/_yNe_WPM9sM?t=16",
			"www.youtubex.com/embed/_yNe_WPM9sM",
			"www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"http://www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM",
			"http://www.youtubex.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.bex&aef",
			"http://youtu.bex/_yNe_WPM9sM",
			"http://youtu.bex/_yNe_WPM9sM?t=16",
			"http://www.youtubex.com/embed/_yNe_WPM9sM?t=123",
			"http://www.dailymotionx.com/video/x31olaa_",
			"http://www.dailymotionx.com/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
			"http://dai.lyx/x31olaa",
			"http://dai.lyx/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
			"http://www.dailymotionx.com/embed/video/x31olaa",
			"http://www.dailymotionx.com/embed/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun",
			"vimeox.com/channels/staffpicks/138706287",
			"vimeox.com/channels/staffpicks/138706287?t=123&foo=bar",
			"vimeox.com/channels/staffpicks/138706287?&foo=bar",
			"vimeox.com/138706287",
			"vimeox.com/138706287?t=123&foo=bar",
			"vimeox.com/138706287?&foo=bar",
			"player.vimeox.com/video/138706287",
			"player.vimeox.com/video/138706287?t=123&foo=bar",
			"player.vimeox.com/video/138706287?&foo=bar",
		];

		//test.expect(1);
		//test.equal(1, undefined, "Error");

		for (var i = 0; i < test_cases.length; i++) {

			var obj = parser.parse(test_cases[i]);

			test.equal(obj, undefined, "Url: '" + test_cases[i] + "'' service's does not exist");
		}
		
		test.done();
	}
};
