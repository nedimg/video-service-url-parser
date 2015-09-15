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
			"https://www.youtube.com/watch?v=_yNe_WPM9sM"
			"https://www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef"
			"https://youtu.be/_yNe_WPM9sM"
			"https://youtu.be/_yNe_WPM9sM?t=16"
			"https://www.youtube.com/embed/_yNe_WPM9sM"
			"https://www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"http://www.youtube.com/watch?v=_yNe_WPM9sM"
			"http://www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef"
			"http://youtu.be/_yNe_WPM9sM"
			"http://youtu.be/_yNe_WPM9sM?t=16"
			"http://www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"https://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM"
			"https://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef"
			"https://youtu.be/_yNe_WPM9sM"
			"https://youtu.be/_yNe_WPM9sM?t=16"
			"https://www.youtube.com/embed/_yNe_WPM9sM"
			"https://www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM"
			"http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef"
			"http://youtu.be/_yNe_WPM9sM"
			"http://youtu.be/_yNe_WPM9sM?t=16"
			"http://www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"http://www.dailymotion.com/video/x31olaa_"
			"http://www.dailymotion.com/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun"
			"http://dai.ly/x31olaa"
			"http://dai.ly/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun"
			"http://www.dailymotion.com/embed/video/x31olaa"
			"http://www.dailymotion.com/embed/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun"
			"https://vimeo.com/channels/staffpicks/138706287"
			"https://vimeo.com/channels/staffpicks/138706287?t=123&foo=bar"
			"https://vimeo.com/channels/staffpicks/138706287?&foo=bar"
			"https://vimeo.com/138706287"
			"https://vimeo.com/138706287?t=123&foo=bar"
			"https://vimeo.com/138706287?&foo=bar"
			"https://player.vimeo.com/video/138706287"
			"https://player.vimeo.com/video/138706287?t=123&foo=bar"
			"https://player.vimeo.com/video/138706287?&foo=bar"





			"www.youtube.com/watch?v=_yNe_WPM9sM"
			"www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef"
			"youtu.be/_yNe_WPM9sM"
			"youtu.be/_yNe_WPM9sM?t=16"
			"www.youtube.com/embed/_yNe_WPM9sM"
			"www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"http://www.youtube.com/watch?v=_yNe_WPM9sM"
			"http://www.youtube.com/watch?v=_yNe_WPM9sM&feature=youtu.be&aef"
			"http://youtu.be/_yNe_WPM9sM"
			"http://youtu.be/_yNe_WPM9sM?t=16"
			"http://www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM"
			"www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef"
			"youtu.be/_yNe_WPM9sM"
			"youtu.be/_yNe_WPM9sM?t=16"
			"www.youtube.com/embed/_yNe_WPM9sM"
			"www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM"
			"http://www.youtube.com/watch?t1=42142&t2=aefaeaepofjaef apeofj aepfoa&v=_yNe_WPM9sM&feature=youtu.be&aef"
			"http://youtu.be/_yNe_WPM9sM"
			"http://youtu.be/_yNe_WPM9sM?t=16"
			"http://www.youtube.com/embed/_yNe_WPM9sM?t=123"
			"http://www.dailymotion.com/video/x31olaa_"
			"http://www.dailymotion.com/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun"
			"http://dai.ly/x31olaa"
			"http://dai.ly/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun"
			"http://www.dailymotion.com/embed/video/x31olaa"
			"http://www.dailymotion.com/embed/video/x31olaa_melhores-pegadinhas-2-anos-de-nao-e-serio_fun"
			"vimeo.com/channels/staffpicks/138706287"
			"vimeo.com/channels/staffpicks/138706287?t=123&foo=bar"
			"vimeo.com/channels/staffpicks/138706287?&foo=bar"
			"vimeo.com/138706287"
			"vimeo.com/138706287?t=123&foo=bar"
			"vimeo.com/138706287?&foo=bar"
			"player.vimeo.com/video/138706287"
			"player.vimeo.com/video/138706287?t=123&foo=bar"
			"player.vimeo.com/video/138706287?&foo=bar"
		];

		//test.expect(1);

		for (var i = 0; i < test_cases.length; i++) {

			var obj = parser.parse(test_cases[i].url);

			test.equal(obj, undefined, "Url: '" + test_cases[i].url + "'' service's does not exist");
		}
		
		test.done();
	}
};
