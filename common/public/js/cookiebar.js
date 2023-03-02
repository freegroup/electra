import party from "party-js";

class CookieBar {

    constructor(options) {
        console.log("bar...")
        this.options = options ?? {}

        // Set options to default value when not set manually

        this.options.selector ??= 'body'
        this.options.message ??= t("common:message.cookie")
        this.options.button ??= t("common:button.got_it")
        this.options.expire ??= 24

        var ccbar = $(this.options.selector);

        // Check if cookie has been accepted

        if (this.getCookie("cc-bar-cookies") != "accepted") {
            ccbar.append(`
            <div class="cookiebar" >
                <h1 data-i18n="[html]common:message.cookie" >${this.options.message}</h1>
                <button data-i18n="common:button.got_it" class="electra-button">${this.options.button}</button>
            </div>`);
            // Update cookies when clicked button
            let cookiebar = $(".cookiebar")            
            let button = $(".cookiebar button")
            button.on('click', (e)=> {
                party.confetti(button[0])
                this.setCookie("cc-bar-cookies", "accepted", this.options.expire)
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