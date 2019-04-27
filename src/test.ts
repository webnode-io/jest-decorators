import {TestContainer, Suite, SuiteSetup, SuiteTeardown, Setup, Teardown, Test} from './jest-decorators'

class App {
  public a = 0
  public b = 0
  public c = 0

  public incA() {
    this.a++
  }

  public incB() {
    this.b++
  }

  public incC() {
    this.c++
  }

  public zeroA() {
    this.a = 0
  }

  public zeroB() {
    this.b = 0
  }

  public zeroC() {
    this.c = 0
  }
}

@Suite
class AppTest {
  private app = new App()

  @SuiteSetup
  private suiteSetup() {
    this.app.incA()
  }

  @SuiteTeardown
  private suiteTeardown() {
    this.app.zeroA()
  }

  @Setup
  private setup() {
    this.app.incB()
    this.app.incC()
  }

  @Teardown
  private teardown() {
    this.app.zeroB()
  }

  @Test
  private test1() {
    expect(this.app.a).toBe(1)
    expect(this.app.b).toBe(1)
    expect(this.app.c).toBe(1)
  }

  @Test
  private test2() {
    expect(this.app.a).toBe(1)
    expect(this.app.b).toBe(1)
    expect(this.app.c).toBe(2)
  }

  @Test
  private test3() {
    expect(this.app.a).toBe(1)
    expect(this.app.b).toBe(1)
    expect(this.app.c).toBe(3)
  }
}

TestContainer.run()