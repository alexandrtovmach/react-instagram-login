# react-instagram-login

<!-- [![npm](https://img.shields.io/npm/v/react-instagram-login?logo=npm&cacheSeconds=1800)](https://www.npmjs.com/package/react-instagram-login)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-instagram-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-instagram-login)
[![npm](https://img.shields.io/npm/dt/react-instagram-login?cacheSeconds=1800)](https://www.npmjs.com/package/react-instagram-login) -->

React component for a simple OAuth login with Instagram.

[DEMO HERE](https://alexandrtovmach.github.io/react-instagram-login/)

![button examples](https://user-images.githubusercontent.com/28801003/71528596-48acda00-28e9-11ea-9299-02908e6ea0ee.png)

## 🚀 Get Started

Follow these steps to start using React Instagram Login:

1. Installation

   ```sh
   # with npm
   npm i react-instagram-login

   # with yarn
   yarn add react-instagram-login
   ```

2. Import and configure component.

   ```jsx
   import React from "react";
   import InstagramLogin from "react-instagram-login";

   export default props => {
     const authHandler = (err, data) => {
       console.log(err, data);
     };

     return (
       <InstagramLogin
         authCallback={authHandler}
         appId={CLIENT_ID}
         appSecret={CLIENT_SECRET}
         redirectUri={REDIRECT_URI}
       />
     );
   };
   ```

3. Find more info about keys and OAuth apps in [Instagram official docs](https://developers.facebook.com/docs/instagram-basic-display-api/getting-started)

## 📖 API

| Property     | Type                                                                 | Default            | Description                                                                                                                         |
| ------------ | -------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| authCallback | function                                                             | required           | Callback function which takes two arguments `(error, authData)`                                                                     |
| appId        | string                                                               | required           | App ID of your OAuth App                                                                                                            |
| appSecret    | string                                                               | required           | App Secret of your OAuth App                                                                                                        |
| redirectUri  | string                                                               | required           | Authorization callback URL of your OAuth App                                                                                        |
| scopes       | string[]                                                             | `["user_profile"]` | Scopes list. Read more on [Permissions page](https://developers.facebook.com/docs/instagram-basic-display-api/overview#permissions) |
| buttonTheme  | enum(`"gradient"`, `"simple"`, `"gradient_short"`, `"simple_short"`) | `"gradient"`       | Button style theme                                                                                                                  |
| className    | string                                                               | `""`               | Custom class name                                                                                                                   |

## 📝 License

[MIT](https://github.com/alexandrtovmach/react-instagram-login/blob/master/LICENSE)
