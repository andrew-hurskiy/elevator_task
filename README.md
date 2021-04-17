 ### Elevator
 # We are going to imitiate working elevator in example below
 We simulate behaviour of our elevator, using simple `console.log()` statements

## Imagine situation, which our elevator should handle.
Elevator stops at first floor as usual and there are some people waiting there.
Elevator can accept few of them (5 in our example).
Or if those people are too big, elevator should check for it's max weight restriction. In our case it's 400 kg.
(5 persons * 80 kg).
Our elevator does not stop at 2 floor and it's last floor is 30-th.
Also, we are superstisious about 13 floor, so we are not stopping there as well.

So, imagine there are 7 people waiting in lobby, but 1 of them wants to go to second floor and another one to 13.
In such case we should not accept those passengers,  informing them why and accept all the other.

Also our elevator has 1 feature. It can remind person to leave the elevator if it's his/her target floor.

## Task
As AQA, you have to deal with existed code. And it's quite hard thing to do. In order to examine your ability to work
with existed code, we have prepared this task.

What we have done is we have removed some peaces of code from program, so you have to insert those peaces yourself.
We have left comments in those places, where code should be places.
Final program should run without errors. You can run it like that: `node elevator.js` from terminal.
And it should produce output similiar to one, you can see in `expected_output.txt` file.

## Extra
1. How would you improve this program?
2. What do you want to change and how?