# Ionic + Sign in with Apple and Google

Please read [Ionic + Sign in with Apple and Google](https://developer.okta.com/blog/2020/09/21/ionic-apple-google-signin) to read about how this app was created.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

**Prerequisites:** 
- [Node 12](https://nodejs.org/)+
- [Ionic CLI](https://ionicframework.com/docs/cli/)

Clone this application to your local hard drive using Git.

```
git clone https://github.com/oktadeveloper/okta-ionic-social-login-example.git
```

Or use the [GitHub CLI](https://cli.github.com/):

```
gh repo clone oktadeveloper/okta-ionic-social-login-example
```

Install this example's dependencies:

```
cd okta-ionic-social-login-example
npm i
```

### Use Okta for Identity

You will need to create an OIDC Application in Okta to get your configuration settings to log in. You'll need to create an Okta developer account and register your app to get a client ID. Head on over to [developer.okta.com/signup](https://developer.okta.com/signup) if you'd like to do this in your browser. 

If you prefer the command line, install the [Okta CLI](https://github.com/oktadeveloper/okta-cli). Run `okta register` to sign up for a new account. 

Log in to your Okta Developer account or use `okta apps create`. If you use your browser, go to **Applications** > **Add Application**. 

On the Create New Application page, select **Native**. Name your app `Ionic Social`, and configure it as follows:

* Login redirect URIs: 
  * `http://localhost:8100/callback`
  * `com.okta.dev-133337:/callback` (where `dev-133337.okta.com` is your Okta Org URL)
* Logout redirect URIs:
  * `http://localhost:8100/logout`
  * `com.okta.dev-133337:/logout`
* Grant type allowed: 
  - [x] **Authorization Code**
  - [x] **Refresh Token**
* Click **Done**

Run `ionic serve` and open `http://localhost:8100` in a new incognito window. Click **Login** to sign in to your Okta developer account.

## Links

This example uses the following open source libraries:

* [Ionic](https://ionicframework.com/)
* [Ionic AppAuth](https://github.com/wi3land/ionic-appauth)
* [OktaDev Schematics](https://github.com/oktadeveloper/schematics)

## Help

Please post any questions as issues in this forum, as questions on the [blog post](https://developer.okta.com/blog/2020/09/21/ionic-apple-google-signin), or on [Stack Overflow](https://www.stackoverflow.com) with an "okta" tag.

## License

Apache 2.0, see [LICENSE](LICENSE).
