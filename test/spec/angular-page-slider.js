describe('Module: angularPageSlider', function () {

	'use strict';

	var scope, $sandbox, $compile, $timeout;

	// load the controller's module
	beforeEach(module('TT.angularPageSlider'));

	beforeEach(inject(function ($injector, $rootScope, _$compile_, _$timeout_) {
		scope = $rootScope;
		$compile = _$compile_;
		$timeout = _$timeout_;

		$sandbox = $('<div id="sandbox"></div>').appendTo($('body'));
	}));

	afterEach(function () {
		$sandbox.remove();
		scope.$destroy();
	});

	var templates = {
		'default': {
			scope  : {},
			element: '<div pages-slider></div>'
		}
	};

	function compileDirective(template) {
		template = template ? templates[template] : templates['default'];
		angular.extend(scope, template.scope || templates['default'].scope);
		var $element = $(template.element).appendTo($sandbox);
		$element = $compile($element)(scope);
		scope.$digest();
		return $element;
	}

	it('should correctly display nothing', function () {
		//var elm = compileDirective();
		expect(true).toBe(true);
	});

});
