import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        articles: [],
        
    },
    getters: {
        articles(state){
            return state.articles
        }
    },
    mutations: {
        updateNews(state, data) {
            state.articles = data;
            }
    },
    actions: {
        async getNews(context,data) {
            console.log(data);
            var baseUrl = 'http://newsapi.org/v2/top-headlines?apiKey=7071bce3ae434ff3837aa5de4c358584'
            data.forEach(element => {
                var paramName = Object.keys(element);
                var paramValue =  Object.values(element)
                 baseUrl+=`&${paramName}=${paramValue}`
            });
            const response = await axios.get(baseUrl)
            console.log(response.data.articles)
             context.commit('updateNews', response.data.articles)
             alert(baseUrl)
        }
    }
})