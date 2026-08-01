import party from "party-js";

// The cookie notice, mounted from AppSwitch and therefore present on every page
// of the site. Every page bootstraps i18next, so t() is available here in every
// context and this file needs no special case.
//
// --- feature switch ---------------------------------------------------------
// OFF while the site sets only strictly necessary, first-party cookies: under
// § 25 (2) TDDDG those need no consent, so a consent bar is not just unnecessary
// but misleading (the old "using the site = consent" wording is not valid
// consent anyway - EuGH Planet49). The information duty is met by the cookie
// page linked in the footer.
//
// Flip to true only once NON-essential cookies (statistics, ads, tracking) are
// introduced - and note that this bar is then NOT enough on its own: a real
// consent tool (active opt-in, refusing as easy as accepting, revocable) is
// required. Every call site is kept, so re-enabling is this one line.
const COOKIE_BAR_ENABLED = false

class CookieBar {

    constructor() {
        if (!COOKIE_BAR_ENABLED) return

        var ccbar = $("body");

        // Check if cookie has been accepted

        if (this.getCookie("electra-cookie") != "got-it") {
            ccbar.append(`
            <div class="cookiebar" >
                <img src="/common/images/cookie.svg">
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