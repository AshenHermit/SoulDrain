
function broadcast(key, data){
    socket.emit('client_broadcast', Object.assign(data, {_player_uid: player_uid, _key:key}))
}

function clamp(x, min, max){
    return Math.min(Math.max(x, min), max);
}

function distance(x1, y1, x2, y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}
function distance_v(v1, v2){
    return Math.sqrt((v2.x-v1.x)**2 + (v2.y-v1.y)**2)
}
