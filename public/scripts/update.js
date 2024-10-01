function updatePost(postId) { 

    // Making content editable
    $(`.${postId}`).attr('contenteditable', 'true'); 

    // Chaning to submit button
    $(`#upd-${postId}`).html("Submit");
    $(`#upd-${postId}`).addClass("btn-success");
    $(`#upd-${postId}`).removeClass("btn-warning");
    $(`#upd-${postId}`).attr("onclick", `submitNewPost("${postId}")`); 

    // Changing the delete button
    $(`#del-${postId}`).html("Cancel");
    $(`#del-${postId}`).attr("href", "/"); 

    // Changing the postcard color
    $(`#postcard-${postId}`).addClass("text-bg-warning");
    $(`#postheader-${postId}`).html("EDIT MODE")
};


