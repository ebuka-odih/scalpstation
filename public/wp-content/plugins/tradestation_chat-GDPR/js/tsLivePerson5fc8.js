var tslivePerson = function (type, fdcnId, fullName, userFirstName, userLastName, userEmailAddress) {
    var blank = "N_A";
    var cookieAuth = "Authorization";
    var cookieAutoStart = "tslpsettings";
    var prospectUserType = 'PROSPECT';
    var websiteUserType = 'CUSTOMER';
    var lpState = '';
    var userId = fdcnId;
    var userType = type;
    var firstName = userFirstName || "";
    var lastName = userLastName || "";
    var emailAddress = userEmailAddress || "";
    var phoneNumber = "";
    var contactId = blank;
    var contactUrl = blank;
    var contactValue = blank;
    var lpCache = new tsLivePersonCache();
    var repOnline = {sales: false, clientServices: true, any: false};
    var invitationToChatInfo = {intervalId: null, time: new Date()};
    var $ = jQuery;
    var logMessage = '';
    var domain = liveperson_extra_params.current_domain;
    var tscomapi = liveperson_extra_params.tscomapi;

    this.init = function () {
        setLayouts();
        waitForLiveEngageToLoad();
        addListeners();
    };

    //Send data to loggly account
    function createLog(functionName, data, saveLog){
        try {
            if(saveLog){
                _LTracker.push({
                    'application': 'Live Chat',
                    'location': 'tsLivePerson.js',
                    'function': functionName || '',
                    'data' : data || {},
                    'fdcnid' : userId || '',
                    'userType' : userType || ''
                });
            }
        }
        catch(err) {
            log("error while creating logs");
        }
        
    }

    function log(message) {
        console && console.log && console.log(message);
    }

    function verifyChatAvailability(){
        return new Promise(function(resolve, reject){
            $.ajax({ 
                type: 'POST',
                url: domain + 'services/liveperson.php',
                error: function (status, error) {
                    console.log(logMessage);
                    _LTracker.push({
                        'location': 'tsLivePerson.js',
                        'application': 'Live Chat',
                        'function': 'verifyChatAvailability (failed)',
                        'status' : status,
                        'error': error,
                    });
                    return reject(error);
                 },
                success: function (response) {
                    var result = $.parseJSON(response);
                    createLog('verifyChatAvailability (succeded)', result, true);
                    if(!result || result.length === 0){
                        return resolve(false);
                    }else if(result[1].availability){
                        return resolve(true);
                    }else{
                        return resolve(false);
                    }
                }
            });    
        });
    }

    function waitForLiveEngageToLoad() {
        createLog('waitForLiveEngageToLoad', 'None', false);
        if ($('#lpHiddenButton').children().length) {
            $("#topNavChat").show();
            //$("#imgLivePersonChatContactUs").parent().show();
            
            if ($('#lpHiddenButton').text() == "1") {
                //repOnline.any = true;
                //repOnline.sales = ($('#lpHiddenButton_sales').text() == "1");
                //repOnline.clientServices = ($('#lpHiddenButton_clientServices').text() == "1");
                setOnline();
            }
            //if (checkAutoStart()) {
            if (isUserSignedIn()) {
                createLog('waitForLiveEngageToLoad', 'User signed already, starting chat', true);
                startChat();
            }
            /*invitationToChatInfo.intervalId = setInterval(interceptInvitationToChatButton, 200);
             setInterval(checkForOnlineAgents, 30000);*/
             resetValues();
        }
        else {
            log('waitingForLivePersonToLoad');
            setTimeout(waitForLiveEngageToLoad, 1000);
        }
    }

    function setLayouts() {
        createLog('setLayouts', 'Setting', true);
        var newbtn = $('#divnewbtn');
        if (newbtn != null) {
            var newbtnchild = newbtn.children('script').eq(0);
            if (newbtnchild != null) newbtnchild.remove();
            newbtn.click(startPreChatSurvey);
        }

        $('.chat-offline-link').click(closeModal);
        $('#startChatButton').click(clickedSurvey);
        $("#topNavChat").hide().click(startChat);
        $("#imgLivePersonChatContactUs").parent().hide().click(startChat);
        $('#btnGoToLogIn').click(lpCache.clearCache);
        createLog('setLayouts', 'All set', true);
    }

    function startPreChatSurvey() {
        createLog('startPreChatSurvey', 'None', true);
        if (personalInfoAlreadySent()) {
            createLog('startPreChatSurvey', 'Personal Info already sent, opening livechat window', true);
            closeModal();
            openLivePersonChatWindow();
        }
        else {
            createLog('startPreChatSurvey', 'First time, opening prechat survey to collect personal info', true);
            openPreChatSurvey();
        }
    }

    function openPreChatSurvey() {
        createLog('openPreChatSurvey', 'staring', true);
        $("#livePersonPopup").modal('hide');
        $("#livePersonSurvey").modal('show');
        toggleSurveyEnabled(true);
        createLog('openPreChatSurvey', 'done', true);
    }

    function startChat() {
        createLog('startChat', 'starting', true);

        if ($('#lpHiddenButton') && $('#lpHiddenButton').text() && $('#lpHiddenButton').text() !== "0" ) {
            if (isUserSignedIn()) {
                createLog('startChat', 'user signed already', true);
                getSurveyInfoAsync();
                openLivePersonChatWindow();
            }
            else {
                createLog('startChat', 'opening NewOrExistinAccountWindow', true);
                openNewOrExistinAccountWindow();
            }
        }else{
            createLog('startChat', 'chat offline', true);
        }
        
        createLog('startChat', 'done', true);
    }

    function isUserSignedIn() {
        createLog('isUserSignedIn', userId, true);
        return userId > 0;
    }

    function openLivePersonChatWindow() {
        createLog('openLivePersonChatWindow', 'starting', true);
        sendPersonalInfo();

        var buttonToClick = '#lpHiddenButton div';

        if (repOnline.sales){
            buttonToClick = '#lpHiddenButton_sales div';
        }
        if (repOnline.clientServices){
            buttonToClick = '#lpHiddenButton_clientServices div';
        }
            
        try{
            createLog('sendSdesSuccess', lpTag.sdes.get().personal[0], true); 
        }catch(error){
            createLog('sendSdesFail', error, true);
        }

        $(buttonToClick).click();
        //log('openLivePersonChatWindow ' + buttonToClick);
        createLog('openLivePersonChatWindow', 'done', true);
    }

    function openNewOrExistinAccountWindow() {
        createLog('openNewOrExistinAccountWindow', 'starting #livePersonPopup modal', true);
        $("#livePersonPopup").modal('show');
    }

    function checkAutoStart() {
        var cook = null;
        var authcook = getCookie(cookieAuth);
        if (authcook) {
            cook = getCookie(cookieAutoStart);
            var opts = {};
            opts.path = '/';
            if (cook) Cookie.remove(cookieAutoStart, opts);
        }
        return cook != null;
    }


    function updateOnlineStatus(newValue) {
        if (hasRepOnlineStatusChanged(newValue)) {
            lpTag.newPage(window.location.toString());
            newValue.any ? setOnline() : setOffline();
            repOnline = newValue;
        }
    }

    function hasRepOnlineStatusChanged(newValue) {
        createLog('hasRepOnlineStatusChanged', 'starting', true);
        return (newValue.sales != repOnline.sales ||
        newValue.clientServices != repOnline.clientServices ||
        newValue.any != repOnline.any);
    }

    function setOnline() {
        $("#livePersonChat .Chat_online").show();
        $("#livePersonChat .Chat_offline").hide();
    }

    function setOffline(state) {
        $("#livePersonChat .Chat_online").hide();
        $("#livePersonChat .Chat_offline").show();
    }

    function interceptInvitationToChatButton() {
        var search = $('body > .LPMcontainer');
        if (search.length) {
            clearInterval(invitationToChatInfo.intervalId);
            search[0].onclick = null;
            search.click(startChat);
        }
        else {
            var now = new Date();
            if (now - invitationToChatInfo.time > 120000) {//2 minutes
                clearInterval(invitationToChatInfo.intervalId);
                log('stopped checking for invitation to chat engagement');
            }
        }
    }

    function closeModal() {
        $(".close-modal").click();
    }

    function clickedSurvey() {
        createLog('clickedSurvey', 'starting', true);
        var success = isValidSurvey();
        if (success) {
            createLog('clickedSurvey', 'valid survey', true);
            toggleSurveyEnabled(false);
            getSurveyInfoAsync();
            closeModal();
            openLivePersonChatWindow();
        }
    }

    function setSurveyFields() {
        createLog('setSurveyFields', 'starting', true);
        contactId = "";
        contactUrl = "";
        contactValue = "";
        if (userType == 'PROSPECT') {
            firstName = $("#txtFirstName").val().trim();
            lastName = $("#txtLastName").val().trim();
            emailAddress = $("#txtEmailAddress").val().trim();
            phoneNumber = $("#txtPhoneNumber").val().replace(/\D/g,'');
        }
        var message = 'userType='+userType+'firstName='+firstName+'emailAddress='+emailAddress+'phoneNumber='+phoneNumber;
        createLog('setSurveyFields', message, true);
    }

    function toggleSurveyEnabled(enable) {
        if (enable === true) {
            $("#txtFirstName").removeAttr('disabled');
            $("#txtLastName").removeAttr('disabled');
            $("#txtEmailAddress").removeAttr('disabled');
            $("#txtPhoneNumber").removeAttr('disabled');
        }
        else {
            $("#txtFirstName").attr('disabled', 'disabled');
            $("#txtLastName").attr('disabled', 'disabled');
            $("#txtEmailAddress").attr('disabled', 'disabled');
            $("#txtPhoneNumber").attr('disabled', 'disabled');
        }
    }

    function isValidSurvey() {
        createLog('isValidSurvey', 'starting', true);
        var result = true;
        setSurveyFields();
        $("#errorMessages").hide().empty();
        if ((firstName.length == 0) || (lastName.length == 0) || (emailAddress.length == 0)) {
            $("#errorMessages").html("Please provide values for all of the required fields.").show();
            result = false;
        }
        else if (!isValidEmail(emailAddress)) {
            $("#errorMessages").html("Please provide a valid Email Address.").show();
            result = false;
        }
        else if (phoneNumber.length > 0) {
            if (!isValidPhone(phoneNumber)) {
                $("#errorMessages").html("Please provide a 10-digit Phone Number.").show();
                result = false;
            }
        }
        createLog('isValidSurvey', 'done', true);
        return result;
    }

    function sendPersonalInfo() {
        createLog('sendPersonalInfo', 'starting', true);
        var saveToCache = lpCache.getCache() || {};

        if(saveToCache && saveToCache.personalInfo){
            firstName = saveToCache.personalInfo.personal.firstname;
            lastName = saveToCache.personalInfo.personal.lastname;
            emailAddress = saveToCache.personalInfo.personal.contacts[0].email;
            phoneNumber = saveToCache.personalInfo.personal.contacts[0].phone;
            userType = saveToCache.personalInfo.personal.company;
        }

        var message = 'userType='+userType+'firstName='+firstName+'emailAddress='+emailAddress+'lastName='+lastName+'phoneNumber'+phoneNumber;
        createLog('sendPersonalInfo', message, true);
        if ( firstName && lastName && emailAddress && userType ) {
            saveToCache.personalInfo = {
                "type": "personal",
                "personal": {
                    "firstname": firstName,
                    "lastname": lastName,
                    "contacts": [{
                        "email": emailAddress,
                        "phone": phoneNumber
                    }],
                    "company": userType
                }
            };

            lpTag.sdes = lpTag.sdes || [];
            lpTag.sdes.push(saveToCache.personalInfo);
            lpCache.setCache(saveToCache);
            createLog('sendPersonalInfo', saveToCache.personalInfo, true);
        }
        createLog('sendPersonalInfo', 'done', true);
    }


    function personalInfoAlreadySent() {
        createLog('personalInfoAlreadySent', 'starting', true);
        var cachedValue = lpCache.getCache();
        if(cachedValue && cachedValue.personalInfo){
            firstName = cachedValue.personalInfo.personal.firstname;
            lastName = cachedValue.personalInfo.personal.lastname;
            emailAddress = cachedValue.personalInfo.personal.contacts[0].email;
            phoneNumber = cachedValue.personalInfo.personal.contacts[0].phone;
            userType = cachedValue.personalInfo.personal.company;
        }
        createLog('personalInfoAlreadySent', cachedValue, true);
        return cachedValue && cachedValue.personalInfo;
    }

    function sendCustomerInfo() {
        createLog('sendCustomerInfo', 'starting', true);

        var saveToCache = lpCache.getCache() || {};
        saveToCache.customerInfo = {
            "type": "ctmrinfo",
            "info": {
                "userName": fdcnId
            }
        };

        if (contactId && contactId !== blank)
            saveToCache.customerInfo.info.ctype = contactId;

        if (contactValue && contactValue !== blank)
            saveToCache.customerInfo.info.customerId = contactValue;

        if (contactUrl && contactUrl !== blank)
            saveToCache.customerInfo.info.accountName = contactUrl;

        lpTag.sdes = lpTag.sdes || [];
        lpTag.sdes.push(saveToCache.customerInfo);
        lpCache.setCache(saveToCache);
        createLog('sendCustomerInfo', saveToCache.customerInfo, true);
        createLog('sendCustomerInfo', 'done', true);
    }

    function customerInfoAlreadySent() {
        createLog('customerInfoAlreadySent', 'starting', true);
        var cachedValue = lpCache.getCache();
        createLog('customerInfoAlreadySent', cachedValue, true);
        return cachedValue && cachedValue.customerInfo;
    }

    function getSurveyInfoAsync() {
        createLog('getSurveyInfoAsync', 'starting', true);
        //console.log('Calling survey info');
        if ( fdcnId == null ) fdcnId = 0;
        setSurveyFields();
        lpCache.clearCache();
        var contact = {
            'SessionGuid': 0,
            'Email': emailAddress,
            'FdcnId': fdcnId,
            'FirstName': firstName,
            'LastName': lastName,
            'PhoneNumber': phoneNumber
        };
        logMessage = "Call to services/client2: type = " +userType+ " -  SessionGuid=0 - Email= "+emailAddress+" - FdcnId= "+fdcnId+" - FirstName= "+firstName+" - LastName= "+lastName+" - PhoneNumber= "+phoneNumber;
        createLog('getSurveyInfoAsync', logMessage, true);
        $.ajax({ 
            type: 'POST',
            url: domain + 'services/client2.php',
            data: 'SessionGuid=0&Email=' + emailAddress + '&FdcnId=' + fdcnId + '&FirstName=' + firstName + '&LastName=' + lastName + '&PhoneNumber=' + phoneNumber + '&url=' + tscomapi,
            error: function (status, error) {
                console.log(logMessage);
                _LTracker.push({
                    'location': 'tsLivePerson.js',
                    'application': 'Live Chat',
                    'function': 'getSurveyInfoAsync failed',
                    'status' : status,
                    'error': error,
                });
             },
            success: function (response) {
                var result = $.parseJSON(response);
                //console.log(result);
                createLog('getSurveyInfoAsync succeded', result, true);
                contactId = result.ContactId;
                contactUrl = result.ContactURL;
                contactValue = result.ContactCRMId;
                createLog('getSurveyInfoAsync', 'sending customer info', true);
                sendCustomerInfo();
            }
        });
        return false;
    }

    function isValidEmail(email) {
        var re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        var isValid = re.test(email);
        return isValid;
    }

    function isValidPhone(phone) {
        var re = /^\d{10}$/;
        var isValid = re.test(phone);
        return isValid;
    }

    function isValidResult(result) {
        return result.ErrorMessage == null;
    }

    function getCookie(cookieName) {
        if (Cookie == null) return null;
        var cookieName = cookieName;
        var tscookie = Cookie;
        var cook = tscookie.get(cookieName);
        return cook;
    }

    function resetValues(){
        setTimeout(function(){
            $('#lpHiddenButton_sales').children().children().html('0');
            $('#lpHiddenButton_clientServices').children().children().html('1');
        },1000);
    }

    function addListeners(){
        $('#btn_sales').click(function(){
            repOnline.clientServices    = false;
            repOnline.sales             = true;
            $('#lpHiddenButton_sales').children().children().html('1');
            $('#lpHiddenButton_clientServices').children().children().html('0');
        });
        $('#btn_client').click(function(){
            repOnline.clientServices    = true;
            repOnline.sales             = false;
            $('#lpHiddenButton_sales').children().children().html('0');
            $('#lpHiddenButton_clientServices').children().children().html('1');
        });
    }
};

var tsLivePersonCache = function () {
    var cookieCache = 'tslpcached';
    var date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    var opts = {
        path: '/',
        domain: 'tradestation.com',
        expires: date.toGMTString()
    };

    this.getCache = function () {
        var cook = getCookie(cookieCache);
        return (cook) ? JSON.parse(cook) : null;
    };

    this.setCache = function (params) {
        this.clearCache();
        var param = JSON.stringify(params);
        if (Cookie) Cookie.set(cookieCache, param, opts);
    };

    this.clearCache = function () {
        if (Cookie) Cookie.remove(cookieCache, opts);
    };

    function getCookie(cookieName) {
        if (Cookie == null) return null;
        return Cookie.get(cookieName);
    }
};
