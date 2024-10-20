function deletePost(postID) {
    fetch(`/delete/${postID}/`, {
        method: "DELETE",
        redirect: "follow"
    })
        .then(response => {
            if (response.redirected) {
                console.log('Redirect detected, navigating to:', response.url);
                window.location.href = response.url;
            }
        })
}