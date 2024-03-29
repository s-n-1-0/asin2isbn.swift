// swift-tools-version: 5.8
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "asin2isbn",
    products: [
        // Products define the executables and libraries a package produces, making them visible to other packages.
        .library(
            name: "asin2isbn",
            targets: ["asin2isbn"]),
    ],
    targets: [
        // Targets are the basic building blocks of a package, defining a module or a test suite.
        // Targets can depend on other targets in this package and products from dependencies.
        .target(
            name: "asin2isbn",
        path: "Sources",
            resources: [.copy("./Script/asin2isbn.js")]),
        .testTarget(
            name: "asin2isbnTests",
            dependencies: ["asin2isbn"]),
    ]
)
