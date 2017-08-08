<template>
<div>
<header class="view-head">
    <div class="view-head-left">
        <div class="user-phone"></div>
    </div>
    <div class="view-head-center">Contact
        <a class="left" :class="{ 'active' : viewTabLeft }">消息</a><a class="right" :class="{ 'active' : viewTabRight }">电话</a>
    </div>
    <div class="view-head-right">
        <svg class="view-head-more-icon" viewBox="0 0 169 169" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 3.8.3 (29802) - http://www.bohemiancoding.com/sketch -->
              <title>msg-plus</title>
              <desc>Created with Sketch.</desc>
              <defs>
                  <path d="M90,72 L90,6.00237186 C90,2.68870899 87.3137085,0 84,0 C80.6930342,0 78,2.68735342 78,6.00237186 L78,72 L6.00237186,72 C2.68870899,72 0,74.6862915 0,78 C0,81.3069658 2.68735342,84 6.00237186,84 L78,84 L78,162.997628 C78,166.311291 80.6862915,169 84,169 C87.3069658,169 90,166.312647 90,162.997628 L90,84 L162.997628,84 C166.311291,84 169,81.3137085 169,78 C169,74.6930342 166.312647,72 162.997628,72 L90,72 Z" id="msg-plus-1"></path>
                  <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="169" height="169" fill="white">
                      <use xlink:href="#msg-plus-1"></use>
                  </mask>
              </defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <use id="msg-plus" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="2" fill="#FFFFFF" xlink:href="#msg-plus-1"></use>
              </g>
          </svg>
    </div>
</header>
<content-list v-for="item in messages" :message="item"></content-list>
</div>
</template>

<script>
import ContentList from "./ContactList.vue";

export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!',
      viewTabRight : true,
      viewTabLeft : false,
      messages :[{
                    avatar: 'http://tp1.sinaimg.cn/1765813240/180/40054316852/1',
                    title: 'Awe',
                    preview: 'JavaScript performance updates in Microsoft Edge and',
                    time: '上午 12:20',
                    count: 99
                }, {
                    avatar: 'http://tp1.sinaimg.cn/1765813240/180/40054316852/1',
                    title: 'Awe',
                    preview: '卧槽',
                    time: '上午 12:20',
                    count: 10
                }, {
                    avatar: 'http://tp1.sinaimg.cn/1765813240/180/40054316852/1',
                    title: 'Awe',
                    preview: 'JavaScript performance updates in Microsoft Edge and',
                    time: '上午 12:20',
                    count: 10
                }, {
                    avatar: 'http://tp1.sinaimg.cn/1765813240/180/40054316852/1',
                    title: 'Awe',
                    preview: '卧槽',
                    time: '上午 12:20',
                    count: 10
                }, {
                    avatar: 'http://tp1.sinaimg.cn/1765813240/180/40054316852/1',
                    title: 'Awe',
                    preview: 'JavaScript performance updates in Microsoft Edge and',
                    time: '上午 12:20',
                    count: 99
                }]
    }
  },
  components: {
    ContentList
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    }
  }
}
</script>

<style scoped>
body {
  font-family: Helvetica, sans-serif;
}
.view-head{
    position:relative;
    padding:0 .5rem;
    height: 3rem;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    box-sizing:border-box;
    background: #26b8f2;
}
.view-head-left,.view-head-right{
    -webkit-flex-shrink : 0;
    flex-shrink : 0;
}
.view-head-center{
    margin:.5rem 0;
    width: 100%;
    text-align: center;
    color:#fff;
}
.view-head-center a{
  display: inline-block;
  border:1px solid #fff;
  width: 4.4rem;
  height: 2rem;
  color:#fff;
  background:#26b8f2;
  text-align: center;
}
.view-head-center a.active{
  color:#26b8f2;
  background-color:#fff;
}
.view-head-center a.left{
  border-right:0;
  margin-right:0;
  border-radius:.5rem 0 0 .5rem;
}
.view-head-center a.right{
  border-radius:0 .5rem .5rem 0;
}
.view-head-left .user-phone{
    margin:0.5rem 0;
    width: 2rem;
    height: 2rem;
    border-radius:50%;
    background-color:#fff;
}
.view-head-right .more{
    margin:0.5rem 0;
    width: 2rem;
    font-size:2rem;
    color:#fff;
}
.view-head-more-icon{
    width: 1.25rem;
    height: 1.25rem;
    margin-top: .875rem
}

</style>
