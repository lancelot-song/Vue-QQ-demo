var vueSwipe = {};

/*
 	公用方法
 * */
function isPc(){
	var ua = navigator.userAgent,
		agents = ["Android","iPhone","iPad","iPod","Windos Phone"],
		flag = true;
		
	for(var i in agents){
		if(ua.indexOf(agents[i])>0){
			flag = false;
			console.log(flag)
			break;
		}
	}
	
	return flag;
}
isPc();
function swipeBindTouch(el){
	el.addEventListener("touchstart",function(e){
		el.swipe.touchstart(e,el);
	},false);
	
	el.addEventListener("touchmove",function(e){
		el.swipe.touchmove(e,el);
	},false);
	
	el.addEventListener("touchend",function(e){
		el.swipe.touchend(e,el);
	},false);
}
function swipeAnimate(el,pageX){
	pageX < 0 ? pageX = Math.abs(pageX) : pageX = -pageX;
	if(el instanceof Array){
		for(var i in el){
			el[i].style.webkitTransform = "translate3d("+pageX+"px,0px,0px)";
			el[i].style.transform = "translate3d("+pageX+"px,0px,0px)";
		}
	}else{
		el.style.webkitTransform = "translate3d("+pageX+"px,0px,0px)";
		el.style.transform = "translate3d("+pageX+"px,0px,0px)";
	}
}
/*
   SwipePage调用方式： v-swipe="{type : 'page'}";
   DOM格式：
   <div class="more-swipe" v-swipe="{ type : 'page'}">
	    <ul>
	    	<li>page 1</li>
	    	<li>page 2</li>
	    </ul>
   </div>
 * */
class SwipePage {
	constructor (el){
		swipeBindTouch(el);
	}
	touchstart (e){
		var touches = e.touches[0],
			swipeObj = this.swipeObj;
		swipeObj.width = document.body.clientWidth;
		swipeObj.pageX = swipeObj.startPageX = touches.pageX;
	}
	touchmove (e,el){
		e.preventDefault();
		var pageX = this.swipeObj.moveX+(this.swipeObj.startPageX-e.touches[0].pageX);
		swipeAnimate(el,pageX);
	}
	touchend (e,el){
		var touches = e.changedTouches[0],
			swipeObj = this.swipeObj;
		if(Math.abs(touches.pageX - swipeObj.pageX) > swipeObj.width / 4){//滑动距离超过屏幕1/4 执行滚动
			if(touches.pageX > swipeObj.pageX){//右滑动
				this.swipeRight(el);
			}else if(touches.pageX < swipeObj.pageX){//左滑动
				this.swipeLeft(el);
			}
		}else{
			this.swipeEnd(el);
		}
	}
	swipeRight (el){
		var swipeObj = this.swipeObj;
		if(swipeObj.pageNum>0){
			swipeObj.pageNum--;
		}
		this.swipeEnd(el);
	}
	swipeLeft (el){
		var swipeObj = this.swipeObj;
		if(swipeObj.pageNum+1<=swipeObj.pageNumMax) {
			swipeObj.pageNum++;;
		}
		this.swipeEnd(el);
	}
	swipeEnd (el){
		//计算动画结果
		var swipeObj = this.swipeObj;
		swipeObj.moveX = swipeObj.width * swipeObj.pageNum
		el.className+=" swipe-animate";
		swipeAnimate(el,swipeObj.moveX);
		setTimeout(function(){
			el.className = el.className.replace(" swipe-animate","");
		},500);
		//计算索引值
		swipeObj.li.forEach(function(item,index){
			if(index===swipeObj.pageNum){
				swipeObj.li[index].className = "active";
			}else{
				swipeObj.li[index].className = "";
			}
		});
	}
}
/*
	SwipeMenu 调用方式：v-swipe="{type : 'page'}";
	DOM格式：
    <div v-swipe="{type :'menu'}">
            <div class="swipe-menu">菜单主内容</div>
            <div class="swipe-menu-btn">滑动显示出的内容</div>
    </div>
 * */
