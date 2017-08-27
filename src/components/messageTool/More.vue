<template>
<div class="more-wrap" >
	<div class="more-swipe" 
		:style="'width:'+moreListWidth+'px;'"
		v-swipe.page="{ type : 'page'}">
	    <ul class="more-list" v-for="(menuAry,index) in moreMenu" :style="'width:'+moreListWidth/2+'px'">
	      <li v-for="(menu,index) in menuAry">
	          <a href="javascript:;" @click="moreMenuClick()">
	          	<i :class="'icon-'+menu.type"></i>
	            <span class="more-type">{{menu.name}}</span>
	          </a>
	      </li>
	    </ul>
   </div>
</div>
</template>

<script>
let moreMenu = [
	[	
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
	],
	[	
		{
			type : "position",
			name : "位置"
		},
		{
			type : "recommend-contact",
			name : "推荐联系人"
		}
	]	
]
export default {
	data(){
		return {
			moreMenu : moreMenu
		}
	},
	mounted (){
//		this.$nextTick(function(){
//			console.log(this.moreMenu);
//		});
	},
	methods :{
		moreSwipe () {
			console.log("swiping");
		},
		moreMenuClick(){
			console.log("暂不支持此功能")
		}
	},
	computed :{
		moreListWidth () {
			return this.moreMenu.length * document.body.clientWidth;
		}
	}
}
</script>

<style lang='scss'>
@import "./static/scss/more-menu.scss";
</style>
