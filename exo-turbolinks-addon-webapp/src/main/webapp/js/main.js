(function() {
	var ExoTurbolinks = function() {
		
	};
	
	ExoTurbolinks.prototype.transformLinks = function() {
		var $body = $("body");
		$("[id^='adminSearchLink']", $body).attr("data-turbolinks", "false");
		var $links = $("a");
		$.each($links, function(index, link) {
			var $link = $(link);
			var onclick = $link.attr("onclick");
			if (onclick) {
				if ($link.closest(".spaceItem").length > 0) {
					var space = $link.find("> span").data("original-title");
					$link.attr("onclick", "javascript:Turbolinks.visit('/portal/g/:spaces:" + space + "/" + space + "')");
				}
			}
		});
	};
	
	ExoTurbolinks.prototype.transformButtons = function() {
		$.each($("button[onclick^='window.location.href='], a[onclick^='window.location.href=']"), function(index, button) {
			var $button = $(button);
			var onClick = $button.attr("onclick").replace("window.location.href=", "Turbolinks.visit(") + ")";
			$button.attr("onclick", onClick);
		});
		$.each($("button[onclick*='window.open(window.location.origin'], a[onclick*='window.open(window.location.origin']"), function(index, button) {
			var $button = $(button);
			var onClick = $button.attr("onclick").replace("window.open", "Turbolinks.visit");
			$button.attr("onclick", onClick);
		});
	};
	
	ExoTurbolinks.prototype.ensureInputEnabled = function() {
		$("input").unbind("mousedown");
	};
	
	ExoTurbolinks.prototype.initialize = function() {
		var self = this;
		this.transformButtons();
		this.transformLinks();
		
		document.addEventListener("turbolinks:load", function(event) {
			self.transformButtons();
			self.transformLinks();
			self.ensureInputEnabled();
		});
	};
	
	var eXoTurbolinks = new ExoTurbolinks();
	eXoTurbolinks.initialize();
	
	Turbolinks.start();
})();
