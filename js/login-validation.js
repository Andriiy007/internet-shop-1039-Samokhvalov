document.addEventListener('DOMContentLoaded', () => { 
var list=[];

var userName = document.querySelector('.user-box');

// function validate(){
//   var messEle=document.body.querySelector(".valMess")
//   var username=document.body.querySelector(".userbox").value
//   var password=document.body.querySelector(".password").value
  
//   if(username==="luke"&&password==="pass"){
//     messEle.innerHTML="Submitted"
//   }else{
//     messEle.innerHTML="username or password was incorrect"
//   }
// }

// document.body.querySelector(".validate").addEventListener("click", function(){
//   validate()
// })

// //Render the items for the list
// function renderItems(){
//   document.body.querySelector(".display").innerHTML="";
//   for(var i=0; i<list.length; i++){
//     var ele = document.createElement("div");
//     ele.innerHTML=list[i];
//     document.body.querySelector(".display").appendChild(ele);
//   }
// }

// //Submit The Items into the list
// function submit(){
//   var text=document.body.querySelector(".text").value;
//   if(text.legth!==1){
//     document.body.querySelector(".subMess").innerHTML=""
//     list.push(text);
//   }else
//     document.body.querySelector(".submit").innerHTML="Not Enought Letters"
//   renderItems();
// }
// document.body.querySelector(".submit").addEventListener("click", function(){
//   submit();
// });

// renderItems();
});