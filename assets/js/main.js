function showDiv(option) {
    var divs = document.querySelectorAll('#calc-options > div');
    divs.forEach(div => {
        if (div.id === option) {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    });
}


tariff_kl = {
    zone1: 6.5,
    zone2: 7.5,
    zone3: 8.5,
}

tariff_ka = {
    zone1: 6.5,
    zone2: 7.5,
    zone3: 8.5,
}

tariff_tn = {
    zone1: 6.5,
    zone2: 7.5,
    zone3: 8.5,
}

tariff_in = {
    zone1: 6.5,
    zone2: 7.5,
    zone3: 8.5,
}

wastage_ref = {
    manufacturing: .25,
    technology: .07,
    healthcare: .12,
    education: .05,
    retail: .2
}


function calculate_easy() {
    var cd = parseInt(document.getElementById('contractdemand-easy').value, 10);
    var maxload = parseInt(document.getElementById('maxload-easy').value, 10);
    var usage = parseInt(document.getElementById('electricity-easy').value, 10);
    var industry = document.getElementById('industry-easy').value;
    var location = document.getElementById('location-easy').value;
    console.log(cd, maxload, usage, industry, location)

    if (cd == "" || maxload == "" | usage == "" || industry == "" || location == "") {
        output = "Please fill all fields";
        document.getElementById('result').style.display = 'block';
        document.getElementById('resultplaceholder').innerHTML = output;
        return;
    }

    if (maxload < cd) {
        var cd_wastage = (cd - maxload) * 125;
        var result_cd = "You are using less than your contracted demand and paying INR " + cd_wastage + " every month. Consider reducig your contracted demand if this is a regular occurance";
    }
    else if (maxload > cd) {
        var penalty = (maxload - cd) * 500;
        var result_cd = "You are using more than your contracted demand and paying penalty of INR " + penalty + " every month. Consider increasing your contracted demand if this is a regular occurance";
    }
    else {
        var result_cd = "You are using exactly your contracted demand. Great job!";
    }
    var wastage = "" + (usage * wastage_ref[industry] * tariff_in['zone1']);
    var result_wastage = "Your wastage is estimated at " + wastage + " INR every month based on your industry. Consider reducing wastage by implementing energy efficient practices";

    document.getElementById('result').style.display = 'block';
    document.getElementById('resultplaceholder').innerHTML = ""
    document.getElementById('resultplaceholder').innerHTML = result_cd + "<br>" + result_wastage;
}

function calculate_advanced() {
    // var price = document.getElementById('price').value;
    // var quantity = document.getElementById('quantity').value;
    // var discount = document.getElementById('discount').value;
    // var total = price * quantity - discount;
    document.getElementById('result').style.display = 'block';
    document.getElementById('resultplaceholder').innerHTML = "Output";
}
