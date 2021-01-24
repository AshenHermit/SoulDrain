var socket = io.connect(window.location.href);

var sketch = function( p ) {
    
};

function createP5Ctx(){
    var ctx = new p5(sketch);
    ctx.setup = function(){
        ctx.createCanvas(window.innerWidth, window.innerHeight)
    }
    return ctx;
}

var broadcast_callbacks = {}
var ctx = createP5Ctx()
var resources = new Resources()
var is_server = false
var player_uid = 0
var game_state = 0
var world = new World()
var addon_manager = new AddonManager()