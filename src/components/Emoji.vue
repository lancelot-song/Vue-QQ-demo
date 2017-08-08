<template>
<div class="emoji">
    <ul class="emoji-menu">
      <li v-for="(menu,index) in emojiMenu"
        @click="menuChange(index)"
        :class="{'active': index === activeIndex}">{{ menu }}</li>
    </ul>
    <ul class="emoji-list" 
    	v-for="(emojiAry,index) in emojiAll"
    	v-show="index===activeIndex">
      <li v-for="(emoji,index) in emojiAry.data"
        @click="emit(emoji)">{{ emoji }}</li>
    </ul>
</div>
</template>


<script>
import emojiData from "../api/emoji.js"
export default {
  props : ["sideActive"],
  data () {
    return {
      emoji : emojiData,
      emojiMenu : ["表情","自然","物品","地点","符号"],
      emojiAll : [{
      	data : ["1","2","3","4","5","6","7","8","9","10"]
      },{
      	data : ["11","12","13","34","15","16","17","18","19","20"]
      },{
      	data : ["21","22","23","24","25","26","27","28","29","30"]
      },{
      	data : ["31","32","33","34","35","36","37","38","39","40"]
      },{
      	data : ["41","42","43","44","45","46","47","48","49","50"]
      }],
      activeIndex: 0
    }
  },
  mounted (){
      this.$watch("sideActive",function(){
          this.sideActive ? this.sideLayerSwitch = true : this.sideLayerSwitch = false;
      });
  },
  methods :{
  	  emit(code){
  	  	this.$emit("select",code)
  	  },
      menuChange(index){
        this.activeIndex = index;
      }
  }
}

</script>

<style>
.emoji-menu{
	position:relative;
	overflow: hidden;
}
.emoji-menu li{
	float: left;
	width:20%;
	text-align: center;
}
.emoji-menu li.active{
	color:#fda200
}
.emoji-list{
	position:relative;
	overflow: hidden;
}
.emoji-list li{
	float:left;
	width: 10%;
	text-align: center;
}
</style>
