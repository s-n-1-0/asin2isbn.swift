function _mergeNamespaces(n, m) {
    m.forEach(function (e) {
        e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
            if (k !== 'default' && !(k in n)) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    });
    return Object.freeze(n);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dist = {};

var asin2isbn$1 = {};

var isbn2 = {};

var asin_url = {};

var isbn = {};

Object.defineProperty(isbn, "__esModule", { value: true });
isbn.convertIsbn = isbn.getIsbn13Checkdigit = void 0;
function getIsbn13Checkdigit(isbn) {
    if (isbn.length < 12 || isbn.length > 13)
        return null;
    let isbn12 = isbn;
    if (isbn12.length == 13) {
        isbn12 = isbn12.slice(0, -1);
    }
    let p1 = 0;
    let p2 = 0;
    for (let i = 0; i < isbn12.length; i += 2) {
        p1 += Number(isbn12[i]);
    }
    for (let i = 1; i < isbn12.length; i += 2) {
        p2 += Number(isbn12[i]);
    }
    let d = (p1 + p2 * 3) % 10;
    d = 10 - d;
    if (d == 10)
        d = 0;
    return {
        isbn: isbn12 + String(d),
        checkdigit: d,
    };
}
isbn.getIsbn13Checkdigit = getIsbn13Checkdigit;
/**
 * ISBN10or13 → ISBN10and13
 */
function convertIsbn(isbn) {
    var _a;
    let retIsbn = null;
    if (isbn.length == 13) {
        const sum = [...isbn].slice(3, 12).reduce((tmp, c, i) => {
            let n = Number(c);
            return tmp + n * (10 - i);
        }, 0);
        const checkDigit = (11 - (sum % 11)) % 11;
        const checkDigitStr = checkDigit === 10 ? "X" : String(checkDigit);
        const isbn10 = isbn.substring(3, 12) + checkDigitStr;
        retIsbn = {
            isbn10,
            isbn13: isbn,
        };
    }
    else if (isbn.length == 10) {
        let q = "978" + isbn;
        let isbn13 = (_a = getIsbn13Checkdigit(q)) === null || _a === void 0 ? void 0 : _a.isbn;
        retIsbn = {
            isbn10: isbn,
            isbn13,
        };
    }
    return retIsbn;
}
isbn.convertIsbn = convertIsbn;

Object.defineProperty(asin_url, "__esModule", { value: true });
asin_url.convertIsbn2Url = asin_url.convertIsbn2Asin = void 0;
const isbn_1 = isbn;
/**
 * ISBN10-> ASIN or ISBN13->ASIN
 */
function convertIsbn2Asin(isbn) {
    if (isbn.length == 10)
        return isbn; //ISBN10 == ASIN
    if (isbn.length == 13)
        return (0, isbn_1.convertIsbn)(isbn).isbn10;
    return null;
}
asin_url.convertIsbn2Asin = convertIsbn2Asin;
/**
 * ISBN10 -> Amazon URL or ISBN13 -> AmazonURL
 */
function convertIsbn2Url(isbn) {
    let asin = convertIsbn2Asin(isbn);
    if (!asin)
        return null;
    return "https://www.amazon.co.jp/dp/" + encodeURI(asin);
}
asin_url.convertIsbn2Url = convertIsbn2Url;

(function (exports) {
    var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(asin_url, exports);
    __exportStar(isbn, exports);
} (isbn2));

Object.defineProperty(asin2isbn$1, "__esModule", { value: true });
asin2isbn$1.convertAsin2Isbn = void 0;
const isbn2_1 = isbn2;
function convertAsin2Isbn(asin) {
    let error = "";
    if (asin[0] == "B")
        error = "KINDLE";
    if (asin.length != 10)
        error = "FORMAT";
    if (error != "")
        return {
            isbn10: "",
            isbn13: "",
            error,
        };
    let isbn = (0, isbn2_1.convertIsbn)(asin);
    return Object.assign(Object.assign({}, isbn), { error: isbn == null ? "FORMAT" : "" });
}
asin2isbn$1.convertAsin2Isbn = convertAsin2Isbn;

var interfaces = {};

Object.defineProperty(interfaces, "__esModule", { value: true });

var url2 = {};

Object.defineProperty(url2, "__esModule", { value: true });
url2.convertUrl2Isbn = url2.convertUrl2Asin = void 0;
const asin2isbn_1 = asin2isbn$1;
function convertUrl2Asin(url) {
    var _a;
    try {
        let u = new URL(url);
        let names = u.pathname.split("/");
        let q = names.findIndex((n) => n == "dp");
        if (q == -1)
            return "";
        return (_a = names === null || names === void 0 ? void 0 : names[q + 1]) !== null && _a !== void 0 ? _a : "";
    }
    catch (_b) {
        return "";
    }
}
url2.convertUrl2Asin = convertUrl2Asin;
function convertUrl2Isbn(url) {
    let asin = convertUrl2Asin(url);
    if (asin == "")
        return {
            isbn10: "",
            isbn13: "",
            error: "FORMAT",
        };
    return (0, asin2isbn_1.convertAsin2Isbn)(asin);
}
url2.convertUrl2Isbn = convertUrl2Isbn;

(function (exports) {
    var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(asin2isbn$1, exports);
    __exportStar(interfaces, exports);
    __exportStar(isbn2, exports);
    __exportStar(url2, exports);
} (dist));

var index = /*@__PURE__*/getDefaultExportFromCjs(dist);

var _asin2isbn = /*#__PURE__*/_mergeNamespaces({
    __proto__: null,
    default: index
}, [dist]);

asin2isbn = _asin2isbn;
