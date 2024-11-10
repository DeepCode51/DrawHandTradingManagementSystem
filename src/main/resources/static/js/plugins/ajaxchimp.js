"use strict";

! function(a) {
	a.ajaxChimp = {
		responses: {
			"We have sent you a confirmation email": 0,
			"Please enter a value": 1,
			"An email address must contain a single @": 2,
			"The domain portion of the email address is invalid (the portion after the @: )": 3,
			"The username portion of the email address is invalid (the portion before the @: )": 4,
			"This email address looks fake or invalid. Please enter a real email address": 5
		},
		translations: {
			en: null
		},
		init: function(e, s) {
			a(e).ajaxChimp(s);
		}
	}, a.fn.ajaxChimp = function(e) {
		return a(this).each(function(s, n) {
			var i = a(n),
				t = i.find("input[type=email]"),
				r = i.find("label[for=" + t.attr("id") + "]"),
				l = a.extend({
					url: i.attr("action"),
					language: "en"
				}, e),
				o = l.url.replace("/post?", "/post-json?").concat("&c=?");
			i.attr("novalidate", "true"), t.attr("name", "EMAIL"), i.submit(function() {
				function e(e) {
					if ("success" === e.result) s = "We have sent you a confirmation email", r.removeClass("error").addClass("valid"),
						t.removeClass("error").addClass("valid");
					else {
						t.removeClass("valid").addClass("error"), r.removeClass("valid").addClass("error");
						try {
							var n = e.msg.split(" - ", 2);
							if (void 0 === n[1]) s = e.msg;
							else {
								parseInt(n[0], 10).toString() === n[0] ? (n[0], s = n[1]) : (-1, s = e.msg);
							}
						} catch (a) {
							-1, s = e.msg;
						}
					}
					"en" !== l.language && void 0 !== a.ajaxChimp.responses[s] && a.ajaxChimp.translations && a.ajaxChimp.translations[l.language] && a.ajaxChimp.translations[l.language][a.ajaxChimp.responses[s]] && (s = a.ajaxChimp.translations[l.language][a.ajaxChimp.responses[s]]),
						r.html(s), r.show(2e3), l.callback && l.callback(e);
				}
				var s, n = {},
					m = i.serializeArray();
				a.each(m, function(a, e) {
					n[e.name] = e.value;
				}), a.ajax({
					url: o,
					data: n,
					success: e,
					dataType: "jsonp",
					error: function(a, e) {
						console.log("mailchimp ajax submit error: " + e);
					}
				});
				var u = "Submitting...";
				return "en" !== l.language && a.ajaxChimp.translations && a.ajaxChimp.translations[l.language] && a.ajaxChimp.translations[l.language].submit && (u = a.ajaxChimp.translations[l.language].submit),
					r.html(u).show(2e3), !1;
			});
		}), this;
	};
}(jQuery);