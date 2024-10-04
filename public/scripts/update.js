function updatePost(postId) { 

    // Making content editable
    $(`.${postId}`).attr('contenteditable', 'true'); 

    // Chaning to submit button
    $(`#upd-${postId}`).html("Update");
    $(`#upd-${postId}`).addClass("btn-success");
    $(`#upd-${postId}`).removeClass("btn-warning");
    $(`#upd-${postId}`).attr("onclick", `submitNewPost("${postId}")`); 

    // Changing the delete button
    $(`#del-${postId}`).html("Cancel");
    $(`#del-${postId}`).attr("href", "/"); 

    // Changing the postcard color
    $(`#postcard-${postId}`).addClass("border-warning");
    $(`#postcard-${postId}`).addClass("text-bg-dark");
    $(`#postheader-${postId}`).html("⚠️ EDIT MODE ⚠️")
};


