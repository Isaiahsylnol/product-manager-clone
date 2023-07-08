"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByLocation = exports.createProductLocation = exports.getLocatedProduct = exports.getProductBySku = exports.getCategoryById = exports.getProducts = void 0;
var app_data_source_1 = require("../../app-data-source");
var product_entity_1 = require("../entity/product.entity");
var bunk_entity_1 = require("../entity/bunk.entity");
var product_location_entity_1 = require("../entity/product_location.entity");
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prods;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.myDataSource.getRepository(product_entity_1.Product).find()];
            case 1:
                prods = _a.sent();
                res.send(prods);
                return [2 /*return*/];
        }
    });
}); };
exports.getProducts = getProducts;
var getCategoryById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.myDataSource
                    .getRepository(bunk_entity_1.Bunk)
                    .findOneBy({ sku: req.body.sku })];
            case 1:
                prod = _a.sent();
                res.send(prod);
                return [2 /*return*/];
        }
    });
}); };
exports.getCategoryById = getCategoryById;
var getProductBySku = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var sku, prod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sku = req.body.sku;
                console.log(sku);
                return [4 /*yield*/, app_data_source_1.myDataSource
                        .getRepository(product_entity_1.Product)
                        .createQueryBuilder("product")
                        .leftJoinAndSelect("product.productLocations", "productLocation")
                        .leftJoinAndSelect("productLocation.bunk", "bunk")
                        .where("product.sku = :sku", { sku: sku })
                        .getOne()];
            case 1:
                prod = _a.sent();
                res.send(prod);
                return [2 /*return*/];
        }
    });
}); };
exports.getProductBySku = getProductBySku;
var getLocatedProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prod;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app_data_source_1.myDataSource
                    .getRepository(product_location_entity_1.ProductLocation)
                    .createQueryBuilder("productLocation")
                    .leftJoinAndSelect("productLocation.product", "product")
                    .leftJoinAndSelect("productLocation.bunk", "bunk")
                    .getMany()];
            case 1:
                prod = _a.sent();
                res.send(prod);
                return [2 /*return*/];
        }
    });
}); };
exports.getLocatedProduct = getLocatedProduct;
var createProductLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, prodSku, locSku, product, bunk, productLocation, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, prodSku = _a.prodSku, locSku = _a.locSku;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, app_data_source_1.myDataSource
                        .getRepository(product_entity_1.Product)
                        .findOne({ where: { sku: prodSku } })];
            case 2:
                product = _b.sent();
                return [4 /*yield*/, app_data_source_1.myDataSource
                        .getRepository(bunk_entity_1.Bunk)
                        .findOne({ where: { sku: locSku } })];
            case 3:
                bunk = _b.sent();
                if (!product || !bunk) {
                    return [2 /*return*/, res.status(404).send({ message: "Product or Bunk not found" })];
                }
                productLocation = new product_location_entity_1.ProductLocation();
                productLocation.product = product;
                productLocation.bunk = bunk;
                return [4 /*yield*/, app_data_source_1.myDataSource
                        .getRepository(product_location_entity_1.ProductLocation)
                        .save(productLocation)];
            case 4:
                _b.sent();
                res.send({ message: "Product successfully added to fast-find bunk" });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.error("Error adding product to fast-find bunk:", error_1);
                res.status(500).send({ message: "Failed to add product to fast-find bunk" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createProductLocation = createProductLocation;
var getProductsByLocation = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bunkLocationSku, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bunkLocationSku = req.body.bunkLocationSku;
                return [4 /*yield*/, app_data_source_1.myDataSource
                        .getRepository(product_entity_1.Product)
                        .createQueryBuilder("product")
                        .innerJoin("product.productLocations", "productLocation")
                        .innerJoin("productLocation.bunk", "bunk")
                        .where("bunk.sku = :bunkLocationSku", { bunkLocationSku: bunkLocationSku })
                        .getMany()];
            case 1:
                products = _a.sent();
                res.send(products);
                return [2 /*return*/];
        }
    });
}); };
exports.getProductsByLocation = getProductsByLocation;
