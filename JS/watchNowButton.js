$("#jumpButton").show()

$("#jumpButton").on("click", function () {
    $("html, body").animate({
        scrollTop: $("#sida3").offset().top
    }, 600);

    console.log("Fff");
});
