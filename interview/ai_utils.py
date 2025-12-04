import google.generativeai as genai
from django.conf import settings
import json

genai.configure(api_key=settings.GEMINI_API_KEY)

def analyze_answer(current_question, user_answer, department):
    """
    Analyzes the answer based on PDF criteria:
    - Technical Knowledge (Score)
    - Communication Skills
    - Confidence/Tone
    """
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    # Prompt Engineering based on PDF requirements
    prompt = f"""
    Act as a strict technical interviewer for the {department} department.
    
    Question: "{current_question}"
    Candidate Answer: "{user_answer}"
    
    Analyze the answer and return a VALID JSON object with these keys:
    {{
        "score": (integer 1-10 reflecting technical accuracy),
        "feedback": (string, critical feedback on what was missing),
        "communication_rating": (string, e.g. "Clear", "Vague", "Too Verbose"),
        "confidence_tone": (string, e.g. "Confident", "Unsure", "Professional"),
        "suggestion": (string, how to improve)
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        # Clean potential markdown formatting from Gemini
        clean_json = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(clean_json)
    except Exception as e:
        return {
            "score": 0,
            "feedback": f"Error parsing AI response: {str(e)}",
            "communication_rating": "Error",
            "confidence_tone": "Error",
            "suggestion": "Try again"
        }