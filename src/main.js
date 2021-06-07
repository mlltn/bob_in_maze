import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './index.css'
import ElementUI from 'element-ui'
import './styles.scss'
import UUID from 'vue-uuid'
import compositionJSON from './composition_test.json'
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
    composition: compositionJSON,
    next_page_conditions: utils.initBooleanConditions(compositionJSON.NEXT_PAGE_CONDITIONS),
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

export const bus = new Vue();

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
