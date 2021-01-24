

class Player extends Entity{
    constructor(){
        super("player")
        
        this.player_uid = 0
        this.is_local = false
        
        this.controls = new Controls()

        this.velocity = vector2(0, 0)
        this.speed = 0.4

        this.physics = new PhysicsComponent()
    }

    init(){
        console.log(world)
        this.physics.chunk = world.map.chunks[0]
    }

    update(){
        this.controls.update()

        if(this.is_local){
            if(this.controls.is_pressed["KeyA"]){
                this.velocity.x -= this.speed
            }
            if(this.controls.is_pressed["KeyD"]){
                this.velocity.x += this.speed
            }
            if(this.controls.is_pressed["KeyW"]){
                this.velocity.y -= this.speed
            }
            if(this.controls.is_pressed["KeyS"]){
                this.velocity.y += this.speed
            }
            world.sync_entity_by_uid(this.uid, "position", this.position)

            this.physics.update(this.position, this.velocity)
        }
        
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.velocity.x /= 1.2
        this.velocity.y /= 1.2
    }
}

world.register_entity(Player, "player")