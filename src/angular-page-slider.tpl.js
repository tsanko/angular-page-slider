/**
* @ngdoc template
*/
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

					'<i class="fa fa-chevron-left"></i>' +
				'</a>' +

				'<a class="arrow next" href ' +
				   'ng-if="slider.showNext" ' +
				   'ng-click="slider.nextSlide()" >' +

					'<i class="fa fa-chevron-right"></i>' +
				'</a>' +

				'<a class="arrow up" href ' +
				   'ng-if="slider.showUp" ' +
				   'ng-click="slider.upSlide()" >' +

					'<i class="fa fa-chevron-up"></i>' +
				'</a>' +

				'<a class="arrow down" href ' +
				   'ng-if="slider.showDown" ' +
				   'ng-click="slider.downSlide()" >' +

					'<i class="fa fa-chevron-down"></i>' +
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
