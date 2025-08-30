import DefaultTheme from 'vitepress/theme'

import PortList from './components/PortList.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('PortList', PortList)
  }
}