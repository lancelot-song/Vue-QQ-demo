<style scoped>
  .view-iscroll-chat{
  	position:absolute;
  	width:100%;
  	left:0rem;
  	top:3rem;bottom:5.125rem;
  	overflow-x: hidden;
  	overflow-y: auto;
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
    overflow: hidden;
}
.view-input-group{
	position:relative;
	padding-right:5.5rem;
	overflow: hidden;
}
.view-editor .textarea{
    margin:8px 0 10px 8px;
    padding:4px 12px;
    width: 100%;
    height: 32px;
    line-height:24px;
    font-size:14px;
    color:#333;
    border-radius:.3rem;
    background-color:#fff;
    resize: none;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    overflow: hidden;
}
.view-input-group-copy{
	position:absolute;
	bottom:-100%;
	width:100%;
	padding-right:5.5rem;
	visibility: hidden;
	overflow: hidden;
	-webkit-box-sizing:border-box;
	box-sizing:border-box;
}
.view-editor .textarea-copy{
    padding:4px 12px;
    width: 100%;
    height: 32px;
    line-height:24px;
    font-size:14px;
    color:#333;
    border-radius:.3rem;
    background-color:#fff;
    resize: none;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    overflow: hidden;
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
  height: 144px;
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
        	<router-link :to="{ path: '/message/friendInfo'}" class="return-link">
            <img src="/static/images/user.svg" width="28" />
         </router-link>
        </span>

      </div>
  </header>

  <div class="view-iscroll-chat" ref = "iscrollChat"
  		 :style="'-webkit-transform:translateY(-'+iscrollTop+'px);transform:translateY(-'+iscrollTop+'px)'">
      <chat-data v-for="item in chats" :message="item"></chat-data>
  </div>

  <div class="view-editor">
    <form @submit.prevent="onSubmit">
      <div class="view-input-group">
      	<textarea class="textarea" placeholder="请输入您要发送的消息" ref="inputMsg" autocorrect="off"
      			v-model="val" 
      			@click="inputFocus($event)"
      			@keyup="inputKeyup($event)"
      			@input="inputKeyup($event)"
      			:style="'height:'+inputHeight+'px'"
      			></textarea>
      	<button type="button" @click="submitMsg" class="btn-send">发送</button>
      </div>
      <div class="view-input-group-copy">
      	<textarea class="textarea-copy" ref="inputCopy" autocorrect="off" v-model="val"></textarea>
      </div>
      <div class="view-editor-tool">
      		<div class="icon-editor" v-for="(item,key) in editorTool">
              <img :src="item.src"  :width="item.width" @click="sendFn(key)" />
      		</div>
      </div>
      <div class="view-editor-status" v-show="showStatus!==false">
          <div class="emoji-wrap" :class="{'active' : showStatus==='picture'}">
              <vue-emoji @select="selectEmoji"></vue-emoji>
          </div>
          <div class="emoji-wrap" :class="{'active' : showStatus==='emoji'}">
              <vue-emoji @select="selectEmoji"></vue-emoji>
          </div>
          <div class="emoji-wrap" :class="{'active' : showStatus==='more'}">
              <vue-more></vue-more>
          </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import ChatData from "./MessageChatData.vue";
import VueEmoji from "./messageTool/Emoji.vue";
import VueMore from "./messageTool/More.vue";

let editorTool = {
		source : {
				src : "/static/images/microphone.svg",
				width : 36
		},
		video : {
				src : "/static/images/smallvideo.svg",
				width : 28
		},
		photo : {
				src : "/static/images/frame-landscape.svg",
				width : 22
		},
		picture : {
				src : "/static/images/photo-camera.svg",
				width : 24
		},
		money : {
				src : "/static/images/dollars-bag.svg",
				width : 22
		},
		emoji : {
				src : "/static/images/expression.svg",
				width : 26
		},
		more : {
				src : "/static/images/round-add-button.svg",
				width : 22
		}
}
let obj = ["c","d"];
let obj2 = {a:1,b:2};
console.log(obj2[Symbol.isConcatSpreadable]);
obj2[Symbol.isConcatSpreadable] = true;
console.log(["a","b"].concat(obj2,"e"));
export default {
  data () {
    return {
      val : "",
      showStatus : false,
      iscrollTop : 0,
      showStatusHeight : "144",
      inputHeight : 32,
      inputHeightDefault : 0,
      chats :[],
      editorTool : editorTool
    }
  },
  components: {
    ChatData,
    VueEmoji,
    VueMore
  },
  mounted : function(){
    this.$nextTick(function(){
      this.getChatData();
      this.inputHeightDefault = this.inputHeight =  this.$refs.inputMsg.clientHeight;
    });
  },
  methods: {
  	setStatusPosition(type){//计算 界面&状态栏 位置
  		var self = this;
	  		self.showStatus===type ? self.showStatus = false : self.showStatus = type;
				self.showStatus ? self.iscrollTop = self.showStatusHeight : self.iscrollTop = 0;
  	},
  	setInputPosition(){//计算 光标位置
      var input = this.$refs.inputMsg,
      		len = this.val.length;
  		if (document.selection) { 
					var sel = input.createTextRange(); 
					sel.moveStart('character',len); 
					sel.collapse(); 
					sel.select(); 
			} else if (typeof input.selectionStart == 'number' && typeof input.selectionEnd == 'number') { 
					input.selectionStart = input.selectionEnd = len;
			}
  	},
  	inputFocus(e){//输入框获得焦点
  		e.preventDefault();
  		this.setInputPosition();
  		this.setStatusPosition(false);
  	},
  	inputKeyup(){//输入时计算高度
  		var copyHeight = this.$refs.inputCopy.scrollHeight;
  		if(this.inputHeight!=copyHeight) this.inputHeight = copyHeight;
  	},
    selectEmoji( code ){//选择表情
      this.val += code;
      this.$nextTick(function(){
  			this.inputKeyup();
  			this.setInputPosition();
      })
    },
  	sendFn(type){
  		var self = this;
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
					this.setStatusPosition(type);
  				self.sendEmoji();
  				break;
  			case "more":
					this.setStatusPosition(type);
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
    sendMore(){
      console.log("暂不支持发送录音")
    },
    onSubmit(){
      console.log("提交了")
    },
    submitMsg(){
    	if(this.val==="") return false;
  		this.inputHeight = this.inputHeightDefault;
    	var value = this.val;
    	this.val = "";
    	this.chats.push({
		    "type": "send",
		    "photo":"./static/images/userphoto-04.png",
		    "txt": value
			});
			this.$nextTick(function(){
				var iscrollChat = this.$refs.iscrollChat;
				iscrollChat.scrollTop = iscrollChat.scrollHeight - iscrollChat.clientHeight;
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
