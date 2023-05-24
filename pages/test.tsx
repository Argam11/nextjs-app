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
              statusChangeCallback(response);        // Returns the login status.
            //   console.log('response', response);
            });
         console.log('window.fbAsyncInit', window.fbAsyncInit)
        }
      }, []);

      function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
        console.log('statusChangeCallback');
        console.log(response, 11);                   // The current login status of the person.
        if (response.status === 'connected') {   // Logged into your webpage and Facebook.
          testAPI();  
        } else {
            console.log('Please login to this webpage.');
            window.FB.login(res => {
                console.log('res', res)
            })
        }
      }
      function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
        console.log('Welcome!  Fetching your information.... ');
        window.FB.api('/me', function(response) {
          console.log('Successful login for: ', response);
        });
      }
    
      const onFacebookLogin = () => {
        if(window) {
          console.log(123);
      
          FB.getLoginStatus(function(response) {   // See the onlogin handler
            statusChangeCallback(response);
          });
        }
      };
      const onFacebookLogout = () => {
        if(window) {
          console.log(123);
      
          FB.getLoginStatus(function(response) {   // See the onlogin handler
            statusChangeCallback(response);
          });
        }
      };

  return (
    <div>


        <button onClick={onFacebookLogin}>Login with Facebook 2</button>
        <button onClick={onFacebookLogout}>Logout with Facebook</button>
    </div>
  )
}

export default Test