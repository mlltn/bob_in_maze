import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './index.css'
import ElementUI from 'element-ui'
import './styles.scss'

Vue.use(Vuex)
Vue.use(ElementUI)

Vue.config.productionTip = false

var store = new Vuex.Store({
  state: {
    sliderMenu: {
      props: {
        validTotalScore: 10,
        sliderBoxWidth: '300px',
      },
      default_settings: {
        score: 0,
        min: 0,
        max: 10,
      },
      sliders: [
        { id: 1, color: 'green' },
        { id: 2, color: 'blue' },
        { id: 3, color: 'blueviolet' },
      ],
    }
  },

  mutations: {

  }
})

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
