const app = document.querySelector('.app')

// 获取坦克最大的活动范围
const Tank_Max_Width = app.clientWidth // 最大的活动宽度
const Tank_Max_Height = app.clientHeight // 最大的活动高度
// console.log(Tank_Max_Width, Tank_Max_Height)

/**
 * @class Tank
 * @description 描述坦克的类
 * @param {HTMLElement} element 定义成坦克的dom元素
 * @param {String} direction 当前坦克的运动方向，默认为上
 * @param {String} moveStep 坦克的移动速度，默认为10
 */
function Tank(element, direction='ArrowUp', moveStep=10) {
    if(!(this instanceof Tank)){
        return new Tank(element, direction, moveStep)
    }
    this.tank = element
    this.direction = direction
    this.moveStep = moveStep
    // 定义坦克可的大小
    this.Tank_Width = 40 // 坦克的长度为 40px
    this.Tank_Height = 40 // 坦克的宽度为 40px
    this.init()
}

// 初始化坦克
Tank.prototype.init = function(){
    if(this.tank.style.top && this.tank.style.left){
        return
    }
    this.tank.style.top = 200 + 'px'
    this.tank.style.left = 200 + 'px'
}

// 坦克改变方向
Tank.prototype.TurnUp = function(){
    this.direction = 'ArrowUp'
    this.tank.style.transform = 'rotate(0deg)'
}
Tank.prototype.TurnDown = function(){
    this.direction = 'ArrowDown'
    this.tank.style.transform = 'rotate(180deg)'
}
Tank.prototype.TurnLeft = function(){
    this.direction = 'ArrowLeft'
    this.tank.style.transform = 'rotate(270deg)'
}
Tank.prototype.TurnRight = function(){
    this.direction = 'ArrowRight'
    this.tank.style.transform = 'rotate(90deg)'
}

Tank.prototype.moveUp = function(){
    this.TurnUp()
    this.tank.style.top = parseInt(this.tank.style.top) - this.moveStep + 'px'
}
Tank.prototype.moveDown = function(){
    this.TurnDown()
    this.tank.style.top = parseInt(this.tank.style.top) + this.moveStep + 'px'
}
Tank.prototype.moveLeft = function(){
    this.TurnLeft()
    this.tank.style.left = parseInt(this.tank.style.left) - this.moveStep + 'px'
}
Tank.prototype.moveRight = function(){
    this.TurnRight()
    this.tank.style.left = parseInt(this.tank.style.left) + this.moveStep + 'px'
}

Tank.prototype.CreateTankShell = function(){
    var initTop = parseInt(this.tank.style.top)
    var initLeft = parseInt(this.tank.style.left)
    var tank_height = this.Tank_Height
    var tank_width = this.Tank_Width
    var initPosition = [initTop, initLeft, tank_width, tank_height]
    this.TankShell = new TankShell(this.target, initPosition, this.direction, this.moveStep)
}

/**
 * @function AddTarget
 * @description 添加敌方坦克作为目标
 * @param {RedTank} target 敌方坦克
 */
Tank.prototype.AddTarget = function(target){
    this.target = target
    return this
}

/**
 * @class RedTank
 * @description 敌方坦克的类，继承了 Tank 这个类
 * @param {String} direction 敌方坦克运动的方向
 * @param {Number} moveStep 敌方坦克运动的速度
 */
function RedTank(direction='ArrowDown', moveStep=10){
    if(!(this instanceof RedTank)){
        return new RedTank(direction, moveStep)
    }
    let tank = this.CreateTank()
    Tank.call(this, tank, direction, moveStep)
    // this.Max_Width_Count = Math.floor(Tank_Max_Width/this.moveStep)
    // this.Max_Height_Count = Math.floor(Tank_Max_Height/this.moveStep)
    this.moveTime = 300
    // 定义坦克可的大小
    this.Tank_Width = 40 // 坦克的长度为 40px
    this.Tank_Height = 40 // 坦克的宽度为 40px
    this.init()
}
RedTank.prototype = Object.create(Tank.prototype)
RedTank.prototype.constructor = RedTank

