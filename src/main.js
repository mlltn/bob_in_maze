import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './index.css'
import ElementUI from 'element-ui'
import './styles.scss'
import UUID from 'vue-uuid'
import compostionJSON from './composition.json'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(UUID);

Vue.config.productionTip = false


var store = new Vuex.Store({
  state: {
    composition: compostionJSON,
    //TODO Add all below to composement
    sliderMenu: {
      isVisible: false,
      isValidScore: false,

      props: {
        validTotalScore: 10,
        sliderBoxWidth: '400px',
      },
      defaultSettings: {
        score: 0,
        min: 0,
        max: 10,
      },
      sliderProps: [
        { id: 1, color: 'green' },
        { id: 2, color: 'blue' },
        { id: 3, color: 'blueviolet' },
      ],
    }
  },
  mutations: {

    setSliderMenuVisible(state, visible) {
      state.sliderMenu.isVisible = visible;
    },
    setTotalScoreValid(state, isValidScore) {
      state.sliderMenu.isValidScore = isValidScore;
    }
  }
})

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
