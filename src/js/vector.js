class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function vector2(x=0, y=0){
    return new Vector2(x, y)
}