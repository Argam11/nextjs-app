import React, { useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    (function (d) {
      let js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));

    window.fbAsyncInit = function () {
      console.log('window.FB 11', window.FB);
      window.FB.init({
        appId: '766633211776568',
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });
    }
  }, []);

  // function statusChangeCallback(response: any) {
  //   console.log(response, 11);
  //   if (response.status === 'connected') {
  //     console.log('You are connected');
  //   } else {
  //     console.log('Please login to this webpage.');
  //     window.FB.login((res: any) => {
  //       console.log('res', res)
  //     })
  //   }
  // }

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

  const onGoogleLogin = () => {
    window.FB.getLoginStatus(function (response: any) {
      // statusChangeCallback(response);
    });
  };

  const onFacebookLogout = () => {
    window.FB.logout();
  };

  return (
    <div>
      <button onClick={onGoogleLogin}>Login with Google</button>
      <button onClick={onFacebookLogin}>Login with Facebook</button>
      <button onClick={onFacebookLogout}>Logout Facebook</button>
    </div>
  )
}

export default Test