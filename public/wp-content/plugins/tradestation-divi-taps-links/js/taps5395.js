jQuery(document).ready(function(){
    window.setTimeout(function(){
        jQuery('.et_pb_tabs_controls li').click(function(){
            var currentClass    = jQuery(this).attr('class'),
                classesNames    = currentClass.split(" "),
                className       = classesNames[0];
            window.history.replaceState({}, '','#' + className);
        });
        var hashUrl = window.location.hash.substr(1);
        if(hashUrl){
            if(hashUrl.includes('et_pb_tab')){
                var goToElement = jQuery('li.' + hashUrl + ' a'),
                    container   = jQuery("html,body");
                goToElement.click();
                container.animate({scrollTop: goToElement.offset().top - container.offset().top + container.scrollTop(), scrollLeft: 0},300);
            }
        }
    }, 500);
});