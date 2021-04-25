import Person from './person.js';

export let normalPassengers = [
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person()
]

export let bigPassengers = [
    new Person('Tom', 150, 15, false),
    new Person('Jim', 150, 29, false),
    new Person('Linda', 150, 2, false)
]

export let passengersThatNeedReminders = [
    new Person('Petia', 80, 2, true),
    new Person('Vasya', 79, 8, true),
    new Person('John', 76, 23, true),
    new Person('Carter', 76, 25, true),
    new Person('Daniel', 76, 27, true)
]

export let edgeFloorsPassengers = [
    new Person('Petia', 60, 1, false),
    new Person('Vasya', 60, 2, true),
    new Person('John', 60, 30, false),
    new Person('Carter', 60, 13, true),
    new Person('Daniel', 60, 31, false)
]

export let tooManyPassengers = [
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
    new Person(),
]