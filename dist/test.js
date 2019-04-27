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
const jest_decorators_1 = require("./jest-decorators");
class App {
    constructor() {
        this.a = 0;
        this.b = 0;
        this.c = 0;
    }
    incA() {
        this.a++;
    }
    incB() {
        this.b++;
    }
    incC() {
        this.c++;
    }
    zeroA() {
        this.a = 0;
    }
    zeroB() {
        this.b = 0;
    }
    zeroC() {
        this.c = 0;
    }
}
let AppTest = class AppTest {
    constructor() {
        this.app = new App();
    }
    suiteSetup() {
        this.app.incA();
    }
    suiteTeardown() {
        this.app.zeroA();
    }
    setup() {
        this.app.incB();
        this.app.incC();
    }
    teardown() {
        this.app.zeroB();
    }
    test1() {
        expect(this.app.a).toBe(1);
        expect(this.app.b).toBe(1);
        expect(this.app.c).toBe(1);
    }
    test2() {
        expect(this.app.a).toBe(1);
        expect(this.app.b).toBe(1);
        expect(this.app.c).toBe(2);
    }
    test3() {
        expect(this.app.a).toBe(1);
        expect(this.app.b).toBe(1);
        expect(this.app.c).toBe(3);
    }
};
__decorate([
    jest_decorators_1.SuiteSetup,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppTest.prototype, "suiteSetup", null);
__decorate([
    jest_decorators_1.SuiteTeardown,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppTest.prototype, "suiteTeardown", null);
__decorate([
    jest_decorators_1.Setup,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppTest.prototype, "setup", null);
__decorate([
    jest_decorators_1.Teardown,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppTest.prototype, "teardown", null);
__decorate([
    jest_decorators_1.Test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppTest.prototype, "test1", null);
__decorate([
    jest_decorators_1.Test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppTest.prototype, "test2", null);
__decorate([
    jest_decorators_1.Test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppTest.prototype, "test3", null);
AppTest = __decorate([
    jest_decorators_1.Suite
], AppTest);
jest_decorators_1.TestContainer.run();

//# sourceMappingURL=test.js.map
