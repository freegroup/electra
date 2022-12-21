import "../less/index.less"

// simple text fade out for the card headers
//
function get() {
var el = $('.section_header');
el.each((index, text) => {
    text = $(text)
    var offset = text.offset().top - $(window).scrollTop();
    if (offset > 200) {
    text.css("opacity", 0)
    } else if (offset > 100) {
    text.css("opacity", (100-(offset-100)) / 100)
    } else {
    text.css("opacity",  1)
    }
})
return true
}

get();
$(window).scroll(get);
