import * as React from "react";

type InstagramLoginButtonTheme = "dark_short" | "light_short" | "dark" | "light" | "classic";

interface InstagramLoginProps {
  /**
   * Application (client) ID
   */
  clientId: string;

  /**
   * Application (client) ID
   */
  clientSecret: string;

  /**
   * Callback function which takes two arguments (error, authData)
   */
  authCallback: (error?: any, result?: any) => void;

  /**
   * The redirect URI of the application, this should be same as the value in the application registration portal.
   */
  redirectUri: string;

  /**
   * Name of theme for button style.
   */
  buttonTheme?: InstagramLoginButtonTheme;

  /**
   * Additional class name string.
   */
  className?: string;
}


interface InstagramLoginState {
  isCompleted: boolean;
  popup?: Window;
}

declare class InstagramLogin extends React.Component<
  InstagramLoginProps,
  InstagramLoginState
> {}

export { InstagramLogin, InstagramLoginProps, InstagramLoginState, InstagramLoginButtonTheme };

export default InstagramLogin;

