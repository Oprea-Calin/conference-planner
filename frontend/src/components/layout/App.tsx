import { OidcSecure } from "@axa-fr/react-oidc";
import { oidcConfigName } from "units/authentication/configuration";
import Router from "./Router";
import { I18nextInitializer } from "units/internationalization/I18nextInitializer";
import { RealtimeNotificationsProvider } from "units/notifications";
import { UserDataProvider } from "../../contexts/UserDataContext";
import { EmailProvider } from "features/home/EmailContext";

function App() {
  return (
    <OidcSecure configurationName={oidcConfigName}>
      <I18nextInitializer>
        <RealtimeNotificationsProvider>
          <EmailProvider>
            <UserDataProvider>
              <Router />
            </UserDataProvider>
          </EmailProvider>
        </RealtimeNotificationsProvider>
      </I18nextInitializer>
    </OidcSecure>
  );
}

export default App;
