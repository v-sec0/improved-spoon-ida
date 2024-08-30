$(document).ready(function () {
  const submitButton = $("#sendBtn");
  const clientMessageBox = $("#serverMessageInput");
  const serverTerminal = $("#serverResponse");

  submitButton.on("click", () => {
    console.log("Button clicked!");

    // Turning input into variable
    let clientMessage = { message: clientMessageBox.val() };

    // Making POST request options
    const responseOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clientMessage), // Need this because the message is JSON
    };

    // Getting response from server and using that to replace terminal message.
    fetch("/", responseOptions)
      .then((response) => response.json())
      .then((data) => {
        serverTerminal.html(data.messageRecieved);
      });
  });
});
