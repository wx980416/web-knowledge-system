class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this._name = 'Person'
  }
  say() {
    console.log('Hello')
  }

  get getName() {
    return this._name
  }

  set setName(name) {
    this._name = name
  }

  static staticSay() {
    console.log('Hello')
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age)

    this.sno = sno
  }

  say() {
    super.say()
    console.log('Hello Status')
  }
}
var p1 = new Student('wx', 23, 111)
p1.say()
Student.staticSay()
