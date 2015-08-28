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
