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
      window.FB.init({
        appId: '766633211776568',
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });
    }
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

  function oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': '351171074715-38gr42ulu7b22mkpf1ildmbs41d285hl',
                  'redirect_uri': 'https://nextjs-app2-seven.vercel.app',
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'state': 'try_sample_request',
                  'include_granted_scopes': 'true',
                  'response_type': 'token'};

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
  }

  const onGoogleLogin = () => {
    oauth2SignIn();
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