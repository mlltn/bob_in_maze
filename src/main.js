import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './index.css'
import ElementUI from 'element-ui'
import './styles.scss'
import UUID from 'vue-uuid'
import compositionJSON from './composition.json'
import translationsJSON from './translations.json'
import * as utils from './logic/utils.js'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(UUID);

Vue.use({
  install(Vue) {
    Vue.prototype.$t = (translationKey) => {
      let o = translationsJSON[translationKey];
      if (o !== undefined && o["en"] !== undefined) {
        return o["en"];
      }
      return translationKey;
    }
  }
})

Vue.config.productionTip = false

var store = new Vuex.Store({
  state: {
    paska: "asdf",
    composition: compositionJSON,
    next_page_conditions: utils.initBooleanConditions(compositionJSON.NEXT_PAGE_CONDITIONS),

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

    resetNextPageConditions(state) {
      Object.keys(state.next_page_conditions).forEach(key => {
        state.next_page_conditions[key] = false;
      });
    },

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
