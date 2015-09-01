/**
 * angular-page-slider
 * @version v0.0.5 - 2015-09-01
 * @link https://github.com/tsanko/angular-page-slider
 * @author Tsanko Tsolov <>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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

angular
	.module('TT.angularPageSlider')
	.controller('SliderController', SliderController);

/* @ngInject */
function SliderController($timeout) {

	'use strict';

	var that = this;

	that.slideToRight = true;
	that.slideToTop = true;

	that.currentMainIndex = 0;
	that.currentSubIndex = -1; // show parent slide @ currentMainIndex

	that.prevSlide = prevSlide;
	that.nextSlide = nextSlide;
	that.upSlide = upSlide;
	that.downSlide = downSlide;

	that.setCurrentSlideIndex = setCurrentSlideIndex;
	that.setCurrentSubSlideIndex = setCurrentSubSlideIndex;

	that.showNext = false;
	that.showPrev = false;
	that.showUp = false;
	that.showDown = false;

	that.nextLabel = '';
	that.prevLabel = '';
	that.upLabel = '';
	that.downLabel = '';

	that.getAdditionalStyleNames = getAdditionalStyleNames;

	init();

	//////////////////////////////////////////////////////////

	function init() {
		setupLayoutChevrons();
	}

	function setupLayoutChevrons() {
		that.showNext = (that.slides[that.currentMainIndex].subslides.length !== 0 &&
		that.slides[that.currentMainIndex].subslides.length - 1 !== that.currentSubIndex);

		that.showPrev = (that.slides[that.currentMainIndex].subslides.length !== 0 &&
		that.currentSubIndex !== -1);

		that.showUp = (that.currentMainIndex !== 0 && that.currentSubIndex === -1);

		that.showDown = (that.currentMainIndex !== that.slides.length - 1 && that.currentSubIndex === -1);

		that.nextLabel = (that.showNext && that.currentSubIndex < that.slides[that.currentMainIndex].subslides.length) ?
			that.slides[that.currentMainIndex].subslides[that.currentSubIndex + 1].name :
			'';

		that.prevLabel = (that.showPrev && that.currentSubIndex > 0) ?
			that.slides[that.currentMainIndex].subslides[that.currentSubIndex - 1].name :
			that.slides[that.currentMainIndex].name;

		that.upLabel = (that.showUp) ?
			that.slides[that.currentMainIndex - 1].name :
			'';

		that.downLabel = (that.showDown) ?
			that.slides[that.currentMainIndex + 1].name :
			'';
	}

	function getAdditionalStyleNames() {

		var mainStyle = '',
			subStyle = '';

		if (that.slides[that.currentMainIndex].name) {
			mainStyle = '-' + angular.lowercase(that.slides[that.currentMainIndex].name).replace(/ /g, '_');
		}

		if (that.currentSubIndex !== -1 && that.slides[that.currentMainIndex].subslides[that.currentSubIndex].name) {
			subStyle = '-' + angular.lowercase(that.slides[that.currentMainIndex].subslides[that.currentSubIndex].name).replace(/ /g, '_');
		}

		return (mainStyle + ' ' + subStyle);
	}

	function setCurrentSlideIndex(index) {
		if (that.currentMainIndex < index) {
			that.slideToTop = true;
			that.currentMainIndex++;
		} else if (that.currentMainIndex > index) {
			that.slideToTop = false;
			that.currentMainIndex--;
		}

		setupLayoutChevrons();

		if (that.currentMainIndex !== index) {
			$timeout(function () {
				setCurrentSlideIndex(index);
			}, 700);
		}
	}

	function setCurrentSubSlideIndex(index) {
		that.currentSubIndex = index;

		setupLayoutChevrons();
	}

	function nextSlide() {
		that.slideToRight = true;
		that.currentSubIndex = (that.currentSubIndex < that.slides[that.currentMainIndex].subslides.length - 1) ?
			++that.currentSubIndex :
		that.slides[that.currentMainIndex].subslides.length - 1;
		//that.currentSubIndex = (that.currentSubIndex < that.slides[that.currentMainIndex].subslides.length - 1) ? ++that.currentSubIndex : -1;

		setupLayoutChevrons();
	}

	function prevSlide() {
		that.slideToRight = false;
		that.currentSubIndex = (that.currentSubIndex >= 0) ? --that.currentSubIndex : -1;
		//that.currentSubIndex = (that.currentSubIndex >= 0) ? --that.currentSubIndex : that.slides[that.currentMainIndex].subslides.length - 1;

		setupLayoutChevrons();
	}

	function downSlide() {
		that.slideToTop = true;
		that.currentMainIndex = (that.currentMainIndex < that.slides.length - 1) ?
			++that.currentMainIndex :
		that.slides.length - 1;
		// endless rotation
		// that.currentMainIndex = (that.currentMainIndex < that.slides.length - 1) ? ++that.currentMainIndex : 0;

		setupLayoutChevrons();
	}

	function upSlide() {
		that.slideToTop = false;
		that.currentMainIndex = (that.currentMainIndex > 0) ? --that.currentMainIndex : 0;
		// endless rotation
		// that.currentMainIndex = (that.currentMainIndex > 0) ? --that.currentMainIndex : that.slides.length - 1;

		setupLayoutChevrons();
	}
}
SliderController.$inject = ["$timeout"];

angular
	.module('TT.angularPageSlider')
	.directive('pagesSlider', pagesSlider);

