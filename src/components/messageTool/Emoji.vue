<template>
<div class="emoji">
    <ul class="emoji-list" >
      <li v-for="(emojiAry,index) in emojiAll"
          v-show="index===activeIndex"
          :key="index">
          <a href="javascript:;" 
          v-for="(emoji,index) in emojiAry"
          @click="emit(emoji)">
            <span class="emoji-item"
              :title="emoji"
              :class="'sprite-'+getEmojiName(emoji)"></span>
          </a>
      </li>
    </ul>
    <ul class="emoji-menu">
      <li v-for="(menu,index) in emojiMenu"
        @click="menuChange(index)"
        :class="{'active': index === activeIndex}">{{ menu }}</li>
    </ul>
</div>
</template>


<script>
import data from "../../data/emoji-data.js"
export default {
  data () {
    return {
      emojiData : data,
      emojiMenu : ["表情","自然","物品","地点","符号"],
      activeIndex: 0
    }
  },
  methods :{
      getEmojiName (name){
        return name.replace(/:/g,"");
      },
  	  emit(code){
  	  	this.$emit("select",code)
  	  },
      menuChange(index){
        this.activeIndex = index;
      }
  },
  computed :{
      emojiAll (){
          return this.emojiMenu.map(item=>{
              return Object.keys(this.emojiData[item]);
          })
      }
  }
}

</script>
<style lang='scss' scoped>
@import '/static/css/iconfont.css';
@import './static/scss/emoji-sprite.scss';
.emoji-menu{
	position:relative;
  background-color:#ecedf1;
	overflow: hidden;
  li{
    float: left;
    width:20%;
    height: 22px;
    line-height:22px;
    font-size:.875rem;
    color:#333;
    text-align: center;
  }
  li.active{
    color:#fda200;
    background-color:#fff;
  }
}
.emoji-list{
	position:relative;
  background-color:#fff;
  li {
  height: 122px;
  overflow-y: auto;
  overflow-x: hidden;
      a {
        position:relative;
        float: left;
        margin:.2rem 1%;
        width: 8%;
        height: 0px;
        padding-top:8%;
        overflow: hidden;
        border-radius: 4px;
        &:hover {
          background-color: #d8d8d8;
          border-color: #d8d8d8;
        }
        span {
          position:absolute;
          top:0px;left:0px;right:0;bottom:0;
          margin:auto;
        }
      }
  }
}
</style>