/**
 * @function CreateTank
 * @description 创建一辆敌方坦克
 */
RedTank.prototype.CreateTank = function(){
    let ul = document.createElement('ul')
    ul.className = 'tank red-tank'
    let li1 = document.createElement('li')
    li1.className = 'tank-header'
    ul.appendChild(li1)
    let li2 = document.createElement('li')
    li2.className = 'tank-port'
    let div1 = document.createElement('div')
    div1.className = 'tank-wheel'
    li2.appendChild(div1)
    let div2 = document.createElement('div')
    div2.className = 'tank-item red-tank-item'
    div2.innerHTML = '+'
    li2.appendChild(div2)
    let div3 = document.createElement('div')
    div3.className = 'tank-wheel'
    li2.appendChild(div3)
    ul.appendChild(li2)
    let li3 = document.createElement('li')
    li3.classList = 'tank-port'
    let div4 = document.createElement('div')
    div4.className = 'tank-wheel'
    li3.appendChild(div4)
    let div5 = document.createElement('div')
    div5.className = 'tank-item red-tank-item'
    div5.innerHTML = '+'
    li3.appendChild(div5)
    let div6 = document.createElement('div')
    div6.className = 'tank-wheel'
    li3.appendChild(div6)
    ul.appendChild(li3)
    app.appendChild(ul)
    return ul
}

/**
 * @function init
 * @description 初始化敌方坦克的位置，默认为 top:0, left:0
 */
RedTank.prototype.init = function(){
    if(this.tank.style.top && this.tank.style.left){
        return
    }
    this.tank.style.top = 0 + 'px'
    this.tank.style.left = 0 + 'px'
    this.initPoint()
}
// 初始化目标点
RedTank.prototype.initPoint = function(){
    this.CreateNextPoint()
    // console.log(this.point)
}

/**
 * @function CreateUpPoint
 * @description 在敌方坦克想要向上运动时，随机创建向上的目标点
 */
RedTank.prototype.CreateUpPoint = function(){
    var max_up_count = Math.floor(parseInt(this.tank.style.top)/this.moveStep)
    this.point = Math.floor(Math.random()*max_up_count)*this.moveStep
}

/**
 * @function CreateDownPoint
 * @description 在敌方坦克想要向下运动时，随机创建向下的目标点
 */
RedTank.prototype.CreateDownPoint = function(){
    var max_down_count = Math.floor((Tank_Max_Height - parseInt(this.tank.style.top) - this.Tank_Height)/this.moveStep)
    this.point = Math.ceil(Math.random()*max_down_count)*this.moveStep + this.Tank_Height + parseInt(this.tank.style.top)
}

/**
 * @function CreateLeftPoint
 * @description 在敌方坦克想要向左运动时，随机创建向左的目标点
 */
RedTank.prototype.CreateLeftPoint = function(){
    var max_left_count = Math.floor(parseInt(this.tank.style.left)/this.moveStep)
    this.point = Math.floor(Math.random()*max_left_count)*this.moveStep
}

/**
 * @function CreateRightPoint
 * @description 在敌方坦克想要向右运动时，随机创建向右的目标点
 */
RedTank.prototype.CreateRightPoint = function(){
    var max_right_count = Math.floor((Tank_Max_Width - parseInt(this.tank.style.left)- this.Tank_Width)/this.moveStep)
    this.point = Math.ceil(Math.random()*max_right_count)*this.moveStep + this.Tank_Width + parseInt(this.tank.style.left)
}

/**
 * @function CreateNextPoint
 * @description 根据敌方坦克当前的运动方向，创建向运动随机目标点
 */
RedTank.prototype.CreateNextPoint = function(){
    switch(this.direction){
        case 'ArrowUp':
            this.CreateUpPoint()
            return
        case 'ArrowDown':
            this.CreateDownPoint()
            return
        case 'ArrowLeft':
            this.CreateLeftPoint()
            return
        case 'ArrowRight':
            this.CreateRightPoint()
            return
    }
}

/**
 * @function ReachUpBorder
 * @description 判断 敌方坦克 是不是到达 上边界
 * @returns {Boolean}
 */
