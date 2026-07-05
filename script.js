/* ===========================
   KINNAREEMIMUS EXPLORER
=========================== */

const pages = document.querySelectorAll(".page");

let currentPage = 0;

function showPage(index){

pages.forEach(page=>{

page.classList.remove("active");

});

pages[index].classList.add("active");

window.scrollTo({

top:0,

behavior:"smooth"

});

updateProgress();

}

/* ===========================
NEXT PAGE
=========================== */

function nextPage(){

if(currentPage < pages.length-1){

currentPage++;

showPage(currentPage);

}

}

/* ===========================
PREVIOUS PAGE
=========================== */

function previousPage(){

if(currentPage>0){

currentPage--;

showPage(currentPage);

}

}

/* ===========================
PROGRESS BAR
=========================== */

function updateProgress(){

const progress=document.getElementById("progressBar");

const text=document.getElementById("progressText");

if(progress){

let percent=(currentPage/(pages.length-1))*100;

progress.style.width=percent+"%";

}

if(text){

if(currentPage==0){

text.innerHTML="INTRO";

}

else if(currentPage<=6){

text.innerHTML=`FIELD REPORT 0${currentPage} / 06`;

}

else if(currentPage==7){

text.innerHTML="FINAL EXAM";

}

else if(currentPage==8){

text.innerHTML="CERTIFICATE";

}

else{

text.innerHTML="REFERENCES";

}

}

}

showPage(0);

/* ===========================
MISSION ANSWER
=========================== */

let totalScore = 0;

const completedMission = {};

function answer(question, correct, button){

if(completedMission[question]) return;

completedMission[question]=true;

const box=button.parentElement;

const buttons=box.querySelectorAll("button");

buttons.forEach(btn=>{

btn.disabled=true;

});

if(correct){

button.classList.add("correct");

totalScore++;

}else{

button.classList.add("wrong");

buttons.forEach(btn=>{

if(btn.getAttribute("onclick")?.includes("true")){

btn.classList.add("correct");

}

});

}

const result=document.getElementById("result"+question);

if(result){

result.style.marginTop="20px";

result.style.fontSize="22px";

result.style.fontWeight="600";

result.innerHTML=correct ?

"✅ Correct! Excellent."

:

"❌ Incorrect! The correct answer is highlighted.";

}

const next=document.getElementById("next"+question);

if(next){

next.style.display="inline-block";

}

}

/* ===========================
INTERACTIVE ANATOMY
=========================== */

function showBody(part){

const bodyInfo=document.getElementById("bodyInfo");

if(!bodyInfo) return;

switch(part){

case "head":

bodyInfo.innerHTML=`

<h3>💀 Skull</h3>

<p>

กะโหลกศีรษะมีขนาดเล็กและมีจะงอยปาก

ช่วยให้จับอาหารได้อย่างรวดเร็ว

</p>

`;

break;

case "arm":

bodyInfo.innerHTML=`

<h3>🦴 Forelimb</h3>

<p>

ขาหน้ามีขนาดสั้นกว่าขาหลัง

ใช้ช่วยหยิบจับอาหารและทรงตัว

</p>

`;

break;

case "leg":

bodyInfo.innerHTML=`

<h3>🦵 Hindlimb</h3>

<p>

ขาหลังยาวและแข็งแรง

เป็นส่วนสำคัญที่ทำให้

Kinnareemimus

วิ่งได้เร็วกว่า 50 กิโลเมตรต่อชั่วโมง

</p>

`;

break;

case "tail":

bodyInfo.innerHTML=`

<h3>🦖 Tail</h3>

<p>

หางยาวช่วยรักษาสมดุล

ขณะวิ่งและเปลี่ยนทิศทางอย่างรวดเร็ว

</p>

`;

break;

}

}

/* ===========================
FINAL QUIZ
=========================== */

const quizData = [

{
question:"Kinnareemimus was discovered in which province?",
choices:[
"Chiang Mai",
"Khon Kaen",
"Phuket",
"Trang"
],
answer:1
},

{
question:"Kinnareemimus lived during which period?",
choices:[
"Jurassic",
"Triassic",
"Early Cretaceous",
"Cenozoic"
],
answer:2
},

{
question:"Which body part helped it run the fastest?",
choices:[
"Skull",
"Hindlimb",
"Tail",
"Forelimb"
],
answer:1
},

{
question:"Which group does Kinnareemimus belong to?",
choices:[
"Stegosauria",
"Ornithomimosauria",
"Ceratopsia",
"Ankylosauria"
],
answer:1
},

{
question:"Why is Kinnareemimus important?",
choices:[
"Medicine",
"Electricity",
"Evolution",
"Mining"
],
answer:2
}

];

let quizIndex=0;
let quizScore=0;

function startQuiz(){

quizIndex=0;
quizScore=0;

loadQuestion();

}

function loadQuestion(){

const box=document.getElementById("quizBox");

document.getElementById("questionNumber").innerHTML=quizIndex+1;

document.getElementById("score").innerHTML=quizScore;

const q=quizData[quizIndex];

let html=`

<h2 style="margin-bottom:30px;">

${q.question}

</h2>

<div class="choices">

`;

q.choices.forEach((choice,index)=>{

html+=`

<button

onclick="selectAnswer(${index})">

${choice}

</button>

`;

});

html+=`

</div>

`;

box.innerHTML=html;

}

function selectAnswer(choice){

if(choice===quizData[quizIndex].answer){

quizScore++;

}

document.getElementById("score").innerHTML=quizScore;

quizIndex++;

if(quizIndex<quizData.length){

loadQuestion();

}else{

finishQuiz();

}

}

/* ===========================
FINISH QUIZ
=========================== */

function finishQuiz(){

let rank="Junior Explorer";

if(quizScore==5){

rank="Master Explorer";

}else if(quizScore>=4){

rank="Senior Explorer";

}else if(quizScore>=3){

rank="Explorer";

}

document.getElementById("certificateScore").innerHTML=

quizScore+" / "+quizData.length;

document.getElementById("certificateRank").innerHTML=

rank;

const name=prompt("Enter your name for the certificate:");

if(name && name.trim()!=""){

document.getElementById("certificateName").innerHTML=name;

}

currentPage=8;

showPage(currentPage);

}

/* ===========================
START
=========================== */

window.onload=()=>{

showPage(0);

};