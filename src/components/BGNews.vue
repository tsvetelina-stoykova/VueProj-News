<template>
  <div class="news">
      {{articles}}
    <b-container class="container-news">
      <b-nav-form class="searchbar">
          <b-form-input v-model="keyword" id="name" size="md" class="mr-sm-2 searchbar-input" placeholder="Search"></b-form-input>
          <b-button @click.prevent="search()" size="md" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
    </b-container>
 
  <div class="result-list">
    <article v-for="(article, index) in news" :key='index' @click="navTo(article.url)">
      <header>
        <img v-if="article.urlToImage" :src="article.urlToImage" alt="">
      </header>
      <section v-html="article.title" class="article-title"></section>
    </article>
  </div>

  <div>
     <article v-for="(article, index) in searchedNews" :key='index' @click="navTo(article.url)">
      <header>
        <img v-if="article.urlToImage" :src="article.urlToImage" alt="">
      </header>
      <section v-html="article.title" class="article-title"></section>
    </article>
  </div>

  <div class="card-footer pb-0 pt-3">
  
      <jw-pagination :items="articles" @changePage="onChangePage"></jw-pagination>
  </div>

  <!-- <div class="card ">
        <div class="card-body">
            <div v-for="item in pageOfItems" :key="item.id">{{item.name}}</div>
            
        </div>
        <div class="card-footer pb-0 pt-3">
            <jw-pagination :item="pageOfItems" @changePage="onChangePage"></jw-pagination>
        </div>
    </div> -->

  </div>
</template>

<script>
import axios from 'axios'
const exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
console.log(exampleItems)

export default {
  data: () => {
    return {
      apiUrl: '',
      currentPage: 1,
      totalResults: 0,
      maxPerPage: 10,
      keyword: '',
      articles: [],
      filters:[],
      country: 'bg',
      exampleItems,
      pageOfItems: [],
    }
  },

  methods: {
    navTo(url){
      window.open(url)
    },
    search(){
      this.$store.dispatch('searchNews',this.keyword);  
    },
    // onChangePage(pageOfItems) {
    //         // update page of items
    //         this.pageOfItems = pageOfItems;
    //         console.log(pageOfItems);
    // }
    onChangePage(pageOfItems) {
            // update page of items
            alert(pageOfItems)
            this.pageOfItems = pageOfItems;
            console.log(pageOfItems);
    }
  },
 

  created(){
    // this.fetchNews();
    const dynamicUrl = "";
    // var o = {
    //   key: 'value'
    // }
    this.filters.push( {'country' : this.country} ) 
    this.filters.push({'pageSize': this.maxPerPage})
    this.filters.push({'q': this.keyword})
    // console.log(this.filters)
    this.$store.dispatch('getNews',this.filters);
    
    
  },
  computed: {
   news(){
        return this.$store.getters.articles
      },
      searchedNews(){
        return this.$store.getters.searchResults
       
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container-news {
  position: relative;
}
.searchbar {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  width: 100%;
}
.searchbar-input {
  padding: 0 50px 0 50px;
  margin: 0;
  width: calc(100% - 100px);
}

.result-list {
  padding-top: 54px;
}

article {
  display: grid;
  grid-template-columns: 400px 600px;
  grid-template-rows: 250px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  cursor: pointer;
}
header {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  overflow: hidden;
}
img {
  max-width: 550px;
  height: 400px;
}
.article-title{
  position: relative;
  width: 300px;
  margin: 0;
  padding: 10px;
  height: 100px;
}
</style>