RedTank.prototype.ReachUpBorder = function(){
    if(parseInt(this.tank.style.top) <= 0){
        return true
    }
    return false
}

/**
 * @function ReachDownBorder
 * @description 判断 敌方坦克 是不是到达 下边界
 * @returns {Boolean}
 */
RedTank.prototype.ReachDownBorder = function(){
    if(parseInt(this.tank.style.top) + this.Tank_Height >= Tank_Max_Height){
        return true
    }
    return false
}

/**
 * @function ReachLeftBorder
 * @description 判断 敌方坦克 是不是到达 左边界
 * @returns {Boolean}
 */
RedTank.prototype.ReachLeftBorder = function(){
    if(parseInt(this.tank.style.left) <= 0){
        return true
    }
    return false
}

/**
 * @function ReachRightBorder
 * @description 判断 敌方坦克 是不是到达 右边界
 * @returns {Boolean}
 */
RedTank.prototype.ReachRightBorder = function(){
    if(parseInt(this.tank.style.left) + this.Tank_Width >= Tank_Max_Width){
        return true
    }
    return false
}

/**
 * @function ReachBorder
 * @description 判断 敌方坦克 是不是到达 边界
 */
RedTank.prototype.ReachBorder = function(direction){
    switch(direction || this.direction){
        case 'ArrowUp':
            return this.ReachUpBorder()
        case 'ArrowDown':
            return this.ReachDownBorder()
        case 'ArrowLeft':
            return this.ReachLeftBorder()
        case 'ArrowRight':
            return this.ReachRightBorder()
    }
}

/**
 * @function CreateNextDirection
 * @description 当敌方坦克到达边界之后，获取新的运动方向
 */
RedTank.prototype.CreateNextDirection = function(){
    var all_direction = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    var filter_direction = all_direction.filter(el=>!(this.ReachBorder(el)))
    // 如果三个方向都碰到边界，那么只有一个方向是出路
    if(filter_direction.length === 1){
        return filter_direction[0]
    }
    // console.log(filter_direction)
    var idx = Math.floor(Math.random()*filter_direction.length)
    return filter_direction[idx]
}

/**
 * @function ReachUpPoint
 * @description 判断 敌方坦克 是不是到达 上随机目标点
 */
RedTank.prototype.ReachUpPoint = function(){
    if(parseInt(this.tank.style.top) <= this.point){
        return true
    }
    return false
}

/**
 * @function ReachDownPoint
 * @description 判断 敌方坦克 是不是到达 下随机目标点
 */
RedTank.prototype.ReachDownPoint = function(){
    if(parseInt(this.tank.style.top) + this.Tank_Height >= this.point){
        return true
    }
    return false
}

/**
 * @function ReachLeftPoint
 * @description 判断 敌方坦克 是不是到达 左随机目标点
 */
RedTank.prototype.ReachLeftPoint = function(){
    if(parseInt(this.tank.style.left) <= this.point){
        return true
    }
    return false
}

/**
 * @function ReachRightPoint
 * @description 判断 敌方坦克 是不是到达 右随机目标点
 */
RedTank.prototype.ReachRightPoint = function(){
    if(parseInt(this.tank.style.left) + this.Tank_Width >= this.point){
        return true
    }
    return false
}

/**
 * @function ReachPoint
 * @description 判断 敌方坦克 是不是到达 随机目标点
 */
RedTank.prototype.ReachPoint = function(){
    switch(this.direction){
        case 'ArrowUp':
            return this.ReachUpPoint()
        case 'ArrowDown':
            return this.ReachDownPoint()
        case 'ArrowLeft':
            return this.ReachLeftPoint()
        case 'ArrowRight':
            return this.ReachRightPoint()
    }
}

/**
 * @function AutoUpMove
 * @description 敌方坦克自动向上运动
 */
RedTank.prototype.AutoUpMove = function(){
    this.timer = setInterval(()=>{
        this.moveUp()
        if(this.ReachPoint()){
            // 关掉定时器
            clearInterval(this.timer)
            // 获取新的方向
            this.direction = this.CreateNextDirection()
            // 创建新的随机点
            this.CreateNextPoint()
            // 然后继续移动
            this.AutoMove()
        }
    }, this.moveTime)
}

