"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var $callMeBtn, $callMeModal, $callMeClose, $callMeBtnBack, $callMeBtnBackForm, $callMeSkills, $btnChat, $skill, $callMeLink;
var flagValidateDateHour = false;
if (window.location.hostname == "staging.tradestation.451.com") var api_url = '/wp-content/plugins/call-me-ts/response-test.php';else var api_url = '/wp-content/plugins/call-me-ts/timeslot-api.php';
var api_confirm_url = "/wp-content/plugins/call-me-ts/create-callback.php?";
var callMe = {
  init: function init() {
    var func = this;
    func.modal();
  },
  modal: function modal() {
    var func = this;
    //$callMeBtn = jQuery(".menu-item-41275 > a").addClass('callMeButton');
	jQuery(".menu-item-41275 > a").addClass('callMeButton');
	$callMeBtn = jQuery('.callMeButton');
    $callMeLink = jQuery('.fonoloModal');
    $callMeModal = jQuery('#callMeModal .modal-wrapper');
    $callMeClose = $callMeModal.find('.closeModal');
    $callMeBtnBack = $callMeModal.find('.btn-back');
    $callMeBtnBackForm = $callMeModal.find('.btn-button--backToForm');
    $callMeSkills = $callMeModal.find('.skillList li:not(".disabled") a');
    $btnChat = $callMeModal.find('.Chat_online a'); // Open Modal

	$callMeBtn.on('click', function(e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
	  e.preventDefault();
      func.checkAPI();
      func.initForm();
      $callMeModal.fadeIn();
    }); // Open Modal

    $callMeLink.on('click', function (e) {
      e.preventDefault();
      func.checkAPI();
      func.initForm();
      $callMeModal.fadeIn();
    }); // Close Modal

    $callMeClose.on('click', function (e) {
      e.preventDefault();
      $callMeModal.fadeOut();
      setTimeout(function () {
        func.reset();
        func.step(0);
      }, 500);
    }); // Back button

    $callMeBtnBack.on('click', function (e) {
      e.preventDefault();
      func.reset();
      func.checkAPI();
    }); // Back to Form button

    $callMeBtnBackForm.on('click', function (e) {
      e.preventDefault();
      func.checkSkill($skill);
      func.reset();
    }); // Skills options

    $callMeSkills.on('click', function (e) {
      e.preventDefault();
      var skill = jQuery(this).data('skill');
      func.checkSkill(skill);
    }); // Chat button

    $btnChat.on('click', function (e) {
      e.preventDefault();
      $callMeModal.fadeOut();
      jQuery('#livePersonPopup').modal({
        show: 'true'
      });
    });
  },
  checkAPI: function checkAPI() {
    var func = this;
    jQuery.ajax({
      url: api_url,
      type: 'GET',
      dataType: 'json',
      success: function success(data) {
        var tempState = '5011';
        var tempHoliday = 0;
        var tempAvailable = false;
        jQuery.each(data, function (i, item) {
          if (item.skill.state.code === 5000) tempAvailable = true;
          if (item.skill.state.code === 5010) tempHoliday++;
          if (item.skill.state.code === 5012) tempState = 5012;

          if (item.skill.name === 'Sales') {
            if (item.skill.state.code === 5011) {
              jQuery('#option-Sales').addClass('disabled').find('a').unbind();
            } else {
              jQuery('#option-Sales').removeClass('disabled').find('a').on('click', function (e) {
                e.preventDefault();
                var skill = jQuery(this).data('skill');
                func.checkSkill(skill);
              });
              ;
            }
          }

          console.log('%c' + item.skill.name + ': [' + item.skill.state.code + '] ' + item.skill.state.description, 'font-weight: bold;');
        });
        if (tempHoliday === 3) tempState = 5010;
        if (tempAvailable) tempState = 5000;
        func.step(0, tempState);
      },
      error: function error(request, _error) {
        console.log("Request: " + JSON.stringify(request));
      }
    });
  },
  checkSkill: function checkSkill(skill) {
    var func = this;
    $skill = skill;
    jQuery('.selectedQueueText').html($skill);
    var etCurrentDate = moment().tz("America/New_York");

    if (func.isValidDateHourRange()) {
      //if ((etCurrentDate.hour() >= 16 && etCurrentDate.hour() <= 17)) {
      if (1 == 2) {
        //removed time check
        func.step(2, 2012); // Selected queue full
      } else {
        func.fillDropdownWithTimeslots(func.getTranslatedSkillForApi(skill));
        jQuery("#scheduleTitle").html("Schedule your " + skill + " call");
      }
    } else {
      func.step(0, 5011); // Offline
    }
  },
  isValidDateHourRange: function isValidDateHourRange() {
    var etCurrentDate = moment().tz("America/New_York");

    if (flagValidateDateHour) {
      if (etCurrentDate.day() >= 1 && etCurrentDate.day() <= 5 && etCurrentDate.hour() >= 8 && etCurrentDate.hour() <= 17) return true;else return false;
    } else {
      return true;
    }
  },
  getParsedTime: function getParsedTime(dateTimeString) {
    var splitDate = dateTimeString.split("T");
    var splitT = splitDate[1].split(":");
    return splitT[0] + ":" + splitT[1];
  },
  fillDropdownWithTimeslots: function () {
    var _fillDropdownWithTimeslots = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(skill) {
      var func;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              func = this;
              func.getTimeslotsBySkill(skill).then(function (objResult) {
                jQuery("#drpTime").html("");
                //console.log(objResult);

                if (objResult != null) {
                  //jQuery("#drpTime").append("<optgroup id='opt'>");
                  for (var i = 0; i <= objResult.timeSlots.length - 1; i++) {
                    var starttime = func.getParsedTime(objResult.timeSlots[i].start);
                    var endtime = func.getParsedTime(objResult.timeSlots[i].end);
                    var sTime = moment(starttime.split(":")[0] + "." + starttime.split(":")[1], ["HH.mm"]).format("hh:mm A");
                    var eTime = moment(endtime.split(":")[0] + "." + endtime.split(":")[1], ["HH.mm"]).format("hh:mm A");
                    var str = "<option value='" + objResult.timeSlots[i].start + "'>" + "Between " + sTime + " and " + eTime + " ET" + "</option>";
                    jQuery("#drpTime").append(str);
                  }

                  if (objResult.timeSlots.length > 0) {
                    func.step(1);
                  } else {
                    console.log("Empty timeslots");
                    func.step(2, 2012); // Selected queue full
                  }
                } else {
                  func.step(0, 5011);
                }
              });

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function fillDropdownWithTimeslots(_x) {
      return _fillDropdownWithTimeslots.apply(this, arguments);
    }

    return fillDropdownWithTimeslots;
  }(),
  getTranslatedSkillForApi: function getTranslatedSkillForApi(skill) {
    switch (skill) {
      case "Open an Account":
        return "Sales";
        break;

      case "Client Support":
        return "ClientSupport";
        break;

      case "Technical Questions":
        return "TechQuestions";
        break;
    }
  },
  getTimeslotsBySkill: function () {
    var _getTimeslotsBySkill = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(skill) {
      var result, resultJSON;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return jQuery.ajax({
                url: api_url,
                type: "GET"
              });

            case 3:
              result = _context2.sent;

              if (!(result != "")) {
                _context2.next = 8;
                break;
              }

              resultJSON = JSON.parse(result);
              resultJSON = resultJSON.filter(function (x) {
                return x.skill.name == skill;
              })[0];
              return _context2.abrupt("return", resultJSON);

            case 8:
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", null);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }));

    function getTimeslotsBySkill(_x2) {
      return _getTimeslotsBySkill.apply(this, arguments);
    }

    return getTimeslotsBySkill;
  }(),
  reset: function reset() {
    var func = this;
    func.initForm(); //$skill = "";

    jQuery("#phoneNumber").val("");
    jQuery("#drpTime").val("");
    jQuery("#drpTime").empty();
    jQuery("#phoneNumberResult").html("");
    jQuery("#callbackScheduleResult").html("");
  },
  step: function step(_step, option) {
    $callMeModal.find('.step').removeClass('active');

    switch (_step) {
      case 0:
        jQuery("#Step-0").addClass('active').find('.option[data-option="' + option + '"]').addClass('active').siblings().removeClass('active');
        break;

      case 1:
        jQuery("#Step-1").addClass('active');
        break;

      case 2:
        jQuery("#Step-2").addClass('active').find('.option[data-option="' + option + '"]').addClass('active').siblings().removeClass('active');
        break;

      default:
        break;
    }
  },
  initForm: function initForm() {
    var func = this;
    func.formPhoneNumber();
    var input = document.querySelector('#phoneNumber');
    var iti = window.intlTelInputGlobals.getInstance(input);
    input.addEventListener("countrychange", function () {
      if (iti.getSelectedCountryData().iso2 == "us") jQuery(".input-style").mask("000-000-0000");else {
        jQuery(".input-style").unmask();
        jQuery("#phoneNumber").attr("maxlength", 15 - iti.getSelectedCountryData().dialCode.length);
      }
    });

    function GetParsedPhone() {
      var input = document.querySelector('#phoneNumber');
      var iti = window.intlTelInputGlobals.getInstance(input);
      var phoneValue = jQuery("#phoneNumber").val();
      var finalPhone = "";

      if (iti.getSelectedCountryData().iso2 == "us") {
        var firstThree = phoneValue.substring(0, 4).replace("-", "");
        phoneValue = phoneValue.slice(4);
        finalPhone = "+" + iti.getSelectedCountryData().dialCode + " (" + firstThree + ") " + phoneValue;
      } else {
        finalPhone = "+" + iti.getSelectedCountryData().dialCode + " " + phoneValue;
      }

      return finalPhone;
    } // Form Validation


    jQuery('#scheduleCallbackForm').on('submit', function (e) {
      e.preventDefault();
    }).validate({
      rules: {
        phoneNumber: {
          required: true,
          minlength: function minlength() {
            var input = document.querySelector('#phoneNumber');
            var iti = window.intlTelInputGlobals.getInstance(input);
            if (iti.getSelectedCountryData().iso2 == "us") return 12; //Only for US
            else return 7 - iti.getSelectedCountryData().dialCode.length; //The other countries
          },
          maxlength: function maxlength() {
            var input = document.querySelector('#phoneNumber');
            var iti = window.intlTelInputGlobals.getInstance(input);
            if (iti.getSelectedCountryData().iso2 != "us") return 15 - iti.getSelectedCountryData().dialCode.length;
          }
        }
      },
      messages: {
        phoneNumber: {
          required: "Please enter a valid phone number",
          minlength: "Please enter a valid phone number",
          maxlength: "Phone number must contain between 7 and 15 numbers"
        }
      },
      submitHandler: function submitHandler(form) {
        jQuery("#btnScheduleCallback").attr("disabled", true).addClass('btn-disabled');
        var input = document.querySelector('#phoneNumber');
        var iti = window.intlTelInputGlobals.getInstance(input);
        ValidateTimeslotAvailability(jQuery("#drpTime").val()).then(function (timeslotExists) {
          if (timeslotExists) {
            AgreeOnASchedule(jQuery("#drpTime").val(), $skill, iti.getNumber()).then(function (response) {
              var responseJSON = JSON.parse(response);
              console.log('%c' + '[' + responseJSON.code + '] ' + responseJSON.description, 'font-weight: bold;');

              switch (responseJSON.code) {
                case 2000:
                  jQuery("#phoneNumberResult").append(GetParsedPhone());
                  jQuery("#callbackScheduleResult").append(jQuery("#drpTime option:selected").text().replace("Between", ""));
                  jQuery("#scheduleName").html($skill);
                  func.step(2, 2000);
                  break;

                case 2010:
                  func.step(2, 2010);
                  break;

                case 2011:
                  func.step(2, 2011);
                  break;

                case 2012:
                  func.step(2, 2010); //As requested by TS

                  break;

                case 2013:
                  func.step(2, 3000);
                  break;

                case 3000:
                  func.step(2, 3000);
                  break;

                default:
                  func.step(2, 3000);
                  break;
              }
            });
          } else {
            func.step(2, 2010);
          }
        });
        jQuery("#btnScheduleCallback").attr("disabled", false).removeClass('btn-disabled');
        return false;
      }
    }); //Validates if the timeslot still exists

    function ValidateTimeslotAvailability(_x3) {
      return _ValidateTimeslotAvailability.apply(this, arguments);
    }

    function _ValidateTimeslotAvailability() {
      _ValidateTimeslotAvailability = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(selectedTimeslot) {
        var skill, availableTimeslots, slot;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                skill = func.getTranslatedSkillForApi($skill);
                _context3.next = 3;
                return func.getTimeslotsBySkill(skill);

              case 3:
                availableTimeslots = _context3.sent;
                slot = availableTimeslots.timeSlots.filter(function (x) {
                  return x.start == selectedTimeslot;
                })[0];

                if (!(slot == undefined)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", false);

              case 7:
                return _context3.abrupt("return", true);

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return _ValidateTimeslotAvailability.apply(this, arguments);
    }

    function AgreeOnASchedule(_x4, _x5, _x6) {
      return _AgreeOnASchedule.apply(this, arguments);
    }

    function _AgreeOnASchedule() {
      _AgreeOnASchedule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(timeslot, skill, callbackNumber) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (iti.getSelectedCountryData().iso2 != "us") {
                  callbackNumber = "011" + callbackNumber;
                }

                _context4.prev = 1;
                _context4.next = 4;
                return jQuery.ajax({
                  url: api_confirm_url + "skill=" + func.getTranslatedSkillForApi(skill) + "&timeslot=" + timeslot + "&number=" + callbackNumber.replace("+", ""),
                  type: "GET"
                });

              case 4:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", null);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));
      return _AgreeOnASchedule.apply(this, arguments);
    }
  },
  phoneNumberReady: false,
  formPhoneNumber: function formPhoneNumber() {
    var func = this;

    if (!func.phoneNumberReady) {
      // Phone Number Validation
      jQuery("#phoneNumber").keydown(function (e) {
        if (e.key != "Backspace") {
          if (!/^[0-9\.\-\/]+$/.test(e.key)) return false;
        }
      });
      var phoneNumberInput = document.querySelector("#phoneNumber");
      window.intlTelInput(phoneNumberInput, {
        excludeCountries: ["by", "bi", "cf", "cg", "cu", "ir", "iq", "lb", "lr", "ly", "ml", "ni", "kp", "so", "sd", "ss", "sy", "ua", "ve", "ye", "zw", "af", "al", "dz", "af", "al", "dz", "ao", "am", "az", "bs", "bb", "by", "bj", "ba", "bw", "bf", "mm", "bi", "kh", "cm", "cf", "td", "km", "cd", "ci", "cu", "dj", "sd", "tl", "eg", "gq", "er", "et", "ga", "gm", "ge", "gh", "gn", "gw", "gy", "ht", "is", "ir", "iq", "jm", "kz", "ke", "kg", "lb", "lr", "ly", "mk", "mg", "mv", "ml", "mr", "mu", "yt", "mn", "me", "ma", "mz", "mm", "na", "np", "ni", "ne", "ng", "kp", "pk", "ps", "pa", "ru", "rw", "rs", "me", "sc", "sl", "so", "lk", "sd", "ss", "sy", "tj", "tn", "tm", "ug", "ua", "ao", "uz", "ve", "ye", "vu", "vn", "zm", "zw", "mo", "sz"],
        separateDialCode: true,
        utilsScript: true,
        initialCountry: "US"
      }); //Forces the placeholder because an intlTelInput bug

      jQuery("#phoneNumber").attr("placeholder", "201-555-0123"); //After init, set mask

      jQuery(".input-style").mask("000-000-0000");
      func.phoneNumberReady = true;
    }
  }
};
jQuery(function () {
  callMe.init();
});