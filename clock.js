const readline = require('readline');

function hideCursor() {
  process.stdout.write('\x1B[?25l');
}

function showCursor() {
  process.stdout.write('\x1B[?25h');
}

function displayTime() {
  // Clear the current line and move the cursor to the beginning of the line
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);

  // Get the current Unix time in milliseconds
  const now = new Date().getTime();

  // Write the current time to the same line in the terminal
  process.stdout.write(now.toString());

  // Set up the next update with a variation of ±200ms
  const nextUpdateInMs = 1000 + Math.floor(Math.random() * 401) - 200;
  setTimeout(displayTime, nextUpdateInMs);
}

// Hide the cursor
hideCursor();

// Start the first display immediately
displayTime();

// When the script is stopped, show the cursor again
process.on('SIGINT', () => {
  showCursor();
  process.exit();
});
