function updatePost(postId) { 

    $(`.${postId}`).attr('contenteditable', 'true'); 

    $(`#upd-${postId}`).html("Submit"); 
    $(`#upd-${postId}`).attr("onclick", `submitNewPost("${postId}")`); 

    $(`#del-${postId}`).html("Cancel");
    $(`#del-${postId}`).attr("href", "/"); 

    $(`#postcard-${postId}`).attr("data-bs-theme", "dark");
}

