import JavaScriptCore

class LibraryCache{
    let fileName = "asin2isbn"
    let globalName = "asin2isbn"
    let fileExt = ".js"
    let context = JSContext()
    var failed:Bool
    init() {
        if let context = context,
           let jsSourcePath = Bundle.module.path(forResource: fileName, ofType: fileExt),
           let jsSourceContents = try? String(contentsOfFile: jsSourcePath){
            context.evaluateScript(jsSourceContents)
            failed = false
        }else{
            failed = true
        }
    }
    /**
        Example : script = "convertAsin2Isbn13("****");"
        https://github.com/s-n-1-0/asin2isbn
     */
    func evaluateLibraryScript(script:String) -> JSValue{
        return context!.evaluateScript("\(globalName).\(script)")
    }
    
}
