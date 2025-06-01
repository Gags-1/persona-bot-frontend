const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";
  userInput.disabled = true;

  try {
    const res = await fetch("http://localhost:8000/chat-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (data.response) {
      appendMessage("bot", data.response);
    } else {
      appendMessage("bot", "Sorry, something went wrong!");
    }
  } catch (err) {
    appendMessage("bot", "Error connecting to server.");
  } finally {
    userInput.disabled = false;
    userInput.focus();
    scrollToBottom();
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatWindow.appendChild(msg);
  scrollToBottom();
}

function scrollToBottom() {
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Focus input on page load
userInput.focus();
