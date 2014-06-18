// ==UserScript==
// @name           dafilms.com link extractor
// @namespace      dafilms.com
// @description    Prints the video direct download link
// @updateURL      https://raw.githubusercontent.com/surrealcode/smz-userscripts/master/dafilms/dafilms.user.js
// @downloadURL    https://raw.githubusercontent.com/surrealcode/smz-userscripts/master/dafilms/dafilms.user.js
// @include        http://dafilms.com/film/*
// @include        http://dafilms.com/download/*
// @include        http://dafilms.com/film/*
// @version        0.2
// ==/UserScript==


if ($(".pagination").length > 0) {
    var timer = 0;
    var links = [];
    var currPage = $("body").html();

    function fetchButton() {
        var interval = 2000;
        timer = setInterval(function() {
            BidClick();
        }, interval);
    }

    function fetchDoc() {

        $("#article .article", $(currPage)).each(function(i, v) {
            var link = "http://dafilms.com" + $("h3 > .upper", $(this)).attr("href");
            links.push(link);
        });

        if ($(".disabled.next", $(currPage)).length > 0) {
            clearInterval(timer);
            timer = "";
        } else {
            var next = $(".current.page").next("a").attr("href");

            $.ajax({type: "GET",
                url: "http://dafilms.com/film/" + next,
                async: false,
                success: function(response) {
                    currPage = $("body", $(response)).html();
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            });
        }
    }


} else {
    var html = $("body").html();
    var linkStart = html.indexOf("http://stream.dafilms.com/video.mp4?");
    var link;
    if (linkStart === -1) {
        link = "Not found. Be sure to click 'Play' first.";
    } else {
        var linkEnd = html.indexOf("'", linkStart);
        link = html.substring(linkStart, linkEnd);
    }

    $(".movie-top-info").append("<p>DOWNLOAD LINK:</p>" + link);
}