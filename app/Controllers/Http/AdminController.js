'use strict';

const User = use('App/Models/User');
const Hash = use('Hash');

class AdminController {
  async showLoginForm({ view }) {
    return view.render('admin.login');
  }

  async login({ request, response, auth, session }) {
    const { email, password } = request.all();

    try {
      const user = await User.findBy('email', email);
      if (user) {
        const passwordValid = await Hash.verify(password, user.password);
        if (passwordValid) {
          await auth.login(user);
          session.flash({ notification: 'Login successful!' });
          return response.redirect('/');
        }
      }
      session.flash({ error: 'Invalid credentials' });
      return response.redirect('back');
    } catch (error) {
      console.error(error);
      session.flash({ error: 'Login failed. Please try again.' });
      return response.redirect('back');
    }
  }
}

module.exports = AdminController;
