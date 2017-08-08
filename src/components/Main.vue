<template>
  <div id="main" class="view-wrap bg-white">
      <router-view :sideActive="sideActive" @side-open-emit="sideOpen"></router-view>
      <footer class="view-footer">
          <router-link class="view-foot-message" :to="{ path : '/message' , activeClass : 'active'}">消息</router-link>
          <router-link class="view-foot-contact" :to="{ path : '/contact' , activeClass : 'active'}">联系人</router-link>
          <router-link class="view-foot-dynamic" :to="{ path : '/dynamic' , activeClass : 'active'}">动态</router-link>
      </footer>
      <div class="view-side-layer" ref="sideLayer" :class="{ 'show' : sideLayerSwitch }"></div>
  </div>
</template>


<script>

export default {
  props : ["sideActive"],
  data () {
    return {
      activeClass: true,
      sideLayerSwitch : false
    }
  },
  mounted (){
      this.$watch("sideActive",function(){
          this.sideActive ? this.sideLayerSwitch = true : this.sideLayerSwitch = false;
      });
  },
  methods :{
      sideOpen (b){
        this.$emit("side-open-emit",true)
      }
  }
}

</script>

<style>

</style>
