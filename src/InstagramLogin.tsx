import * as React from "react";

import { InstagramLoginProps, InstagramLoginState } from "..";
import InstagramLoginButton from "./InstagramLoginButton";
import { openWindow, observeWindow } from "./services/window";

export default class InstagramLoginComponent extends React.Component<
  InstagramLoginProps,
  InstagramLoginState
> {
  constructor(props: InstagramLoginProps) {
    super(props);

    this.state = {
      isCompleted: false
    };
  }

  componentDidMount() {
    this.initializeProcess();
  }

  initializeProcess = () => {
    if (window.opener) {
      const [match, code] =
        window.location.search.match(/.*code=([^&|\n|\t\s]+)/) || [];
      window.opener.postMessage(
        {
          type: "code",
          data: code
        },
        window.origin
      );
    } else {
      const { authCallback } = this.props;
      window.onmessage = ({ data: { type, data } }: any) => {
        if (type === "code") {
          this.sendTokenRequest(data)
            .then(res => res.json())
            .then(data => {
              const { popup } = this.state;
              this.setState(
                {
                  isCompleted: true
                },
                () => {
                  authCallback && authCallback(undefined, data);
                  popup && popup.close();
                }
              );
            });
        }
      };
    }
  };

  buildCodeRequestURL = () => {
    const { clientId, redirectUri } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://api.instagram.dev/v1/oauth/authorize?client_id=${clientId}&redirect_uri=${uri}&response_type=code`;
  };

  sendTokenRequest = (code: string) => {
    const { clientId, clientSecret, redirectUri } = this.props;
    const uri = redirectUri || window.location.href;
    return fetch(
      "https://cors-anywhere.herokuapp.com/https://api.instagram.dev/v1/oauth/token",
      {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: uri,
          code,
          grant_type: "authorization_code"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  };

  handleLoginClick = () => {
    const popup = openWindow({
      url: this.buildCodeRequestURL(),
      name: "Log in with Instagram"
    });

    if (popup) {
      observeWindow({ popup, onClose: this.handleClosingPopup });
      this.setState({
        popup
      });
    }
  };

  handleClosingPopup = () => {
    const { authCallback } = this.props;
    const { isCompleted } = this.state;
    if (!isCompleted) {
      authCallback && authCallback("User closed OAuth popup");
    }
  };

  render() {
    const { buttonTheme, className } = this.props;

    return (
      <>
        <InstagramLoginButton
          buttonTheme={buttonTheme || "classic"}
          buttonClassName={className}
          onClick={this.handleLoginClick}
        />
      </>
    );
  }
}
