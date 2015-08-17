/**
 * @ngdoc controller
 * @name fullScreenScrollApp.controllers:SliderController
 * @description
 * # SliderController
 */
angular
	.module('TT.angularPageSlider')
	.controller('SliderController', SliderController);

/* @ngInject */
function SliderController ($timeout) {

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

	that.showNextChevron = showNextChevron;
	that.showPrevChevron = showPrevChevron;
	that.showUpChevron = showUpChevron;
	that.showDownChevron = showDownChevron;

	//////////////////////////////////////////////////////////

	function showNextChevron() {
		return (that.slides[that.currentMainIndex].subslides.length !== 0 &&
				that.slides[that.currentMainIndex].subslides.length - 1 !== that.currentSubIndex);
	}

	function showPrevChevron() {
		return (that.slides[that.currentMainIndex].subslides.length !== 0 &&
				that.currentSubIndex !== -1);
	}

	function showUpChevron() {
		return (that.currentMainIndex !== 0 && that.currentSubIndex === -1);
	}

	function showDownChevron() {
		return (that.currentMainIndex !== that.slides.length - 1 && that.currentSubIndex === -1);
	}

	function setCurrentSlideIndex(index) {
		if (that.currentMainIndex < index) {
			that.slideToTop = true;
			that.currentMainIndex++;
		} else if (that.currentMainIndex > index) {
			that.slideToTop = false;
			that.currentMainIndex--;
		}

		if (that.currentMainIndex !== index) {
			$timeout(function () {
				setCurrentSlideIndex(index);
			}, 700);
		}
	}

	function setCurrentSubSlideIndex(index) {
		that.currentSubIndex = index;
	}

	function nextSlide() {
		that.slideToRight = true;
		that.currentSubIndex = (that.currentSubIndex < that.slides[that.currentMainIndex].subslides.length - 1) ?
			++that.currentSubIndex :
			that.slides[that.currentMainIndex].subslides.length - 1;
		//that.currentSubIndex = (that.currentSubIndex < that.slides[that.currentMainIndex].subslides.length - 1) ? ++that.currentSubIndex : -1;
	}

	function prevSlide() {
		that.slideToRight = false;
		that.currentSubIndex = (that.currentSubIndex >= 0) ? --that.currentSubIndex : -1;
		//that.currentSubIndex = (that.currentSubIndex >= 0) ? --that.currentSubIndex : that.slides[that.currentMainIndex].subslides.length - 1;
	}

	function downSlide() {
		that.slideToTop = true;
		that.currentMainIndex = (that.currentMainIndex < that.slides.length - 1) ?
			++that.currentMainIndex :
			that.slides.length - 1;
		// endless rotation
		// that.currentMainIndex = (that.currentMainIndex < that.slides.length - 1) ? ++that.currentMainIndex : 0;
	}

	function upSlide() {
		that.slideToTop = false;
		that.currentMainIndex = (that.currentMainIndex > 0) ? --that.currentMainIndex : 0;
		// endless rotation
		// that.currentMainIndex = (that.currentMainIndex > 0) ? --that.currentMainIndex : that.slides.length - 1;
	}
}
