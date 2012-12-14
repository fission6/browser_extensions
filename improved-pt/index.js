var firstSet, top2;

main();
function main() {
	$(".topic_row:not(:hidden):even").removeClass("even").addClass("odd");
	$(".topic_row:not(:hidden):odd").removeClass("odd").addClass("even");
	top2 = $(".topic_row").attr("class");
}

chrome.extension.sendRequest({
    set: "index"
}, function (response) {
    firstSet = response.setFirst;
    if (firstSet == "true") {
    	$(".topic_subject_container a").live("click", function() {
    		$(this).attr("href", $(this).attr("href")+"?page=1");
    	});
    }
});