var livePerson;
var livePersonContactUs;
var way_api = custom_script_params.way_api;

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
};

//console.log('chat-gdpr');
_LTracker.push('starting tscom chat-gdpr');

(function ($) {
    $(document).ready(function () {
      var authToken = getQueryStringValue('access_token');
      if ( authToken !== "" ) {
        _LTracker.push('tscom chat-gdpr token found');

        var fdcnId, userFullName, userFirstName, userLastName, userEmailAddress;
        $.ajax({
            url: way_api,
            type: 'GET',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + authToken );
            },
            data: {},
            error: function (status, error) {
              //console.log("status: "+status+" Error: "+error);
              _LTracker.push({
                  'location': 'tradestation_chat.js',
                  'application': 'Live Chat',
                  'function': 'Ajax call to csapi to get customer info (failed)',
                  'customer_type' : 'Existing Customer',
                  'status' : status,
                  'error': error,
              });
            },
            success: function (response) {
                _LTracker.push({
                  'location': 'tradestation_chat.js',
                  'application': 'Live Chat',
                  'function': 'Ajax call to csapi to get customer info (succeded)',
                  'customer_type' : 'Existing Customer',
                  'call_response' : response,
                });
                fdcnId = response.fdcnid;
                userFullName = response.firstName + ' ... ' + response.lastName;
                userFirstName = response.firstName;
                userLastName = response.lastName;
                userEmailAddress = response.email;
                //console.log('result: ' + fdcnId + ' ' + userFullName + ' ' + userEmailAddress);
                livePerson = new tslivePerson('CUSTOMER', fdcnId, userFullName, userFirstName, userLastName, userEmailAddress);
                livePerson.init();
            }
        });
      } else {
        //console.log('new user');
        _LTracker.push({
          'location': 'tradestation_chat.js',
          'application': 'Live Chat',
          'function': 'Starting Chat',
          'customer_type' : 'Prospect',
        });
        livePerson = new tslivePerson('PROSPECT', fdcnId, userFullName, userFirstName, userLastName, userEmailAddress);
        livePerson.init();
      }
    });


})(jQuery);
