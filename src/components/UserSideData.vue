<style sceped>
/* 页头 */
.user-side{
  position:absolute;
  left:-20rem;top:0;
  width: 20rem;
  height: 100%;
  background-color:#fff;
  z-index: 90;
}
.user-info-wrap{
  position:relative;
  height: 13.7rem;
  background-color:#333;
  overflow: hidden;
}
  .user-info-bg{
    position:absolute;
    top:0;left:0;
    z-index: 10;
  }
  .user-info-bg.animate{
    -webkit-transition:top 6s ease-out;
    transition:top 6s ease-out;
  }
  .user-info{
    position:absolute;
    bottom:1.4rem;
    left:1rem;
    z-index: 15;
  }
  .user-info .user-name{
    position:relative;
    padding-left:2.4rem;
    font-size:1.25rem;
    color:#fff;
    line-height: 2rem;
  }
  .user-info .user-photo{
    position:absolute;
    left:0;top:0;
    width: 1.75rem;
    height: 1.75rem;
    border:.16rem solid #fff;
    border-radius:50%;
    overflow: hidden;
  }
  .user-info .user-photo img{
    float: left;
    width: 100%;
    min-height:100%;
  }
  .user-info .user-rank{
    margin-top:.2rem;
  }
  .user-info .user-rank-01{
    width: 1.85rem;
  }
  .user-info .user-text{
    font-size:.75rem;
    color:#fff;
    font-weight:300;
  }

  .user-menu{
    padding:.85rem 0 3.3rem;
    background-color:#fff;
  }
  .user-menu > a{
    position:relative;
    display: block;
    padding:.85rem 1rem .85rem 3rem;
    font-size:1rem;
    line-height: 1rem;
    font-weight:700;
    color:#000;
  }
  .user-menu > a.tip::after{
    content:"";
    display: block;
    position:absolute;
    right:1rem;top:1.05rem;
    width: .5rem;
    height: .5rem;
    border-radius:50%;
    background-color:#f74c31;

  }
  .user-menu-icon{
    position:absolute;
    left:1rem;top:.75rem;
    width: 2rem;
    text-align: center;
  }
  .user-menu-icon.icon-01{
    top:.5rem;
  }
  .user-foot{
    position:absolute;
    padding-bottom:1rem;
    bottom:0;left:0;
    width: 100%;
  }
    .user-foot >a {
        display: block;
        width: 33%;
        float: left;
        text-align: center;
        font-size:.875rem;
        color:#000;
    }
</style>

<template>
  <div class="user-side" id="userSide">
      <div class="user-info-wrap" ref="userInfoWrap">
          <img src="/static/images/user_bg.jpg" class="user-info-bg" width="100%" ref="animateImg"/>
          <div class="user-info">
              <div class="user-name">
                  <div class="user-photo">
                      <img src="http://tp1.sinaimg.cn/1765813240/180/40054316852/1" alt="用户头像" />
                  </div>
                  <b>LSZH</b>
              </div>
              <div class="user-rank">
                  <img src="/static/images/user_rank.jpg" class="user-rank-01" />
              </div>
              <div class="user-text">春未绿，鬓先丝。人间别久不成悲。</div>
          </div>
      </div>
      <div class="user-menu">
          <a href="" class="tip">
              <span class="user-menu-icon icon-01"><img src="/static/images/huangguan.svg" width="22"></span>我的超级会员</a>
          <a href="">
              <span class="user-menu-icon"><img src="/static/images/money-bar.svg" width="18"></span>QQ钱包</a>
          <a href="">
              <span class="user-menu-icon"><img src="/static/images/palette.svg"></span>个性装扮</a>
          <a href="">
              <span class="user-menu-icon"><img src="/static/images/badge-star.svg"></span>我的收藏</a>
          <a href="">
              <span class="user-menu-icon"><img src="/static/images/frame-landscape-gray.svg" width="18" height="18"></span>我的相册</a>
          <a href="">
              <span class="user-menu-icon"><img src="/static/images/folders.svg" width="18" height="18"></span>我的文件</a>
          <a href="">
              <span class="user-menu-icon"><img src="/static/images/calendar-and-clock.svg" width="18" height="18"></span>我的日程</a>
      </div>
      <div class="user-foot">
          <a href="">设置</a>
          <a href="">夜间</a>
          <a href="">北京1°</a>
      </div>
  </div>
</template>


<script>

export default {
  props : ["sideActive"],//侧栏状态
  data () {
    return {
      animateImg : null,//动画dom
      animateImgScrollTop : null,//动画位置
      animateImgFn : null,
      activeClass: true
    }
  },
  mounted () {
      this.$watch("sideActive",function(){
          let self = this;
          setTimeout(function(){
              self.sideActive ? self.userInfoImgDown() : self.userInfoImgReset();
          },500);
      })
  },
  methods : {
      userInfoImgDown : function(){//背景图下降
          let self = this;
          if(this.animateImg==null) {
              let wrapHeight = this.$refs.userInfoWrap.offsetHeight,
                  imgHeight = this.$refs.animateImg.offsetHeight;
              this.animateImgScrollTop =  "-" + ( imgHeight - wrapHeight ) + "px";
              this.animateImg = this.$refs.animateImg;
              this.animateImg.className += " animate";
          }
          this.animateImg.style.top = this.animateImgScrollTop;
          this.animateImgFn = setTimeout(function(){
              self.userInfoImgUp();
          },7000)
      },
      userInfoImgUp : function(){//背景图上升
          let self = this;
          this.animateImg.style.top = "0px";
          this.animateImgFn = setTimeout(function(){
              self.userInfoImgDown();
          },7000)
      },
      userInfoImgReset : function(){//离开侧栏
          clearTimeout(this.animateImgFn);
          let reg = new RegExp('(\\s|^)animate(\\s|$)');
          this.animateImg.className = this.animateImg.className.replace(reg ,"");
          this.animateImg.style.top = "0px";
          this.animateImg = null;
          return false;
      }

  }
}

</script>