class SwipeMenu {
	constructor (el){
		swipeBindTouch(el);
	}
	touchstart (e){
		var touches = e.touches[0],
			swipeObj = this.swipeObj;
		swipeObj.pageX = swipeObj.startPageX = touches.pageX;
	}
	touchmove (e,el){
		e.preventDefault();
		var swipeObj = this.swipeObj,
			pageX = swipeObj.startPageX-e.touches[0].pageX;
		if(pageX > swipeObj.moveMax){
			swipeAnimate( [swipeObj.menu, swipeObj.menuBtn], swipeObj.moveMax);
		}else{
			pageX += swipeObj.moveX;
			if(pageX<0) pageX = 0;
			swipeAnimate([swipeObj.menu, swipeObj.menuBtn], pageX);
		}
	}
	touchend (e,el){
		var touches = e.changedTouches[0],
			swipeObj = this.swipeObj;
		if(Math.abs(touches.pageX - swipeObj.pageX) > swipeObj.moveMax / 4){//滑动距离超过隐藏区域1/4 执行滚动
			if(touches.pageX > swipeObj.pageX){//从左向右滑动
				this.swipeEnd(el,"off");
			}else if(touches.pageX < swipeObj.pageX){//从右向左滑动
				this.swipeEnd(el,"on");
			}
		}else{
			this.swipeEnd(el);
		}
	}
	swipeEnd (el,type){
		//计算动画结果
		var swipeObj = this.swipeObj;
		type==="on" ? swipeObj.moveX = swipeObj.moveMax : swipeObj.moveX = 0;
		swipeObj.menu.className+=" swipe-animate";
		swipeObj.menuBtn.className+=" swipe-animate";
		swipeAnimate([swipeObj.menu, swipeObj.menuBtn],swipeObj.moveX);
		setTimeout(function(){
			swipeObj.menu.className = swipeObj.menu.className.replace(" swipe-animate","");
			swipeObj.menuBtn.className = swipeObj.menuBtn.className.replace(" swipe-animate","");
		},500);
	}
}
vueSwipe.install = function(Vue){
	if(vueSwipe.installed) return;
	Vue.directive("swipe",{
		isFn : true,
		acceptStatement: true,
		inserted:function(el,binding){
			if(binding.value.type==="page"){//翻页滑动 生成索引ui
				el.swipe.swipeObj = {
					moveX : 0,
					pageNum : 0,
					pageNumMax : el.querySelectorAll("ul").length-1
				}
				var moreListUl = document.createElement("ul"),
					moreListLi = "";
				moreListUl.className = "more-list-index";
				moreListUl.id = "moreListIndex";
				el.parentNode.appendChild(moreListUl);
				var moreListLi = "";
				for(var i = 0;i < el.swipe.swipeObj.pageNumMax+1;i++){
					moreListLi+="<li></li>"
				}
				moreListUl.innerHTML = moreListLi;
				el.swipe.swipeObj.li = moreListUl.querySelectorAll("li");
				el.swipe.swipeObj.li[0].className="active";
			}else if(binding.value.type==="menu"){//菜单开启/关闭 初始化参数
				el.swipe.swipeObj = {
					width : document.body.clientWidth,
					menu : el.querySelector(".swipe-menu"),
					menuBtn : el.querySelector(".swipe-menu-btn"),
					moveMax : el.querySelector(".swipe-menu-btn").clientWidth,
					moveX : 0,
					pageX : 0,
					startPageX : 0
				}
			}
		},
		bind : function(el,binding){
			switch(binding.value.type){
				case "page":
					el.swipe = new SwipePage(el);
					break;
				case "menu":
					el.swipe = new SwipeMenu(el);
					break;
			}
		},
		update:function(fn){
			console.log(fn);
		},
		unbind:function(){
			console.log(this,"unbind")
		}

	})
}

export default vueSwipe;