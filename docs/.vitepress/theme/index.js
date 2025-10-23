import DefaultTheme from 'vitepress/theme'

import PortList from './components/PortList.vue'
import BuildList from './components/BuildList.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('PortList', PortList)
    app.component('BuildList', BuildList)
  }
}