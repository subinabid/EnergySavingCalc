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

lt_tariff = {}

ht_tariff = {
    kl: {
        tod: {
            normal: { start: 6, end: 18 },
            peak: { start: 18, end: 22 },
            offpeak: { start: 22, end: 6 },
            operator: "multiply",
        },
        ht_ia :{ // Industry
            dc: 405,
            edc: 1.5,
            ec: 6.15,
            normal: 1,
            peak: 1.5,
            offpeak: .75,
        },
        ht_ib: {  // IT
            dc: 410,
            edc: 1.5,
            ec: 6.60,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        ht_iia: {  // General
            dc: 440,
            edc: 1.5,
            ec: 6.05,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        ht_iib_lte30000: {  // General <= 30000
            dc: 525,
            edc: 1.5,
            ec: 6.80,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        ht_iib_gt30000: {  // General > 30000
            dc: 525,
            edc: 1.5,
            ec: 7.80,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        ht_iva_lte30000: {  // Commercial <= 30000
            dc: 500,
            edc: 1.5,
            ec: 6.80,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },   
        ht_iva_gt30000: {  // Commercial > 30000
            dc: 500,
            edc: 1.5,
            ec: 7.80,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        ht_ivb_lte30000: {  // Commercial <= 30000
            dc: 500,
            edc: 1.5,
            ec: 6.90,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },   
        ht_ivb_gt30000: {  // Commercial > 30000
            dc: 500,
            edc: 1.5,
            ec: 7.90,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        eht_66: { // Extra High Tension 66KV
            dc: 400,
            edc: 1.5,
            ec: 6.15,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        eht_110: { // Extra High Tension 110KV
            dc: 400,
            edc: 1.5,
            ec: 6.00,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
        eht_220: { // Extra High Tension 220KV
            dc: 400,
            edc: 1.5,
            ec: 5.40,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },    
    },

    ka_monsoon: { // July to November
        tod: {
            normal: { start: 6, end: 10 },
            peak: { start: 18, end: 22 },
            offpeak: { start: 22, end: 6 },
            operator: "add",
        },
        ht_iia: {  // Industrial
            dc: 350,
            edc: 1.5,
            ec: 7.40,
            normal: 0,
            peak: 0,
            offpeak: 0,
        },

    },
    ka_non_monsoon: { // December to June
        tod: {
            normal: { start: 6, end: 10 },
            peak: { start: 18, end: 22 },
            offpeak: { start: 22, end: 6 },
            operator: "add",
        },
        ht_iia: {  // Industrial
            dc: 350,
            edc: 1.5,
            ec: 7.40,
            normal: 0,
            peak: 1,
            offpeak: -1,
        },
    },

    tn: {
        tod: {
            normal: { start: 6, end: 10 },
            peak: { start: 18, end: 22 },
            offpeak: { start: 22, end: 6 },
            operator: "multiply",
        },
        ht_iia: {  // Industrial
            dc: 500,
            edc: 1.5,
            ec: 7.90,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
    },

    in: {
        tod: {
            normal: { start: 6, end: 10 },
            peak: { start: 18, end: 22 },
            offpeak: { start: 22, end: 6 },
            operator: "multiply",
        },
        ht_iia: {  // Industrial
            dc: 550,
            edc: 1.5,
            ec: 8.50,
            normal: 1,
            peak: 1.2,
            offpeak: .9,
        },
    },
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
        document.getElementById('result').style.display = 'block';
        document.getElementById('resultplaceholder').innerHTML = "Please fill all fields"; 
        return;
    }

    if (location == "ka") {
        if (new Date().getMonth() >= 6 && new Date().getMonth() <= 11) {
            tariff = ht_tariff['ka_monsoon']['ht_iia'];
        } else {
            tariff = ht_tariff['ka_non_monsoon']['ht_iia'];
        }
    } else {
        tariff = ht_tariff[location]['ht_iia'];
    }


    if (maxload < cd) {
        var cd_wastage = (cd - maxload) * tariff['dc'];
        var result_cd = "You are using less than your contracted demand and paying INR <p>" + cd_wastage + "</p> exrta every month. Consider reducig your contracted demand if this is a regular occurance";
    }
    else if (maxload > cd) {
        var penalty = (maxload - cd) * tariff['dc'] * tariff['edc'];
        var result_cd = "You are using more than your contracted demand and paying penalty of INR <p>" + penalty + "</p> every month. Consider increasing your contracted demand if this is a regular occurance";
    }
    else {
        var result_cd = "You are using exactly your contracted demand. Great job!";
    }

    var wastage = parseInt((usage * wastage_ref[industry] * tariff['ec']),10);
    var result_wastage = "Your wastage is estimated at INR <p>" + wastage + "</p> every month based on your industry. Consider reducing wastage by implementing energy efficient practices";
    var tariff_message = "Tariff used is as follows: <br> Fixed Cahrges: " + tariff['dc'] + "<br> Energy Charges: " + tariff['ec'];

    document.getElementById('result').style.display = 'block';
    document.getElementById('resultplaceholder').innerHTML = ""
    document.getElementById('resultplaceholder').innerHTML = result_cd + "<br>" + result_wastage + "<br><br>" + tariff_message;
}

function calculate_advanced() {
    // var price = document.getElementById('price').value;
    // var quantity = document.getElementById('quantity').value;
    // var discount = document.getElementById('discount').value;
    // var total = price * quantity - discount;
    document.getElementById('result').style.display = 'block';
    document.getElementById('resultplaceholder').innerHTML = "Output";
}
