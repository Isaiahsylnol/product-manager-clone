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
exports.Bunk = void 0;
var typeorm_1 = require("typeorm");
var product_entity_1 = require("./product.entity");
var product_location_entity_1 = require("./product_location.entity");
var Bunk = exports.Bunk = /** @class */ (function () {
    function Bunk() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Bunk.prototype, "sku", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return product_entity_1.Product; }, function (product) { return product.productLocations; }),
        __metadata("design:type", Array)
    ], Bunk.prototype, "products", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return product_location_entity_1.ProductLocation; }, function (location) { return location.bunk; }, {
            eager: true,
        }),
        __metadata("design:type", Array)
    ], Bunk.prototype, "productLocations", void 0);
    Bunk = __decorate([
        (0, typeorm_1.Entity)()
    ], Bunk);
    return Bunk;
}());
