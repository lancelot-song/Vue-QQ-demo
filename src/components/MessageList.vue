<style>
.view-list-wrap{
  position:absolute;
  left:0;top:0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
  .view-iscroll-message{
    padding:3rem 0 3.5rem;
  }
  .view-msglist-search{
    padding:.5rem;
    background-color:#fff;
  }
  .view-search-input{
    width: 100%;
    height: 1.75rem;
    background-color:#edeef2;
    color:#a6a6a6;
    text-align: center;
    font-weight:700;
    font-size:.875rem;
    border-radius:.25rem;
  }
</style>
<template>
<div class="view-list-wrap">
    <header class="view-head" ref="viewHead">
        <div class="view-head-left">
            <div class="user-photo" @click="sideOpen">
                <img src="/static/images/userphoto-04.png" width="100%" height="100%" />
            </div>
        </div>
        <div class="view-head-center">
            <a class="left" :class="{ 'active' : viewTabLeft }" >消息</a><a class="right" :class="{ 'active' : viewTabRight }">电话</a>
        </div>
        <div class="view-head-right">
            <img src="/static/images/more.svg" width="22" class="view-head-icon-more" />
        </div>
    </header>
    <div id="iscroll" class="view-iscroll-message">
        <div class="cov-message-chat-box" :style="{ 'transform': 'translate3d(0,'+ top + 'px,0)' }">
            <div class="view-msglist-search">
                <input type="text" class="view-search-input" placeholder="搜索" @click="msglistSearch" />
            </div>
            <content-list-data v-for="item in messages" :message="item" :sideActive="sideActive"></content-list-data>
        </div>
    </div>
</div>
</template>

<script>
import ContentListData from "./MessageListData.vue";

export default {
  props : ["sideActive"],
  data () {
    return {
      swipingTimer: null,
      refreshTimer: null,
      top: 0,
      loading: false,
      msg: 'Use Vue 2.0 Today!',
      viewTabRight : true,
      viewTabLeft : false,
      messages : []
    }
  },
  components: {
    ContentListData
  },
  mounted (){
    this.$nextTick(function(){
        this.cartView();
    })
  },
  methods: {
    cartView () {
        this.$http.get("/static/data/MessageListData.json").then(res=>{
            this.messages = res.data;
        })
    },
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    },
    sideOpen (){
      this.$emit("side-open-emit",true)
    },
    msglistSearch (){
      // console.log(this.$refs.viewHead.offsetHeight)
      // this.$refs.viewHead.style.top = "-" + this.$refs.viewHead.offsetHeight + "px";
    }
  }
}
</script>
