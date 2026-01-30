
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number[] }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({});

  const handleOptionClick = (questionId: number, optionIndex: number, type: 'single' | 'multiple') => {
    if (showFeedback[questionId]) return; // Prevent changing after submission

    setSelectedAnswers(prev => {
      const current = prev[questionId] || [];
      if (type === 'single') {
        return { ...prev, [questionId]: [optionIndex] };
      } else {
        if (current.includes(optionIndex)) {
          return { ...prev, [questionId]: current.filter(i => i !== optionIndex) };
        } else {
          return { ...prev, [questionId]: [...current, optionIndex] };
        }
      }
    });
  };

  const checkAnswer = (questionId: number) => {
    setShowFeedback(prev => ({ ...prev, [questionId]: true }));
  };

  const isCorrect = (questionId: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return false;
    const selected = selectedAnswers[questionId] || [];
    return selected.length === question.answer.length && 
           selected.every(val => question.answer.includes(val));
  };

  return (
    <div className="space-y-8 mt-6">
      <h3 className="text-xl font-bold text-green-800 border-b-2 border-green-200 pb-2">互動挑戰</h3>
      {questions.map((q) => (
        <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
          <p className="font-medium text-gray-800 mb-4">{q.id}. {q.text}</p>
          <div className="space-y-2">
            {q.options.map((option, idx) => {
              const isSelected = selectedAnswers[q.id]?.includes(idx);
              const isCorrectOption = q.answer.includes(idx);
              const showResult = showFeedback[q.id];

              let bgColor = "bg-gray-50 border-gray-200";
              if (isSelected) bgColor = "bg-green-50 border-green-500";
              if (showResult) {
                if (isCorrectOption) bgColor = "bg-green-200 border-green-600";
                else if (isSelected && !isCorrectOption) bgColor = "bg-red-100 border-red-500";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(q.id, idx, q.type)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${bgColor} ${!showResult ? 'hover:shadow-md' : ''}`}
                  disabled={showResult}
                >
                  <span className="text-gray-700">{option}</span>
                </button>
              );
            })}
          </div>

          {!showFeedback[q.id] ? (
            <button
              onClick={() => checkAnswer(q.id)}
              disabled={!selectedAnswers[q.id] || selectedAnswers[q.id].length === 0}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              送出答案
            </button>
          ) : (
            <div className={`mt-4 p-3 rounded-lg font-bold text-center ${isCorrect(q.id) ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {isCorrect(q.id) ? '恭喜你答對了！✨' : '再試一次看看吧！📚'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Quiz;
