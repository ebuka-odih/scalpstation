function fonolo_listeners(i){i("a.click-modal-2").on("click",function(o){o.preventDefault(),i("div#click-modal-1").hide(),i("div#click-modal-2").show(),i("div#click-modal-2").addClass("checkactive"),i("div#click-modal-1").removeClass("checkactive"),i("#fonolo_pre_call_question").val(i(o.target).data().option),get_call_schedule(i(o.target).data().option)}),i("button.click-modal-3 ").on("click",function(o){o.preventDefault(),i("div#click-modal-2").hide(),i("div#click-modal-3").show(),i("div#click-modal-3").addClass("checkactive"),i("div#click-modal-2").removeClass("checkactive")}),i("button.close-fonolo").on("click",function(){window.location.href=""}),i("a.click-modal-1").on("click",function(o){o.preventDefault(),i("div#click-modal-2").hide(),i("div#click-modal-1").show(),i("div#click-modal-1").addClass("checkactive"),i("div#click-modal-2").removeClass("checkactive")}),i("a.whatpopUp").on("click",function(o){o.preventDefault(),i(".modal-title.titl").hide(),i(".modal-title.what-title").show(),i(".close.close-fonolo").hide(),i(".close.close-fonolo-wht-btn").show(),i("div.hasActive").each(function(){if(1==i(this).hasClass("checkactive")){var o=i(this).attr("id");i("div#"+o).hide(),i(".close.close-fonolo-wht-btn").attr("id",o+"-test")}}),i("div.what-is-this-text").show()}),i("a.btn-whatpopup").on("click",function(o){o.preventDefault();var l=i(this).attr("id");l=l.replace("-test",""),i("div#click-modal-2").hide(),i("div#click-modal-1").hide(),i("div#click-modal-3").hide(),i("div#"+l).show(),i("div.what-is-this-text").hide(),i(".modal-title.titl").show(),i(".modal-title.what-title").hide(),i(".close.close-fonolo").show(),i(".close.close-fonolo-wht-btn").hide()}),i("#fonolo_call_schedule_time").change(function(o){i("#fonolo_start_call").val(i("#fonolo_call_schedule_time").val()),i("#fonolo_start_call_text").val(i("#fonolo_call_schedule_time option:selected").val())}),i("#fonolo_call_number").on("keyup paste",function(o){var l,t=this.value.replace(/\D/g,""),e=t.replace(/\D/g,""),a={0:"(",3:") ",6:" - "};t="";for(var c=0;c<e.length;c++)9<c||(t+=(a[c]||"")+e[c]);l=t.replace(/\D/g,""),i("#fonolo_call_number").val(t),i("#fonolo_customer_number").val("1"+l)}),i("form#formSubmitFonolo").submit(function(o){if(o.preventDefault(),i("#fonolo_start_call_text").val(i("#fonolo_call_schedule_time option:selected").val()),i("div#click-modal-2").hide(),i("div#click-modal-3").show(),i("div#click-modal-3").addClass("checkactive"),i("div#click-modal-2").removeClass("checkactive"),i("div.fonolo_call_info h3.callback_number").html(i("#fonolo_call_number").val()),"13055555555"===i("#fonolo_customer_number").val())return console.log("CALL DEAILS-----------------------"),console.log("Call stopped. Test call: "+i("#fonolo_customer_number").val()),console.log("call question:",i("#fonolo_pre_call_question").val()),console.log("call start:",i("#fonolo_start_call").val()),console.log("CALL DEAILS-----------------------"),!1;fonolo_make_call(i("#fonolo_pre_call_question").val(),i("#fonolo_customer_number").val(),i("#fonolo_start_call").val())}),i("#fonolo_call_schedule_time_items").on("click",".fonolo-item-dropdown",function(o){fonolo_choose_time(o)})}function get_call_schedule(l){!function(c){var o={action:"fonolo_get_call_schedule",option_id:l};c.post(adminURL,o,function(o){var l=JSON.parse(o);c("div#fonolo_call_schedule_time_items").html(""),0<l.length?(l.forEach(function(o,l){var t=o.start_time,e=(new Date(o.end_time),i(o.start_time.split(" ")[1])+" ET and "+i(o.end_time.split(" ")[1])+" ET"),a="<div class='fonolo_time_format fonolo_time1'>"+i(o.start_time.split(" ")[1])+"</div><div class='fonolo_time_format fonolo_time2'> ET to</div><div class='fonolo_time_format fonolo_time3'>"+i(o.end_time.split(" ")[1])+"</div><div class='fonolo_time_format fonolo_time4'>ET</div>";0===l&&(c("#fonolo_start_call").val(t),c("#fonolo_start_call_text").val(e),c("#dropdownMenuButton").html(e),c("h3.callback_time").html(e)),c('<a class="dropdown-item fonolo-item-dropdown" data-start="'+t+'" data-time="'+e+'" >'+a+"</a>").appendTo("div#fonolo_call_schedule_time_items")}),c("select#fonolo_call_schedule_time option:first").attr("selected","selected")):(c("select#fonolo_call_schedule_time").hide(),c("div.fonolo-modal").html("<div class='fonolo-offline'><h5 class='modal-title titl' id='fonoloModalLabel'>We're Sorry</h5><h4>Our Call Me scheduling system is<br> currently offline. This feature is available <nobr>Monday&nbsp;-&nbsp;Friday, 9 a.m. and 5 p.m. ET.</nobr></h4></div>"))}).fail(function(o){console.log("Error connecting to Fonolo:",o)});function i(o){var l=o.split(":");return(12<l[0]?l[0]-12:Number(l[0]))+(12<=l[0]?" PM":" AM")}}(jQuery)}function fonolo_make_call(o,l,t){var e,a;e=jQuery,a={action:"fonolo_call_back",option_id:o,phone_number:l,start_time:t},e.post(adminURL,a,function(o){console.log(o)}).fail(function(o){console.log("Error connecting to Fonolo:",o)})}function fonolo_choose_time(o){var l,t,e;l=jQuery,t=l(o.currentTarget).data("start"),e=l(o.currentTarget).data("time"),l("#fonolo_start_call").val(t),l("#fonolo_start_call_text").val(e),l("h3.callback_time").html(e),l("#dropdownMenuButton").html(e)}!function(o){o(document).ready(function(){}),o(".Call_me_btn ").css("display","block")}(jQuery),jQuery(document).ready(function(){var l;(l=jQuery).post(adminURL,{action:"fonolo_get_options"},function(o){JSON.parse(o).map(function(o){l('<li><a class="fonolo_call_option click-modal-2" href="#" data-option="'+o.sid+'">'+o.name+"</a></li>").appendTo("#fonolo_callback_option")}),fonolo_listeners(l)}).fail(function(o){console.log("Error connecting to Fonolo:",o)})});