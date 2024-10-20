function updatePost(postId, mode) {

    // Defining variables
    let postcardHeader = $(`#postheader-${postId}`);
    let postcard = $(`#postcard-${postId}`);
    let updClickable = $(`#updClickable-${postId}`);
    let delClickable = $(`#delClickable-${postId}`);
    let post = $(`.${postId}`)

    // Evaluating the mode argument
    if (mode === 'edit') {

        // Making content editable
        post.attr('contenteditable', 'true');

        // Changing to submit button
        updClickable.html("check");
        updClickable.attr("onclick", `submitNewPost("${postId}")`);

        // Changing the delete button
        delClickable.html("cancel");
        delClickable.attr("onclick", `updatePost("${postId}", "cancel")`);

        // Changing the postcard color
        postcard.addClass("border-warning");
        postcard.addClass("text-bg-dark");
        postcardHeader.html("⚠️ EDIT MODE")
    } else if (mode === 'cancel') {

        console.log("Button clicked")

        // Reverting changes
        post.attr('contenteditable', 'false');

        updClickable.html("edit_note");
        updClickable.attr("onclick", `updatePost("${postId}", "edit")`);

        delClickable.attr("onclick", `deletePost("${postId}"`);
        delClickable.html("delete");

        postcard.removeClass("border-warning");
        postcard.removeClass("text-bg-dark");
        postcardHeader.html(`Post ID: ${postId}`);
    }


}


