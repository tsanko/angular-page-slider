
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
