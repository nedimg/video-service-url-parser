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
	'no args': function(test) {
		//test.expect(1);

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
		];

		for (var i = 0; i < test_cases.length; i++) {

			var obj = parser.parse(test_cases[i].url);

			test.equal(obj.service, test_cases[i].service, "should be " + test_cases[i].service);
			test.equal(obj.videoId, test_cases[i].videoId, "should be " + test_cases[i].videoId);
		}
		
		test.done();
	}
};
