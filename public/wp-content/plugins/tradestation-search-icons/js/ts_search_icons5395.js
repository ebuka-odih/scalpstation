jQuery(document).ready(function(){

    getSearchApiToken();

    jQuery('#result-content').html(getResentSearch());
    validateImages();

    const inputSearch = jQuery('.ts-search-input');
    inputSearch.keyup(function(event){
        loadingIndicator();
        if(inputSearch.val() != ""){
            getSearchResult(inputSearch.val());
        } else {
            jQuery('#result-content').html(getResentSearch());
            validateImages();
        }
    });

    jQuery(function(){
        jQuery("#modal-launcher, #modal-background, #modal-close").click(function() {
            jQuery("#modal-content, #modal-background").toggleClass("active");
        });
    });

    jQuery(document).on('click', '#et_top_search_symbol', function(event){
        jQuery('.ts-search-input').val("");
        jQuery("#modal-content, #modal-background").toggleClass("active");
        jQuery('.ts-search-input').focus();
        event.preventDefault();
        return false;
    });

});

jQuery(document).keyup(function(e) {
    if (e.key === "Escape") { // escape key maps to keycode `27`
        if(jQuery("#modal-content").is(':visible')){
            jQuery("#modal-content, #modal-background").toggleClass("active");
        }   
   }
});

jQuery(document).on('click', '.result-item', function(){
    const   search_results          = jQuery('.result-item').length,
            search_result_position  = parseInt(jQuery(this).index()) + 1,
            search_term             = jQuery('.ts-search-input').val(),
            search_result_selected  = jQuery(this).attr('data-id');

    //Push the Search Event to the Data Layer for Google Tag Manager
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'click.SearchResults',
        'search_term': search_term,
        'search_category': 'symbol',
        'search_results': search_results,
        'search_result_selected': search_result_selected,
        'search_result_position': search_result_position
    });

    const redirectUrl       = jQuery(this).attr('data-itemurl') + '?search=true';
    window.location.href    = redirectUrl;
});

jQuery(document).on('click', '.search-input-esc', function(){
    jQuery("#modal-content, #modal-background").toggleClass("active");
});

function loadingIndicator(){
    var resentResarchText = "";
    resentResarchText += '<span class="seach-title"><h3>Loading...</h3></span>';
        resentResarchText += '<div class="search-result-items">';
        for (let i = 0; i < 3; i++) {
            resentResarchText += '<div class="result-item">';
                resentResarchText += '<span class="result-item-img">';
                    resentResarchText += '<span>';
                        resentResarchText += '<span class="loading-indicator-img"></span>';
                    resentResarchText += '</span>';
                resentResarchText += '</span>';
                resentResarchText += '<span class="loading-indicator-result-item-name">';
                    resentResarchText += '<span class="loading-indicator-text"></span>  ';
                    resentResarchText += '<span class="loading-indicator-text"></span>';
                resentResarchText += '</span>';
            resentResarchText += '</div>';
        }
        resentResarchText += '</div>';
    
    jQuery('#result-content').html(resentResarchText);
}

function displayResult(symbols){
    if(symbols.length){
        const titleSymbols      = '<span class="seach-title"><h3>Symbols</h3></span>';
        const divConent         = '<div class="search-result-items">';
        const closeDivConent    = '</div>'
        const resultTemplate    = ({ id, name, logo }) => `
            <div class="result-item" data-itemurl="` + ts_search_extra_params.search_path + `${id}" data-name="${name}" data-id="${id}">
                <span class="result-item-img">
                    <span>
                        <img alt="${name}" src="${logo}"> 
                    </span>
                </span>
                <span class="result-item-name">
                    <span class="item-name">${name}</span>
                    <span class="item-id">${id}</span>
                </span>
            </div>
        `;
        jQuery('#result-content').html(titleSymbols + divConent + symbols.map(resultTemplate).join('') + closeDivConent);
        const searchTerm = jQuery('.ts-search-input').val();
        jQuery('.result-item-name').mark(searchTerm);
    } else {
        const noResultTemplate = `
            <div class="no-result-text">No results</div>
            <hr>
            <div class="no-result-logo">
                <div class="">
                    <svg width="35px" height="35px" fill="none" xmlns="http://www.w3.org/2000/svg" class="mb-4">
                        <path d="M20.39 11.08l-8.604 24.068c7.468 0 13.557-6.047 13.557-13.556 0-4.22-1.908-7.995-4.952-10.511zM24.323 0l-2.882 8.117h6.576c4.464 0 8.117-3.612 8.117-8.117h-11.81zM9.024 0A8.159 8.159 0 00.866 8.158h9.295a13.4 13.4 0 00-1.137 5.398c0 3.896 1.624 7.386 4.262 9.862L21.647 0H9.024z" fill="#0089CF"></path>
                    </svg>
                </div>
                <div class="">
                    <span class="">No results for your query, please try a new one</span>
                </div>
            </div>
        `;
        jQuery('#result-content').html(noResultTemplate);
    }
    
}

