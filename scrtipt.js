 // variables

 var count = 0;
 var time = 60;
 var marks = 0;
 var answer = [];
 var timer;


// main ready function  

$(document).ready(function(){
  $('#finish').hide();
  $('#Result').hide();

  buttons_manager()

// create function

 function buttons_manager(){
  if(count > 0){
      $('#prev').show();
      if(count == 5){
          $('#next').hide();
          $('#finish').show();
      }
      else{
          $('#next').show();
      }
  }
  else{
      $('#prev').hide();
  }
 }

 //  create question function
 function adding_Questions(data,i){
  $('#question').text(data[i].Quiz)
  $('#options1').text(data[i].option1)
  $('#options2').text(data[i].option2)
  $('#options3').text(data[i].option3)
  $('#options4').text(data[i].option4)
  $('#number').text(Number(i+1));
 }

 // answer selection function

 function selected_answer(){
  for(var i = 0 ; i<5; i++){
      var a = document.getElementById("options").children;
      if(a[i].innerHTML == answer[count]){
          $('#options').children("button")[i].classList.add("active");
      }
      else{
          $('#options').children("button")[i].classList.remove("active");
      }
  }
 }

 function creating_result(data){
  for(var i = 0 ; i<answer.length; i++){
      marks +=1.5;
  }
  $('#main').hide();

  $("marks").text(marks);
  $("#correct-answer").text(marks / 6);
  $('#correct-answer').text((marks / 9)* 100 + "%");

  $('#Result').show();

}
$('#options').hide();

// Attach API

fetch('data.json')
.then(function(response){
  return response.json();
})
.then(function(data){
  $('#btn').click(function(){
      $('#options').show();
      adding_Questions(data.Questions,count);
      $('.start_page').hide();
      $('#prev').hide();

      timer = setInterval(timer_function , 1000);

      function timer_function(){
          $('#time').text(time);
          if(time < 1){
              clearInterval(timer);
              alert("out of time");
              creating_result(data);
              $('#main').hide();
              $('#result').show();
          }
          time--;
          
      }
  });
  // select option

  $(".option").click(function(){

      $(this).addClass("active");
      $(this).siblings().removeClass("active");
      answer[count] = $(this).html();
  });
  
  // next question

  $('#next').click(function (){
      if(count > answer.length -1){
          alert("Select Atleast one option")
      }
      else{
          count++;
          adding_Questions(data.Questions,count);
          $('#prev').show();
          $('.option').removeClass("active");
          buttons_manager();
          selected_answer();
      }
  });

  // previous questions

  $('#prev').click(function(){
      count--;
      adding_Questions(data.Questions,count);
      buttons_manager();
      selected_answer();
  });

  // finish quiz
  $("#finish").click(function() {
      if(count > answer.length -1){
          alert("Select Atleast one option");
      }
      else{
          creating_result(data);
          clearInterval(timer);

      }
  });
})
})


