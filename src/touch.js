class Touch {
    constructor () {
        this._hasTouch = ('ontouchstart' in window)
        this.init()
        this.touch = {
            start: null,
            end: null
        }
        this.state = {
            swiping: false,
            global: false
        }
        this.queue = {
            'swiping': [],
            'swiped': [],
            'swipe-left': [],
            'swipe-right': [],
            'swipe-up': [],
            'swipe-down': []
        }
        this.clickTime = 0
    }

    init () {
        if (this._hasTouch) {
            window.document.body.addEventListener('touchstart', this.touchStart.bind(this), false)
            window.document.body.addEventListener('touchmove', this.touchMove.bind(this), false)
            window.document.body.addEventListener('touchend', this.touchEnd.bind(this), false)
            window.document.body.addEventListener('touchcancel', this.touchCancel.bind(this), false)
        }
    }

    setGlobal () {
        this.state.global = true
    }

    cancelGlobal () {
        this.state.global = false
    }

    listen (type, $el, func) {
        let rect
        if (!$el) {
            rect = null
        } else {
            let tmp = $el.getBoundingClientRect()
            rect = {
                x: tmp.left,
                y: tmp.top,
                width: tmp.width,
                height: tmp.height
            }
        }

        let token = Math.random() * 9999 + type
        this.queue[type].push({
            $el: $el,
            token: token,
            func: func,
            rect: rect
        })
    }

    leave (type, token) {
        if (!this.queue[type]) return false
        for (let i = 0, len = this.queue[type].length; i < len; i++) {
            if (this.queue[type].token === token) {
                this.queue[type].splice(i - 1, 1)
                return true
            }
        }
        return false
    }

    update () {
        let keys = Object.keys(this.queue)
        let tmp
        for (let key of keys) {
            this.queue[key].forEach(item => {
                if (item.$el) {
                    tmp = item.$el.getBoundingClientRect()
                    item.rect = {
                        x: tmp.left,
                        y: tmp.top,
                        width: tmp.width,
                        height: tmp.height
                    }
                }
            })
        }
    }

    clear () {
        let keys = Object.keys(this.queue)
        for (let key of keys) {
            this.queue[key].length = 0
        }
    }

    notice (type, rect) {
        let rectTmp = {}
        let once = true
        let tmpFunc = null
        for (let i = 0, len = this.queue[type].length; i < len; i++) {
            rectTmp = this.queue[type][i].rect
            if (!rectTmp) {
                tmpFunc = this.queue[type][i].func
            } else {
                if (this.rectIn(rect, rectTmp) && !this.state.global) {
                    this.queue[type][i].func(this.touch.start, this.touch.end)
                    once = false
                }
            }
        }
        if (once && tmpFunc) {
            tmpFunc(this.touch.start, this.touch.end)
        }
    }

    rectIn (small, big) {
        if (small.x > big.x &&
            small.x + small.width < big.x + big.width &&
            small.y > big.y &&
            small.y + small.height < big.y + big.height
        ) {
            return true
        }
        return false
    }

    getRect (dot1, dot2) {
        let rect = {}

        if (dot1.x < dot2.x) {
            rect.x = dot1.x
            rect.width = dot2.x - dot1.x
        } else {
            rect.x = dot2.x
            rect.width = dot1.x - dot2.x
        }

        if (dot1.y < dot2.y) {
            rect.y = dot1.y
            rect.height = dot2.y - dot1.y
        } else {
            rect.y = dot2.y
            rect.height = dot1.y - dot2.y
        }
        return rect
    }

    getPosition (e) {
        const len = e.changedTouches.length
        let poss = []
        for (let i = 0; i < len; i++) {
            poss.push({
                x: e.changedTouches[i].pageX,
                y: e.changedTouches[i].pageY
            })
        }
        return poss
    }

    getDistance (dot1, dot2) {
        return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2))
    }

    getAngle (dot1, dot2) {
        return Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x) * 180 / Math.PI
    }

    touchStart (e) {
        //e.preventDefault()
        this.state.swiping = true
        this.touch.start = this.getPosition(e)[0]
    }

    touchMove (e) {
        //e.preventDefault()
        this.touch.end = this.getPosition(e)[0]
        this.notice('swiping', this.getRect(this.touch.end, this.touch.start))
    }

    touchEnd (e) {
        //e.preventDefault()
        this.touch.end = this.getPosition(e)[0];
        this.notice('swiped', this.getRect(this.touch.end, this.touch.start))
        this.state.swiping = true;

        let _start = this.touch.start,
            _end   = this.touch.end,
            _startX = _start.x,
            _endX = _end.x;

        if( _endX >= _startX && _endX - _startX < 10 || _endX <= _startX && _endX - _startX > -10){
            let ev = document.createEvent(window.MouseEvent ? 'MouseEvents' : 'Event');
            return false;
        }

        let angle = this.getAngle(_end, _start)
        if (angle > -45 && angle < 45) {
            this.notice('swipe-left', this.getRect(_end, _start))
        }
        if (angle < -135 || angle > 135) {
            this.notice('swipe-right', this.getRect(_end, _start))
        }
        if (angle > 45 && angle < 135) {
            this.notice('swipe-up', this.getRect(_end, _start))
        }
        if (angle < -45 && angle > -135) {
            this.notice('swipe-down', this.getRect(_end, _start))
        }
    }

    touchCancel (e) {
        e.preventDefault()
        console.log(e)
    }
}

export default Touch
