<style>
  .view-iscroll-chat{
    padding:3rem 0 6rem;
    height:100%;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    -webkit-transition:all .3s ease;
    transition:all .3s ease;
    -webkit-transform:translateZ(0);
    transform:translateZ(0);
  }

/* 底部工具栏 */
.view-editor{
    position:fixed;
    left:0;
    bottom:0;
    width: 100%;
    z-index: 100;
    -webkit-transition:all .2s ease-out;
    transition:all .2s ease-out;
    -webkit-transform:translateZ(0);
    transform:translateZ(0);
}
.view-input-group{
	position:relative;
	padding-right:5.5rem;
	overflow: hidden;
}
.view-editor .textarea{
    margin:.5rem 0 .65rem .5rem;
    width: 100%;
    height:2rem;
    line-height:2rem;
    font-size:.875rem;
    padding:0 .75rem;
    color:#333;
    border-radius:.3rem;
    box-sizing:border-box;
    background-color:#fff;
}
.view-editor .btn-send{
	position:absolute;
	top:.5rem;
	right:.5rem;
	width: 4rem;
	height: 2rem;
	border-radius:.3rem;
	color:#fff;
	text-align: center;
	font-size:.875rem;
	background-color:#26b8f2;
}
.view-editor-tool{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display: flex;
}
.view-editor-status{
}
.icon-editor{
    display: inline-block;
    -webkit-box-flex:1;
    -webkit-flex:1;
    -ms-flex:1;
    flex:1;
    text-align: center;
}
.pt-2{
  padding-top:2px;
}
.emoji-wrap{
	display: none;
}
.emoji-wrap.active{
	display: block;
}
</style>
<template>
<div class="view-wrap bg-gray">
  <header class="view-head">
      <div class="view-head-left">
          <router-link :to="{ path: '/message'}" class="return-link">
            <img src="/static/images/return.svg" class="view-head-icon-return" width="28" />消息</router-link>

      </div>
      <span class="view-head-center">
          <a>LSZH</a><br/>
          <small class="status">Wifi-在线</small>
      </span>
      <div class="view-head-right">
        <span class="view-head-icon-2">
            <img src="/static/images/phone.svg" width="30" />
        </span>
        <span class="view-head-icon-2">
            <img src="/static/images/user.svg" width="28" />
        </span>

      </div>
  </header>

  <div id="iscroll" class="view-iscroll-chat">
      <chat-data v-for="item in chats" :message="item"></chat-data>
  </div>

  <div class="view-editor" id="editorContent">
    <form id="messageForm" @submit.prevent="onSubmit">
      <div class="view-input-group">
      	<input type="text" v-model="val" class="textarea" placeholder="请输入您要发送的消息" />
      	<button type="button" @click="submitMsg" class="btn-send">提交</button>
      </div>
      <div class="view-editor-tool">
          <div class="icon-editor">
              <img src="/static/images/microphone.svg"  width="36" height="30" @click="sendFn('source')" />
          </div>
          <div class="icon-editor">
              <img src="/static/images/smallvideo.svg"  width="28" @click="sendFn('video')" />
          </div>
          <div class="icon-editor pt-2">
              <img src="/static/images/frame-landscape.svg"  width="22" @click="sendFn('photo')" />
          </div>
          <div class="icon-editor pt-2">
              <img src="/static/images/photo-camera.svg"  width="24"  @click="sendFn('picture')" />
          </div>
          <div class="icon-editor pt-2">
              <img src="/static/images/dollars-bag.svg"  width="22" @click="sendFn('money')" />
          </div>
          <div class="icon-editor pt-2">
              <img src="/static/images/expression.svg"  width="26" @click="sendFn('emoji')" />
          </div>
          <div class="icon-editor pt-2">
              <img src="/static/images/round-add-button.svg"  width="22" @click="sendFn('more')" />
          </div>
      </div>
      <div class="view-editor-status" id="editorStatus">
          <transition name="fade" mode="">
              <div class="emoji-wrap" :class="{'active' : showStatus==='picture'}">
                  <vue-emoji @select="selectEmoji"></vue-emoji>
              </div>
					</transition>
          <transition name="fade" mode="">
              <div class="emoji-wrap" :class="{'active' : showStatus==='emoji'}">
                  <vue-emoji @select="selectEmoji"></vue-emoji>
              </div>
					</transition>
          <transition name="fade" mode="">
              <div class="emoji-wrap" :class="{'active' : showStatus==='more'}">
                  <vue-emoji @select="selectEmoji"></vue-emoji>
              </div>
          </transition>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import ChatData from "./MessageChatData.vue";
import VueEmoji from "./Emoji.vue";

export default {
  data () {
    return {
      msg: 'Use Vue 2.0 Today!',
      viewTabRight : true,
      viewTabLeft : false,
      val : "",
      showStatus : null,
      chats :[]
    }
  },
  components: {
    ChatData,
    VueEmoji
  },
  mounted : function(){
    this.$nextTick(function(){
      this.getChatData();
    })
  },
  methods: {
  	sendFn(type){
  		var self = this,
  				status = document.getElementById("editorStatus"),
          statusHeight = status.clientHeight,
          setFn;
          
  		self.showStatus===type ? self.showStatus = false : self.showStatus = type;
  		
      setFn = setTimeout(function(){;
        if(statusHeight!=status.clientHeight){
            document.getElementById("iscroll").style.top = "-"+document.getElementById("editorStatus").scrollHeight + "px";
        }else if(!self.showStatus){
            document.getElementById("iscroll").style.top = "0px";
        }
      },0);
      
  		switch(type){
  			case "source":
  				self.sendSource();
  				break;
  			case "video":
  				self.sendVideo();
  				break;
  			case "photo":
  				self.sendPhoto();
  				break;
  			case "picture":
  				self.sendPicture();
  				break;
  			case "money":
  				self.sendMoney();
  				break;
  			case "emoji":
  				self.sendEmoji();
  				break;
  			case "more":
  				self.sendMore();
  				break;
  		}
  	},
    sendSource(){
      console.log("暂不支持发送录音")
    },
    sendVideo(){
      console.log("暂不支持发送视频")
    },
    sendPhoto(){
      console.log("暂不支持发送图片")
    },
    sendPicture(){
      console.log("暂不支持拍照")
    },
    sendMoney(){
      console.log("暂不支持发送红包")
    },
    sendEmoji(){
    	console.log("即将上线Emoji")
    },
    selectEmoji( code ){
      this.val += code;
    },
    sendMore(){
      console.log("暂不支持发送录音")
    },
    onSubmit(){
      console.log("提交了")
    },
    submitMsg(){
    	var value = this.val;
    	this.val = "";
    	this.chats.push({
		    "type": "send",
		    "photo":"./static/images/userphoto-04.png",
		    "txt": value
			})
    },
    getChatData () {
      this.$http.get("/static/data/MessageChatData.json").then(res=>{
          this.chats = res.data;
      })
    },
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
