from llm import ask_gemini

def incident_guidance(message: str):
    prompt = f"""
    You are a cybersecurity incident response assistant.
    A user reports the following situation:

    "{message}"

    Provide step-by-step guidance in simple language.
    """

    steps = ask_gemini(prompt)

    return {
        "type": "Incident Response",
        "risk_level": "High",
        "guidance": steps
    }
