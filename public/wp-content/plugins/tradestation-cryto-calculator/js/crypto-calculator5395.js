setTimeout(function(){
    const calculateButton   = document.getElementById('crypto-calculate');
    const currencySelect    = document.getElementById('crypto-currency-select');

    if(typeof(calculateButton) != 'undefined' && calculateButton != null){
        calculateButton.addEventListener('click', function(){
            calculate();
        });
        
        calculate();
    }

    if(typeof(currencySelect) != 'undefined' && currencySelect != null){
        currencySelect.addEventListener('change', function(){
            var rate            = this.value, 
                currency        = this.options[this.selectedIndex].getAttribute('data-currency'),
                currencyName    = this.options[this.selectedIndex].getAttribute('data-name');
                svgFile         = crypto_data.plugin_url + currency + '.svg';
                symbolImage     = document.getElementsByClassName('crypto-symbol');
            document.getElementById('rate').value = rate;
            document.getElementById('rate-label').innerHTML             = currency + " Interest Rate: ";
            document.getElementById('amount-label').innerHTML           = currency + " Amount: ";
            //
            document.getElementById('cypto-amout-text').innerHTML       = "Total " + currency + " Amount";
            document.getElementById('cypto-interest-text').innerHTML    = currency + " Interest Earned";
            document.getElementById('amount-crypto').innerHTML          = currency;
            //
            symbolImage[0].setAttribute('src', svgFile);
            symbolImage[1].setAttribute('src', svgFile);
            symbolImage[0].style.display = 'inline-block'
            symbolImage[1].style.display = 'inline-block';
            calculate();
        });
    }

}, 1000);

function calculate(){
    p = document.getElementById("amount").value;
    f = parseFloat(p.replace(/,/g, '')); // remove commas
    n = document.getElementById("compounding").value; // no. of compoundings per year
    t = document.getElementById("years").value; // no. of years
    r = document.getElementById("rate").value;

    // The equation to calculate compound interest
    A = (f * Math.pow((1 + (r / (n * 100))), (n * t)));
    if(!isNaN(A)){
        document.getElementById('cypto-total').innerHTML        = A.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        document.getElementById('cypto-interest').innerHTML     = ((A.toFixed(2) - f).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}