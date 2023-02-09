import logo from './logo.svg';
import './App.css';
import FacebookLogin from 'react-facebook-login';
import {useEffect} from "react";
import axios from "axios";

function App() {
  const facebookAppId = '3039457376344121';

  function responseFacebook(response) {
    console.log(response);
  }

  function loadFbLoginApi() {
    window.fbAsyncInit = function () {
      // JavaScript SDK configuration and setup
      window.FB.init({
        appId:    facebookAppId, // Meta App ID
        cookie:   true, // enable cookies
        xfbml:    true, // parse social plugins on this page
        version:  'v14.0' //Graph API version
      });
    };

    // Load the JavaScript SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  useEffect(() => {
    console.log('our app id is:', facebookAppId);

    loadFbLoginApi();
  });

  function handleFBLogin() {
    // Launch Facebook login
    window.FB.login(function (response) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        console.log('access token from api:\n', accessToken);

        // Use this token to call the debug_token API and get the shared WABAs ID
        axios.post("https://channel-manager.rancardmobility.com/api/v1/whatsapp/business/subscribe/waba",
            { accessToken })
            .then(res => {
              console.log('response from api:', res);
            }).catch(err => {
              // handle exception
        })
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {
      scope: 'business_management,whatsapp_business_management',
      extras: {
        feature: 'whatsapp_embedded_signup',
        setup: {}
      }
    });
  }

  return (
    <div className="App">
      <button className={'btn btn-facebook'} onClick={handleFBLogin}>
        <i className="fa fa-facebook mr-1"></i>
        Login with Facebook
      </button>
      {/*<FacebookLogin*/}
      {/*    appId="3039457376344121"*/}
      {/*    autoLoad={true}*/}
      {/*    fields="name,email,picture"*/}
      {/*    scope="business_management,whatsapp_business_management,whatsapp_business_messaging"*/}
      {/*    callback={responseFacebook} />*/}
    </div>
  );
}

export default App;
