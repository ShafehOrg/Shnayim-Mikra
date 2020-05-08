var thisSeferNum = Number;
var currentSefer = "";
var currentParsha = "";
var txt = "";

$(document).ready(function() {
//Show current Parsha Initially
    displayCurrentParsha();  
  
    $("input").change(function() {
      recalculate();
    });
    
    $("#calculate").click(function() {
      recalculate(); 
    });
});

recalculate();

function makeSeforimList() {
    $('#menu').html("");
    $('#textView').html("");
    $('.menuButton').hide();

    $('#menu').append(`<li id="currentParsha">${parshaForDate()}</li><br><br><br>`)

    for (var i in seforim) {
        $('#menu').append(`<li id="seforim" value="${i}">${seforim[i]}</li><br>`)
    }
    $('li#currentParsha').click(function() {
        //reset txt
        txt = "";
        var counter = 0;
        for (var k in parshios) {
            for ( var j in parshios[k]) {
              var tempparsha = parshios[k][j]
              if (tempparsha == $(this).html()) {
                thisSeferNum = counter;
              }
            }
            counter ++;
          }          

        //loop through aliyos
        var i = 1
        while (i <= 7) {
            (maketxt($(this).html(), i));
            i++
        }

    });
    $('li#seforim').click(function() {
        currentSefer = $(this).html();
        (makeParshiosList(currentSefer));
        thisSeferNum = $(this).attr('value');
    });
    
    scrollToTop()
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
    
    scrollToTop()
}

var aliyahHebText = ["", "ראשון","שני","שלישי","רביעי","חמישי","שישי","שביעי","מפטיר"];

function maketxt(parshaPass, aliya) {
   
    //Right now its hardcoded to the whole parsha
    var thisAliyaRange = aliyos[parshaPass][aliya];
    var startPerek = Number(parseInt(thisAliyaRange.split(' ')[0].split(':')[0], 10)) - 1;
    var startPasuk = Number(parseInt(thisAliyaRange.split(' ')[0].split(':')[1], 10)) - 1;
    var endPerek = Number(parseInt(thisAliyaRange.split(' ')[1].split(':')[0], 10)) - 1;
    var endPasuk = Number(parseInt(thisAliyaRange.split(' ')[1].split(':')[1], 10)) - 1;

    var PerekObj = chumashText[thisSeferNum].text[Number(startPerek)];
    var OnkelosPerekObj = onkelosText[thisSeferNum].text[Number(startPerek)];
console.log(PerekObj)
console.log(OnkelosPerekObj)

    //Display the Aliyah Hebrew name:
    txt += "<span class='aliyahNum'>" + aliyahHebText[aliya] + "<br></span>"

    if (startPerek == endPerek) {
        
        //first display perek number
        if (startPasuk == 0) {txt += "<span class='perekNum'>פרק " + Gematria(Number(startPerek + 1)) + "<br></span>"}
        while (startPasuk <= endPasuk) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) +
             ". </span><span class='chumashOne'>" + PerekObj[startPasuk] +
              "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] +
               "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] +
                ":</span> <br><br>";
            startPasuk++;
        }
    } else {
        //  2 scenarios, never have more than 3 perokim in an aliya
        // 1:2 2:3
        // 1:2 3:5 <- include all of 2...
        //go through startperek from startpasuk until no more items

        //first display perek number
        if (startPasuk == 0) {txt += "<span class='perekNum'>פרק " + Gematria(Number(startPerek + 1)) + "<br></span>"}
        while (PerekObj[startPasuk]) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) +
             ". </span><span class='chumashOne'>" + PerekObj[startPasuk] +
              "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] +
               "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] +
                ":</span> <br><br>";
            startPasuk++;
        }
        if (startPerek + 1 < endPerek) {
            //go through whole middle perek
            startPerek++;
            startPasuk = 0;
            if (startPasuk == 0) {txt += "<span class='perekNum'>פרק " + Gematria(Number(startPerek + 1)) + "<br></span>"}
            PerekObj = chumashText[thisSeferNum].text[Number(startPerek)];
            while (PerekObj[startPasuk]) {
                txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) +
                 ". </span><span class='chumashOne'>" + PerekObj[startPasuk] +
                  "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] +
                   "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] +
                    ":</span> <br><br>";
                startPasuk++;
            }
        }
        //then go through endperek from 1 until endpasuk
        PerekObj = chumashText[thisSeferNum].text[Number(endPerek)];
        OnkelosPerekObj = onkelosText[thisSeferNum].text[Number(endPerek)];

        startPasuk = 0;
        
        //first display perek number
        if (startPasuk == 0) {txt += "<span class='perekNum'>פרק " + Gematria(Number(startPerek + 1)) + "<br></span>"}
        while (startPasuk <= endPasuk) {
            txt += "<span class='pasukNum'>" + Gematria(Number(startPasuk + 1)) +
             ". </span><span class='chumashOne'>" + PerekObj[startPasuk] +
              "</span><br> <span class='chumashTwo'>" + PerekObj[startPasuk] +
               "</span><br> <span class='onkelosOne'>" + OnkelosPerekObj[startPasuk] +
                ":</span> <br><br>";
            startPasuk++;
        }
    }
    $('#menu').html("");
    $('.menuButton').show();
    $('#textView').html(fixShinSin(txt));
    
    scrollToTop()
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

function scrollToTop() {
    window.scrollTo(0, 0);
}

function recalculate() {
    $("#result").html(Gematria(Number($("input").val())));
}



function fixShinSin(s) {
  var re = /ש([ׁ |-ׂ]{1})([֑-ׇ]{1,})/g;
  var newstr = s.replace(re, 'ש$2$1');
  return newstr
}

function parshaForDate(date) {
    var lastDate,
        nextDate,
        currentParsha,
        today;

    if (date != null) {
        today = date;
    } else {
        today = new Date();
    }


    for (var item in parshaCal) {
        var d = Object.keys(parshaCal[item]);
        var p = Object.values(parshaCal[item]);

        nextDate = new Date(d);
        if (today > lastDate && today < nextDate ){
            currentParsha = p[0]
        }
        
        lastDate = nextDate
    }
    if (currentParsha != null) {
        return currentParsha;
    } else {
        return "Error finding Parsha for this date."
    }
}

function displayCurrentParsha() {
  var cp = parshaForDate();
          var counter = 0;
        for (var k in parshios) {
            for ( var j in parshios[k]) {
              var tempparsha = parshios[k][j]
              if (tempparsha == cp) {
                thisSeferNum = counter;
                
              }
            }
            counter ++;

          }          
  
  var i = 1
    while (i <= 7) {
      maketxt(parshaForDate(), i);
      i++;
    }
}

function makeAliyaList() {
    $('#menu').html("");
    
    scrollToTop();
  
    for (var i in aliyahHebText) {
       if (i == 0 || i == 8) { continue; }
       $('#menu').append(`<li class="aliya">${aliyahHebText[i]}</li><br>`)
      
     }
    $(".aliya").click(function() {
      scrollToAliyah(
        $(this).html()
      ) 
    });
 }
  
    

function scrollToAliyah(n) {
  $('#menu').html("");
  $('#textView').html($('#textView').html().replace('<div id="imhere"></div>', ''));
  $('#textView').html($('#textView').html().replace(n, '<div id="imhere"></div>'+ n));
  $('html,body').animate({scrollTop: $('#imhere').offset().top - 50 }, 500);
}