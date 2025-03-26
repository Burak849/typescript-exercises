// CALCULATOR
function calculateInvestment(data) {
    const { initialAmount, annualCont, expectedReturn, duration } = data;
    if (initialAmount < 0) {
        return 'Initial inversment amout must be higher than zero.';
    }
    if (duration <= 0) {
        return 'No valid amount of years provided!';
    }
    if (expectedReturn <= 0) {
        return 'It must be higher than zero.';
    }
    let total = initialAmount;
    let totalCont = 0;
    let totalInterestEarned = 0;
    const annualResults = [];
    for (let i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn);
        totalInterestEarned = total - totalCont - initialAmount;
        totalCont = totalCont + annualCont;
        total = total + annualCont;
        annualResults.push({
            year: `Year ${i + 1}`,
            totalAmount: total,
            totalInterestEarned,
            totalCont
        });
    }
    return annualResults;
}
function printResults(results) {
    if (typeof results === 'string') { // typeof let us to work in new type 
        console.log(results);
        return;
    }
    for (const yearEndResult of results) {
        console.log(yearEndResult.year);
        console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
        console.log(`Total Contributions: ${yearEndResult.totalCont.toFixed(0)}`);
        console.log(`Total Interest Earned: ${yearEndResult.totalInterestEarned.toFixed(0)}`);
        console.log('**********');
    }
} // print (output) the result data
const investmentData = {
    initialAmount: 5000,
    annualCont: 500,
    expectedReturn: 0.08,
    duration: 10
};
const results = calculateInvestment(investmentData);
printResults(results);
export {};
// node src/demoProject.js to see the result
//# sourceMappingURL=demoProject.js.map