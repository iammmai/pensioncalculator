const person = {}

const run = () => {
    const person = {
        currentAge : parseFloat(document.getElementById("currentAge").value),
        startingAge : parseFloat(document.getElementById("startingAge").value),
        annualSalary : parseFloat(document.getElementById("annualSalary").value),
        netSalary : parseFloat(document.getElementById("netSalary").value),
        home : document.getElementById("home").value,
        pensionAge: 67,
        taxClass: 1,
        churchTaxRate: 0,
        zugangsFaktor: 1,
        pensionType: 1
    }
    const container = document.getElementById("result").innerHTML = "Your pension gap is " + getPensionGap(person) + " Euro"
   
}

const insuranceRate = {
    health: 0.083,
    care: 0.0255
}

const tax = {
    soli: 0.055,
    income: 0.08
}

const salaryDevelopment = 0.01
const avgSalary = 37873
const eastGermanyMultiplier = 1.1248

/*calculate the monthly net salary. Net salary in Germany is calculated by deducting tax and insurance from the gross salary. 
The amount of tax is defined by the tax class. Insruance includes insurance for unemployment, public health, care and prension. Tax encompasses salary tax, soli and churchtax
For simplicity we have the user input their net salary
*/

// calculate the current Entgeldpunkte for the current year
const getCurrentEntgeldpkt = (person) => {
    if (person.home === "East") {
        return person.annualSalary * eastGermanyMultiplier / avgSalary
    } else {
        return person.annualSalary / avgSalary
    }
}

// calculate the sum Entgeldpunkte for the years since when user started to work until now
const entgeldpktBefore = (age, acc, x, startingAge) =>  {
        if (age === startingAge){
            return acc
        } else {   
            x = x - x * salaryDevelopment
            age--
            return entgeldpktBefore(age, acc + x, x, startingAge)
        }
    }
    
// calculate the sum of Entgeldpunkte for the years from now until pension age   
const entgeldpktAfter = (age, acc, x, pensionAge) =>  {
        if (age === pensionAge){
            return acc
        } else {   
            x = x + x * salaryDevelopment
            age++
            return entgeldpktAfter(age, acc + x, x, pensionAge)
        }
    }

// caclulate the monthly pension
const getPensionValue = person => {
    if (person.home === "East") {
        return 30.69
    } else {
        return 32.03
    }
}

const monthlytNetPension = gross => {
    const h = gross * insuranceRate.health
    const c = gross * insuranceRate.care
    const s = gross * tax.soli
    const i = gross * tax.income
    return gross-h -c -s -i
}

// Now let's calculate everything
const getPensionGap = (person) => {
    const currentEntgeldpkt = getCurrentEntgeldpkt(person)
    const sumEntgeldpktBefore = entgeldpktBefore(person.currentAge, currentEntgeldpkt, currentEntgeldpkt, person.startingAge)
    const totalEntgeldpkt = 
    entgeldpktAfter(person.currentAge, sumEntgeldpktBefore ,currentEntgeldpkt, person.pensionAge )
    const pensionValue = getPensionValue(person)
    const monthlyGrossPension = totalEntgeldpkt * pensionValue * person.zugangsFaktor * person.pensionType
    const pensiongap = Math.round(person.netSalary/12 - monthlytNetPension(monthlyGrossPension))
    return pensiongap
}
