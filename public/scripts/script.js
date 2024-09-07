jQuery(() => {
  console.log("Ready to rumble!");

  // Creating variables for functions
  const submissionButton = $("#subButton");
  const usernameInput = $("#usernameInput");
  const postInput = $("#postInput");
  const refreshButton = $("#refButton");
  const delButton = $("#delButton");
  const updateButton = $("#updateButton");

  // Creating an event listener for the button click
  submissionButton.on("click", async () => {
    // Checking for value in input fields before submission
    if (usernameInput && usernameInput.val()) {
      if (postInput && postInput.val()) {
        // Getting values
        let userVal = usernameInput.val();
        let postVal = postInput.val();

        // Sending POST request to add values to DB
        await fetch("/mongo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: userVal, post: postVal }),
        });
      }
    }
  });

  refreshButton.on("click", () => {
    location.reload();
  });

  delButton.on("click", async () => {
    // Checking for value in input fields before submission
    if (usernameInput && usernameInput.val()) {
      if (postInput && postInput.val()) {
        // Getting values
        let userVal = usernameInput.val();
        let postVal = postInput.val();

        // Sending POST request to add values to DB
        await fetch("/mongo", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: userVal, post: postVal }),
        });
      }
    }
  });

  updateButton.on("click", async () => {
    // Checking if input fields are populated
    if (usernameInput && usernameInput.val()) {
      if (postInput && postInput.val()) {
        // Getting values
        let userVal = usernameInput.val();
        let postVal = postInput.val();

        // Sending PUT request to updat values in DB
        await fetch("/mongo", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: userVal, post: postVal }),
        });
      }
    }
  });
});
