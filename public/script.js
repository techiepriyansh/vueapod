const nasa_url = "https://api.nasa.gov/planetary/apod?api_key=";

function getRandomDate() {
  const start = 803298600000;
  const end = Date.now();
  let r = Math.floor(Math.random() * (end - start)) + start;
  let d = new Date(r);
  return `${d.getUTCFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}





let loader = new Vue({
  el: "#loader",
  data: {
    seen: true
  }
});

let app = new Vue({
  el: "#app",
  data: {
    seen: false,
    imgTitle: null,
    imgDate: null,
    imgSrc: null,
    imgExplanation: null,
    latest: null
  },
  methods: {
    updateImgData: async function(date) {
      this.seen = false;
      loader.seen = true;
      
      const response = await fetch('/random');
      let imgData = await response.json();

      this.imgTitle = imgData.title;
      this.imgDate = imgData.date;
      this.imgSrc = imgData.url;
      this.imgExplanation = imgData.explanation;
      this.latest = false;

      loader.seen = false;
      this.seen = true;
    },

    imgClicked: async function() {
      this.updateImgData();
    },

    setToday: async function() {
      
      if (!this.latest){
        this.seen = false;
        loader.seen = true;

        const response = await fetch('/latest');
        let imgData = await response.json();

        this.imgTitle = imgData.title;
        this.imgDate = imgData.date;
        this.imgSrc = imgData.url;
        this.imgExplanation = imgData.explanation;
        this.latest = true;

        loader.seen = false;
        this.seen = true;   
      }
    }
  },
  mounted() {
    this.updateImgData();
  }
});
