	var showSet, colorSet, quotesSet, videoSet, setScroll, reloadTopic, mythreads, mt, lastele, originalColor, overlap;
			var topic = $("#post_topic_id").val();
			$.get("http://phantasytour.com/bands/" + location.pathname.slice(7, 8) + "/topics?mode=my_threads #boards_ajax_container", function(data) {
				mythreads = data;
				mt = (mythreads.indexOf(topic, 0) >= 0);
				if (mt) {
					$(".posts_footer .require_logged_in").css("color", "#757575").html('✔');
					$(".topic_header .require_logged_in").css({
						"float": "right",
						"font-size": "9px",
						"padding": "4px 4px"
					}).html('✔');
				}
			});
			var num;
			$("a[href*=page]").live("click", function() {
				num = getNumber($(".post:last").attr("class"));
				var t = setTimeout("checkLoad()", 500);
		
			});
		
			function checkLoad() {
				if (getNumber($(".post:last").attr("class")) != num) {
					replaceLinks();
					$(".topic_header .require_logged_in").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a></span>');
					$(".posts_footer a:last").prev('a').attr("onclick", "").click(function() {
						$('html, body').animate({
							scrollTop: 0
						}, "slow");
					});
				} else {
					var t = setTimeout("checkLoad()", 500);
				}
			}
		
			$(".topic_header .require_logged_in").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a><a href="#" id="bump" title="Bump">Bump</a></span>');
		
			$("#scrollDown").live("click", function() {
				$('html, body').animate({
					scrollTop: $("#boards_ajax_container").height()
				}, "slow");
			});
		
			$("#bump").live("click", function() {
				//$.get("http://www.phishvids.com/bump.php", function(data) {
					$("#post_body").html("Bump");
					$.post("http://" + window.location.host + window.location.pathname, $("#new_post").serialize(), function(data) {
						mt = true;
						$("#post_body").val("");
						$("#post_submit").val("Post Reply").removeAttr("disabled");
						afterAjax();
					});
				//});
			});
		
			$(".posts_footer a:last").prev('a').attr("onclick", "").click(function() {
				$('html, body').animate({
					scrollTop: 0
				}, "slow");
			});
		
			$(".posts_footer a:last").attr("onclick", "").live("click", function() {
				afterAjax();
				return false;
			});
		
			$(".posts_footer a:nth(1), .topic_header .require_logged_in a").attr("onclick", "").live("click", function() {
				$.post("/topic_bookmarks?topic_bookmark%5Btopic_id%5D=" + topic, function() {
					$(".posts_footer .require_logged_in").css("color", "#757575").html('✔');
					$(".topic_header .require_logged_in").css({
						"float": "right",
						"font-size": "9px",
						"padding": "4px 4px"
					}).html('✔');
					mt = true;
				});
				return false;
			});
		
			function afterAjax() {
				$("#boards_ajax_container").load("http://" + window.location.host + window.location.pathname + " #boards_ajax_container > *", function() {
					$(".posts_footer a:last").attr("onclick", "");
					$(".topic_header .require_logged_in").after('<span class="usr_tools"><a href="#" id="scrollDown" title="Go Down">Down</a><a href="#" id="bump" title="Bump">Bump</a></span>');
					if (mt) {
						$(".posts_footer .require_logged_in").css("color", "#757575").html('✔');
						$(".topic_header .require_logged_in").css({
							"float": "right",
							"font-size": "9px",
							"padding": "4px 4px"
						}).html('✔');
					}
					$(".posts_footer a:last").prev('a').attr("onclick", "").click(function() {
						$('html, body').animate({
							scrollTop: 0
						}, "slow");
					});
					findHidden();
					replaceLinks();
					//alert($('script[src*=pt_js_cached]').attr("src"));
					//$("head").append("<script type='text/javascript' src='"+$('script[src*=pt_js_cached]').attr("src")+"'>setup_show_tooltips()</script>");
				});
			}
		
			function showOverlap() {
				for (var i = 0; i < overlap; i++) {
					$(".overlap_post:nth(" + (4 - i) + ")").show();
				}
			}
		
			function replaceLinks() {
		/*$.post("http://"+window.location.host + window.location.pathname, {authenticity_token: $('input[name*="authenticity_token"]').val(), post_body:"testing123",post_topic_id: topic,commit: "Post Reply"}, function(data) {
						alert(data);
					});*/
				$("a[href$='.jpg'], a[href$='.jpeg'], a[href$='.png'], a[href$='.gif']").each(function(i) {
					var href = $(this).attr('href');
					var text = $(this).text();
					originalColor = $(this).css("color");
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					if (showSet === "load" && ($(this).parents("div").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='ptimg" + i + "' src='" + href + "' alt='' style='max-width:100%;' />");
					} else {
						$(this).css("color", "#" + colorSet).attr("class", "ptimg" + i).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					}
					$("#ptimg" + i).error(function() {
						$(this).hide().parent("a").css("color", originalColor);
					});
				});
				var temp = true;
				if ($("a[href*='youtube'], a[href*='youtu.be'], a[href*='vimeo']").length >= 10) {
					temp = false;
				}
				$("a[href*='youtube'], a[href*='youtu.be']").each(function(i) {
					var href = $(this).attr("href");
					var text = $(this).text().replace("amp;", "");
					var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
					var id = href.match(myregexp); //^[^v]+v.(.{11}).*
					if (id == null) return;
					else id = id[1];
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					console.log(id);
					var objectstr = '<iframe class="youtube-player" type="text/html" width="100%" height="385" src="http://www.youtube.com/embed/' + id + '" frameborder="0"></iframe>';
		
					if ((videoSet === "vload" && temp) && ($(this).parents("div").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + objectstr);
					} else {
						$(this).css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + objectstr);
							return false;
						});
					}
				});
				$("a[href*='vimeo']").each(function(i) {
					var href = $(this).attr("href");
					var text = $(this).text();
					var id = href.match(/[0-9]+/, "");
					var objectstr = '<iframe class="vimeo-player" src="http://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>';
					var stringer = "";
					if (text != href) {
						stringer = text;
					}
					if ((videoSet === "vload" && temp) && ($(this).parents("div").css("font-style") != "italic" || quotesSet === "qyes")) {
						$(this).css("color", "black").html(stringer + objectstr);
					} else {
						$(this).css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + objectstr);
							return false;
						});
					}
				});
				$(".post:not(:hidden):even").removeClass("even").addClass("odd");
				$(".post:not(:hidden):odd").removeClass("odd").addClass("even");
				if (scrollSet != "false") {
					$(".post_body_container").css("max-height", "none");
				}
			}
		
			function getNumber(s) {
				var string = new Array();
				for (var i = 1; i < s.length; i++) {
					if (parseInt(s.slice(-i)) >= 0) {
						string = s.slice(-i);
					} else {
						break;
					}
				}
				return string;
			}
		
			function checkOc(s, y) {
				var number = 0;
				while (s.indexOf(y, 0) >= 0) {
					number++;
					s = s.replace(y, "");
				}
				return number;
			}
		
			function findHidden() {
				$("script[src=]").each(function() {
					var text = $(this).text();
					var index = text.indexOf("PT.board_overlap_window");
					if (text.indexOf("set_hidden_authors") >= 0) {
						for (var i = 0; i < text.length; i++) {
							if (text.slice(i, i + 2) === "([") {
								var hide = text.slice(i + 1, -11);
								hidePosts(eval(hide));
								break;
							}
						}
					} else if (index >= 0) {
						overlap = text.slice(index + 26, index + 27);
						showOverlap();
						return;
					}
				});
			}
		
			function hidePosts(a) {
				for (var i = 0; i < a.length; i++) {
					$(".author_" + a[i]).hide();
				}
			}
		
			$("img").live("mousedown", function() {
				lastele = $(this);
			});
		
			chrome.extension.sendRequest({
				set: "show"
			}, function(response) {
				showSet = response.setShow;
				colorSet = response.setColor;
				quotesSet = response.setQuotes;
				videoSet = response.setVideo;
				reloadTopic = response.setReload;
				scrollSet = response.setScroll;
				if (reloadTopic != "false") {
					$("#post_submit").type = "button";
					$("#post_submit").attr("onclick", "return false;").live("click", function() {
						$(this).val("Posting...").attr('disabled', 'disabled');
						$("#errorExplanation").remove();
						if (checkOc($("#post_body").val(), "quote") > 8) {
		
							$("#boards_ajax_container").after('<div class="errorExplanation" id="errorExplanation"><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>You cannot have more than 4 quotes.</li></ul></div>');
							$("#post_submit").val("Post Reply").removeAttr("disabled");
							return false;
						}
						if ($("#post_body").val().length < 1) {
							var errorHTML = "<div class='errorExplanation' id='errorExplanation'><h2>1 error prohibited this post from being saved</h2><p>There were problems with the following fields:</p><ul><li>Body is too short (minimum is 2 characters)</li></ul></div>";
							$("#boards_ajax_container").after(errorHTML);
							return false;
						} else if ($("#post_body").val().length < 2) {
							$("#post_body").val($("#post_body").val() + " ")
						}
						$.post("http://" + window.location.host + window.location.pathname, $("#new_post").serialize(), function(data) {
							mt = true;
							$("#post_body").val("");
							$("#post_submit").val("Post Reply").removeAttr("disabled");
							afterAjax();
						});
					});
				}
				if (!colorSet) {
					colorSet = "0000FF";
				}
				replaceLinks();
			});
		
			chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
				if (request.run === "replaceLinks") {
					var videoset2 = videoSet;
					var showset2 = showSet;
					showSet = "load";
					videoSet = "vload";
					replaceLinks();
					showSet = showset2;
					videoSet = videoset2;
				} else if (request.run === "close") {
					var par = lastele.parent("a");
					lastele.remove();
					var href = par.attr("href");
					var stringer = par.text();
					if (par.text().length === 0) {
						par.html(href);
					}
					par.css("color", "#" + colorSet).click(function() {
						$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
						return false;
					});
				} else if (request.run === "closeAll") {
					$(".addedPTImages").each(function() {
						var par = $(this).parent("a");
						$(this).remove();
						var href = par.attr("href");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					});
					$(".youtube-player").each(function() {
						var par = $(this).parent("a");
						$(this).remove();
						var href = par.attr("href");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + "<img class='addedPTImages' id='" + $(this).attr('class') + "' src='" + href + "' alt='' style='max-width:100%;' />").unbind('click');
							return false;
						});
					});
					$(".vimeo-player").each(function() {
						var par = $(this).parent("a");
						var href = par.attr("href");
						$(this).remove();
						var id = href.match(/[0-9]+/, "");
						var stringer = par.text();
						if (par.text().length === 0) {
							par.html(href);
						}
						par.css("color", "#" + colorSet).click(function() {
							$(this).css("color", "black").html(stringer + '<iframe class="vimeo-player" src="http://player.vimeo.com/video/' + id + '?portrait=0" width="100%" height="335" frameborder="0"></iframe>').unbind('click');
							return false;
						});
					});
				}
				sendResponse({}); // snub them.
			});