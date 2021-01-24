var file_struct = {}
var local_files = []

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function get_files(folder_path){
    return local_files
    .filter(p=>
        (p.substring(0, folder_path.length+1)==folder_path+"/"
        && p.indexOf(".")!=-1))
}

function get_folders(folder_path){
    return uniq(local_files
    .filter(p=>
        (p.substring(0, folder_path.length+1)==folder_path+"/"
        && p.indexOf("/", folder_path.length+1)!=-1))
    .map(p=>
        p.substring(0, p.indexOf("/", folder_path.length+1)))
    )
}

function is_folder_exists(folder_path){
    return (local_files.filter(p=>
        (p.substring(0, folder_path.length)==folder_path))
    ).length > 0
}



async function load_script(path){
    let promise = new Promise((resolve, reject) => {
        http_request('get', path, text=>resolve(text))
    });
    
    let result = await promise;
    return result
}

async function process_script(folder, script){
    let import_pos = script.indexOf("import")
    
    while(import_pos!=-1){
        line = script.substring(import_pos, script.indexOf("\n", import_pos))
        imp = await load_processed_script(folder, line
            .replaceAll(";", "")
            .replaceAll('"', "")
            .substring('import '.length))
        script = script.replace(line, imp)
        
        import_pos = script.indexOf("import")
    }
    return script
}

async function load_processed_script(folder, file){
    script = await load_script(folder+file)
    return process_script(folder, script)
}

