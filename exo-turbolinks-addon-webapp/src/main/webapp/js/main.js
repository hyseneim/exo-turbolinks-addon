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
			if (!onclick) {
				var href = $link.attr("href");
				if (href && href.length > 1 && href.indexOf("Turbolinks") === -1 && href.indexOf("javascript:eXo.webui.UIForm.submitForm") === -1) {
					$link.attr("href", "javascript:Turbolinks.visit('" + href + "')");	
				}
			}
			else {
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
//		$(document).ajaxComplete(function(event) {
//			self.transformLinks();
//		});
		
		document.addEventListener("turbolinks:load", function(event) {
//			console.log("LOADED");
			self.transformButtons();
			self.transformLinks();
			self.ensureInputEnabled();
		});
	};
	
	var eXoTurbolinks = new ExoTurbolinks();
	eXoTurbolinks.initialize();
	
	Turbolinks.start();
})();