/**
 * @function AutoDownMove
 * @description 敌方坦克自动向下运动
 */
RedTank.prototype.AutoDownMove = function(){
    this.timer = setInterval(()=>{
        this.moveDown()
        if(this.ReachPoint()){
            // 关掉定时器
            clearInterval(this.timer)
            // 获取新的方向
            this.direction = this.CreateNextDirection()
            // 创建新的随机点
            this.CreateNextPoint()
            // 然后继续移动
            this.AutoMove()
        }
    }, this.moveTime)
}

/**
 * @function AutoLeftMove
 * @description 敌方坦克自动向左运动
 */
RedTank.prototype.AutoLeftMove = function(){
    this.timer = setInterval(()=>{
        this.moveLeft()
        if(this.ReachPoint()){
            // 关掉定时器
            clearInterval(this.timer)
            // 获取新的方向
            this.direction = this.CreateNextDirection()
            // 创建新的随机点
            this.CreateNextPoint()
            // 然后继续移动
            this.AutoMove()
        }
    }, this.moveTime)
}

/**
 * @function AutoRightMove
 * @description 敌方坦克自动向右运动
 */
RedTank.prototype.AutoRightMove = function(){
    this.timer = setInterval(()=>{
        this.moveRight()
        if(this.ReachPoint()){
            // 关掉定时器
            clearInterval(this.timer)
            // 获取新的方向
            this.direction = this.CreateNextDirection()
            // 创建新的随机点
            this.CreateNextPoint()
            // 然后继续移动
            this.AutoMove()
        }
    }, this.moveTime)
}



RedTank.prototype.AutoMove = function(moveTime){
    if(moveTime){
        this.moveTime = moveTime
    }
    // 敌方坦克自动射击
    this.CreateTankShell()
    switch(this.direction){
        case 'ArrowUp':
            this.AutoUpMove()
            return
        case 'ArrowDown':
            this.AutoDownMove()
            return
        case 'ArrowLeft':
            this.AutoLeftMove()
            return
        case 'ArrowRight':
            this.AutoRightMove()
            return
    }
}

/**
 * @class TankShell
 * @description 坦克的炮弹类
 * @param {RedTank} target 炮弹要攻击的目标
 * @param {Array} initPosition 炮弹的初始位置，格式为: [top, left, width, height]
 * @param {String} direction 炮弹的运动方向
 * @param {Number} moveStep 炮弹的运动速度
 */
function TankShell(target, initPosition, direction, moveStep){
    if(!(this instanceof TankShell)){
        return new TankShell(direction, moveStep)
    }
    this.shell = this.CreateTankShell()
    // 炮弹要攻击的目标
    this.target = target
    this.initPosition = initPosition
    // 炮弹运动的方向
    this.direction = direction
    // 炮弹的运动速度
    this.moveStep = moveStep
    // 定义炮弹的大小
    this.TankShellWidth = 6 // 炮弹宽度为 6px
    this.TankShellHeight = 10 // 炮弹高度为 10px
    // 默认炮弹的单位运动时间为 100ms
    this.moveTime = 100
    // 
    this.top = 0
    this.left = 0
    // 初始化子弹的颜色
    this.backgroundColor = null
    // 初始化子弹的位置和方向
    this.init()
}

TankShell.prototype.initTankShell = function(){
    this.shell.style.top = this.top + 'px'
    this.shell.style.left = this.left + 'px'
    this.AutoMove()
}

TankShell.prototype.initUp = function(){
    var initTop = this.initPosition[0]
    var initLeft = this.initPosition[1]
    var tank_width = this.initPosition[2]
    var tank_height = this.initPosition[3]
    this.top = initTop - this.TankShellHeight
    this.left = initLeft + (tank_width - this.TankShellWidth)/2
}

