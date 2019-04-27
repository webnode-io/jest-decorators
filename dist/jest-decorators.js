"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestSuite {
    constructor(classType) {
        this.classType = classType;
        this.tests = [];
        this.instance = new classType();
    }
    getClassType() {
        return this.classType;
    }
    setDescription(description) {
        this.description = description;
    }
    addTest(description, methodName) {
        this.tests.push([description, methodName]);
    }
    setBeforeEach(methodName) {
        this.beforeEach = methodName;
    }
    setAfterEach(methodName) {
        this.afterEach = methodName;
    }
    setBeforeAll(methodName) {
        this.beforeAll = methodName;
    }
    setAfterAll(methodName) {
        this.afterAll = methodName;
    }
    exec() {
        describe(this.description, () => {
            if (this.beforeAll !== undefined) {
                beforeAll(this.instance[this.beforeAll].bind(this.instance));
            }
            if (this.afterAll !== undefined) {
                afterAll(this.instance[this.afterAll].bind(this.instance));
            }
            if (this.beforeEach !== undefined) {
                beforeEach(this.instance[this.beforeEach].bind(this.instance));
            }
            if (this.afterEach !== undefined) {
                afterEach(this.instance[this.afterEach].bind(this.instance));
            }
            for (let [description, methodName] of this.tests) {
                test(description, this.instance[methodName].bind(this.instance));
            }
        });
    }
}
class TestContainer extends Map {
    static getInstance() {
        if (TestContainer.instance === undefined) {
            TestContainer.instance = new TestContainer();
        }
        return TestContainer.instance;
    }
    static run() {
        for (let [classType, suite] of TestContainer.getInstance().entries()) {
            suite.exec();
        }
    }
    setIfNotExists(classType) {
        if (!this.has(classType)) {
            this.set(classType, new TestSuite(classType));
        }
        return this;
    }
}
exports.TestContainer = TestContainer;
function Suite(target) {
    TestContainer.getInstance().setIfNotExists(target).get(target).setDescription(target.name);
    return target;
}
exports.Suite = Suite;
function Test(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).addTest(propertyKey, propertyKey);
}
exports.Test = Test;
function Setup(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).setBeforeEach(propertyKey);
}
exports.Setup = Setup;
function Teardown(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).setAfterEach(propertyKey);
}
exports.Teardown = Teardown;
function SuiteSetup(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).setBeforeAll(propertyKey);
}
exports.SuiteSetup = SuiteSetup;
function SuiteTeardown(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).setAfterAll(propertyKey);
}
exports.SuiteTeardown = SuiteTeardown;

//# sourceMappingURL=jest-decorators.js.map
