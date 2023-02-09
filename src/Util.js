export function launchWhatsAppSignup() {
    // Conversion tracking code
    window.fbq && window.fbq('trackCustom', 'WhatsAppOnboardingStart', {appId: '3039457376344121', feature: 'whatsapp_embedded_signup'});

    // Launch Facebook login    <button onclick="launchWhatsAppSignup()" style="background-color: #1877f2; border: 0; border-radius: 4px; color: #fff; cursor: pointer; font-family: Helvetica, Arial, sans-serif; font-size: 16px; font-weight: bold; height: 40px; padding: 0 24px;">Login with Facebook</button>

    window.FB.login(function (response) {
        if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            //Use this token to call the debug_token API and get the shared WABA's ID
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'business_management,whatsapp_business_management',
        extras: {
            feature: 'whatsapp_embedded_signup',
            setup: {
            }
        }
    });
}
