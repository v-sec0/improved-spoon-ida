$(document).ready(function () {
  const submitButton = $("#subButton");
  const clientPost = $("#postInput");
  const clientUser = $("#usernameInput");
  const postEntry = $("#postEntry");
  const userEntry = $("#userEntry");

  // submitButton.on("click", () => {
  //   console.log("Button clicked!");

  //   // Turning input into variable
  //   let requestBody = { post: clientPost.val(), username: clientUser.val() };

  //   // Making POST request options
  //   const responseOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestBody), // Need this because the message is JSON
  //   };

  //   // Getting response from server and using that to replace terminal message.
  //   fetch("/", responseOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       postEntry.html(data.post);
  //       userEntry.html(data.username);
  //     });

  //   // Getting reponse from server for database
  //   const databaseFetchOptions = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   }
    
  //   fetch("/mongo", databaseFetchOptions)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data[1])
  //     })
  // });
});
