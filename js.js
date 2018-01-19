var thisSeferNum = Number;
var currentSefer = "";
var currentParsha = "";
var txt = "";

function makeSeforimList() {
    $('#menu').html("");
    $('#hi').html("");
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
        //reset txt
        txt = "";

        //loop through aliyos
        var i = 1
        while (i <= 7) {
            (maketxt($(this).html(), i));
            i++
        }
    });
}

function maketxt(parshaPass, aliya) {
    //Right now its hardcoded to the first aliya
    var thisAliyaRange = aliyos[parshaPass][aliya];
    var startPerek = Number(parseInt(thisAliyaRange.split(' ')[0].split(':')[0], 10)) - 1;
    var startPasuk = Number(parseInt(thisAliyaRange.split(' ')[0].split(':')[1], 10)) - 1;
    var endPerek = Number(parseInt(thisAliyaRange.split(' ')[1].split(':')[0], 10)) - 1;
    var endPasuk = Number(parseInt(thisAliyaRange.split(' ')[1].split(':')[1], 10)) - 1;

    var PerekObj = chumashText[thisSeferNum].text[Number(startPerek)];
    var OnkelosPerekObj = onkelosText[thisSeferNum].text[Number(startPerek)];


    if (startPerek == endPerek) {
        while (startPasuk <= endPasuk) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + ". </span><span class='chumashOne'>" + PerekObj[startPasuk] + "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] + "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] + ":</span> <br><br>";
            startPasuk++;
        }
    } else {
        //  2 scenarios, never have more than 3 perokim in an aliya
        // 1:2 2:3
        // 1:2 3:5 <- include all of 2...
        //go through startperek from startpasuk until no more items
        while (PerekObj[startPasuk]) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + ". </span><span class='chumashOne'>" + PerekObj[startPasuk] + "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] + "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] + ":</span> <br><br>";
            startPasuk++;
        }
        if (startPerek + 1 < endPerek) {
            //go through whole middle perek
            startPerek++;
            startPasuk = 0;
            PerekObj = chumashText[thisSeferNum].text[Number(startPerek)];
            while (PerekObj[startPasuk]) {
                txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + ". </span><span class='chumashOne'>" + PerekObj[startPasuk] + "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] + "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] + ":</span> <br><br>";
                startPasuk++;
            }
        }
        //then go through endperek from 1 until endpasuk
        PerekObj = chumashText[thisSeferNum].text[Number(endPerek)];
        startPasuk = 0;
        while (startPasuk <= endPasuk) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) + ". </span><span class='chumashOne'>" + PerekObj[startPasuk] + "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] + "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] + ":</span> <br><br>";
            startPasuk++;
        }
    }
    $('#menu').html("");
    $('#hi').html(txt);
}

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
//Show menu innitially
makeSeforimList();


    $("input").change(function() { recalculate(); });
    $("#calculate").click(function() { recalculate(); });
});
recalculate();