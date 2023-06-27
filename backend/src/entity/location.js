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
exports.Location = void 0;
var typeorm_1 = require("typeorm");
var product_entity_1 = require("./product.entity");
var bunk_1 = require("./bunk");
var Location = exports.Location = /** @class */ (function () {
    function Location() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Location.prototype, "bunk_sku", void 0);
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Location.prototype, "product_sku", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_entity_1.Product; }, function (product) { return product.sku; }),
        (0, typeorm_1.JoinColumn)({ name: 'product_sku' }),
        __metadata("design:type", product_entity_1.Product)
    ], Location.prototype, "product", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return bunk_1.Bunk; }, function (location) { return location.bunk_sku; }),
        (0, typeorm_1.JoinColumn)({ name: 'bunk_sku' }),
        __metadata("design:type", bunk_1.Bunk)
    ], Location.prototype, "location", void 0);
    Location = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['bunk_sku', 'product_sku'])
    ], Location);
    return Location;
}());
