<style>
html,body{
    background-color:#ecedf1;
}
/* 消息框 */
.view-msg-time{
    padding:.5rem 0 .75rem;
    text-align: center;
    color:#808080;
    font-size:.75rem;
}
.view-msg{
    position:relative;
    margin-bottom:1rem;
}
.view-msg.recv{
    padding:0 20% 0 15%;
}
.view-msg.send{
    padding:0 15% 0 20%;
}
.view-msg .user-photo{
    position:absolute;
    top:0;
    width: 2.5rem;
    height:2.5rem;
    border-radius:50%;
    overflow: hidden;
    background-color:#fff;
    z-index: 10;
}
.view-msg .user-photo img{
    position:absolute;
    left:0;top:0;
    width: 100%;
    height: 100%;
}
.view-msg.recv .user-photo{
    left:2%;
}
.view-msg.send .user-photo{
    right:2%;
}
.view-msg .msg-txt{
	display: inline-block;
    position:relative;
    max-width:100%;
    box-sizing:border-box;
    padding:.5rem 3%;
    font-size:1rem;
    line-height:1.5rem;
    text-align: left;
    background:#fff;
    border-radius:.5rem;
    z-index: 5;
    word-break:break-all;
}
.view-msg .msg-txt:before{
    position:absolute;
    content:"";
    top:.5rem;
    width:0px;
    height:0px;
    border:.5rem solid transparent;
}
.view-msg.recv .msg-txt:before{
    left:-1rem;
    border-right-color:#fff;
}
.view-msg.send .msg-txt:before{
    right:-1rem;
    border-left-color:#fff;
}.view-msg.send{
    text-align: right;
}
/*.view-msg img{
    width: 50%;
}*/
</style>

<template>
<div class="view-msg-loop">
    <div v-if="message.time" class="view-msg-time">{{ message.time }}</div>
    <div class="view-msg" :class="message.type">
        <div class="user-photo"><img :src="message.photo" /></div>
        <div class="msg-txt" v-html="emoji(message.txt)"><!--v-html="emoji(message.txt)"--></div>
    </div>
</div>
</template>

<script>
    export default {
        props: {
            message: Object
        },
        data () {
            return {
                closeToken: '',
                swiping: 0,
                menu: false
            }
        }
    }
</script>
