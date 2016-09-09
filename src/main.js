import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { redirects, routes } from './app/routes'
import { config, before, after } from './app/router'

import VueSvg from 'vue-svg-directive'

Vue.use(VueHead)
Vue.use(VueRouter)
Vue.use(VueResource)
require('./app/boot')

Vue.use(VueSvg, {
  sprites: '/static/icons.svg',
  prefix: '',
  class: 'icon'
})

// Init router with options
const Router = new VueRouter(config)
Router.map(routes)
Router.redirect(redirects)
Router.beforeEach(before)
Router.afterEach(after)

// Init app
import App from './App'
Router.start(App, 'app')

