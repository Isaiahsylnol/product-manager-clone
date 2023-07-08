"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLocation = void 0;
var typeorm_1 = require("typeorm");
var product_entity_1 = require("./product.entity");
var bunk_entity_1 = require("./bunk.entity");
var ProductLocation = exports.ProductLocation = /** @class */ (function () {
    function ProductLocation() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ProductLocation.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_entity_1.Product; }, function (product) { return product.sku; }),
        __metadata("design:type", product_entity_1.Product)
    ], ProductLocation.prototype, "product", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return bunk_entity_1.Bunk; }, function (bunk) { return bunk.products; }),
        __metadata("design:type", bunk_entity_1.Bunk)
    ], ProductLocation.prototype, "bunk", void 0);
    ProductLocation = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['product', 'bunk'])
    ], ProductLocation);
    return ProductLocation;
}());