function getSearchResult(searchTerm){
    const apiToken = getSearchApiToken();
    if(apiToken){
        
        const settings = {
            "url": ts_search_extra_params.endpoint,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": "Bearer " + apiToken,
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                query: "query search {\n        symbolsSearch(where:{\n        searchTerm: \"" + searchTerm + "\"\n        limit: " + ts_search_extra_params.limit_result + "\n        }) {\n        error{\n          message\n          type\n          subType\n        }\n        symbolsSearch{\n            count\n            symbols{           \n            ... on StockSymbol{\n              id\n              name\n              logo         \n          }  \n        }\n      }\n    }\n  }",
                variables: {}
            })
        };
        jQuery.ajax(settings).done(function (response) {
            const symbols = response.data.symbolsSearch.symbolsSearch.symbols;
            displayResult(symbols);
        });
    }
}

function getResentSearch(){
    const resentResarch = JSON.parse(localStorage.getItem('recent-searches'));
    var resentResarchText = "";
    if(resentResarch != null && resentResarch.length){
        resentResarchText += '<span class="seach-title"><h3>Recent searches</h3></span>';
        resentResarchText += '<div class="search-result-items">';
        jQuery.each(resentResarch, function(key, value ){
            resentResarchText += '<div class="result-item" data-itemurl="' + ts_search_extra_params.search_path + value.search.symbol + '">';
                resentResarchText += '<span class="result-item-img">';
                    resentResarchText += '<span>';
                        resentResarchText += '<img class="resent-search-images" alt="' + value.search.name + '" src="' + value.search.logo + '">';
                    resentResarchText += '</span>';
                resentResarchText += '</span>';
                resentResarchText += '<span class="result-item-name">';
                    resentResarchText += '<span class="item-name">' + value.search.name + '</span>  ';
                    resentResarchText += '<span class="item-id">' + value.search.symbol + '</span>';
                resentResarchText += '</span>';
            resentResarchText += '</div>';
        });
        resentResarchText += '</div>';
    }
    return resentResarchText;
}

function validateImages(){
    jQuery('.resent-search-images').each(function(){
        var currentImage    = jQuery(this);
        var companyName     = jQuery(this).attr('alt');
        currentImage.error(function(){
            currentImage.parent().parent().parent().addClass('result-item-no-image');
            currentImage.parent().addClass('image-replace-content');
            currentImage.parent().html('<span class="image-replace">' + companyName.charAt(0) + '<span>');
        });
    });
}

function getSearchApiToken(){
    if(getWithExpiry('searchApiToken')){
        return getWithExpiry('searchApiToken');
    } else {
        return createSearchToken();
    }
}

function createSearchToken(){
    const settings =  {
        "url": ts_search_extra_params.token,
        "method": "GET",
        "timeout": 0,
    }
    jQuery.ajax(settings).done(function(response){
        const expireTime = parseInt(response.expires_in) * 1000
        setWithExpiry('searchApiToken', response.token, expireTime);
        return response.token;
    });
}

function setWithExpiry(key, value, ttl) {
	const now = new Date()

	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr);
	const now = new Date();
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}