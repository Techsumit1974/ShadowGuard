async function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    if (!input.value) return;

    // Show user message
    chatBox.innerHTML += `
        <div class="message user">
            You: ${input.value}
        </div>
    `;

    const userText = input.value;
    input.value = "";

    const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userText })
    });

    const data = await response.json();

    // Risk level styling
    let riskClass = "risk-low";
    if (data.risk_level === "High") riskClass = "risk-high";
    else if (data.risk_level === "Medium") riskClass = "risk-medium";

    // Build bot response
    let botHtml = `
        <div class="message bot">
            <b>ShadowGuard</b><br><br>
            <b>Risk Level:</b>
            <span class="${riskClass}">${data.risk_level}</span><br><br>
    `;

    if (data.red_flags && data.red_flags.length > 0) {
        botHtml += `<b>Red Flags Detected:</b><ul>`;
        data.red_flags.forEach(flag => {
            botHtml += `<li>${flag}</li>`;
        });
        botHtml += `</ul>`;
    }

    if (data.recommended_action && data.recommended_action.length > 0) {
        botHtml += `<b>Recommended Actions:</b><ul>`;
        data.recommended_action.forEach(action => {
            botHtml += `<li>${action}</li>`;
        });
        botHtml += `</ul>`;
    }

    botHtml += `</div>`;

    chatBox.innerHTML += botHtml;
    chatBox.scrollTop = chatBox.scrollHeight;
}

function renderResponse(data) {
  let output = "";

  output += `<strong>Risk Level:</strong> <span>${data.risk_level}</span><br><br>`;

  if (data.red_flags && data.red_flags.length > 0) {
    output += `<strong>Red Flags Detected:</strong><ul>`;
    data.red_flags.forEach(flag => {
      output += `<li>${flag}</li>`;
    });
    output += `</ul>`;
  }

  // 🔹 THIS IS THE LLM EXPLANATION PART
  if (data.ai_explanation) {
    output += `<strong>AI Explanation:</strong><br>`;
    output += `<em>${data.ai_explanation}</em><br><br>`;
  }

  output += `<strong>Recommended Actions:</strong><ul>`;
  data.recommended_action.forEach(action => {
    output += `<li>${action}</li>`;
  });
  output += `</ul>`;

  document.getElementById("chat-box").innerHTML += output;
}
