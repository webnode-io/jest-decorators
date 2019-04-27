// This module is dependent with jest

export type ClassType<T=any> = new(...args: any[]) => T
export type ClassTypeDecorator<T=any> = (target: ClassType<T>) => ClassType<T>

class TestSuite {
  private description: string
  private instance: InstanceType<ClassType>
  private tests: Array<[string, PropertyKey]> = []
  private beforeEach: PropertyKey
  private afterEach: PropertyKey
  private beforeAll: PropertyKey
  private afterAll: PropertyKey

  constructor(private classType: ClassType) {
    this.instance = new classType()
  }

  public getClassType(): ClassType {
    return this.classType
  }

  public setDescription(description: string) {
    this.description = description
  }

  public addTest(description: string, methodName: PropertyKey) {
    this.tests.push([description, methodName])
  }

  public setBeforeEach(methodName: PropertyKey) {
    this.beforeEach = methodName
  }

  public setAfterEach(methodName: PropertyKey) {
    this.afterEach = methodName
  }

  public setBeforeAll(methodName: PropertyKey) {
    this.beforeAll = methodName
  }

  public setAfterAll(methodName: PropertyKey) {
    this.afterAll = methodName
  }

  public exec() {
    describe(this.description, () => {
      if (this.beforeAll !== undefined) {
        beforeAll(this.instance[this.beforeAll].bind(this.instance))
      }
      if (this.afterAll !== undefined) {
        afterAll(this.instance[this.afterAll].bind(this.instance))
      }
      if (this.beforeEach !== undefined) {
        beforeEach(this.instance[this.beforeEach].bind(this.instance))
      }
      if (this.afterEach !== undefined) {
        afterEach(this.instance[this.afterEach].bind(this.instance))
      }
      for (let [description, methodName] of this.tests) {
        test(description, this.instance[methodName].bind(this.instance))
      }
    })
  }
}

export class TestContainer extends Map<ClassType, TestSuite> {
  private static instance: TestContainer

  public static getInstance(): TestContainer {
    if (TestContainer.instance === undefined) {
       TestContainer.instance = new TestContainer()
    }
    return TestContainer.instance
  }

  public static run() {
    for (let [classType, suite] of TestContainer.getInstance().entries()) {
      suite.exec()
    }
  }

  public setIfNotExists(classType: ClassType): this {
    if (!this.has(classType)) {
      this.set(classType, new TestSuite(classType))
    }
    return this
  }
}

export function Suite(target: ClassType): ClassType {
  TestContainer.getInstance().setIfNotExists(target).get(target).setDescription(target.name)
  return target
}

export function Test(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  TestContainer.getInstance().setIfNotExists(target.constructor as ClassType).get(target.constructor as ClassType).addTest(propertyKey, propertyKey)
}

export function Setup(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  TestContainer.getInstance().setIfNotExists(target.constructor as ClassType).get(target.constructor as ClassType).setBeforeEach(propertyKey)
}

export function Teardown(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  TestContainer.getInstance().setIfNotExists(target.constructor as ClassType).get(target.constructor as ClassType).setAfterEach(propertyKey)
}

export function SuiteSetup(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  TestContainer.getInstance().setIfNotExists(target.constructor as ClassType).get(target.constructor as ClassType).setBeforeAll(propertyKey)
}

export function SuiteTeardown(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  TestContainer.getInstance().setIfNotExists(target.constructor as ClassType).get(target.constructor as ClassType).setAfterAll(propertyKey)
}
