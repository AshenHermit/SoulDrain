

broadcast_callbacks["init_world"] = function(data){
    if(!is_server){
        resources.load_count -= 1
        world.map.load_chunks_from_copy(data.chunks_copy)

        for(let i=0; i<data.entities.length; i++){
            //console.log(data)
            var new_ent = world.spawn_entity(data.entities[i]._name, data.entities[i])

            if(new_ent.player_uid && new_ent.player_uid == player_uid){
                new_ent.controls.setup_event_listeners()
                world.local_player = new_ent
            }
        }
    }
}

broadcast_callbacks["sync_entity"] = function(data){
    if(data._player_uid != player_uid){
        world.entities.find(ent=>ent.uid==uid)[data.param] = data.value
    }
}

socket.on('server_broadcast', (data)=>{
    broadcast_callbacks[data._key](data)
})


socket.on('server_connect', (data)=>{
    if(world.local_player === null){
        resources.load_count -= 1
        local_files = data.local_files
        addon_manager.load_addons("/addons")
        player_uid = data.player_uid
        is_server = data.is_server

        if(is_server) {
            var new_player = world.spawn_entity("player", {player_uid: data.player_uid, is_local: true})
            world.local_player = new_player
            world.local_player.controls.setup_event_listeners()
        }
    }else{

        if(is_server) {
            var new_player = world.spawn_entity("player", {player_uid: data.player_uid})
            broadcast("init_world", {
                entities: world.get_entities_param_array(data.player_uid),
                chunks_copy: world.map.get_chunks_copy()
            })
        }

        //var new_player = world.spawn_entity("player", {player_uid: data.player_uid})
    }
})

socket.on('server_disconnect', (data)=>{
    world.remove_entity_by_param("player_uid", data.player_uid)
})

window.addEventListener('beforeunload', function(e){
    //e.preventDefault();
    //e.stopPropagation();
    socket.emit('client_disconnect', {player_uid: player_uid})
    console.log("disconect")
    //e.returnValue = '';
})

resources.load_count = 1
socket.emit('client_connect', {})