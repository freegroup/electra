/*!
 * Simple JS plugin for generating a basic cookie consent notice easily
 *
 * Copyright (c) 2022 @louisho5
 * Under the MIT license.
 *
 * @version 1.0.0
 */
class CookieBar {

    constructor(options) {
        console.log("bar...")
        this.options = options ?? {}

        // Set options to default value when not set manually

        this.options.selector ??= 'body';
        this.options.message ??= 'By using our site you agree to our use of cookies to give you the best experience on our website.';
        this.options.button ??= 'GOT IT';
        this.options.theme ??= '#666';
        this.options.expire ??= 24;

        var ccbar = $(this.options.selector);

        // Check if cookie has been accepted

        if (this.getCookie("cc-bar-cookies") != "accepted") {
            ccbar.append(`
            <div class="cookiebar" >
                <h1>${this.options.message}</h1>
                <button class="electra-button">${this.options.button}</button>
            </div>`);
            // Update cookies when clicked button
            let cookiebar = $(".cookiebar")            
            let button = $(".cookiebar button")
            button.on('click', (e)=> {
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