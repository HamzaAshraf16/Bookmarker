 var bookmarkName = document.getElementById("bookmarkName");

 var bookmarkURL = document.getElementById("bookmarkURL");

 var mybtn=document.getElementById("mybtn");

 var closeBtn=document.getElementById("closeBtn");

 var mybody =  document.getElementById("mybody");

 var error=document.getElementById("error")

 var bookmarklist;


 
 
 
 if(localStorage.getItem("bookmark")){

   bookmarklist=JSON.parse(localStorage.getItem("bookmark"));
   displayBookmark(bookmarklist);


 }else{
   bookmarklist=[];
 }


 function addbookmark(){
      if(bookmarkNameValidation() && bookmarkUrlValidation()){
         var bookmark={
            name: bookmarkName.value,
            url : bookmarkURL.value
        }
        closebtn();
        bookmarklist.push(bookmark);

      }else{
         error.classList.replace("d-none","d-block");

      }
      clearformInput();
      savetoStorage();
      displayBookmark(bookmarklist); 
}


function closebtn(){
   error.classList.replace("d-block","d-none");

}

 function clearformInput(){

   bookmarkName.value="";
   bookmarkURL .value="";
   
 }



 function displayBookmark(plist){
    var cartoon="";
    for(var i =0; i<plist.length;i++){
        cartoon +=`<tr>
        <td>${i+1}</td>
        <td>${plist[i].name}</td>
        <td><button  class="btn btn-warning"><a href="${plist[i].url}" target="_blank" class="url"><i class="fa-solid fa-eye" style="color: #ffffff;"></i> Visit</a></button></td>
        <td><button onclick="deleteElement(${i})" class="btn btn-danger"><i class="fa-regular fa-trash-can" style="color: #fefbfb;"></i> Delete</button></td>

    </tr>`

    }
    mybody.innerHTML=cartoon
 }

 function deleteElement(index) { 
    bookmarklist.splice(index,1);
    savetoStorage();
    displayBookmark(bookmarklist);
 }

 function savetoStorage(){
    localStorage.setItem("bookmark",JSON.stringify(bookmarklist));

 }

 


 


 function bookmarkNameValidation(){
   var regex=/^[A-Z][a-zA-Z0-9]{2,}$/;
   if (regex.test(bookmarkName.value)===true) {
      bookmarkName.classList.add("is-valid");
      bookmarkName.classList.remove("is-invalid");
      return true;
   }else{
      bookmarkName.classList.add("is-invalid");
      bookmarkName.classList.remove("is-valid");

      return false;
   }
 }

 function bookmarkUrlValidation(){
   var regex=/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
   if(regex.test(bookmarkURL.value)===true){
      bookmarkURL.classList.add("is-valid");
      bookmarkURL.classList.remove("is-invalid");
      return true;
   }else{
      bookmarkURL.classList.add("is-invalid");
      bookmarkURL.classList.remove("is-valid");
   }
 }