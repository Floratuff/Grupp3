//Javascript file to handle comment section
console.log("Comments java works");

function getCurrentComment(){
    return document.getElementById('comment_section').value;
}

document.getElementById('comments').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(event);
});

document.addEventListener('keydown', function(event) {
    if(event.key == "Enter"){
        console.log("Enter key has been presssed");
    }
});

document.getElementById('comment_section').addEventListener('focus', function(event) {
    console.log("Focused on comment section");
});

//Create random comment
function CreateComment(){

}
function SubmitComment(Comment){
    localStorage.setItem("comment", Comment);
}

//Display comment when page loads
function DisplayComment(){
    document.getElementById('comment_section').value = localStorage.getItem("comment");
}