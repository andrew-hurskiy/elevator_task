function getRandomFloor() {
    const MAX_FLOOR = 30
    const MIN_FLOOR = 2
    return Math.floor(Math.random() * (MAX_FLOOR - MIN_FLOOR + 1)) + MIN_FLOOR
}

function getRandomWeight(){
    const MIN_NORMAL_WEIGHT = 45
    const MAX_NORMAL_WEIGHT = 100
    return Math.floor(Math.random() * (MAX_NORMAL_WEIGHT - MIN_NORMAL_WEIGHT + 1)) + MIN_NORMAL_WEIGHT
}

class Person {
    
    constructor(
        name='John',
        weight=getRandomWeight(),
        targetFloor=getRandomFloor(),
        needReminder=false
    ) {
        this.name = name
        this.weight = weight
        this.targetFloor = targetFloor
        this.needReminder = needReminder
    }

    enterElevator(){
        console.log(`My name: ${this.name}  and weight: ${this.weight} and target floor is ${this.targetFloor} floor.`)
    }

    leaveElevator(currentFloor){
        console.log(`My name is ${this.name} and my weight is ${this.weight} and I am leaving elevator on ${currentFloor}-th floor.`)
    }
}

export default Person;