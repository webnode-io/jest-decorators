declare namespace WebNode {
  export type ClassType<T=any> = new(...args: any[]) => T
  export type ClassTypeDecorator<T=any> = (target: ClassType<T>) => ClassType<T>

  class TestSuite {
  }

  export class TestContainer extends Map<ClassType, TestSuite> {
    public static run(): void
  }

  export function Suite(target: ClassType): ClassType
  export function Setup(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void
  export function Teardown(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void
  export function SuiteSetup(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void
  export function SuiteTeardown(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void
  export function Test(target: Object, propertyKey: string, descriptor: PropertyDescriptor): void
}

export = WebNode
