(function(e) {


    e(document).ready(function() {
        e("#menu-buttom").click(function() {
            if (e("#header").hasClass("login-top") && e("#header").hasClass("menu-open")) {
                e("#section-login-top").slideUp();
                e("#section-login-top").removeClass("open-div");
                e("#header").removeClass("login-top");
                e("#section-menu-top").slideDown();
                e("#section-menu-top").addClass("open-div");
                e("#header").addClass("menu-top");
                e("#login-buttom span.icon").removeClass("icon-close");
                e("#menu-buttom span.icon").addClass("icon-close").removeClass("icon-dropdown_sign")
            } else {
                if (e("#header").hasClass("menu-open") && e("#header").hasClass("menu-top")) {
                    e("#section-menu-top").slideUp();
                    e("#section-menu-top").removeClass("open-div");
                    e("#header").removeClass("menu-open").removeClass("menu-top ");
                    e("#menu-buttom span.icon").removeClass("icon-close").addClass("icon-dropdown_sign")
                } else {
                    e("#section-menu-top").slideDown();
                    e("#section-menu-top").addClass("open-div");
                    e("#header").addClass("menu-open menu-top");
                    e("#menu-buttom span.icon").addClass("icon-close").removeClass("icon-dropdown_sign")
                }
            }
        });
        e("#login-buttom").click(function() {
            if (e("#header").hasClass("menu-top") && e("#header").hasClass("menu-open")) {
                e("#section-menu-top").slideUp();
                e("#section-menu-top").removeClass("open-div");
                e("#header").removeClass("menu-top");
                e("#section-login-top").slideDown();
                e("#section-login-top").addClass("open-div");
                e("#header").addClass("login-top");
                e("#menu-buttom span.icon").removeClass("icon-close").addClass("icon-dropdown_sign");
                e("#login-buttom span.icon").addClass("icon-close")
            } else {
                if (e("#header").hasClass("menu-open") && e("#header").hasClass("login-top")) {
                    e("#section-login-top").slideUp();
                    e("#section-login-top").removeClass("open-div");
                    e("#header").removeClass("menu-open").removeClass("login-top ");
                    e("#login-buttom span.icon").removeClass("icon-close")
                } else {
                    e("#section-login-top").slideDown();
                    e("#section-login-top").addClass("open-div");
                    e("#header").addClass("menu-open login-top");
                    e("#login-buttom span.icon").addClass("icon-close")
                }
            }
        });
        var q = e(window).width() / 1920;
        var p = 100 - (q * 100);
        e(".button-mobile").click(function() {
            var u = this;
            window.setTimeout(function() {
                var x = e(u).closest(".route_left_section_child");
                var w = e(".mobile-well", x);
                if (w.hasClass("in")) {
                    var v = x.height() + w.height();
                    x.css("height", v)
                } else {
                    x.css("height", x.css("min-height"))
                }
            }, 500)
        });
        var g = e(".scale-g");
        var i = e(".g-translate");
        var r = e(".g-translate.right");
        var f = e(".g-translate.left");
        var s = 0;
        var n = {
            centerX: 548,
            centerY: 290.622771
        };
        var o = e(".button_route_area_body.path-1");

        function l() {
            s = e(window).height() / 1.5
        }

        function j(u, w, v) {
            u.css("transform", "translate(" + w + "px , " + v + "px)")
        }
        l();
        e(window).scroll(function() {
// Hey Chis -- here's the section
            e.each(e(".path_rote_colored"), function(v, C) {
                var x = e(C);
                var E = x.offset().top;
                var w = C.getBoundingClientRect().height;
                var D = C.getBoundingClientRect().width + w;
                var u = e(window).scrollTop();
                var z = u + s;
                var B = Math.max(z - E, 0);
                var A = B / w;
                var y = A * D;
                if (x.hasClass("path-split")) {
                    D = 1655;
                    D = 502.8;
					if (x.hasClass("left-fix")) {
						D = 515.5;
					}
                    y = (1 - A) * D;
                    x.css("stroke-dashoffset", -y)
                } else {
                    x.css("stroke-dasharray", y + " " + 5000)
                }
            })
        });
        var h = (e(document).width() * -210) / 1920;
        var m = (e(document).width() * -160) / 1920;
        var k = (e(document).width() * -120) / 1920;
        e('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[role="tab"]').not("[data-toggle]").click(function(u) {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var v = e(this.hash);
                v = v.length ? v : e("[name=" + this.hash.slice(1) + "]");
                if (v.length) {
                    u.preventDefault();
                    e("html, body").animate({
                        scrollTop: v.offset().top
                    }, 500)
                }
            }
        });
        e(".section-header-buttom .main a").on("click", function(w) {
            var v = e(this).attr("href");
            var u = v.split("#");
            if (u.length > 1) {
                e("html, body").animate({
                    scrollTop: e("#" + u[1]).offset().top - 100
                }, "4000")
            }
        });
        if (e(".account-section-body section").length) {
            e(".cloned").remove();
            e(".account-section-body article").removeClass("current");
            var t = "";
            e(".account-section-body section article").each(function(u) {
                if (e(this).find(".more-content").length) {
                    t = t + e(this).find(".more-content").clone().addClass("cloned")[0].outerHTML
                }
                if (e(window).width() < 768) {
                    if ((u + 1) % 1 == 0) {
                        e(this).after(t);
                        t = ""
                    }
                } else {
                    if (e(window).width() < 1024) {
                        if ((u + 1) % 2 == 0) {
                            e(this).after(t);
                            t = ""
                        } else {
                            if ((u + 1) == e(".account-section-body section article").size()) {
                                e(this).after(t)
                            }
                        }
                    } else {
                        if ((u + 1) % 4 == 0) {
                            e(this).after(t);
                            t = ""
                        }
                    }
                }
            })
        }
        e(document).on("click", ".account-section-body .current", function() {
            e(".account-section-body article").removeClass("current");
            e(".account-section-body .more-content").slideUp(300);
            return false
        });
        e(".account-section-body article a").click(function() {
            var u = e(this).parentsUntil("article").parent("article");
            if (u.hasClass("current")) {
                e(".account-section-body article").removeClass("current");
                e(".account-section-body .more-content").slideUp(300)
            } else {
                e(".account-section-body article").removeClass("current");
                e(".account-section-body .more-content").slideUp(300);
                u.addClass("current");
                var v = u.find(".more-content").attr("data-id");
                e(".account-section-body section").children("div[data-id='" + v + "']").slideDown()
            }
            return false
        })
    });
    e(window).load(function() {
        var g = window.location.href;
        var f = g.split("#");
        var h = e("#header").height();
        if (f.length > 1) {
            e("html, body").animate({
                scrollTop: jQuery("#" + f[1]).offset().top - h
            }, "4000")
        }
    });
    console.log("gdpr_accept");
    console.log(b("gdpr_accept"));
    if (b("gdpr_accept") !== "yes") {
        e("#gdpr_header_wrapper").slideDown("slow")
    }
    e(".gdpr_accept").click(function(f) {
        a("gdpr_accept", "yes", 7300);
        e("#gdpr_header_wrapper").slideUp("slow")
    });

    function b(h) {
        var g = h + "=";
        var k = decodeURIComponent(document.cookie);
        var f = k.split(";");
        for (var j = 0; j < f.length; j++) {
            var l = f[j];
            while (l.charAt(0) == " ") {
                l = l.substring(1)
            }
            if (l.indexOf(g) == 0) {
                return l.substring(g.length, l.length)
            }
        }
        return ""
    }

    function a(g, j, h) {
        var i = new Date();
        i.setTime(i.getTime() + (h * 24 * 60 * 60 * 1000));
        var f = "expires=" + i.toUTCString();
        document.cookie = g + "=" + j + ";" + f + ";path=/"
    }
    e("#header").affix({
        offset: {
            top: 200
        }
    });
    var c = false;
    if (e(window).width() < 767) {
        c = true
    } else {
        c = false
    }
    e(".select-membership").on("change", function() {
        var f = this;
        d(f, c)
    });
    e(".disclaimer-modal").on("show.bs.modal", function(f) {
        setTimeout(function() {
            e(".modal-backdrop").addClass("modal-backdrop--disclaimer")
        });
        e("body").css("transition", "none")
    });
    e(".disclaimer-modal").on("hidden.bs.modal", function(f) {
        e("body").css("transition", "all .4s ease")
    });
    e(window).resize(function() {
        if (e(window).width() < 767) {
            c = true
        } else {
            c = false
        }
    });
    e("#news-sidebar-newsletter-toggle").on("click", function(f) {
        f.preventDefault();
        e("#news-sidebar-newsletter-form .mainDiv").removeAttr("style");
        e("#news-sidebar-newsletter-form .maxSize1").removeAttr("style");
        e("#news-sidebar-newsletter-form .clear").remove();
        e("#btnSubmit").removeAttr("style");
        e("#news-sidebar-newsletter-form .clickdform").removeClass("clickdform");
        e("#news-sidebar-newsletter-form").toggle("fast")
    });
    e("#newsletter-close").on("click", function() {
        e("#newsletter-notice").fadeOut(300)
    });

    function d(k, g) {
        console.log(g);
        var j = e(k).val();
        var i = JSON.parse(j);
        var l = "";
        var f = e(k).parent().parent().attr("id");
        if (g === true) {
            f = e(k).parent().parent().parent().attr("id")
        }
        for (var h in i) {
            if (i.hasOwnProperty(h)) {
                l = i[h];
                console.log("#" + f + " #table-price-" + h);
                e("#" + f + " #table-price-" + h).text(l)
            }
        }
    }
    e("#sidebar-navigation-technology").affix({
        offset: {
            top: e("#technology-banner").outerHeight(true),
            bottom: function() {
                return (this.bottom = e("footer").outerHeight(true) + 200)
            }
        }
    });
    e("#sidebar-navigation-technology__wrapper").affix({
        offset: {
            top: e("#technology-banner").outerHeight(true),
            bottom: function() {
                return (this.bottom = e("footer").outerHeight(true) + 200)
            }
        }
    })
})(jQuery);
