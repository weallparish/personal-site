function parseCommand(event) {
    event.preventDefault();
    var inputField = document.getElementById("input");

    printText( "> " + inputField.value );
    runCommand( inputField.value );

    inputField.value = "";

    return true;
}

function runCommand(command) {
    commandWords = command.split(" ");

    if (commandWords[0] == "help") {
        if (commandWords.length == 1) {
            printText( " HELP!!! " );
        }
    }

    return true;
}

function printText(text) {
    const newDiv = document.createElement("div");
    newDiv.class = "textOutput";
    const newContent = document.createTextNode(text);
    newDiv.appendChild(newContent);

    const currentDiv = document.getElementById("outputs");
    currentDiv.appendChild(newDiv);
}