TankShell.prototype.initDown = function(){
    var initTop = this.initPosition[0]
    var initLeft = this.initPosition[1]
    var tank_width = this.initPosition[2]
    var tank_height = this.initPosition[3]
    this.top = initTop + tank_height
    this.left = initLeft + (tank_width - this.TankShellWidth)/2
}

TankShell.prototype.initLeft = function(){
    var initTop = this.initPosition[0]
    var initLeft = this.initPosition[1]
    var tank_width = this.initPosition[2]
    var tank_height = this.initPosition[3]
    this.top = initTop + (tank_width - this.TankShellHeight)/2
    this.left = initLeft - this.TankShellWidth
}

TankShell.prototype.initRight = function(){
    var initTop = this.initPosition[0]
    var initLeft = this.initPosition[1]
    var tank_width = this.initPosition[2]
    var tank_height = this.initPosition[3]
    this.top = initTop + (tank_width - this.TankShellHeight)/2
    this.left = initLeft + tank_height
}

TankShell.prototype.init = function(){
    switch(this.direction){
        case 'ArrowUp':
            this.initUp()
            break
        case 'ArrowDown':
            this.initDown()
            break
        case 'ArrowLeft':
            this.initLeft()
            break
        case 'ArrowRight':
            this.initRight()
            break
    }
    this.initTankShell()
}


/**
 * @function CreateTankShell
 * @description 新建一个炮弹
 */
TankShell.prototype.CreateTankShell = function(){
    var div = document.createElement('div')
    div.className = 'tank-shell'
    app.appendChild(div)
    return div
}

/**
 * @function RemoveTankShell
 * @description 删除炮弹
 */
TankShell.prototype.RemoveTankShell = function(){
    app.removeChild(this.shell)
}

// 改变炮弹的方向
/**
 * @function TurnUp
 * @description 将 炮弹 的运动方向改变为 向上
 */
TankShell.prototype.TurnUp = function(){
    this.direction = 'ArrowUp'
    this.shell.style.transform = 'rotate(0deg)'
}

/**
 * @function TurnDown
 * @description 将 炮弹 的运动方向改变为 向下
 */
TankShell.prototype.TurnDown = function(){
    this.direction = 'ArrowDown'
    this.shell.style.transform = 'rotate(180deg)'
}

/**
 * @function TurnLeft
 * @description 将 炮弹 的运动方向改变为 向左
 */
TankShell.prototype.TurnLeft = function(){
    this.direction = 'ArrowLeft'
    this.shell.style.transform = 'rotate(270deg)'
}

/**
 * @function TurnRight
 * @description 将 炮弹 的运动方向改变为 向右
 */
TankShell.prototype.TurnRight = function(){
    this.direction = 'ArrowRight'
    this.shell.style.transform = 'rotate(90deg)'
}

/**
 * @function moveUp
 * @description 炮弹向上移动
 */
TankShell.prototype.moveUp = function(){
    this.TurnUp()
    this.shell.style.top = parseInt(this.shell.style.top) - this.moveStep + 'px'
}

/**
 * @function moveDown
 * @description 炮弹向下移动
 */
TankShell.prototype.moveDown = function(){
    this.TurnDown()
    this.shell.style.top = parseInt(this.shell.style.top) + this.moveStep + 'px'
}

/**
 * @function moveLeft
 * @description 炮弹向左移动
 */
TankShell.prototype.moveLeft = function(){
    this.TurnLeft()
    this.shell.style.left = parseInt(this.shell.style.left) - this.moveStep + 'px'
}

/**
 * @function moveRight
 * @description 炮弹向右移动
 */
TankShell.prototype.moveRight = function(){
    this.TurnRight()
    this.shell.style.left = parseInt(this.shell.style.left) + this.moveStep + 'px'
}

/**
 * @function ReachUpBorder
 * @description 判断 炮弹 是不是到达 上边界
 */
TankShell.prototype.ReachUpBorder = function(){
    if(parseInt(this.shell.style.top) + this.TankShellHeight <= 0){
        return true
    }
    return false
}

/**
 * @function ReachDownBorder
 * @description 判断 炮弹 是不是到达 下边界
 */
