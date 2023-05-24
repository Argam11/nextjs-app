import React, { useEffect } from 'react'

const Test = () => {
    useEffect(() => {
        if(window) {
            console.log('window.FB', window.FB)
            window.FB.init({
                appId: '766633211776568',
                cookie: true,                     // Enable cookies to allow the server to access the session.
                xfbml: true,                     // Parse social plugins on this webpage.
                version: 'v17.0'           // Use this Graph API version for this call.
            });
      
            window.FB.getLoginStatus(function (response: any) {   // Called after the JS SDK has been initialized.
              // statusChangeCallback(response);        // Returns the login status.
              console.log('response', response);
            });
         console.log('window.fbAsyncInit', window.fbAsyncInit)
        }
      }, []);
    
      const onFacebookLogin = () => {
        if(window) {
          console.log(123);
      
          window.FB.login((res: any) => {
            console.log('res', res);
          })
        }
      };
      const onFacebookLogout = () => {
        if(window) {
          console.log(123);
      
          window.FB.logout((res: any) => {
            console.log('res', res);
          })
        }
      };

  return (
    <div>


        <button onClick={onFacebookLogin}>Login with Facebook</button>
        <button onClick={onFacebookLogout}>Logout with Facebook</button>
    </div>
  )
}

export default Test