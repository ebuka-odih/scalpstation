jQuery(document).ready(function(){
    window.setTimeout(function(){
        jQuery('#mobile_menu .menu-item-has-children a').each(function(){
            var anchor = jQuery(this), url = anchor.attr('href'), parent = anchor.parent().parent();
            if(!parent.hasClass('sub-menu')){
                anchor.append('<div class="arrow-menu"><i class="fa fa-chevron-down" aria-hidden="true"></i></div>');
                anchor.replaceWith(function(){
                    return jQuery("<span />", {
                        html:       jQuery(this).html(),
                        'data-url': url,
                        'class':    'open-menu'
                    });
                });
            }
        });
        
        jQuery('.sub-menu .menu-item a').each(function(){
            var subMenuItem = jQuery(this);
            if(subMenuItem.attr('href') == '#live_chat'){
                subMenuItem.attr('id', 'execute_live_chat');
            }
            if(subMenuItem.attr('href') == '#call_me'){
                subMenuItem.attr('id', 'execute_call_me');
            }
        });
        
        jQuery('#mobile_menu .menu-item a .hide-mobile').each(function(){
            jQuery(this).parent().parent().remove();
        });
        
    },500);
    
    jQuery(document).on('click', '.open-menu', function(e){
        window.location.href = jQuery(this).attr('data-url');
        return false;
    });
    
    jQuery(document).on('click', '#execute_call_me', function(e){
        e.preventDefault();
        jQuery('.mobile_menu_bar.mobile_menu_bar_toggle').click();
        jQuery('.menu-item a.fonoloModal').click();
        return false;
    });
    
    jQuery(document).on('click', '#live_chat', function(e){
        e.preventDefault();
        jQuery('.mobile_menu_bar.mobile_menu_bar_toggle').click();
        jQuery('#topNavChat').click();
        return false;
    });
    
    jQuery(document).on('click', '.arrow-menu', function(e){
        e.preventDefault();
        var arrowElement = jQuery(this);
        if(arrowElement.hasClass('fa-rotate-180')){
            arrowElement.removeClass('fa-rotate-180');
            arrowElement.parent().parent().children('.sub-menu').slideUp(function(){
                jQuery(this).attr("style", "display: none !important");
            });  
        } else {
            arrowElement.addClass('fa-rotate-180');
            arrowElement.parent().parent().children('.sub-menu').slideDown(function(){
                jQuery(this).attr("style", "display: block !important");
            });  
        }
        return false;
    });

}); 

