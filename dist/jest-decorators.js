"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestSuite {
    constructor(classType) {
        this.classType = classType;
        this.tests = [];
        this.beforeEach = [];
        this.afterEach = [];
        this.beforeAll = [];
        this.afterAll = [];
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
    addBeforeEach(methodName) {
        this.beforeEach.push(methodName);
    }
    addAfterEach(methodName) {
        this.afterEach.push(methodName);
    }
    addBeforeAll(methodName) {
        this.beforeAll.push(methodName);
    }
    addAfterAll(methodName) {
        this.afterAll.push(methodName);
    }
    exec() {
        describe(this.description, () => {
            for (let cb of this.beforeAll) {
                beforeAll(this.instance[cb].bind(this.instance));
            }
            for (let cb of this.afterAll) {
                afterAll(this.instance[cb].bind(this.instance));
            }
            for (let cb of this.beforeEach) {
                beforeEach(this.instance[cb].bind(this.instance));
            }
            for (let cb of this.afterEach) {
                afterEach(this.instance[cb].bind(this.instance));
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
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).addBeforeEach(propertyKey);
}
exports.Setup = Setup;
function Teardown(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).addAfterEach(propertyKey);
}
exports.Teardown = Teardown;
function SuiteSetup(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).addBeforeAll(propertyKey);
}
exports.SuiteSetup = SuiteSetup;
function SuiteTeardown(target, propertyKey, descriptor) {
    TestContainer.getInstance().setIfNotExists(target.constructor).get(target.constructor).addAfterAll(propertyKey);
}
exports.SuiteTeardown = SuiteTeardown;

//# sourceMappingURL=jest-decorators.js.map
