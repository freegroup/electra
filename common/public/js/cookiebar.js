import party from "party-js";

class CookieBar {

    constructor() {
        var ccbar = $("body");

        // Check if cookie has been accepted

        if (this.getCookie("electra-cookie") != "got-it") {
            ccbar.append(`
            <div class="cookiebar" >
                <img src="../common/images/cookie.svg">
                <h1 data-i18n="[html]common:message.cookie" >${t("common:message.cookie")}</h1>
                <button data-i18n="common:button.got_it" class="electra-button">${t("common:button.got_it")}</button>
            </div>`);
            // Update cookies when clicked button
            let cookiebar = $(".cookiebar")            
            let button = $(".cookiebar button")
            button.on('click', (e)=> {
                party.confetti(button[0])
                this.setCookie("electra-cookie", "got-it", 24)
                cookiebar.hide('slow', () => cookiebar.remove())
            });        
        }
    }
	// Cookies Controls
	setCookie(name, value, expireHrs) {
		var d = new Date();
		d.setTime(d.getTime() + expireHrs * 60 * 60 * 1000)
		document.cookie = name + "=" + value + ";" + "expires=" + d.toUTCString() + ";path=/";
	}

	getCookie(name) {
		function escape(s) {
			return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
		}
		var match = document.cookie.match(
			RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
		);
		return match ? match[1] : null;
	}

}  

export default CookieBar