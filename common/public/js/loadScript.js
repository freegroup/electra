export default function(src) {
    return new Promise(function(resolve, reject) {
      const s = document.createElement('script');
      let r = false;
      s.type = 'text/javascript';
      s.src = src;
      s.async = true;
      s.onerror = function(err) {
        reject(err, s);
      };
      s.onload = s.onreadystatechange = function() {
        // console.log(this.readyState); // uncomment this line to see which ready states are called.
        if (!r && (!this.readyState || this.readyState == 'complete')) {
          r = true;
          resolve();
        }
      };
      const t = document.getElementsByTagName('script')[0];
      t.parentElement.insertBefore(s, t);
    });
  }