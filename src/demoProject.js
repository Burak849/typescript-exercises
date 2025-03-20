// CALCULATOR
function calculateInvestment(data) {
    var initialAmount = data.initialAmount, annualCont = data.annualCont, expectedReturn = data.expectedReturn, duration = data.duration;
    if (initialAmount < 0) {
        return 'Initial inversment amout must be higher than zero.';
    }
    if (duration <= 0) {
        return 'No valid amount of years provided!';
    }
    if (expectedReturn <= 0) {
        return 'It must be higher than zero.';
    }
    var total = initialAmount;
    var totalCont = 0;
    var totalInterestEarned = 0;
    var annualResults = [];
    for (var i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn);
        totalInterestEarned = total - totalCont - initialAmount;
        totalCont = totalCont + annualCont;
        total = total + annualCont;
        annualResults.push({
            year: "Year ".concat(i + 1),
            totalAmount: total,
            totalInterestEarned: totalInterestEarned,
            totalCont: totalCont
        });
    }
    return annualResults;
}
function printResults(results) {
    if (typeof results === 'string') { // typeof let us to work in new type 
        console.log(results);
        return;
    }
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var yearEndResult = results_1[_i];
        console.log(yearEndResult.year);
        console.log("Total: ".concat(yearEndResult.totalAmount.toFixed(0)));
        console.log("Total Contributions: ".concat(yearEndResult.totalCont.toFixed(0)));
        console.log("Total Interest Earned: ".concat(yearEndResult.totalInterestEarned.toFixed(0)));
        console.log('**********');
    }
} // print (output) the result data
var investmentData = {
    initialAmount: 5000,
    annualCont: 500,
    expectedReturn: 0.08,
    duration: 10
};
var results = calculateInvestment(investmentData);
printResults(results);
