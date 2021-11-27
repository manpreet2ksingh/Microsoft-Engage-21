// var date = new Date();
// date.setDate(date.getDate() + 1);

var d = new Date('2021-11-23 23:25')
console.log(d)

// console.log(date);

// var today = new Date();
//     var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     currentTime = new Date("01-01-1970 "+currentTime)

//     var nextDayTime = new Date("01-01-1970 "+"0:00:00");

//     var day = new Date().getDay();
    
//     if(currentTime >= nextDayTime)
//     {
//         day = day - 1;
//         day = (day+7)%7;
//     }

//     console.log(day);

// console.log(Math.trunc(9/24))

var minutesToAdd=30;
var currentDate = new Date();
var futureDate = new Date(currentDate.getTime() + minutesToAdd*60000);

console.log(typeof currentDate)

console.log(futureDate.getHours(), futureDate.getMinutes())

var todaysDate= new Date()
 todaysDate = todaysDate.toISOString().split('T')[0]

console.log("todays ",todaysDate)