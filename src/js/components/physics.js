class PhysicsComponent{
    constructor(){
        this.chunk = null
    }
    update(position, velocity){

        let border = 0.1

        let grid_x = Math.floor(position.x/world.map.cell_size+0.5)
        let grid_y = Math.floor(position.y/world.map.cell_size+0.5)

        let vel_k_x = velocity.x>0 ? 1 : (velocity.x<0 ? -1 : 0)
        let vel_k_y = velocity.y>0 ? 1 : (velocity.y<0 ? -1 : 0)
        
        let grid_vel_x = Math.floor(((position.x + world.map.cell_size/2) + velocity.x)/world.map.cell_size)
        let grid_vel_y = Math.floor(((position.y + world.map.cell_size/2) + velocity.y)/world.map.cell_size)
        
        if(this.chunk.get_block_id(grid_x+vel_k_x, grid_y) > 1) {
            //velocity.x = 0
            if(vel_k_x>0){
                position.x = Math.min(position.x, (grid_x+border)*world.map.cell_size)
            }
            if(vel_k_x<0){
                position.x = Math.max(position.x, (grid_x-border)*world.map.cell_size)
            }
        }
        if(this.chunk.get_block_id(grid_x, grid_y+vel_k_y) > 1) {
            //velocity.y = 0
            if(vel_k_y>0){
                position.y = Math.min(position.y, (grid_y+border)*world.map.cell_size)
            }
            if(vel_k_y<0){
                position.y = Math.max(position.y, (grid_y-border)*world.map.cell_size)
            }
        }
    }
}