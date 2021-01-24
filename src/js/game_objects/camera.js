class Camera{
    constructor(){
        this.position = vector2()
        this.rotation = 0
        this.zoom = 2
    }
    draw(){
        ctx.scale(this.zoom)
        ctx.translate(-this.position.x + window.innerWidth/2/this.zoom, -this.position.y + window.innerHeight/2/this.zoom)
    }
}