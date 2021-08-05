import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './index.css'
import ElementUI from 'element-ui'
import './styles.scss'
import UUID from 'vue-uuid'
import compositionJSON from './composition.json'
import templatesJSON from './templates.json'
import translationsJSON from './translations.json'

import * as utils from './logic/utils'

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
    composition: utils.parseComposition(compositionJSON, templatesJSON),
    currentPage: 0,
    nextPageConditions: [],
    pages: utils.parsePages(compositionJSON.PAGES),
    preloadedMedia: utils.getMediaObject(require.context('./assets/tasks/'))
  },
  getters: {
    getComponentById: (state) => (pageId, componentId) => {
      return state.pages[pageId].components[componentId]
    }
  },
  mutations: {

    updateNextPageCondition(state, condition) {
      state.nextPageConditions[condition.name] = condition.value;
    },
    resetNextPageConditions(state) {
      Object.keys(state.nextPageConditions).forEach(key => {
        state.nextPageConditions[key] = false;
      });
    },
    previousPage(state) {
      state.currentPage--;
    },
    nextPage(state) {
      state.currentPage++;
    }
  }
})

export const bus = new Vue();

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
