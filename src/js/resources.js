class Resources{
    constructor(){
        this.textures = {}
        this.load_count = 0
    }

    load_textures(folder){
        get_files(folder).forEach(file=>{
            let key = file.replaceAll(folder+"/", "")
            key = key.substring(0, key.lastIndexOf("."))
            this.textures[key] = ctx.loadImage(file)
        })
    }
}