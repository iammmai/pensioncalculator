const startingAge = 22
const currentAge = 40
const annualSalary = 40000
const avgSalaryWest = 37873

const currentEntgeldpkt = annualSalary/avgSalaryWest

const isbefore = (n, currentAge) =>  n < currentAge

// need to fix, need to decrease from the current age and increase from the current age
// in the current function you start calculting from the age you started working with the curent salary
const getEntgeldpkt = (age, acc, x) =>  {
    if (age === 67){
        return acc
    } else {
        if (isbefore(age, currentAge)){
            x = x - x*0.01
        } else {
            x = x + x*0.01
        }
        age++
        getEntgeldpkt(age, acc + x, x)
    }
}

const entgeldpktBefore = (age, acc, x) =>  {
        if (age === startingAge){
            return acc
        } else {   
            x = x - x*0.01
            age--
            entgeldpktBefore(age, acc + x, x)
        }
    }
    

const entgeldpktAfter = (age, acc, x) =>  {
        if (age === 67){
            return acc
        } else {   
            x = x + x*0.01
            age++
            entgeldpktBefore(age, acc + x, x)
        }
    }
    

const getTotalEntgeldpkt = 
entgeldpktAfter(currentAge, entgeldpktBefore(currentAge, currentEntgeldpkt, currentEntgeldpkt),currentEntgeldpkt )


console.log(entgeldpktAfter(currentAge, 0, currentEntgeldpkt))
console.log(getTotalEntgeldpkt)