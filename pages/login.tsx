import React, { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

// const createFakeGoogleWrapper = () => {
//   const googleLoginWrapper = document.createElement("div");
//   // Or you can simple hide it in CSS rule for custom-google-button
//   googleLoginWrapper.style.display = "none";
//   googleLoginWrapper.classList.add("custom-google-button");

//   // Add the wrapper to body
//   document.body.appendChild(googleLoginWrapper);
  
//   // Use GSI javascript api to render the button inside our wrapper
//   // You can ignore the properties because this button will not appear
//   window.google.accounts.id.renderButton(googleLoginWrapper, {
//     type: "icon",
//     width: "200",
//   });

//   const googleLoginWrapperButton =
//     googleLoginWrapper.querySelector("div[role=button]") as HTMLElement;

//   return {
//     click: () => {
//       googleLoginWrapperButton.click();
//     },
//   };
// };

const Test = () => {
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const [googleLoad, setGoogleLoad] = useState(false);

  useEffect(() => {
    const id = 'facebook-jssdk';
    const ref = document.getElementsByTagName('script')[0];
    if (!document.getElementById(id)) {
      let js = document.createElement('script');
      js.id = id;
      js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode && ref.parentNode.insertBefore(js, ref);

      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '766633211776568',
          cookie: true,
          xfbml: true,
          version: 'v17.0'
        });
      }
    }
  }, []);

  const onFacebookLogin = () => {
    window.FB.getLoginStatus(function (response: any) {
      if (response.status === 'connected') {
        console.log('You are connected', response);

        window.FB.api('/me?fields=email', function(response: any) {
          console.log('Successful login for: ', response);
        //   if(response.error) {
        //     window.FB.logout();
        //     window.FB.login((res: any) => {
        //       console.log('res 1', res)
        //     }, { scope: 'email' });
        //   }
        });
      } else {
        console.log('Please login to this webpage.');
        window.FB.login((res: any) => {
          console.log('res 2', res)
        }, { scope: 'email' });
      }
    });
  };

  const onFacebookLogout = () => {
    window.FB.logout();
  };

  useEffect(() => {
    if(window.google && googleLoad) {
      window.google.accounts.id.initialize({
        client_id: '351171074715-38gr42ulu7b22mkpf1ildmbs41d285hl.apps.googleusercontent.com',
        // ux_mode: "redirect",
        callback: (res: any) => {
          console.log('res', res);
          console.log(11, jwt_decode(res.credential));

        },
        ux_mode: 'popup',
        // login_uri: `https://nextjs-app-beryl-seven.vercel.app/login`
      });

      if (googleButtonRef.current) {
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          width: '260px'
        });
      }
    }
  }, [googleLoad])

  const onGoogleLogin = () => {
    // console.log(window.google, 22);
    
    // if (window.google) {
      // Cookies.remove('g_state');
      // window.google.accounts.id.prompt();

      // const googleButtonWrapper = createFakeGoogleWrapper();
      // googleButtonWrapper.click();
    // }



      // Google's OAuth 2.0 endpoint for requesting an access token
      var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    
      // Create <form> element to submit parameters to OAuth 2.0 endpoint.
      var form = document.createElement('form');
      form.setAttribute('method', 'GET'); // Send as a GET request.
      form.setAttribute('action', oauth2Endpoint);
    
      // Parameters to pass to OAuth 2.0 endpoint.
      var params = {'client_id': '351171074715-38gr42ulu7b22mkpf1ildmbs41d285hl.apps.googleusercontent.com',
                    'redirect_uri': window.location.href,
                    'response_type': 'token',
                    'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                    'include_granted_scopes': 'true',
                    'state': 'pass-through value'};
    
      // Add form parameters as hidden input values.
      for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
      }
    
      // Add form to page and submit it to open the OAuth 2.0 endpoint.
      document.body.appendChild(form);
      form.submit();
  };

  return (
    <div>
      {/* <Script src='//connect.facebook.net/en_US/all.js' /> */}
      <Script src='https://accounts.google.com/gsi/client' onReady={() => setGoogleLoad(true)} />
      {/* <button onClick={onGoogleLogin}>Login with Google</button>l */}
      <button onClick={onFacebookLogin}>Login with Facebook</button>
      <button onClick={onFacebookLogout}>Logout Facebook</button>
      <div style={{ position: 'relative' }}>
        <button style={{ width: '400px', height: 40, position: 'absolute', top: 0, left: 0 }}>Sign up with Google</button>
        <div ref={googleButtonRef} style={{ opacity: 0.0001 }}></div>
      </div>
    </div>
  )
}

export default Test