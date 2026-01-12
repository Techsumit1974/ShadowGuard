from phishing_detector import analyze_phishing
from incident_response import incident_guidance

def run_agent(user_message: str):
    """
    Agent logic:
    1. Understand intent
    2. Decide task (phishing detection or incident response)
    3. Execute correct module
    """

    message_lower = user_message.lower()

    incident_keywords = ["clicked", "hacked", "malware", "scam", "virus"]
    if any(word in message_lower for word in incident_keywords):
        return incident_guidance(user_message)

    return analyze_phishing(user_message)
