
this.init = function(){
    world.map.register_block("wooden_wall", "wooden_wall")
    
    if(is_server){
        world.map.chunks.push(new Chunk(world.map.chunk_size, world.map.chunk_size, world.map))

        world.map.chunks[0].for_each((x, y, v)=>{
            if(Math.random() < 0.5){
                world.map.chunks[0].set_block_by_key(x, y, "wooden_wall")
            }
        })
    }
}