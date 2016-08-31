module.exports = {

  /**
   * Redirects
   * @type {Object}
   */
  redirects: {
  },

  /**
   * Routes
   * @type {Object}
   */
  routes: {
    '/': {
      name: 'home',
      title: 'Blade&Soul Profile Picture',
      component: require('../components/Home')
    },

    'help': {
      name: 'help',
      title: 'Blade&Soul Profile Picture',
      component: require('../components/Help')
    },

    '*': {
      name: 'not-found',
      title: 'Not found',
      component: require('../components/NotFound')
    }
  }
}
