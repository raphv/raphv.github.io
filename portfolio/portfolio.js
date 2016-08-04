$(function() {
    
    var currentLanguage = "en";
    var availableLanguages = $('li.lang').map(function(){return this.lang;}).toArray();
    var browserLanguages = window.navigator.languages || [window.navigator.language || window.navigator.userLanguage || "en"];
    for (var i = 0; i < browserLanguages.length; i++) {
        var langToTest = browserLanguages[i];
        if (availableLanguages.indexOf(langToTest) !== -1) {
            currentLanguage = langToTest;
            break;
        }
    }
    
    function refreshLanguage() {
        $(".multilang li[lang]").addClass("inactive-language");
        $(".multilang li[lang='" + currentLanguage + "']").removeClass("inactive-language");
        $("ul.multilang").each(function() {
            var $children = $(this).find("li[lang]");
            if ($children.length === $children.filter(".inactive-language").length) {
                $children.first().removeClass("inactive-language");
            }
        });
        $("#langselect li").removeClass("active");
        $("#langselect li[lang='" + currentLanguage + "']").addClass("active");
        $("title").text($("h1 .multilang li[lang='" + currentLanguage + "']").text());
    }
    
    $("#langselect li").click(function() {
        currentLanguage = this.lang;
        refreshLanguage();
        return false;
    });
    
    var $w = $(window);
    
    $("div.project-image, h3.project-title").click(function() {
        var $p = $(this).parent();
        var isdet = $p.hasClass("show-detail");
        $("li.project").removeClass("show-detail");
        $p.toggleClass("show-detail",!isdet);
        $('html, body').animate({
            'scrollTop': ($p.offset().top + $p.height()/2 - $w.height() / 2)
        }, 500);
        return false;
    });
    
    var currentTag = null;
    
    $("li.filtertag").click(function() {
        var $this = $(this);
        $("li.filtertag").removeClass("active");
        var tag = $this.attr("tag-id");
        if (currentTag === tag) {
            currentTag = null;
            $("li.project").removeClass("hidden");
        } else {
            currentTag = tag;
            $this.addClass("active");
            $("li.project").addClass("hidden");
            $("li.project-metadata[tag-id='" + tag + "']").parents("li.project").removeClass("hidden");
            $("li.project.hidden").removeClass("show-detail");
        }
        return false;
    });
    
    refreshLanguage();
});
