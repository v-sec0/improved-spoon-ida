function submitNewPost(postID) {
    const newPost = $(`#post-${postID}`).html();
    const newUser = $(`#user-${postID}`).html();
    
    const newObj = {
        id: postID,
        username: newUser,
        post: newPost
    }

    fetch("/update", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObj),
        redirect: "follow"
    })
    .then(response => {
        if (response.redirected) {
            console.log('Redirect detected, navigating to:', response.url);
            window.location.href = response.url;
        }     
    })
}
