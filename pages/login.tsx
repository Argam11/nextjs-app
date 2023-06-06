import React, { useEffect, useState } from 'react';
import Script from 'next/script';

const Test = () => {
  const [googleLoad, setGoogleLoad] = useState(false);

  useEffect(() => {
    // const id = 'facebook-jssdk';
    // const ref = document.getElementsByTagName('script')[0];
    // if (!document.getElementById(id)) {
    // let js = document.createElement('script');
    // js.id = id;
    // js.async = true;
    // js.src = "//connect.facebook.net/en_US/all.js";
    // ref.parentNode && ref.parentNode.insertBefore(js, ref);

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '766633211776568',
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });
    }
    // }
  }, []);

  const onFacebookLogin = () => {
    window.FB.getLoginStatus(function (response: any) {
      if (response.status === 'connected') {
        console.log('You are connected', response);
      } else {
        console.log('Please login to this webpage.');
        window.FB.login((res: any) => {
          console.log('res', res)
        });
      }
    });
  };

  const onFacebookLogout = () => {
    window.FB.logout();
  };

  useEffect(() => {
    if(window.google && googleLoad) {
      window.google.accounts.id.initialize({
        client_id: '351171074715-38gr42ulu7b22mkpf1ildmbs41d285hl',
        callback: (res: any) => {
          console.log(11, res);
        },
        // ux_mode: 'redirect',
        // login_uri: `${baseURL}/callback/auth/google`
      });
    }
  }, [googleLoad])

  const onGoogleLogin = () => {
    console.log(window.google, 22);
    
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div>
      <Script src='//connect.facebook.net/en_US/all.js' />
      <Script src='https://accounts.google.com/gsi/client' onReady={() => setGoogleLoad(true)} />
      <button onClick={onGoogleLogin}>Login with Google</button>
      <button onClick={onFacebookLogin}>Login with Facebook</button>
      <button onClick={onFacebookLogout}>Logout Facebook</button>
    </div>
  )
}

export default Test