jQuery(document).ready(function(){
    var hashUrl = window.location.hash.substr(1);
    if(hashUrl){
        hashUrl = '#' + hashUrl;
        jQuery('a').each(function(){
            var anchorUrl =  jQuery(this).attr('href');
            if(hashUrl == anchorUrl){
                var anchor = jQuery(this);
                window.setTimeout(function(){
                    anchor.click();
                }, 500);
            }
        });
    }
});