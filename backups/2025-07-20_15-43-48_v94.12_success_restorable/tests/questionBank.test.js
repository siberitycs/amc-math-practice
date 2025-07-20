import { describe, it, expect } from 'vitest';

// Import the questions data - we'll need to export it from App.jsx
// For now, we'll define a test version or import it differently

const validateQuestionBank = (questions) => {
  const issues = [];
  
  // Helper function to check if all options in a question are unique
  const hasUniqueOptions = (options) => {
    return new Set(options).size === options.length;
  };
  
  // Helper function to check for meaningful option variety
  const hasVariedOptions = (options, correct) => {
    // Check if options are just consecutive numbers
    const numbers = options.map(opt => parseFloat(opt)).filter(n => !isNaN(n));
    if (numbers.length === 4) {
      numbers.sort((a, b) => a - b);
      let isConsecutive = true;
      for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] - numbers[i-1] !== 1) {
          isConsecutive = false;
          break;
        }
      }
      if (isConsecutive) {
        return false; // Too predictable
      }
    }
    return true;
  };
  
  // Track option patterns to find duplicates across questions
  const optionPatterns = new Map();
  
  Object.keys(questions).forEach(year => {
    Object.keys(questions[year]).forEach(difficulty => {
      questions[year][difficulty].forEach((question, qIndex) => {
        const questionId = `Year ${year}, ${difficulty}, Question ${qIndex + 1}`;
        
        // Check for unique options within the question
        if (!hasUniqueOptions(question.options)) {
          issues.push({
            type: 'duplicate_options_within_question',
            questionId,
            question: question.question,
            options: question.options
          });
        }
        
        // Check for varied options
        if (!hasVariedOptions(question.options, question.correct)) {
          issues.push({
            type: 'predictable_options',
            questionId,
            question: question.question,
            options: question.options
          });
        }
        
        // Check for duplicate option patterns across questions
        const optionKey = JSON.stringify(question.options.sort());
        if (optionPatterns.has(optionKey)) {
          issues.push({
            type: 'duplicate_options_across_questions',
            questionId,
            duplicateWith: optionPatterns.get(optionKey),
            options: question.options
          });
        } else {
          optionPatterns.set(optionKey, questionId);
        }
        
        // Validate question structure
        if (!question.question || question.question.trim() === '') {
          issues.push({
            type: 'empty_question',
            questionId
          });
        }
        
        if (!Array.isArray(question.options) || question.options.length !== 4) {
          issues.push({
            type: 'invalid_options_count',
            questionId,
            optionsCount: question.options?.length || 0
          });
        }
        
        if (question.correct < 0 || question.correct >= 4) {
          issues.push({
            type: 'invalid_correct_index',
            questionId,
            correct: question.correct
          });
        }
        
        if (!question.explanation || question.explanation.trim() === '') {
          issues.push({
            type: 'missing_explanation',
            questionId
          });
        }
        
        // Check if correct answer makes sense
        if (question.options[question.correct] === undefined) {
          issues.push({
            type: 'correct_answer_out_of_bounds',
            questionId,
            correct: question.correct,
            options: question.options
          });
        }
      });
    });
  });
  
  return issues;
};

// Test function to validate the current question bank
describe('Question Bank Validation', () => {
  // We'll need to import the actual questions data
  // For now, let's create a sample test
  
  it('should have unique options within each question', () => {
    const sampleQuestion = {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"], // All unique
      correct: 1,
      explanation: "2 + 2 = 4"
    };
    
    const uniqueOptions = new Set(sampleQuestion.options);
    expect(uniqueOptions.size).toBe(sampleQuestion.options.length);
  });
  
  it('should detect duplicate options within a question', () => {
    const badQuestion = {
      question: "What is 2 + 2?",
      options: ["3", "4", "4", "6"], // Duplicate "4"
      correct: 1,
      explanation: "2 + 2 = 4"
    };
    
    const uniqueOptions = new Set(badQuestion.options);
    expect(uniqueOptions.size).toBeLessThan(badQuestion.options.length);
  });
  
  it('should have valid correct answer indices', () => {
    const question = {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1,
      explanation: "2 + 2 = 4"
    };
    
    expect(question.correct).toBeGreaterThanOrEqual(0);
    expect(question.correct).toBeLessThan(question.options.length);
    expect(question.options[question.correct]).toBeDefined();
  });
  
  it('should have meaningful explanations', () => {
    const question = {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: 1,
      explanation: "2 + 2 = 4 because when you add 2 and 2 together, you get 4."
    };
    
    expect(question.explanation).toBeTruthy();
    expect(question.explanation.trim().length).toBeGreaterThan(10);
  });
  
  it('should avoid too many consecutive number options', () => {
    const goodQuestion = {
      options: ["2", "7", "12", "15"] // Varied numbers
    };
    
    const badQuestion = {
      options: ["5", "6", "7", "8"] // Too consecutive
    };
    
    // Check if options are consecutive
    const checkConsecutive = (options) => {
      const numbers = options.map(opt => parseInt(opt)).filter(n => !isNaN(n));
      if (numbers.length === 4) {
        numbers.sort((a, b) => a - b);
        for (let i = 1; i < numbers.length; i++) {
          if (numbers[i] - numbers[i-1] !== 1) {
            return false;
          }
        }
        return true;
      }
      return false;
    };
    
    expect(checkConsecutive(goodQuestion.options)).toBe(false);
    expect(checkConsecutive(badQuestion.options)).toBe(true);
  });
});

// Export the validation function for use in other tests
export { validateQuestionBank };