TankShell.prototype.ReachDownBorder = function(){
    if(parseInt(this.shell.style.top) >= Tank_Max_Height){
        return true
    }
    return false
}

/**
 * @function ReachLeftBorder
 * @description 判断 炮弹 是不是到达 左边界
 */
TankShell.prototype.ReachLeftBorder = function(){
    if(parseInt(this.shell.style.left) + this.TankShellWidth <= 0){
        return true
    }
    return false
}

/**
 * @function ReachRightBorder
 * @description 判断 炮弹 是不是到达 右边界
 */
TankShell.prototype.ReachRightBorder = function(){
    if(parseInt(this.shell.style.left) >= Tank_Max_Width){
        return true
    }
    return false
}

/**
 * @function ReachBorder
 * @description 判断 炮弹 是不是到达 边界
 */
TankShell.prototype.ReachBorder = function(){
    switch(this.direction){
        case 'ArrowUp':
            return this.ReachUpBorder()
        case 'ArrowDown':
            return this.ReachDownBorder()
        case 'ArrowLeft':
            return this.ReachLeftBorder()
        case 'ArrowRight':
            return this.ReachRightBorder()
    }
}

/**
 * @function AutoUpMove
 * @description 炮弹自动向上运动
 */
TankShell.prototype.AutoUpMove = function(){
    this.timer = setInterval(()=>{
        this.moveUp()
        // 为了消除初始化子弹的颜色，如果不消除，效果会很丑
        this.intiBackgroundColor()
        // 一旦触碰到敌方坦克，就立即删除敌方坦克
        this.ClearTarget()
        // 判断炮弹是不是到达边界
        if(this.ReachBorder()){
            // 关掉定时器
            clearInterval(this.timer)
            // 消除炮弹
            this.RemoveTankShell()
        }
    }, this.moveTime)
}

/**
 * @function AutoDownMove
 * @description 炮弹自动向下运动
 */
TankShell.prototype.AutoDownMove = function(){
    this.timer = setInterval(()=>{
        this.moveDown()
        // 为了消除初始化子弹的颜色，如果不消除，效果会很丑
        this.intiBackgroundColor()
        // 一旦触碰到敌方坦克，就立即删除敌方坦克
        this.ClearTarget()
        // 判断炮弹是不是到达边界
        if(this.ReachBorder()){
            // 关掉定时器
            clearInterval(this.timer)
            // 消除炮弹
            this.RemoveTankShell()
        }
    }, this.moveTime)
}

/**
 * @function AutoLeftMove
 * @description 炮弹自动向左运动
 */
TankShell.prototype.AutoLeftMove = function(){
    this.timer = setInterval(()=>{
        this.moveLeft()
        // 为了消除初始化子弹的颜色，如果不消除，效果会很丑
        this.intiBackgroundColor()
        // 一旦触碰到敌方坦克，就立即删除敌方坦克
        this.ClearTarget()
        // 判断炮弹是不是到达边界
        if(this.ReachBorder()){
            // 关掉定时器
            clearInterval(this.timer)
            // 消除炮弹
            this.RemoveTankShell()
        }
    }, this.moveTime)
}

/**
 * @function AutoRightMove
 * @description 炮弹自动向右运动
 */
TankShell.prototype.AutoRightMove = function(){
    this.timer = setInterval(()=>{
        this.moveRight()
        // 为了消除初始化子弹的颜色，如果不消除，效果会很丑
        this.intiBackgroundColor()
        // 一旦触碰到敌方坦克，就立即删除敌方坦克
        this.ClearTarget()
        // 判断炮弹是不是到达边界
        if(this.ReachBorder()){
            // 关掉定时器
            clearInterval(this.timer)
            // 消除炮弹
            this.RemoveTankShell()
        }
    }, this.moveTime)
}

/**
 * @function AutoMove
 * @description 坦克的炮弹自动运动
 * @param {Number} moveTime 炮弹单位移动的时间
 */
TankShell.prototype.AutoMove = function(moveTime){
    if(moveTime){
        this.moveTime = moveTime
    }
    switch(this.direction){
        case 'ArrowUp':
            this.AutoUpMove()
            return
        case 'ArrowDown':
            this.AutoDownMove()
            return
        case 'ArrowLeft':
            this.AutoLeftMove()
            return
        case 'ArrowRight':
            this.AutoRightMove()
            return
    }
}

