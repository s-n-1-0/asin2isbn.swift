import XCTest
import JavaScriptCore
@testable import asin2isbn

final class JSCacheTests: XCTestCase {
    
    func testLoadLibrary(){
        let cache = LibraryCache()
        XCTAssertFalse(cache.failed)
    }
    
}
