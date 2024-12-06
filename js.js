$(document).ready(function() {
  const words = {
    beginner: [
      {en: "apple", uk: "яблуко"},
      {en: "dog", uk: "собака"},
      {en: "house", uk: "дім"},
      {en: "cat", uk: "кіт"}
    ],
    intermediate: [
      {en: "freedom", uk: "свобода"},
      {en: "adventure", uk: "пригода"},
      {en: "loyalty", uk: "вірність"},
      {en: "wisdom", uk: "мудрість"},
      {en: "honesty", uk: "чесність"},
      {en: "courage", uk: "хоробрість"},
      {en: "ambition", uk: "амбіція"},
      {en: "compassion", uk: "співчуття"},
      {en: "creativity", uk: "креативність"},
      {en: "confidence", uk: "упевненість"},
      {en: "patience", uk: "терпіння"}
    ],
    advanced: [
      {en: "obsession", uk: "одержимість"},
      {en: "eternity", uk: "вічність"},
      {en: "talkative", uk: "говіркий"},
      {en: "happiness", uk: "щастя"},
      {en: "metamorphosis", uk: "метаморфоза"},
      {en: "serendipity", uk: "серендипність"},
      {en: "melancholy", uk: "меланхолія"},
      {en: "ephemeral", uk: "ефемерний"},
      {en: "catharsis", uk: "катарсис"},
      {en: "nostalgia", uk: "ностальгія"},
      {en: "dystopia", uk: "дистопія"},
      {en: "inexorable", uk: "непохитний"}
    ]
  };
  
  let level = "beginner"; 
  let array = words[level].sort(() => 0.7 - Math.random());
  let Ind = 0;
  let right = 0;
  let incorrect = 0;


  $("input[name='level']").change(function() {
    level = $(this).val();
    array = words[level].sort(() => 0.7 - Math.random());
    Ind = 0;
    right = 0;
    incorrect = 0;
    updating();
  });

  function updating() {
    $("#words").text(array[Ind].en); 
    $("#number").text(Ind + 1); 
    $("#all").text(array.length); 
    $("#correctly").text(right); 
    $("#wrongly").text(incorrect); 
    $("#write").val(""); 
  }

  $("#check").click(function() {
    const answer = $("#write").val().trim().toLowerCase();
    const correct = array[Ind].uk.toLowerCase();
    if (answer === correct) {
      right++;
    } else {
      incorrect++;
    }
    Ind++;
    if (Ind < array.length) {
      updating();
    } else {
      result();
    }
  });


  $("#write").keypress(function(event) {
    if (event.which === 13) { 
      $("#check").click(); 
    }
  });


  function result() {
    const score = (right / array.length) * 100;
    let sms = `Your level is: ${score.toFixed(1)}%`;
    if (score >= 85) {
      sms += " C1 level";
    } else if (score >= 60) {
      sms += " B2 level";
    } else {
      sms += " B1 level. Take more extra lessons";
    }
    $(".content").prepend(`<p>${sms}</p>`);
    $("#modalw").fadeIn();
  }


  $("#close").click(function() {
    $("#modalw").fadeOut();
  });


  $("#reset").click(function() {
    Ind = 0;
    right = 0;
    incorrect = 0;
    array = words[level].sort(() => 0.7 - Math.random());
    updating();
    $("#modalw").fadeOut();
  });


  $("#next").click(function() {
    if (Ind < array.length - 1) {
      Ind++;
      updating();
    }
  });


  $("#prev").click(function() {
    if (Ind > 0) {
      Ind--;
      updating();
    }
  });

  updating();
});
