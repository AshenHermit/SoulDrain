var next_entity_uid=0

class Entity{
    constructor(texture_key){
        this.uid = next_entity_uid;
        next_entity_uid += 1;
        this.position = vector2()
        this.texture = resources.textures[texture_key]
    }
    update(){
        
    }
    draw(){
        ctx.image(this.texture, this.position.x, this.position.y)
    }
}