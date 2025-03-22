//Javascript file to handle comment section

//Remove text when user selects the comment section bar
document.getElementById('comment_section').addEventListener('focus', function(event) {
    console.log("Selected comment section");
    event.target.value = '';
}, false);


//Submit text when user hits enter 
document.getElementById('comment_section').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        SubmitComment();
    }
}, false);

//Submit button
document.getElementById('submit').addEventListener('click', function(event) {
    console.log("Submitting comment");
    SubmitComment();
});

//Submit comment when user presses enter or submit 
function SubmitComment(){

}