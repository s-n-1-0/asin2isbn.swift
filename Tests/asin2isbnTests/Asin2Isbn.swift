/**
    base test:
    https://github.com/s-n-1-0/asin2isbn/blob/main/tests/index.test.ts
    ** Only check if it can be executed. The details of the return values aren't done in this tests. **
 */
import XCTest
import JavaScriptCore
@testable import asin2isbn

final class asin2isbnTests: XCTestCase {
    let cache = Asin2Isbn.shared
    let isbn = IsbnResponse(isbn10: "4596708460", isbn13: "9784596708465")
    func testConvertAsin2Isbn(){
        XCTAssertEqual(cache.convertAsin2Isbn(asin: "4596708460"),isbn)
        XCTAssertEqual(cache.convertAsin2Isbn(asin: "urlerror"), Asin2IsbnResponse(isbn10: "", isbn13: "", error: .FORMAT))
    }
    func testConvertIsbn(){
        XCTAssertEqual(cache.convertIsbn(isbn: isbn.isbn10),isbn)
    }
    func testConvertIsbn2Url(){
        XCTAssertEqual(cache.convertIsbn2Url(isbn: "9784799215661"),"https://www.amazon.co.jp/dp/4799215663")
    }
    /*
    func testConvertUrl2Asin(){
        // convertUrl2Asin is not working.
        // XCTAssertEqual(cache.convertUrl2Asin(url: "https://www.amazon.co.jp/dp/4799215663"),"4799215663")
    }
    func testConvertUrl2Isbn(){
        // convertUrl2Isbn is not working.
    }
     */
}
