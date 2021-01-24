
function broadcast(key, data){
    socket.emit('client_broadcast', Object.assign(data, {_player_uid: player_uid, _key:key}))
}

function clamp(x, min, max){
    return Math.min(Math.max(x, min), max);
}