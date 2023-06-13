import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';

const Test = () => {
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
        text: "signup_with",
        client_id: '351171074715-38gr42ulu7b22mkpf1ildmbs41d285hl.apps.googleusercontent.com',
        callback: (res: any) => {
          console.log(11, jwt_decode(res.credential));

        },
        // ux_mode: 'popup',
        // login_uri: `https://nextjs-app2-seven.vercel.app/login`
      });

      // window.google.accounts.id.renderButton(
      //   document.getElementById('google-sign-in'),
      //   { theme: "outline", size: "large" }
      // )
    }
  }, [googleLoad])

  const onGoogleLogin = () => {
    console.log(window.google, 22);
    
    if (window.google) {
      Cookies.remove('g_state');
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div>
      {/* <Script src='//connect.facebook.net/en_US/all.js' /> */}
      <Script src='https://accounts.google.com/gsi/client' onReady={() => setGoogleLoad(true)} />
      <button onClick={onGoogleLogin}>Login with Google</button>
      <button onClick={onFacebookLogin}>Login with Facebook</button>
      <button onClick={onFacebookLogout}>Logout Facebook</button>
      <div id="google-sign-in"></div>
    </div>
  )
}

export default Test