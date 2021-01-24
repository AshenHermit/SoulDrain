class Addon{
    constructor(path){
        this._folder_path = path
        this._script = ""
        this._load()
        this._loaded = false
    }
    _load(){
        let script = null
        
        if(is_folder_exists(this._folder_path+"/textures")){
            resources.load_textures(this._folder_path+"/textures")
        }

        load_processed_script(this._folder_path, "/main.js").then((function(script){
            this._loaded = true
            this._script = script
            eval(this._script)

            resources.load_count -= 1
        }).bind(this))
    }
}

class AddonManager{
    constructor(){
        this.addons = []
    }

    load_addons(folder){
        var folders = get_folders(folder)
        resources.load_count += folders.length

        for (let i = 0; i < folders.length; i++) {
            this.addons.push(new Addon(folders[i]))
            console.log(`loaded addon "${folders[i]}"`)
        }
    }

    init(){
        for (let i = 0; i < this.addons.length; i++) {
            if(this.addons[i].init){
                this.addons[i].init()
            }
        }
    }
    update(){
        for (let i = 0; i < this.addons.length; i++) {
            if(this.addons[i].update){
                this.addons[i].update()
            }
        }
    }
    draw(){
        for (let i = 0; i < this.addons.length; i++) {
            if(this.addons[i].draw){
                this.addons[i].draw()
            }
        }
    }
}