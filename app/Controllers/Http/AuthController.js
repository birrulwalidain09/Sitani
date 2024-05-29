'use strict';

class AuthController {
  showLogin({ view }) {
    return view.render('auth.login');
  }
}

module.exports = AuthController;
