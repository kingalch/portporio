
class VideoLoadDetector {
    constructor(){
        this.init()
        this.addEvent()
    }

    init(){
        this.beforeLocation = window.location.href
        this.checkLinkInterval = -1
        this.waitForLoad = -1
        this.sizeController = null

        this.findVideo()
    }   

    addEvent(){
        // 유튜브 주소 바뀔때 스크립트 새로 로딩 안되길래 그냥 계속 검사
        this.checkLinkInterval = setInterval(this.checkLink, 500);
    }

    checkLink = () =>{
        if(this.beforeLocation == window.location.href){
            return
        }
        
        window.location.reload()
    }

    findVideo() {
        console.log(window.location.href.includes('watch?v'))
        if(window.location.href.includes('watch?v')){
            const afterElement = document.querySelector('#page-manager *')
            if(!afterElement || !afterElement.querySelector('.html5-main-video')){
                this.waitForLoad = setTimeout(() => {this.findVideo()}, 100);
                return
            }

            console.log(afterElement)

            const nodes = {
                video : afterElement.querySelector('.html5-main-video'),
                player : afterElement.querySelector('#player'),
                afterElement,
                pageManager : document.querySelector('#page-manager'),
            }

            console.log(nodes)

            this.layoutRelocation(nodes)
        }

        return
    }

    layoutRelocation({
        video, player, pageManager, afterElement
    }){
        if(!pageManager || !player){
            return
        }

        pageManager.insertBefore(player, afterElement, pageManager)
        pageManager.style = "flex-direction: column;"
        this.sizeController = new SizeController(video, player, pageManager)
    }
}


class SizeController {
    constructor(video, player, pageManager){
        console.log("SizeController Start")
        this.video = video
        this.player = player
        this.pageManager = pageManager

        this.init()
        this.addEvent()
    }

    init(){
        this.isMouseDown = false
        this.defaultSize = {x:'100%', y:'40vh'}
        this.sizeController = document.createElement('div')
        this.sizeController.style = `
            width:50px; 
            height:50px; 
            background-color:black;
            position:absolute;
            right:0px;
            bottom:0px;
            z-index:10123123;
        `

        this.player.appendChild(this.sizeController)

        this.resizeInterval = setInterval(()=>{
            this.resizePlayer()
        }, 500)
    }

    addEvent(){
        window.addEventListener('mouseup', this.mouseup)
        window.addEventListener('mouseleave', this.mouseleave)
        this.sizeController.addEventListener('mousedown', this.mousedown)
        window.addEventListener('mousemove', this.mousemove)
    }

    mouseleave = ()=>{
        this.isMouseDown = false
    }

    mouseup = ()=>{
        this.isMouseDown = false
    }

    mousedown = ()=>{
        this.isMouseDown = true
    }

    mousemove = (e)=>{
        if(!this.isMouseDown){
            return
        }

        this.defaultSize = {x:`${e.pageX}px`, y:`${e.pageY}px`}
        this.resizePlayer()
    }

    resizePlayer(){
        this.player.style = `height:${this.defaultSize.y};width:${this.defaultSize.x};position:relative;`
        this.player.querySelectorAll('.ytd-watch-flexy').forEach(x=>{
            x.style = `height:${this.defaultSize.y};width:${this.defaultSize.x};position:absolute;`
        })
        this.video.parentNode.style = `height:${this.defaultSize.y};width:${this.defaultSize.x};`
        this.video.style = `height:100%;width:100%;object-fit: cover;`
        this.player.querySelectorAll('.ytp-chrome-bottom').forEach(x=>{
            x.style = `width:95vw`
        })
    }
}



new VideoLoadDetector()