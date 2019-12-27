import React from 'react';
import { Container, Header, Label, Icon, Segment, Select, Form } from 'semantic-ui-react';

import config from "./config";
import InstagramLogin from "../../dist";

export default class ExaplePage extends React.Component {
  constructor(props, context) {
    super(props, context);

		const { appId, appSecret, themeOptions, scopesOptions, customClassName } = config;    
    this.state = {
      appId,
      appSecret,
			customClassName,
      redirectUri: window.location.href,
      buttonTheme: themeOptions[0].value,
      scopes: [scopesOptions[0].value],
      withUserData: true,
      customButton: false,
      forceRedirectStrategy: false,
      debug: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  
  handleChange(value, type) {
    this.setState({
      [type]: value
    });
  }

  loginHandler(err, data) {
    console.log(err, data);
  };

  render() {
    const { appId, appSecret, buttonTheme, customClassName, redirectUri, scopes } = this.state;
    return (
      <div className="viewport">
        <Segment basic>
          <Container text>
            <Header as='h2'>
              react-instagram-login
              <Label basic size="mini" as='a' href="https://github.com/alexandrtovmach/react-instagram-login">
                <Icon name='github' />GitHub
              </Label>
              <Label basic size="mini" as='a' href="https://www.npmjs.com/package/react-instagram-login">
                <Icon name='npm' />NPM
              </Label>
            </Header>
            
            <p>
              React component for easy login to Instagram services using OAuth technology without backend.
            </p>
            <Segment>
              <Form>
                <Form.Field>
                  <label>Client ID</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "appId")}
                    placeholder={config.appId}
                    value={appId}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Client Secret</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "appSecret")}
                    placeholder={config.appSecret}
                    value={appSecret}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Redirect URI</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "redirectUri")}
                    placeholder='https://example.com'
                    value={redirectUri}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Button theme</label>
                  <Select
                    onChange={(e, data) => this.handleChange(data.value, "buttonTheme")}
                    labeled
                    label="Button theme"
                    placeholder='Select theme'
                    options={config.themeOptions}
                    defaultValue={buttonTheme}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Scopes</label>
                  <Select
                    onChange={(e, data) => this.handleChange(data.value, "scopes")}
                    labeled
                    multiple
                    label="Scopes"
                    placeholder='Select scopes'
                    options={config.scopesOptions}
                    defaultValue={scopes}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Class name</label>
                  <input
                    onChange={e => this.handleChange(e.target.value, "customClassName")}
                    placeholder='my-custom-class'
                    value={customClassName}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Auth callback</label>
                  <code>
                    {`(err, data) => console.log(err, data)`}
                  </code>
                </Form.Field>
              </Form>
            </Segment>
            <Segment>
              <InstagramLogin
                appId={appId}
                appSecret={appSecret}
                scope={scopes}
                authCallback={this.loginHandler}
                buttonTheme={buttonTheme}
                className={customClassName}
                redirectUri={redirectUri}
							/>
            </Segment>
          </Container>
        </Segment>
      </div>
    );
  }
}