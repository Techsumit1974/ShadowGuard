import re
from llm import ask_gemini

def analyze_phishing(message: str):
    red_flags = []

    if re.search(r"http[s]?://", message):
        red_flags.append("Contains a link")

    if "urgent" in message.lower():
        red_flags.append("Creates urgency")

    if "won" in message.lower() or "prize" in message.lower():
        red_flags.append("Unrealistic reward claim")

    risk_level = "Low"
    if len(red_flags) >= 2:
        risk_level = "High"
    elif len(red_flags) == 1:
        risk_level = "Medium"

    # Gemini explanation
    prompt = f"""
    You are a cybersecurity assistant.
    Analyze the following message and explain why it may be a scam:

    Message: "{message}"

    Explain in simple terms for a non-technical user.
    """

    ai_explanation = ask_gemini(prompt)

    return {
        "type": "Phishing / Scam Analysis",
        "risk_level": risk_level,
        "red_flags": red_flags,
        "ai_explanation": ai_explanation,
        "recommended_action": [
            "Do not click any links",
            "Do not share personal information",
            "Delete or report the message"
        ]
    }
