angular
	.module('TT.angularPageSlider', ['ngAnimate'])
	.animation('.slide-down-animation', function () {
		/*
		 * the reason why we're using beforeAddClass and removeClass is because we're working
		 * around the .ng-hide class (which is added when ng-show evaluates to false). The
		 * .ng-hide class sets display:none!important and we want to apply the animation only
		 * when the class is removed (removeClass) or before it's added (beforeAddClass).
		 */
		'use strict';

		return {

			/*
			 * make sure to call the done() function when the animation is complete.
			 */
			beforeAddClass: function (element, className, done) {
				if (className === 'ng-hide') {
					TweenMax.to(element, 1, {height: 0, onComplete: done});

					//this function is called when the animation ends or is cancelled
					return function () {
						//remove the style so that the CSS inheritance kicks in
						element[0].style.height = '';
					};
				} else {
					done();
				}
			},

			/*
			 * make sure to call the done() function when the animation is complete.
			 */
			removeClass: function (element, className, done) {
				if (className === 'ng-hide') {
					//set the height back to zero to make the animation work properly
					var height = element.height();
					element.css('height', 0);

					TweenMax.to(element, 1, {height: height, onComplete: done});

					//this function is called when the animation ends or is cancelled
					return function () {
						//remove the style so that the CSS inheritance kicks in
						element[0].style.height = '';
					};
				} else {
					done();
				}
			}
		};
	})
	.animation('.slide-left-animation', function () {
		'use strict';
		return {
			addClass   : function (element, className, done) {
				if (className === 'ng-hide') {
					TweenMax.to(element, 1, {left: -element.parent().width(), onComplete: done});
				} else {
					done();
				}
			},
			removeClass: function (element, className, done) {
				if (className === 'ng-hide') {
					element.removeClass('ng-hide');

					TweenMax.set(element, {left: element.parent().width()});
					TweenMax.to(element, 1, {left: 0, onComplete: done});
				} else {
					done();
				}
			}
		};
	})
	.animation('.fade-in-animation', function () {

		'use strict';

		return {
			addClass   : function (element, className) {
				if (className === 'ng-hide') {
					TweenMax.to(element, 1, {opacity: 0});
				}
			},
			removeClass: function (element, className) {
				if (className === 'ng-hide') {
					TweenMax.to(element, 1, {opacity: 1});
				}
			}
		};
	})
	.animation('.slide-horizontal', function () {

		'use strict';

		return {
			addClass   : function (element, className, done) {
				if (className === 'ng-hide') {
					if (element.attr('slide-right') === 'true') {
						TweenMax.to(element, 1, {left: -element.parent().width(), onComplete: done});
					} else {
						TweenMax.to(element, 1, {left: element.parent().width(), onComplete: done});
					}
				} else {
					done();
				}
			},
			removeClass: function (element, className, done) {
				if (className === 'ng-hide') {
					element.removeClass('ng-hide');

					if (element.attr('slide-right') === 'true') {
						TweenMax.set(element, {left: element.parent().width()});
						TweenMax.to(element, 1, {left: 0, onComplete: done});
					} else {
						TweenMax.set(element, {left: -element.parent().width()});
						TweenMax.to(element, 1, {left: 0, onComplete: done});
					}
				} else {
					done();
				}
			}
		};
	})
	.animation('.slide-vertical', function () {

		'use strict';

		return {
			addClass   : function (element, className, done) {
				if (className === 'ng-hide') {
					if (element.attr('slide-top') === 'true') {
						TweenMax.to(element, 1, {top: -element.parent().height(), onComplete: done});
					} else {
						TweenMax.to(element, 1, {top: element.parent().height(), onComplete: done});
					}
				} else {
					done();
				}
			},
			removeClass: function (element, className, done) {
				if (className === 'ng-hide') {
					element.removeClass('ng-hide');

					if (element.attr('slide-top') === 'true') {
						TweenMax.set(element, {top: element.parent().height()});
						TweenMax.to(element, 1, {top: 0, onComplete: done});
					} else {
						TweenMax.set(element, {top: -element.parent().height()});
						TweenMax.to(element, 1, {top: 0, onComplete: done});
					}
				} else {
					done();
				}
			}
		};
	});
