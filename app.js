//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(event){
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loader').style.display = 'block';

    //cal calculate results after 2 seconds
    setTimeout(calculateResults, 2000);

    event.preventDefault();
});

//calculate results function.
function calculateResults(){
    //variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payment.
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    //to check if its a finite number
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        //show results.
        document.getElementById('results').style.display = 'block';
        //hide the loader.
        document.getElementById('loader').style.display = 'none';
    }else{
        showError('please check your numbers');
    }
}

//function to show error.
function showError(error){
    //create a div
    const errorDiv = document.createElement('div');
    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add aclass
    errorDiv.className = 'alert alert-danger';
    //create text node and append div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above the heading.
    card.insertBefore(errorDiv, heading);
    //clear error after 3 seconds.
    setTimeout(clearError, 3000);
}
//function clear error.
function clearError(){
    document.querySelector('.alert').remove();
}