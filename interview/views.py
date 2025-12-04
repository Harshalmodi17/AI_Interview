from django.shortcuts import render, redirect
from .models import Question
from .ai_utils import analyze_answer

def hr_dashboard(request):
    # 1. Add Question Logic
    if request.method == 'POST' and 'add_btn' in request.POST:
        Question.objects.create(
            department=request.POST.get('department'),
            text=request.POST.get('question')
        )
        return redirect('hr_dashboard')

    # 2. Manual Text Analysis Logic (New Feature)
    analysis_result = None
    if request.method == 'POST' and 'analyze_btn' in request.POST:
        question_id = request.POST.get('question_id')
        user_answer = request.POST.get('user_answer')
        
        # Get the specific question object
        question_obj = Question.objects.get(id=question_id)
        
        # Call AI
        ai_data = analyze_answer(question_obj.text, user_answer, question_obj.department)
        
        # Package data for the template
        analysis_result = {
            'question': question_obj.text,
            'user_answer': user_answer,
            'data': ai_data
        }

    questions = Question.objects.all().order_by('-created_at')
    
    return render(request, 'dashboard.html', {
        'questions': questions,
        'analysis_result': analysis_result
    })