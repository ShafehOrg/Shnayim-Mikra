var heb = ("א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת");
var num = ("1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "200", "300", "400");
var thisSeferNum = Number
var currentSefer = ""
var currentParsha = ""

function hi() {
    $('#menu').html("");
    var sefer = $('#sefer').val() - 1;
    var perek = $('#perek').val() - 1;

    $('#hi').html(chumashText[sefer].heTitle + "<br>");
    $('#hi').append("פרק: " + Gematria(perek + 1) + "<br>");
    var chumash = chumashText[sefer].text[perek];
    var onkelos = onkelosText[sefer].text[perek];
    Object.keys(chumash).forEach(function(key, value) {
        $('#hi').append("<span class='pasukNum'>" + Gematria(Number(key) + 1) + ".</span> " +
            "<span class='chumashOne'>" + chumash[value] + "</span> " +
            "<span class='chumashTwo'>" + chumash[value] + "</span> " +
            "<span class='onkelosOne'>" + onkelos[value] + ":</span><br>");
    });
}

function makeSeforimList() {
    $('#menu').html("");
    for (var i in seforim) {
        $('#menu').append(`<li value="${i}">${seforim[i]}</li><br>`)
    }
    $('li').click(function() {
        currentSefer = $(this).html();
        (makeParshiosList(currentSefer));
        thisSeferNum = $(this).attr('value');
    });
}

function makeParshiosList(title) {
    $('#menu').html("");
    for (var i in parshios[title]) {
        $('#menu').append(`<li>${parshios[title][i]}</li><br>`)
    }
    $('li').click(function() {
        (txt($(this).html()));
    });
}

function txt(parshaPass) {
    //Right now its hardcoded to the first aliya
    var thisAliyaRange = aliyos[parshaPass][1];
    var startPerek = Number(parseInt(thisAliyaRange.split(' ')[0].split(':')[0], 10)) - 1;
    var startPasuk = Number(parseInt(thisAliyaRange.split(' ')[0].split(':')[1], 10)) - 1;
    var endPerek = Number(parseInt(thisAliyaRange.split(' ')[1].split(':')[0], 10)) - 1;
    var endPasuk = Number(parseInt(thisAliyaRange.split(' ')[1].split(':')[1], 10)) - 1;

    var PerekObj = chumashText[thisSeferNum].text[Number(startPerek)];
    var OnkelosPerekObj = onkelosText[thisSeferNum].text[Number(startPerek)];

    var txt = '';
    if (startPerek == endPerek) {
        while (startPasuk <= endPasuk) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + '. </span>' + PerekObj[startPasuk] + ' ' + PerekObj[startPasuk] + ' ' + OnkelosPerekObj[startPasuk] + ': <br>';
            startPasuk++;
        }
    } else {
        //  2 scenarios, never have more than 3 perokim in an aliya
        // 1:2 2:3
        // 1:2 3:5 <- include all of 2...
        //go through startperek from startpasuk until no more items
        while (PerekObj[startPasuk]) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + '. </span>' + PerekObj[startPasuk] + ' ' + PerekObj[startPasuk] + ' ' + OnkelosPerekObj[startPasuk] + ': <br>';
            startPasuk++;
        }
        if (startPerek + 1 < endPerek) {
            //go through whole middle perek
            startPerek++;
            startPasuk = 0;
            PerekObj = chumashText[thisSeferNum].text[Number(startPerek)];
            while (PerekObj[startPasuk]) {
                txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + '. </span>' + PerekObj[startPasuk] + ' ' + PerekObj[startPasuk] + ' ' + OnkelosPerekObj[startPasuk] + ': <br>';
                startPasuk++;
            }
        }
        //then go through endperek from 1 until endpasuk
        PerekObj = chumashText[thisSeferNum].text[Number(endPerek)];
        startPasuk = 0;
        while (startPasuk <= endPasuk) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + '. </span>' + PerekObj[startPasuk] + ' ' + PerekObj[startPasuk] + ' ' + OnkelosPerekObj[startPasuk] + ': <br>';
            startPasuk++;
        }
    }
    $('#menu').html("");
    $('#hi').html(txt);
}

//alert(Gematria(5555);
function Gematria(num, flag = 0) // Return Gimatria in Hebrew for the given number.
{

    num = Math.floor(num);

    if (num >= 1000)
        return Gematria(Math.floor(num / 1000)) + "'" + Gematria(num % 1000, 1);

    var a1 = Math.floor(num / 100);
    var a2 = Math.floor((num % 100) / 10);
    var a3 = num % 10;

    var s1 = ["", "ק", "ר", "ש", "ת", "תק", "תר", "תש", "תת", "תתק"];
    var s2 = ["", "י", "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ"];
    var s3 = ["", "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];

    var Gim = s1[a1] + s2[a2] + s3[a3];

    Gim = String(Gim).replace(/יה/g, 'טו').replace(/יו/g, 'טז');

    if (Gim.length > 1)
        Gim = Gim.slice(0, -1) + '"' + Gim.slice(-1);
    if ((Gim.length == 0 || Gim == "Na\"N") && flag == 0)
        Gim = (num == 0) ? "אפס" : "לא ניתן לחישוב"

    return Gim;
}

function recalculate() {
    $("#result").html(Gematria(Number($("input").val())));
}

$(document).ready(function() {
    $("input").change(function() { recalculate(); });
    $("#calculate").click(function() { recalculate(); });
});
recalculate();