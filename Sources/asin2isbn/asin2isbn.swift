import JavaScriptCore
class Asin2Isbn : LibraryCache{
    static let shared:Asin2Isbn = Asin2Isbn()
    func convertAsin2Isbn(asin:String)->IsbnResponse{
        let result = evaluateLibraryScript(script: "convertAsin2Isbn(\"\(asin)\");")
        return IsbnResponse(value: result)
    }
    func convertIsbn(isbn:String)->IsbnResponse{
        let result = evaluateLibraryScript(script:"convertIsbn(\"\(isbn)\")")
        return IsbnResponse(value: result)
    }
    func convertIsbn2Url(isbn:String)->String{
        evaluateLibraryScript(script: "convertIsbn2Url(\"\(isbn)\")").toString()
    }
}
class IsbnResponse:Equatable{
    init(value:JSValue){
        isbn10 = value.objectForKeyedSubscript("isbn10").toString() ?? ""
        isbn13 = value.objectForKeyedSubscript("isbn13").toString() ?? ""
    }
    init(isbn10:String,isbn13:String){
        self.isbn10 = isbn10
        self.isbn13 = isbn13
    }
    let isbn10: String
    let isbn13: String
    func isEqual(_ value: IsbnResponse) -> Bool {

        return isbn10 == value.isbn10 && isbn13 == value.isbn13
    }
    static func ==(lhs: IsbnResponse, rhs: IsbnResponse) -> Bool {
        return lhs.isEqual(rhs)
    }
}
class Asin2IsbnResponse:IsbnResponse{
    override init(value: JSValue) {
        error = Asin2IsbnError(rawValue: value.objectForKeyedSubscript("error").toString())
        super.init(value: value)
    }
    init(isbn10: String, isbn13: String,error:Asin2IsbnError?) {
        self.error = error
        super.init(isbn10: isbn10, isbn13: isbn13)
    }
    let error:Asin2IsbnError?
    func isEqual(_ value: Asin2IsbnResponse) -> Bool {
        return error == value.error && super.isEqual(value)
    }
}
enum Asin2IsbnError:String{
    case FORMAT = "FORMAT"
    case KINDLE = "KINDLE"
}

