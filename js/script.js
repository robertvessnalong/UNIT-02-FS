/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
   Global Variables
***/

const studentItem = document.querySelectorAll(".student-item");
const maxPage = 10; //Max Items Per Page
const studentArray = Array.from(studentItem);

//Variables for appendPageLinks Function
const paginationDiv = document.createElement("div"); //Creating Pagination Div
const pageContainer = document.querySelector(".page"); //Selecting Page Element
paginationDiv.classList.add("pagination"); //Add "Pagination" Class
pageContainer.appendChild(paginationDiv); //Append DIV to Page
const ul = document.createElement("ul"); //Create UL for Pagination
paginationDiv.appendChild(ul); //Append UL to Pagination
//Variables for displayMessage Function
const message = document.createElement("div"); //Create Message Div
message.classList.add("message"); //Add Class to Message
const studentList = document.querySelector(".student-list"); //Select Student List Container
studentList.prepend(message); //Prepend Student List

/*** 
   showPage Function
***/

function showPage(list, page) {
  const start = page * maxPage - maxPage; //Start of Container on Display
  const end = page * maxPage; // End of Containers on Display
  list.forEach((item, index) => {
    //Check if the index of student is greater than the start and less than the end
    if (index >= start && index < end) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

showPage(studentItem, 1); // 1 is Page One

/*** 
   appendPageLinks Function
***/

function appendPageLinks(list) {
  //Round Pagination Links Up
  const listPerPage = Math.ceil(list.length / maxPage);

  //Loop for Generating li with numbers
  for (let i = 0; i < listPerPage; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    ul.append(li);
    li.append(a);
    a.href = "#";
    a.innerHTML = i + 1;
    //Event Handler to Call Show Page Function
    a.addEventListener("click", (e) => {
      const htmlValue = a.innerHTML;
      showPage(studentItem, htmlValue);
    });
  }
  //Calling ActiveLinks Function
  activeLinks();
}

appendPageLinks(studentArray);

/*** 
   activeLinks Function
***/

function activeLinks() {
  //Select All A Links
  const aLinks = document.querySelectorAll("a");
  //First Active Link
  aLinks[0].classList.add("active");
  //Removing Active Class and Adding Class to Target
  aLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      aLinks.forEach((activeClass) => {
        activeClass.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });
}

/*** 
   filterPagination Function
***/
function filterPagination() {
  //Creating Empty Array for Filtered Students
  const filteredList = [];
  //Grab Filtered Students and Then Push to New Array Based on Display
  studentItem.forEach((student) => {
    if (student.style.display === "block") {
      filteredList.push(student);
    }
  });
  //Calling Show Page and Links Again
  showPage(filteredList, 1);
  appendPageLinks(filteredList);
}

/*** 
   displayMessage Function
***/

function displayMessage() {
  //Check if every student is display "None"
  studentArray.every((student) => {
    if (student.style.display === "none") {
      return (message.innerHTML = `
           <h2>Sorry, no matches were found.</h2>
         `);
      //Don't do anything
    } else if (student.style.display === "block") {
      return (message.innerHTML = "");
    }
  });
}

/*** 
   Student Search Bar Function
***/

function searchBar() {
  //Grab Page Header
  const pageHeader = document.querySelector(".page-header");
  //Create Input
  const input = document.createElement("input");
  //Created Search Div
  const searchDiv = document.createElement("div");
  //Create Button
  const btn = document.createElement("button");
  //Append Search Div
  pageHeader.appendChild(searchDiv);
  //Add Class "student-search"
  searchDiv.classList.add("student-search");
  //Append Input
  searchDiv.appendChild(input);
  //PlaceHolder
  input.placeholder = "Search for students...";
  //Append Button
  searchDiv.appendChild(btn);
  btn.innerHTML = "Search";
  //Set to pointer for Button
  btn.style.cursor = "pointer";

  //Search DIV Event Listener, compare h3 to input value
  searchDiv.addEventListener("keyup", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const studentDetails = document.querySelectorAll(".student-details h3");
    studentDetails.forEach((student) => {
      const h3 = student.textContent;
      if (h3.includes(searchValue)) {
        student.parentNode.parentNode.style.display = "block";
      } else {
        student.parentNode.parentNode.style.display = "none";
      }
    });

    studentArray.every(displayMessage);
    ul.innerHTML = "";
    filterPagination();
  });

  //Button Event Listener
  btn.addEventListener("click", (e) => {
    const inputValue = input.value.toLowerCase();
    const studentDetails = document.querySelectorAll(".student-details h3");
    studentDetails.forEach((student) => {
      const h3 = student.textContent;
      if (inputValue === "") {
        return;
      } else if (h3.includes(inputValue)) {
        student.parentNode.parentNode.style.display = "block";
      } else {
        student.parentNode.parentNode.style.display = "none";
      }
    });
  });
}

searchBar();
