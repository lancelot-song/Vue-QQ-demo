var vueSwipe = {};

class SwipeFn {
	init (){
		this.swipeObj = {}
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
		this.swipeAnimate(el,pageX);
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
	swipeAnimate(el,pageX){
		pageX < 0 ? pageX = Math.abs(pageX) : pageX = -pageX;
		el.style.webkitTransform = "translateX("+pageX+"px)";
		el.style.transform = "translateX("+pageX+"px)";
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
		this.swipeAnimate(el,swipeObj.moveX);
		el.style.webkitTransition = "all .5s ease";
		el.style.transition = "all .5s ease";
		setTimeout(function(){
			el.style.webkitTransition = "all 0s ease";
			el.style.transition = "all 0s ease";
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
vueSwipe.install = function(Vue){
	if(vueSwipe.installed) return;
	Vue.directive("swipe",{
		isFn : true,
		acceptStatement: true,
		inserted:function(el){
			//生成索引ui
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
		},
		bind : function(el,binding){
			el.swipe = new SwipeFn();
			el.swipe.swipeObj = {
				moveX : 0,
				pageNum : 0,
				pageNumMax : el.querySelectorAll("ul").length-1
			}
			el.addEventListener("touchstart",function(e){
				el.swipe.touchstart(e,el);
			},false);
			
			el.addEventListener("touchmove",function(e){
				el.swipe.touchmove(e,el);
			},false);
			
			el.addEventListener("touchend",function(e){
				el.swipe.touchend(e,el);
			},false);
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