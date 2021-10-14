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
import { execute } from './logic/leavePageActions'

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

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
    currentPage: 0,
    showGuides: false,
    nextPageConditions: [],
    composition: utils.parseComposition(compositionJSON, templatesJSON), // real component tree and props
    pages: utils.parsePages(compositionJSON.PAGES), //flat hierarchy (pages -> components) for easy data hold
    preloadedMedia: utils.getMediaObject(require.context('./assets/tasks/')),
    dynamicProps: {},

    results: utils.initResults(compositionJSON.RESULT_SET)
  },
  getters: {
    getComponentById: (state) => (pageId, componentId) => {
      return state.pages[pageId].components[componentId];
    },
    getDynamicProp: (state) => (key) => {
      return state.dynamicProps[key];
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
    executeLeavePageAction(state, action) {
      console.log(action)
      execute[action](state);
    },
    previousPage(state) {
      state.currentPage--;
    },
    nextPage(state) {
      state.currentPage++;
    },
    toggleGuides(state) {
      state.showGuides = !state.showGuides
    },
    toExperiment(state) {
      state.currentPage = Object.keys(state.pages).length - 3;
    },
    setDynamicProp(state, newProp) {
      Vue.set(state.dynamicProps, newProp['key'], newProp['value']);
    },
    pushNewExperimentResult(state, newResult) {
      state.results.experiment.push(newResult)
    },
    saveResult(state, { resultKey, key, value }) {
      state.results[resultKey][key] = value;
    },
    submitResults(state) {
      let uri = (process.env.MONGODB_URI || 'http://localhost:4000') + '/posts/add';
      axios.post(uri, state.results);
    }
  }
})

export const bus = new Vue();

new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')