/* @ngAnnotate */
function pagesSlider() {

	'use strict';

	return {
		templateUrl     : 'template/angular-page-slider.html',
		restrict        : 'EA',
		scope           : {
			slides: '='
		},
		controller      : 'SliderController',
		controllerAs    : 'slider',
		bindToController: true
	};
}

angular
	.module('TT.angularPageSlider')
	.run(['$templateCache', function ($templateCache) {

		'use strict';

		$templateCache.put(
			'template/angular-page-slider.html',
			'<div class="slider" style="background-color: #eeeeee;" ng-cloak ng-class="slider.getAdditionalStyleNames()" >' +

			'<div class="slide slide-vertical" ' +
				 'style="background-color: #eeeeee;" ' +
				 'ng-repeat="(mainIndex, slide) in slider.slides" ' +
				 'ng-hide="slider.currentMainIndex != mainIndex" ' +
				 'slide-top="{{ slider.slideToTop }}" ' +
				 'ng-swipe-down="slider.upSlide()" ' +
				 'ng-swipe-up="slider.downSlide()" ' +
				 'ng-swipe-left="slider.nextSlide()" ' +
				 'ng-swipe-right="slider.prevSlide()" >' +

				'<div ng-include="slide.template" ' +
					 'ng-class="{ \'-fade-out\' : slider.currentSubIndex != -1}" ' +
					 'class="slide-content" >' +
			    '</div>' +

				'<div class="slide fade-in-animation" ' +
					 'style="background-color: #eeeeee;" ' +
					 'ng-repeat="(subIndex, subslide) in slide.subslides" ' +
					 'ng-hide="slider.currentSubIndex != subIndex" ' +
					 'slide-right="{{ slider.slideToRight }}" >' +

					'<div ng-include="subslide.template" ' +
						 'class="slide-content"></div>' +
					'</div>' +

				'</div>' +

				'<a class="arrow prev" href ' +
				   'ng-if="slider.showPrev" ' +
				   'ng-click="slider.prevSlide()" >' +

					'<svg-image src="bower_components/angular-page-slider/dist/images/chevron.svg" class="chevron" ></svg-image>' +
					'<div class="label">{{ slider.prevLabel }}</div>' +
				'</a>' +

				'<a class="arrow next" href ' +
				   'ng-if="slider.showNext" ' +
				   'ng-click="slider.nextSlide()" >' +

					'<div class="label">{{ slider.nextLabel }}</div>' +
					'<svg-image src="bower_components/angular-page-slider/dist/images/chevron.svg" class="chevron" ></svg-image>' +
				'</a>' +

				'<a class="arrow up" href ' +
				   'ng-if="slider.showUp" ' +
				   'ng-click="slider.upSlide()" >' +

					'<svg-image src="bower_components/angular-page-slider/dist/images/chevron.svg" class="chevron" ></svg-image>' +
					'<div class="label">{{ slider.upLabel }}</div>' +
				'</a>' +

				'<a class="arrow down" href ' +
				   'ng-if="slider.showDown" ' +
				   'ng-click="slider.downSlide()" >' +

					'<div class="label">{{ slider.downLabel }}</div>' +
					'<svg-image src="bower_components/angular-page-slider/dist/images/chevron.svg" class="chevron" ></svg-image>' +
				'</a>' +

				'<div class="main-map">' +
					'<div class="main-map-marker" ' +
		                 'ng-repeat="slide in slider.slides" ' +
						 'ng-click="slider.setCurrentSlideIndex($index)" ' +
						 'ng-hide="slider.currentSubIndex != -1" ' +
						 'ng-class="{ \'-selected\' : slider.currentMainIndex == $index}" >' +

						'{{ ::slide.name }}' +

					'</div>' +
				'</div>' +

				'<div class="sub-map">' +
					'<div class="main-map-marker"' +
						 'ng-click="slider.setCurrentSubSlideIndex(-1)"' +
						 'ng-hide="slider.currentSubIndex == -1" >' +

						'{{ slider.slides[slider.currentMainIndex].name }}' +

					'</div>' +
					'<div class="main-map-marker" ' +
						 'ng-repeat="subslide in slider.slides[slider.currentMainIndex].subslides" ' +
						 'ng-click="slider.setCurrentSubSlideIndex($index)" ' +
						 'ng-hide="slider.currentSubIndex == -1" ' +
						 'ng-class="{ \'-selected\' : slider.currentSubIndex == $index}" >' +

						'{{ ::subslide.name }}' +

					'</div>' +
				'</div>' +
			'</div>'
		);
	}]);


angular
	.module('TT.angularPageSlider')
	.directive('svgImage', svgImage);

/* @ngAnnotate */
function svgImage($http) {

	'use strict';

	return {
		restrict: 'E',
		link: function(scope, element) {
			var request = $http.get(
					element.attr('src'),
					{'Content-Type': 'application/xml'}
				);

			scope.manipulateImgNode = function(data, elem) {
				var svg = angular.element(data)[2],
					imgClass = elem.attr('class');

				if (typeof(imgClass) !== 'undefined') {
					var classes = imgClass.split(' ');
					for (var i = 0; i < classes.length; ++i) {
						svg.classList.add(classes[i]);
					}
				}
				svg.removeAttribute('xmlns:a');
				return svg;
			};

			request.success(function(data) {
				element.replaceWith(scope.manipulateImgNode(data, element));
			});
		}
	};
}
svgImage.$inject = ["$http"];
