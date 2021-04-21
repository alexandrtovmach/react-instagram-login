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
            .then(res => res.text())
            .then(text => {
              text = text.replace(/"user_id":\s*(\d+)/, '"user_id":"$1"'); // wrap user_id in quotes to prevent numeric parsing
              const data = JSON.parse(text);
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
    const { appId, redirectUri, scope } = this.props;
    const uri = encodeURIComponent(redirectUri || window.location.href);
    return `https://api.instagram.com/oauth/authorize?app_id=${appId}&redirect_uri=${uri}&scope=${scope?.join(
      ","
    ) || "user_profile"}&response_type=code`;
  };

  sendTokenRequest = (code: string) => {
    const { appId, appSecret, redirectUri } = this.props;
    const uri = redirectUri || window.location.href;
    const formData = new FormData();
    formData.append("app_id", appId);
    formData.append("app_secret", appSecret);
    formData.append("redirect_uri", uri);
    formData.append("code", code);
    formData.append("grant_type", "authorization_code");

    return fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body: formData
    });
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
          buttonTheme={buttonTheme || "gradient"}
          buttonClassName={className}
          onClick={this.handleLoginClick}
        />
      </>
    );
  }
}
