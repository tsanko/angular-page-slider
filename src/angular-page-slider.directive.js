/**
 * @ngdoc directive
 * @name angularPageSlider.directive:pagesSlider
 * @description
 * # slides
 *
 * Usage:
 * html -----------------------------
 * <div pages-slider="main.pages" ></div>
 * ----------------------------------
 *
 * controller -----------------------
 that.pages = [
 {
	name: 'Main',
	template : 'scripts/main-templates/page1/page1.tpl.html',
	subpages : [{
		name: 'Product 1',
		template : 'scripts/main-templates/page1/subpage11.tpl.html'
	}, {
		name: 'Product 2',
		template : 'scripts/main-templates/page1/subpage12.tpl.html'
	}]
}, {
		name: 'Contact Us',
		template : 'scripts/main-templates/page2/page2.tpl.html',
		subpages : []
	}, {
		name: 'Affiliates',
		template : 'scripts/main-templates/page3/page3.tpl.html',
		subpages : [{
			name: 'Google Inc.',
			template : 'scripts/main-templates/page3/subpage31.tpl.html'
		}]
	}, {
		name: 'About Us',
		template : 'scripts/main-templates/page4/page4.tpl.html',
		subpages : []
	}
 ];
 * ----------------------------------
 */
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
