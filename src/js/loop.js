var game_draw_states=[
    function(){
        if(resources.load_count>0){
            ctx.background(32, 32, 32);
            ctx.noSmooth();
            ctx.textSize(8);
            ctx.text('loading, '+resources.load_count+' items left', 8, 8);
            ctx.fill(255, 255, 255);
        }else{
            world.init()
            game_state = 1
            update();
        }
    },
    function(){
        ctx.background(32, 32, 32);
        ctx.noSmooth();

        world.draw()
    }
]

function update(){
    world.update()

    requestAnimationFrame(update)
}

ctx.setup = function(){
    ctx.imageMode(ctx.CENTER);
}

ctx.draw = function(){
    game_draw_states[game_state]()
}