/**
 * @function TouchUpTarget
 * @description 判断是不是碰到上面的目标
 */
TankShell.prototype.TouchUpTarget = function(){
    var top = parseInt(this.shell.style.top)
    var left = parseInt(this.shell.style.left)
    var targetTop = parseInt(this.target.tank.style.top)
    var targetLeft = parseInt(this.target.tank.style.left)
    if(top <= targetTop + this.target.Tank_Height && left > targetLeft && left < targetLeft + this.target.Tank_Width){
        return true
    }
    return false
}

/**
 * @function TouchDownTarget
 * @description 判断是不是碰到下面的目标
 */
TankShell.prototype.TouchDownTarget = function(){
    var top = parseInt(this.shell.style.top)
    var left = parseInt(this.shell.style.left)
    var targetTop = parseInt(this.target.tank.style.top)
    var targetLeft = parseInt(this.target.tank.style.left)
    if(top + this.TankShellHeight >= targetTop && left > targetLeft + this.target.Tank_Width){
        return true
    }
    return false
}

/**
 * @function TouchLeftTarget
 * @description 判断是不是碰到左面的目标
 */
TankShell.prototype.TouchLeftTarget = function(){
    var top = parseInt(this.shell.style.top)
    var left = parseInt(this.shell.style.left)
    var targetTop = parseInt(this.target.tank.style.top)
    var targetLeft = parseInt(this.target.tank.style.left)
    if(left <= targetLeft + this.target.Tank_Height && top > targetTop && top < targetTop + this.target.Tank_Height){
        return true
    }
    return false
}

/**
 * @function TouchRightTarget
 * @description 判断是不是碰到右面的目标
 */
TankShell.prototype.TouchRightTarget = function(){
    var top = parseInt(this.shell.style.top)
    var left = parseInt(this.shell.style.left)
    var targetTop = parseInt(this.target.tank.style.top)
    var targetLeft = parseInt(this.target.tank.style.left)
    if(left + this.TankShell < targetLeft && top > targetTop && top < targetTop + this.target.Tank_Height){
        return true
    }
    return false
}

/**
 * @function TouchTarget
 * @description 判断是不是碰到目标
 */
TankShell.prototype.TouchTarget = function(){
    if(this.target == null){
        return false
    }
    switch(this.direction){
        case 'ArrowUp':
            return this.TouchUpTarget()
        case 'ArrowDown':
            return this.TouchDownTarget()
        case 'ArrowLeft':
            return this.TouchLeftTarget()
        case 'ArrowRight':
            return this.TouchRightTarget()
    }
}

/**
 * @function ClearTarget
 * @description 删除目标
 */
TankShell.prototype.ClearTarget = function(){
    if(this.TouchTarget()){
        try{
            app.removeChild(this.target.tank)
            this.target = null
        }catch(err){
            this.target = null
        }
    }
}

/**
 * @function intiBackgroundColor
 * @description 消除初始化子弹的颜色
 */
TankShell.prototype.intiBackgroundColor = function(){
    // 为了消除初始化子弹的颜色，如果不消除，效果会很丑
    if(!this.backgroundColor){
        this.backgroundColor = 'yellowgreen'
        this.shell.style.backgroundColor = this.backgroundColor
    }
}

const tankElement = document.querySelector('.tank')

const tank = new Tank(tankElement)

const redtank = new RedTank()
redtank.AddTarget(tank).AutoMove()
// console.log(redtank.tank)

document.body.onkeydown = function(evt){
    // console.log(evt.key)
    switch(evt.key){
        case 'ArrowUp':
            tank.moveUp()
            return
        case 'ArrowDown':
            tank.moveDown()
            return
        case 'ArrowLeft':
            tank.moveLeft()
            return
        case 'ArrowRight':
            tank.moveRight()
            return
        case 's':
            tank.AddTarget(redtank).CreateTankShell()
    }
}