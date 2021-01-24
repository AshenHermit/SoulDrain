class World{
    constructor(){
        this.map = new Map()

        this.ENTITY_LIST = {}

        this.local_player = null
        this.players = []
        this.entities = []

        this.register_broadcast_callbacks()
    }
    init(){
        this.init_array(this.entities)
    }
    update(){
        this.update_array(this.entities)
    }
    draw(){
        try{
            ctx.translate(-this.local_player.position.x*2+window.innerWidth/2, -this.local_player.position.y*2+window.innerHeight/2)
            ctx.scale(2);
        }catch(e){}
        
        this.draw_array(this.entities)

        this.map.draw()
    }



    //
    register_broadcast_callbacks(){
        broadcast_callbacks["entity_sync"] = function(data){
            if(player_uid!=data.player_uid){
                world.entities.find(ent=>ent.uid==data.uid)[data.param] = data.value
            }
        }
    }
    sync_entity_by_uid(uid, param, value){
        broadcast("entity_sync", {player_uid: player_uid, uid:uid, param:param, value:value})
    }
    

    register_entity(proto, name){
        this.ENTITY_LIST[name] = Object.freeze({proto:proto, name:name})
    }
    
    spawn_entity(name, params={}){
        var entity = Object.assign(new (this.ENTITY_LIST[name].proto)(), params)
        entity._name = this.ENTITY_LIST[name].name
        world.add_entity(entity)
        return entity
    }
    remove_entity_by_uid(uid){
        this.entities.splice(this.entities.findIndex(ent=>ent.uid==32), 1)
    }
    remove_entity_by_param(param_key, value){
        this.entities.splice(this.entities.findIndex(ent=>ent[param_key]==value), 1)
    }
    get_entities_param_array(local_player_uid){
        return world.entities.map(obj=>{
                let o = Object.assign({}, obj);
                delete o["texture"];
                if(o["is_local"]) delete o["is_local"]
                if(o["controls"]) delete o["controls"]
                if(o["physics"]) delete o["physics"]
                if(o.player_uid && o.player_uid==local_player_uid) o["is_local"] = true
                return o
            })
    }

    add_entity(obj){
        this.entities.push(obj)
    }

    init_array(arr){
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].init){
                arr[i].init()
            }
        }
    }
    update_array(arr){
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].update){
                arr[i].update()
            }
        }
    }
    draw_array(arr){
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].draw){
                arr[i].draw()
            }
        }
    }
}