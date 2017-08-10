<template>
<div class="more-wrap">
    <ul class="more-list" >
      <li v-for="(menu,index) in moreMenu">
          <a href="javascript:;" @click="moreMenuClick()">
          	<i :class="'icon-'+menu.type"></i>
            <span class="more-type">{{menu.name}}</span>
          </a>
      </li>
    </ul>
</div>
</template>

<script>
let moreMenu = [
	{
		type : "qq-phone",
		name : "QQ电话"
	},
	{
		type : "video-phone",
		name : "视频电话"
	},
	{
		type : "add-star",
		name : "收藏"
	},
	{
		type :　"red-bag",
		name : "发红包"
	},
	{
		type : "send-money",
		name : "转账"
	},
	{
		type : "send-file",
		name : "发送文件"
	},
	{
		type : "msg-shake",
		name : "戳一戳"
	},
	{
		type : "play-music",
		name : "音乐"
	}
]
export default {
	data(){
		return {
			moreMenu : moreMenu
		}
	},
	methods :{
		moreMenuClick(){
			console.log("暂不支持此功能")
		}
	}
}
</script>

<style lang='scss' scoped>
@import "./static/scss/more-menu.scss";
</style>
