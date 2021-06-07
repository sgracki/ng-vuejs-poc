const MyVueWebComp = {
  props: ['term'],
  template: `
     <div class="news">
         <ol v-if="!loading">
            <li v-for="(item, index) in news">
                <h3>
                    <a href="#" v-on:click="$emit('openUrl', item.url)" target="_blank">{{index + 1}}. {{item.title}}</a>
                </h3>
            </li>
         </ol>

         <p v-if="!term">No results because search term is empty</p>
         <p v-if="loading">Loading...</p>
    </div>
    `,
  data() {
    return {
      news: [],
      loading: false,
      errored: false
    };
  },
  created: function () {
    this.debouncedGetAnswer = _.debounce(function (msg) {
      this.getNews(msg);
    }, 250)
  },
  watch: {
    term: function (newVal, oldVal) {
      this.debouncedGetAnswer(newVal);
    }
  },
  methods: {
    getNews(term) {
      console.log({term})
      if (!term) {
        this.news = [];
        return;
      }

      const url = `https://newsapi.org/v2/everything?q=${term}&sortBy=relevancy&language=en&apiKey=547c5c7d027f425097b88a69c0952da4`;
      this.loading = true;

      axios
        .get(url)
        .then(response => {
          this.news = response.data.articles;
        })
        .catch(error => {
          console.log(error)
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        })
    }
  }
};
Vue.customElement('vuejs-news-list', MyVueWebComp);
