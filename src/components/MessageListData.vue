<style scoped>
    .cov-message-chat-row {
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .cov-message-chat-item{
        display: block;
    }
    .cov-message-menu {
        position: absolute;
        top: 0;
        right: -10rem;
        background: #ccc;
        width: 10rem;
        height: 4rem;
        display: flex;
        z-index: 1;
        transform: translate3d(0, 0, 0);
    }
    .cov-message-menu-item {
        width: 50%;
        text-align: center;
        line-height: 4rem;
        color: #fff;
    }
    .cov-message-menu-item.delete {
        background: #ff3737;
    }
    .cov-message-chat-item {
        display: flex;
        height: 4rem;
        border-bottom: 1px solid #f0f0f0;
        color:#333;
        background: #fff;
        z-index: 2;
        width: 100%;
        transform: translate3d(0, 0, 0);
    }
    .cov-message-chat-avatar {
        height: 3rem;
        width: 3rem;
        background-size: cover;
        border-radius: 50%;
        margin: .5rem;
        flex-shrink: 0;
    }
    .cov-message-chat-content {
        padding: .5rem;
        width: 100%;
    }
    .cov-message-chat-title {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.2rem;
    }
    .cov-message-chat-preview {
        font-size: .8rem;
        color: #666;
        height: 1rem;
        color:#A6A6A6;
        overflow: hidden;
    }
    .cov-message-chat-info {
        flex-shrink: 0;
        font-size: .8rem;
        width: 5rem;
        padding: .8rem .5rem .8rem 0;
        color: #666;
    }
    .cov-message-chat-content-count-icon {
        background: #ff3737;
        color: #fff;
        padding: 0 .5rem;
        height: 1.2rem;
        border-radius: 0.6rem;
        display: inline-block;
        line-height: 1.2rem;
        box-sizing: border-box;
    }
    .cov-message-chat-content-time {
        text-align: right;
        margin-bottom: .5rem;
    }
    .cov-message-chat-content-count {
        text-align: right;
    }
    .cov-block{display: block;}
    .swipe-menu,.swipe-menu-btn{
	    transform:translate3d(0px,0px,0px);
    }
    .swipe-menu.swipe-animate,.swipe-menu-btn.swipe-animate{
        transition: transform .5s;
    }
</style>

<template>
    <div class="cov-message-chat-row" :class="{ 'menu-active': menu }" v-swipe="{type :'menu'}">
            <router-link :to="{ path : '/chat'}" class="cov-message-chat-item swipe-menu">
                <div class="cov-message-chat-avatar" :style="{'background-image': 'url(' + message.avatar + ')'}"></div>
                <div class="cov-message-chat-content">
                    <div class="cov-message-chat-title">{{message.title | myFilters("过滤器处理标题")}}</div>
                    <div class="cov-message-chat-preview">{{message.preview}}</div>
                </div>
                <div class="cov-message-chat-info">
                    <div class="cov-message-chat-content-time">{{message.time}}</div>
                    <div class="cov-message-chat-content-count">
                        <span class="cov-message-chat-content-count-icon">{{message.count}}</span>
                    </div>
                </div>
            </router-link>
            <div class="cov-message-menu swipe-menu-btn" >
                <div class="cov-message-menu-item">置顶</div>
                <div class="cov-message-menu-item delete" @click="removeMessage($event, message)">删除</div>
            </div>
    </div>
</template>

<script>
    export default {
        props: ["message","sideActive"],
        data () {
            return {
                closeToken: '',
                swiping: 0,
                menu: false
            }
        },
        mounted () {
            //this.add()
        },
        filters : {
            myFilters (value , type){
                return value +","+ type;
            }
        },
        methods: {
            removeMessage (e, data){
                //this.$emit("testFn", data )
            }
        }
    }
</script>