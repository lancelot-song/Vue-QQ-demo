<style>
.app{
    position:absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.app #main,.app #userSide{
    -webkit-transition:transform .5s ease-out;
    transition:transform .5s ease-out;
}
.app.side-active #main,.app.side-active #userSide{
    -webkit-transform:translate3d(20rem , 0 ,0);
    transform:translate3d(20rem , 0 ,0);
}
</style>
<template>
  <div id="apps" class="app" :class="{ 'side-active' : sideActive }">
      <router-view :sideActive="sideActive" @side-open-emit="sideOpen"></router-view>
      <user-side-data :sideActive="sideActive"></user-side-data>
  </div>
</template>


<script>

import UserSideData from "./components/UserSideData.vue";
export default {
  data () {
    return {
      activeClass: true,
      sideActive : false
    }
  },
  mounted (){
      this.sideSwitch();
  },
  components : {
    UserSideData
  },
  methods : {
    sideSwitch () {
//      window.listSwipe = false;
//      this.$swipe.listen('swipe-right', this.$el, () => {
//          if(window.listSwipe) return false;
//          this.sideActive = true;
//          this.closeToken = this.$swipe.listen('swipe-left', this.$el, () => {
//              this.sideActive = false;
//              this.$swipe.leave('swipe-left', this.closeToken)
//          })
//      })
    },
    sideOpen (b){
//    this.sideActive = true;
//    this.closeToken = this.$swipe.listen('swipe-left', this.$el, () => {
//        this.sideActive = false;
//        this.$swipe.leave('swipe-left', this.closeToken)
//    })
    }
  }
}

</script>