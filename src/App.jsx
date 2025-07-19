import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Home, BookOpen, TrendingUp, HelpCircle, School, User, Target, Clock, Award, ArrowRight, Check, X, Trophy, Star, Sparkles, Timer, Brain, RefreshCw } from 'lucide-react';

const App = () => {
  const [currentUser, setCurrentUser] = useState('Annie');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [practiceSession, setPracticeSession] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  
  // Emergency reset function for stuck achievements
  const resetAchievement = () => {
    setShowAchievement(null);
    localStorage.removeItem('amc-math-achievements');
    localStorage.removeItem('amc-math-stats');
    localStorage.removeItem('amc-math-mistakes');
    // Force reload to clear any stuck state
    window.location.reload();
  };
  
  // Quick fix for stuck achievement
  const clearStuckAchievement = () => {
    setShowAchievement(null);
    console.log('Achievement state cleared manually');
  };
  
  // Load user stats from localStorage or initialize with clean data
  useEffect(() => {
    // Clear all old data to start fresh
    localStorage.removeItem('amc-math-stats');
    localStorage.removeItem('amc-math-achievements');
    localStorage.removeItem('amc-math-mistakes');
    
    // Clear any stuck achievement popup on startup
    setShowAchievement(null);
    
    console.log('Fresh start - all localStorage cleared');
  }, []);
  
  // Keyboard shortcut to reset stuck achievements (Ctrl+Shift+R)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        resetAchievement();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  const [lastUsedTopic, setLastUsedTopic] = useState(null);
  const [showDifficultyChange, setShowDifficultyChange] = useState(null);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(null);
  const [mistakeHistory, setMistakeHistory] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [practiceMode, setPracticeMode] = useState('smart');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [difficultyLevels] = useState([
    { id: 'easy', name: 'Easy', color: 'bg-green-500', description: 'Foundation skills' },
    { id: 'easy-plus', name: 'Easy+', color: 'bg-green-400', description: 'Building confidence' },
    { id: 'medium-minus', name: 'Medium-', color: 'bg-yellow-500', description: 'Getting challenging' },
    { id: 'medium', name: 'Medium', color: 'bg-yellow-400', description: 'AMC level' },
    { id: 'medium-plus', name: 'Medium+', color: 'bg-orange-500', description: 'Advanced practice' },
    { id: 'hard-minus', name: 'Hard-', color: 'bg-red-400', description: 'Competition prep' },
    { id: 'hard', name: 'Hard', color: 'bg-red-500', description: 'Expert level' }
  ]);
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(0);
  const [showStepByStep, setShowStepByStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userStats, setUserStats] = useState({
    Annie: { 
      totalQuestions: 0, 
      accuracy: 0, 
      streak: 0, 
      badges: [],
      topicStats: {},
      // Enhanced analytics
      timePerQuestion: 0,
      averageTime: 0,
      totalTime: 0,
      questionsToday: 0,
      questionsThisWeek: 0,
      accuracyByDifficulty: { easy: 0, medium: 0, hard: 0 },
      questionsByDifficulty: { easy: 0, medium: 0, hard: 0 },
      lastPracticeDate: null,
      improvementRate: 0,
      amcReadiness: 0,
      mistakePatterns: [],
      studyStreak: 0
    },
    Bella: { 
      totalQuestions: 0, 
      accuracy: 0, 
      streak: 0, 
      badges: [],
      topicStats: {},
      // Enhanced analytics
      timePerQuestion: 0,
      averageTime: 0,
      totalTime: 0,
      questionsToday: 0,
      questionsThisWeek: 0,
      accuracyByDifficulty: { easy: 0, medium: 0, hard: 0 },
      questionsByDifficulty: { easy: 0, medium: 0, hard: 0 },
      lastPracticeDate: null,
      improvementRate: 0,
      amcReadiness: 0,
      mistakePatterns: [],
      studyStreak: 0
    }
  });

  const users = {
    Annie: { 
      year: 5, 
      age: 10, 
      avatar: '👧', 
      color: 'bg-orange-100',
      borderColor: 'border-orange-300',
      avatarUrl: '/avatars/annie_avatar.png',
      description: 'Loves solving challenging problems!'
    },
    Bella: { 
      year: 3, 
      age: 8, 
      avatar: '👧🏻', 
      color: 'bg-red-100',
      borderColor: 'border-red-300',
      avatarUrl: '/avatars/bella_avatar.png',
      description: 'Enjoys learning new math concepts!'
    }
  };

  const todayGoals = {
    Annie: [
      { id: 1, title: 'Practice Session', desc: 'Complete 10 math problems', progress: 0, total: 10, color: 'bg-blue-500', icon: '📝' },
      { id: 2, title: 'Accuracy Goal', desc: 'Achieve 80% accuracy', progress: 0, total: 100, color: 'bg-green-500', icon: '🎯' },
      { id: 3, title: 'Study Time', desc: 'Practice for 30 minutes', progress: 0, total: 30, color: 'bg-purple-500', icon: '⏱️' }
    ],
    Bella: [
      { id: 1, title: 'Practice Session', desc: 'Complete 10 math problems', progress: 0, total: 10, color: 'bg-blue-500', icon: '📝' },
      { id: 2, title: 'Accuracy Goal', desc: 'Achieve 70% accuracy', progress: 0, total: 100, color: 'bg-green-500', icon: '🎯' },
      { id: 3, title: 'Study Time', desc: 'Practice for 20 minutes', progress: 0, total: 20, color: 'bg-purple-500', icon: '⏱️' }
    ]
  };

  const topics = [
    { id: 1, name: 'Number', icon: '🔢', difficulty: 'Easy', color: 'from-blue-100 to-blue-200' },
    { id: 2, name: 'Addition & Subtraction', icon: '➕', difficulty: 'Easy', color: 'from-green-100 to-green-200' },
    { id: 3, name: 'Multiplication & Division', icon: '✖️', difficulty: 'Medium', color: 'from-purple-100 to-purple-200' },
    { id: 4, name: 'Fractions', icon: '¼', difficulty: 'Medium', color: 'from-pink-100 to-pink-200' },
    { id: 5, name: 'Geometry', icon: '📐', difficulty: 'Medium', color: 'from-yellow-100 to-yellow-200' },
    { id: 6, name: 'Measurement', icon: '📏', difficulty: 'Easy', color: 'from-indigo-100 to-indigo-200' },
    { id: 7, name: 'Patterns', icon: '🔄', difficulty: 'Easy', color: 'from-orange-100 to-orange-200' },
    { id: 8, name: 'Problem Solving', icon: '🧩', difficulty: 'Hard', color: 'from-red-100 to-red-200' },
    { id: 9, name: 'Probability', icon: '🎲', difficulty: 'Medium', color: 'from-teal-100 to-teal-200' },
    { id: 10, name: 'Logic', icon: '🧠', difficulty: 'Hard', color: 'from-emerald-100 to-emerald-200' }
  ];

  const sampleQuestions = {
    2: {
      easy: [
        {
          question: "What number comes after 8?",
          options: ["7", "9", "10", "6"],
          correct: 1,
          explanation: "When counting, we go: 7, 8, 9, 10... So 9 comes after 8!",
          topic: 1,
          difficulty: 'easy'
        },
        {
          question: "What is 5 + 3?",
          options: ["6", "7", "8", "9"],
          correct: 2,
          explanation: "5 + 3 = 8\nYou can count on your fingers: 5... 6, 7, 8!",
          topic: 2,
          difficulty: 'easy'
        },
        {
          question: "How many corners does a square have?",
          options: ["3", "4", "5", "6"],
          correct: 1,
          explanation: "A square has 4 corners. Each corner is where two sides meet!",
          topic: 5,
          difficulty: 'easy'
        }
      ],
      medium: [
        {
          question: "Tom has 12 marbles. He gives 5 to his friend. How many marbles does Tom have left?",
          options: ["5", "6", "7", "8"],
          correct: 2,
          explanation: "Tom starts with 12 marbles. He gives away 5.\n12 - 5 = 7 marbles left",
          topic: 2,
          difficulty: 'medium'
        },
        {
          question: "What is 3 × 4?",
          options: ["10", "11", "12", "13"],
          correct: 2,
          explanation: "3 × 4 = 12\nThink of it as 3 groups of 4: 4 + 4 + 4 = 12",
          topic: 3,
          difficulty: 'medium'
        },
        {
          question: "Which number is bigger: 47 or 74?",
          options: ["47", "74", "They are equal", "Cannot tell"],
          correct: 1,
          explanation: "74 is bigger than 47. When comparing two-digit numbers, look at the tens place first: 7 tens is more than 4 tens!",
          topic: 1,
          difficulty: 'medium'
        }
      ],
      hard: [
        {
          question: "There are 15 apples in a basket. If you eat 3 apples each day, how many days will the apples last?",
          options: ["3 days", "4 days", "5 days", "6 days"],
          correct: 2,
          explanation: "15 apples ÷ 3 apples per day = 5 days\nDay 1: 3 apples (12 left)\nDay 2: 3 apples (9 left)\nDay 3: 3 apples (6 left)\nDay 4: 3 apples (3 left)\nDay 5: 3 apples (0 left)",
          topic: 3,
          difficulty: 'hard'
        },
        {
          question: "What time will it be 2 hours after 10:30?",
          options: ["11:30", "12:00", "12:30", "1:00"],
          correct: 2,
          explanation: "Starting at 10:30\n+1 hour = 11:30\n+1 more hour = 12:30",
          topic: 6,
          difficulty: 'hard'
        }
      ]
    },
    3: {
      easy: [
        {
          question: "What is 15 + 8?",
          options: ["21", "22", "23", "24"],
          correct: 2,
          explanation: "15 + 8 = 23\nYou can count: 15... 16, 17, 18, 19, 20, 21, 22, 23!",
          topic: 2,
          difficulty: 'easy'
        },
        {
          question: "What is 6 × 4?",
          options: ["20", "22", "24", "26"],
          correct: 2,
          explanation: "6 × 4 = 24\nThink of it as 6 groups of 4: 4 + 4 + 4 + 4 + 4 + 4 = 24",
          topic: 3,
          difficulty: 'easy'
        },
        {
          question: "How many sides does a triangle have?",
          options: ["2", "3", "4", "5"],
          correct: 1,
          explanation: "A triangle has 3 sides. That's why it's called a 'tri' angle!",
          topic: 5,
          difficulty: 'easy'
        }
      ],
      medium: [
        {
          question: "Sarah has 25 stickers. She gives 7 to her friend. How many stickers does Sarah have left?",
          options: ["16", "17", "18", "19"],
          correct: 2,
          explanation: "Sarah starts with 25 stickers. She gives away 7.\n25 - 7 = 18 stickers left",
          topic: 2,
          difficulty: 'medium'
        },
        {
          question: "What is 32 ÷ 4?",
          options: ["6", "7", "8", "9"],
          correct: 2,
          explanation: "32 ÷ 4 = 8\nYou can think: 4 × 8 = 32",
          topic: 3,
          difficulty: 'medium'
        },
        {
          question: "Which number is bigger: 156 or 165?",
          options: ["156", "165", "They are equal", "Cannot tell"],
          correct: 1,
          explanation: "165 is bigger than 156. When comparing three-digit numbers, look at the hundreds place first: 1 hundred is the same, so look at the tens place: 6 tens vs 5 tens. 6 tens is more!",
          topic: 1,
          difficulty: 'medium'
        }
      ],
      hard: [
        {
          question: "There are 24 cookies in a jar. If you eat 4 cookies each day, how many days will the cookies last?",
          options: ["4 days", "5 days", "6 days", "7 days"],
          correct: 2,
          explanation: "24 cookies ÷ 4 cookies per day = 6 days\nDay 1: 4 cookies (20 left)\nDay 2: 4 cookies (16 left)\nDay 3: 4 cookies (12 left)\nDay 4: 4 cookies (8 left)\nDay 5: 4 cookies (4 left)\nDay 6: 4 cookies (0 left)",
          topic: 3,
          difficulty: 'hard'
        },
        {
          question: "What time will it be 3 hours after 9:15?",
          options: ["11:15", "12:00", "12:15", "1:00"],
          correct: 2,
          explanation: "Starting at 9:15\n+1 hour = 10:15\n+1 more hour = 11:15\n+1 more hour = 12:15",
          topic: 6,
          difficulty: 'hard'
        }
      ]
    },
    5: {
      easy: [
        {
          question: "What is 0.5 + 0.3?",
          options: ["0.2", "0.8", "0.08", "8"],
          correct: 1,
          explanation: "0.5 + 0.3 = 0.8\nThink of it as 5 tenths + 3 tenths = 8 tenths",
          topic: 1,
          difficulty: 'easy'
        },
        {
          question: "What is 48 ÷ 6?",
          options: ["6", "7", "8", "9"],
          correct: 2,
          explanation: "48 ÷ 6 = 8\nYou can think: 6 × 8 = 48",
          topic: 3,
          difficulty: 'easy'
        }
      ],
      medium: [
        {
          question: "Annie ate 1/4 of a pizza. Bella ate 2/5 of the same pizza. How much of the pizza did they eat altogether?",
          options: ["3/9", "3/20", "13/20", "7/10"],
          correct: 2,
          explanation: "To add fractions with different denominators, we need to find a common denominator.\n1/4 = 5/20\n2/5 = 8/20\nTotal = 5/20 + 8/20 = 13/20 of the pizza",
          topic: 4,
          difficulty: 'medium'
        },
        {
          question: "A rectangular garden is 4.5 meters long and 3 meters wide. What is the area of the garden?",
          options: ["7.5 m²", "12.5 m²", "13.5 m²", "15 m²"],
          correct: 2,
          explanation: "Area of rectangle = length × width\nArea = 4.5 m × 3 m = 13.5 m²",
          topic: 5,
          difficulty: 'medium'
        },
        {
          question: "If a pattern starts with 3 and adds 7 each time, what is the 5th number?",
          options: ["24", "28", "31", "35"],
          correct: 2,
          explanation: "Pattern: 3, 10, 17, 24, 31\nEach step adds 7: 3+7=10, 10+7=17, 17+7=24, 24+7=31",
          topic: 7,
          difficulty: 'medium'
        }
      ],
      hard: [
        {
          question: "A train travels 85 km in 1 hour. How far will it travel in 3.5 hours at the same speed?",
          options: ["255 km", "275.5 km", "297.5 km", "315 km"],
          correct: 2,
          explanation: "Distance = Speed × Time\nDistance = 85 km/h × 3.5 h = 297.5 km",
          topic: 8,
          difficulty: 'hard'
        },
        {
          question: "What is 3/4 × 2/3?",
          options: ["1/2", "5/7", "6/12", "5/12"],
          correct: 0,
          explanation: "To multiply fractions: (3×2)/(4×3) = 6/12 = 1/2",
          topic: 4,
          difficulty: 'hard'
        }
      ]
    }
  };

  // Smart defaults based on user
  const smartDefaults = {
    Annie: {
      difficulty: userStats.Annie.accuracy >= 85 ? 'Hard' : userStats.Annie.accuracy >= 70 ? 'Medium' : 'Easy',
      questions: 15,
      time: 900,
      description: "15 questions • 15 minutes • Adaptive difficulty"
    },
    Bella: {
      difficulty: userStats.Bella.accuracy >= 80 ? 'Medium' : 'Easy',
      questions: 10,
      time: 600,
      description: "10 questions • 10 minutes • Adaptive difficulty"
    }
  };



  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('amc-math-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
    const savedAchievements = localStorage.getItem('amc-math-achievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
    const savedLastTopic = localStorage.getItem('amc-math-last-topic');
    if (savedLastTopic) {
      const topicId = parseInt(savedLastTopic);
      const topic = topics.find(t => t.id === topicId);
      if (topic) setLastUsedTopic(topic);
    }
    const savedMistakes = localStorage.getItem('amc-math-mistakes');
    if (savedMistakes) {
      setMistakeHistory(JSON.parse(savedMistakes));
    }
  }, []);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('amc-math-stats', JSON.stringify(userStats));
  }, [userStats]);

  // Save last used topic
  useEffect(() => {
    if (lastUsedTopic) {
      localStorage.setItem('amc-math-last-topic', lastUsedTopic.id.toString());
    }
  }, [lastUsedTopic]);
  
  // Save mistakes to localStorage
  useEffect(() => {
    if (mistakeHistory.length > 0) {
      localStorage.setItem('amc-math-mistakes', JSON.stringify(mistakeHistory));
    }
  }, [mistakeHistory]);

  // Check for new achievements
  const checkAchievements = (newStats) => {
    const newAchievements = [];
    const currentBadges = userStats[currentUser].badges || [];
    
    // Safety check: Only allow achievements for realistic progress
    if (newStats.totalQuestions > 1000) {
      console.log('Suspicious question count detected, ignoring achievement check');
      return;
    }
    
    // Only trigger achievements if they haven't been awarded yet
    if (newStats.totalQuestions >= 100 && !currentBadges.includes('Century Club')) {
      newAchievements.push('Century Club');
      setShowAchievement({ name: 'Century Club', desc: '100 questions answered!', icon: '💯' });
    }
    
    // Accuracy Master: Need at least 10 questions with 90%+ accuracy
    if (newStats.accuracy >= 90 && newStats.totalQuestions >= 10 && !currentBadges.includes('Accuracy Master')) {
      // Additional check: must have answered at least 9 questions correctly out of 10+ total
      const correctAnswers = Math.round((newStats.accuracy / 100) * newStats.totalQuestions);
      if (correctAnswers >= 9) {
        newAchievements.push('Accuracy Master');
        setShowAchievement({ name: 'Accuracy Master', desc: '90% accuracy achieved!', icon: '🎯' });
      }
    }
    
    if (newStats.streak >= 7 && newStats.totalQuestions >= 5 && !currentBadges.includes('Week Warrior')) {
      newAchievements.push('Week Warrior');
      setShowAchievement({ name: 'Week Warrior', desc: '7 day streak!', icon: '🔥' });
    }
    
    // Only update if there are actually new achievements
    if (newAchievements.length > 0) {
      const updatedBadges = [...currentBadges, ...newAchievements];
      const updatedStats = { ...userStats[currentUser], badges: updatedBadges };
      setUserStats({ ...userStats, [currentUser]: updatedStats });
      localStorage.setItem('amc-math-stats', JSON.stringify({ ...userStats, [currentUser]: updatedStats }));
    }
    
    // Debug: Log current state to help identify issues
    console.log('Achievement check:', {
      user: currentUser,
      totalQuestions: newStats.totalQuestions,
      accuracy: newStats.accuracy,
      streak: newStats.streak,
      currentBadges,
      newAchievements,
      showAchievement: showAchievement
    });
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Smart practice algorithms
  const getTopicPerformance = (topicId) => {
    const stats = userStats[currentUser]?.topicStats?.[topicId];
    if (!stats || stats.attempted === 0) return 0;
    return Math.round((stats.correct / stats.attempted) * 100);
  };

  const getRecommendedTopics = () => {
    const stats = userStats[currentUser]?.topicStats || {};
    const user = users[currentUser];
    
    // Personalized topic preferences based on user characteristics
    const userPreferences = {
      Annie: {
        // Year 5 student who loves challenges - focus on advanced topics
        preferredTopics: [8, 10, 3, 4, 9], // Problem Solving, Logic, Multiplication, Fractions, Probability
        difficultyBonus: { 'Hard': 15, 'Medium': 10, 'Easy': 5 },
        ageBonus: 10 // Older student bonus
      },
      Bella: {
        // Year 3 student who enjoys learning - focus on foundational topics
        preferredTopics: [1, 2, 7, 6, 5], // Number, Addition/Subtraction, Patterns, Measurement, Geometry
        difficultyBonus: { 'Easy': 15, 'Medium': 10, 'Hard': 5 },
        ageBonus: 0 // Younger student
      }
    };
    
    const preferences = userPreferences[currentUser] || userPreferences.Bella;
    
    const topicsWithScores = topics.map(topic => {
      const performance = getTopicPerformance(topic.id);
      const daysSinceLastPractice = stats[topic.id] 
        ? Math.floor((Date.now() - stats[topic.id].lastPracticed) / 86400000)
        : 30;
      
      const performanceScore = 100 - performance;
      const timeScore = Math.min(daysSinceLastPractice * 3, 90);
      const difficultyBonus = preferences.difficultyBonus[topic.difficulty] || 5;
      
      // Personalization bonus based on user preferences
      const preferenceBonus = preferences.preferredTopics.includes(topic.id) ? 20 : 0;
      const ageBonus = preferences.ageBonus;
      
      return {
        ...topic,
        score: performanceScore + timeScore + difficultyBonus + preferenceBonus + ageBonus,
        performance,
        daysSinceLastPractice
      };
    });
    
    return topicsWithScores.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // Generate step-by-step solution
  const generateStepByStepSolution = (question) => {
    const solutions = {
      'pattern': {
        steps: [
          "Step 1: Look at the numbers carefully",
          "Step 2: Find what changes between each number",
          "Step 3: Identify the pattern rule",
          "Step 4: Apply the rule to find the next number",
          "Step 5: Check your answer makes sense"
        ],
        strategy: "Pattern problems require careful observation. Look for arithmetic sequences, geometric sequences, or more complex patterns.",
        commonMistakes: [
          "Students often look for simple addition instead of more complex patterns",
          "A common error is not checking if the pattern continues correctly"
        ]
      },
      'logic': {
        steps: [
          "Step 1: Read the problem carefully",
          "Step 2: List all the given information",
          "Step 3: Look for relationships between the facts",
          "Step 4: Use logical reasoning to find the answer",
          "Step 5: Check that your answer fits all the given information"
        ],
        strategy: "Logic problems require systematic thinking. Organize the information and look for contradictions or eliminations.",
        commonMistakes: [
          "Students often jump to conclusions without checking all possibilities",
          "A common error is not using all the given information"
        ]
      },
      'probability': {
        steps: [
          "Step 1: Identify the total number of possible outcomes",
          "Step 2: Count the favorable outcomes",
          "Step 3: Calculate probability = favorable/total",
          "Step 4: Simplify the fraction if possible",
          "Step 5: Check that your probability is between 0 and 1"
        ],
        strategy: "Probability problems require careful counting. Make sure you count all possible outcomes correctly.",
        commonMistakes: [
          "Students often forget to count all possible outcomes",
          "A common error is not simplifying fractions"
        ]
      },
      'default': {
        steps: [
          "Step 1: Read the problem carefully",
          "Step 2: Identify what you're looking for",
          "Step 3: Choose the best strategy",
          "Step 4: Solve step by step",
          "Step 5: Check your answer"
        ],
        strategy: "Break complex problems into smaller, manageable steps.",
        commonMistakes: [
          "Students often rush to answer without understanding the problem",
          "A common error is not checking if the answer makes sense"
        ]
      }
    };
    
    // Determine problem type based on question content
    let problemType = 'default';
    if (question.question.includes('pattern') || question.question.includes('next')) {
      problemType = 'pattern';
    } else if (question.question.includes('probability') || question.question.includes('chance')) {
      problemType = 'probability';
    } else if (question.question.includes('if') || question.question.includes('then') || question.question.includes('friends')) {
      problemType = 'logic';
    }
    
    return solutions[problemType] || solutions.default;
  };

  // Helper function to shuffle options and track correct answer
  const createShuffledQuestion = (question, options, correctIndex, explanation, topic, difficulty) => {
    // Shuffle options and track where correct answer moves
    const shuffledOptions = options.map((option, index) => ({ option, originalIndex: index }));
    shuffledOptions.sort(() => Math.random() - 0.5);
    
    // Find new index of correct answer
    const newCorrectIndex = shuffledOptions.findIndex(item => item.originalIndex === correctIndex);
    
    return {
      question,
      options: shuffledOptions.map(item => item.option),
      correct: newCorrectIndex,
      explanation,
      topic,
      difficulty
    };
  };

  // Enhanced AMC-style question generation with year-appropriate content
  // Helper function to find LCM
  const findLCM = (a, b) => {
    return (a * b) / findGCD(a, b);
  };
  
  // Helper function to find GCD
  const findGCD = (a, b) => {
    return b === 0 ? a : findGCD(b, a % b);
  };
  
  const generateAMCQuestion = (topic, difficulty, year) => {
    const rand = Math.random();
    
    // Year-appropriate difficulty mapping
    const yearLevel = year <= 4 ? 'junior' : 'senior';
    
    // Number and Place Value (Topic 1)
    if (topic.id === 1) {
      if (yearLevel === 'junior') {
        // Year 3-4: AMC-style number sense and place value
        if (difficulty === 'easy') {
          const num = Math.floor(Math.random() * 900) + 100;
          const position = Math.floor(Math.random() * 3) + 1; // 1=ones, 2=tens, 3=hundreds
          const positions = ['ones', 'tens', 'hundreds'];
          const multiplier = Math.pow(10, position - 1);
          const answer = Math.floor(num / multiplier) % 10;
          
          return createShuffledQuestion(
            `What digit is in the ${positions[position-1]} place of ${num}?`,
            [String((answer + 1) % 10), String(answer), String((answer + 9) % 10), String((answer + 2) % 10)],
            1,
            `To find the ${positions[position-1]} digit:\nDivide by ${multiplier} and find remainder when divided by 10\n${num} ÷ ${multiplier} = ${Math.floor(num / multiplier)}\n${Math.floor(num / multiplier)} ÷ 10 remainder = ${answer}`,
            1,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const a = Math.floor(Math.random() * 50) + 10;
          const b = Math.floor(Math.random() * 50) + 10;
          const c = Math.floor(Math.random() * 50) + 10;
          const sum = a + b + c;
          const avg = Math.round(sum / 3);
          
          return createShuffledQuestion(
            `Three numbers have an average of ${avg}. If two of the numbers are ${a} and ${b}, what is the third number?`,
            [String(c - 1), String(c), String(c + 1), String(sum)],
            1,
            `Average = Sum ÷ Count\n${avg} = Sum ÷ 3\nSum = ${avg} × 3 = ${avg * 3}\nThird number = ${avg * 3} - ${a} - ${b} = ${c}`,
            1,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style number theory: Find smallest number with specific properties
          const factor1 = Math.floor(Math.random() * 5) + 2;
          const factor2 = Math.floor(Math.random() * 5) + 2;
          const factor3 = Math.floor(Math.random() * 5) + 2;
          const lcm = findLCM(findLCM(factor1, factor2), factor3);
          const answer = lcm;
          
          return createShuffledQuestion(
            `What is the smallest positive integer that is divisible by ${factor1}, ${factor2}, and ${factor3}?`,
            [String(answer - lcm), String(answer), String(answer + lcm), String(factor1 * factor2 * factor3)],
            1,
            `We need the Least Common Multiple (LCM) of ${factor1}, ${factor2}, and ${factor3}.\nLCM(${factor1}, ${factor2}) = ${findLCM(factor1, factor2)}\nLCM(${findLCM(factor1, factor2)}, ${factor3}) = ${answer}\nThe smallest number divisible by all three is ${answer}.`,
            1,
            'hard'
          );
        }
      } else {
        // Year 5-6: Advanced AMC-style number theory
        if (difficulty === 'easy') {
          const start = Math.floor(Math.random() * 20) + 1;
          const pattern = Math.floor(Math.random() * 5) + 2;
          const sequence = [start, start + pattern, start + pattern * 2, start + pattern * 3];
          const next = start + pattern * 4;
          
          return createShuffledQuestion(
            `Find the next number: ${sequence.join(', ')}`,
            [String(next - pattern), String(next), String(next + pattern), String(start + pattern * 5)],
            1,
            `The pattern adds ${pattern} each time:\n${start} + ${pattern} = ${start + pattern}\n${start + pattern} + ${pattern} = ${start + pattern * 2}\n${start + pattern * 3} + ${pattern} = ${next}`,
            1,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const num1 = Math.floor(Math.random() * 50) + 20;
          const num2 = Math.floor(Math.random() * 30) + 10;
          const sum = num1 + num2;
          const diff = Math.abs(num1 - num2);
          
          return createShuffledQuestion(
            `Two numbers have a sum of ${sum} and a difference of ${diff}. What is the larger number?`,
            [String(Math.max(num1, num2) - 1), String(Math.max(num1, num2)), String(Math.max(num1, num2) + 1), String(sum)],
            1,
            `Let's solve this step by step:\nIf the numbers are x and y:\nx + y = ${sum}\nx - y = ${diff}\nAdding: 2x = ${sum + diff}\nx = ${(sum + diff) / 2}\nThe larger number is ${Math.max(num1, num2)}`,
            1,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style advanced number theory: Sum of digits and divisibility
          const baseNum = Math.floor(Math.random() * 900) + 100;
          const digitSum = String(baseNum).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
          const nextNum = baseNum + 1;
          const nextDigitSum = String(nextNum).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
          const answer = nextDigitSum;
          
          return createShuffledQuestion(
            `The sum of the digits of ${baseNum} is ${digitSum}. What is the sum of the digits of ${nextNum}?`,
            [String(answer - 1), String(answer), String(answer + 1), String(digitSum + 1)],
            1,
            `Let's find the sum of digits of ${nextNum}:\n${nextNum} = ${String(nextNum).split('').join(' + ')} = ${answer}\nThe sum of digits is ${answer}.`,
            1,
            'hard'
          );
        }
      }
    }
    
    // Addition & Subtraction (Topic 2)
    if (topic.id === 2) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 50) + 20;
          const b = Math.floor(Math.random() * 30) + 15;
          const c = Math.floor(Math.random() * 20) + 10;
          const result = a + b - c;
          
          return createShuffledQuestion(
            `What is ${a} + ${b} - ${c}?`,
            [String(result - 1), String(result), String(result + 1), String(a + b + c)],
            1,
            `Step 1: ${a} + ${b} = ${a + b}\nStep 2: ${a + b} - ${c} = ${result}`,
            2,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const num1 = Math.floor(Math.random() * 100) + 50;
          const num2 = Math.floor(Math.random() * 80) + 30;
          const num3 = Math.floor(Math.random() * 60) + 20;
          const result = num1 - num2 + num3;
          
          return createShuffledQuestion(
            `What is ${num1} - ${num2} + ${num3}?`,
            [String(result - 2), String(result), String(result + 2), String(num1 + num2 + num3)],
            1,
            `Step 1: ${num1} - ${num2} = ${num1 - num2}\nStep 2: ${num1 - num2} + ${num3} = ${result}`,
            2,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style multi-step word problem with multiple operations
          const originalMoney = Math.floor(Math.random() * 200) + 100;
          const spent1 = Math.floor(Math.random() * 50) + 20;
          const earned = Math.floor(Math.random() * 80) + 40;
          const spent2 = Math.floor(Math.random() * 60) + 30;
          const finalMoney = originalMoney - spent1 + earned - spent2;
          
          return createShuffledQuestion(
            `Tom had $${originalMoney}. He spent $${spent1}, then earned $${earned}, and finally spent $${spent2}. How much money does he have now?`,
            [String(finalMoney - 5), String(finalMoney), String(finalMoney + 5), String(originalMoney + earned)],
            1,
            `Step 1: Start with $${originalMoney}\nStep 2: Spend $${spent1} → $${originalMoney - spent1}\nStep 3: Earn $${earned} → $${originalMoney - spent1 + earned}\nStep 4: Spend $${spent2} → $${finalMoney}\nTom now has $${finalMoney}.`,
            2,
            'hard'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 100) + 50;
          const b = Math.floor(Math.random() * 80) + 40;
          const c = Math.floor(Math.random() * 60) + 30;
          const d = Math.floor(Math.random() * 40) + 20;
          const result = a + b - c + d;
          
          return createShuffledQuestion(
            `What is ${a} + ${b} - ${c} + ${d}?`,
            [String(result - 3), String(result), String(result + 3), String(a + b + c + d)],
            1,
            `Step 1: ${a} + ${b} = ${a + b}\nStep 2: ${a + b} - ${c} = ${a + b - c}\nStep 3: ${a + b - c} + ${d} = ${result}`,
            2,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const students = Math.floor(Math.random() * 50) + 30;
          const boys = Math.floor(Math.random() * (students - 15)) + 10;
          const girls = students - boys;
          const newStudents = Math.floor(Math.random() * 20) + 10;
          const newTotal = students + newStudents;
          
          return createShuffledQuestion(
            `A class has ${students} students. ${boys} are boys and ${girls} are girls. If ${newStudents} more students join the class, how many students will there be?`,
            [String(newTotal - 1), String(newTotal), String(newTotal + 1), String(students + newStudents + 1)],
            1,
            `Current students: ${students}\nNew students joining: ${newStudents}\nTotal: ${students} + ${newStudents} = ${newTotal}`,
            2,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style complex word problem with multiple variables
          const totalStudents = Math.floor(Math.random() * 100) + 50;
          const boysRatio = Math.floor(Math.random() * 3) + 2;
          const girlsRatio = Math.floor(Math.random() * 3) + 2;
          const totalRatio = boysRatio + girlsRatio;
          const boys = Math.round((totalStudents * boysRatio) / totalRatio);
          const girls = totalStudents - boys;
          const newBoys = Math.floor(Math.random() * 10) + 5;
          const newGirls = Math.floor(Math.random() * 10) + 5;
          const finalTotal = totalStudents + newBoys + newGirls;
          
          return createShuffledQuestion(
            `A school has ${totalStudents} students in the ratio ${boysRatio}:${girlsRatio} (boys:girls). If ${newBoys} more boys and ${newGirls} more girls join, how many students will there be?`,
            [String(finalTotal - 2), String(finalTotal), String(finalTotal + 2), String(totalStudents + newBoys)],
            1,
            `Current students: ${totalStudents}\nBoys: ${boys}, Girls: ${girls}\nNew students: ${newBoys} + ${newGirls} = ${newBoys + newGirls}\nTotal: ${totalStudents} + ${newBoys + newGirls} = ${finalTotal}`,
            2,
            'hard'
          );
        }
      }
    }
    
    // Multiplication & Division (Topic 3)
    if (topic.id === 3) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 15) + 5;
          const b = Math.floor(Math.random() * 15) + 5;
          const product = a * b;
          
          return createShuffledQuestion(
            `What is ${a} × ${b}?`,
            [String(product - a), String(product), String(product + a), String(a + b)],
            1,
            `${a} × ${b} = ${product}\nThink of it as ${a} groups of ${b}: ${b} + ${b} + ... (${a} times) = ${product}`,
            3,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const total = Math.floor(Math.random() * 100) + 50;
          const divisor = Math.floor(Math.random() * 12) + 4;
          const quotient = Math.floor(total / divisor);
          const remainder = total % divisor;
          
          return createShuffledQuestion(
            `If ${total} students are divided into groups of ${divisor}, how many complete groups can be made?`,
            [String(quotient - 1), String(quotient), String(quotient + 1), String(Math.ceil(total / divisor))],
            1,
            `${total} ÷ ${divisor} = ${quotient} remainder ${remainder}\nSo ${quotient} complete groups can be made, with ${remainder} students left over.`,
            3,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style multi-step division with remainders
          const totalItems = Math.floor(Math.random() * 500) + 200;
          const boxes = Math.floor(Math.random() * 15) + 8;
          const itemsPerBox = Math.floor(totalItems / boxes);
          const remainder = totalItems % boxes;
          const extraBoxes = remainder > 0 ? 1 : 0;
          const totalBoxes = boxes + extraBoxes;
          
          return createShuffledQuestion(
            `A factory has ${totalItems} items to pack. Each box can hold ${itemsPerBox} items. How many boxes are needed to pack all items?`,
            [String(totalBoxes - 1), String(totalBoxes), String(totalBoxes + 1), String(boxes)],
            1,
            `${totalItems} ÷ ${itemsPerBox} = ${Math.floor(totalItems / itemsPerBox)} remainder ${remainder}\nSince we need to pack all items, we need ${Math.floor(totalItems / itemsPerBox)} + ${extraBoxes} = ${totalBoxes} boxes.`,
            3,
            'hard'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 20) + 10;
          const b = Math.floor(Math.random() * 20) + 10;
          const product = a * b;
          
          return createShuffledQuestion(
            `What is ${a} × ${b}?`,
            [String(product - a), String(product), String(product + a), String(a + b)],
            1,
            `${a} × ${b} = ${product}\nThink of it as ${a} groups of ${b}: ${b} + ${b} + ... (${a} times) = ${product}`,
            3,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const total = Math.floor(Math.random() * 200) + 100;
          const groups = Math.floor(Math.random() * 8) + 4;
          const studentsPerGroup = Math.floor(total / groups);
          const remainder = total % groups;
          
          return createShuffledQuestion(
            `There are ${total} students. They are divided into ${groups} equal groups. How many students are in each group?`,
            [String(studentsPerGroup - 1), String(studentsPerGroup), String(studentsPerGroup + 1), String(Math.ceil(total / groups))],
            1,
            `${total} ÷ ${groups} = ${studentsPerGroup} remainder ${remainder}\nEach group has ${studentsPerGroup} students${remainder > 0 ? `, with ${remainder} students left over` : ''}.`,
            3,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style complex multiplication with multiple operations
          const basePrice = Math.floor(Math.random() * 20) + 10;
          const quantity = Math.floor(Math.random() * 15) + 8;
          const discount = Math.floor(Math.random() * 3) + 1;
          const tax = Math.floor(Math.random() * 2) + 1;
          const subtotal = basePrice * quantity;
          const discountAmount = Math.floor(subtotal * discount / 100);
          const afterDiscount = subtotal - discountAmount;
          const taxAmount = Math.floor(afterDiscount * tax / 100);
          const finalTotal = afterDiscount + taxAmount;
          
          return createShuffledQuestion(
            `A store sells items for $${basePrice} each. If you buy ${quantity} items with a ${discount}% discount and ${tax}% tax, what is the total cost?`,
            [String(finalTotal - 2), String(finalTotal), String(finalTotal + 2), String(subtotal)],
            1,
            `Step 1: Subtotal = $${basePrice} × ${quantity} = $${subtotal}\nStep 2: Discount = $${subtotal} × ${discount}% = $${discountAmount}\nStep 3: After discount = $${subtotal} - $${discountAmount} = $${afterDiscount}\nStep 4: Tax = $${afterDiscount} × ${tax}% = $${taxAmount}\nStep 5: Total = $${afterDiscount} + $${taxAmount} = $${finalTotal}`,
            3,
            'hard'
          );
        }
      }
    }
    
    // Fractions (Topic 4)
    if (topic.id === 4) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const num1 = Math.floor(Math.random() * 4) + 1;
          const den1 = Math.floor(Math.random() * 5) + 2;
          const num2 = Math.floor(Math.random() * 3) + 1;
          const den2 = den1; // Same denominator for easier addition
          const resultNum = num1 + num2;
          const result = `${resultNum}/${den1}`;
          
          return createShuffledQuestion(
            `What is ${num1}/${den1} + ${num2}/${den1}?`,
            [`${resultNum - 1}/${den1}`, result, `${resultNum + 1}/${den1}`, `${num1 + num2}/${den1 + den1}`],
            1,
            `When denominators are the same, add the numerators:\n${num1}/${den1} + ${num2}/${den1} = ${resultNum}/${den1}`,
            4,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const num1 = Math.floor(Math.random() * 5) + 1;
          const den1 = Math.floor(Math.random() * 6) + 2;
          const num2 = Math.floor(Math.random() * 4) + 1;
          const den2 = Math.floor(Math.random() * 6) + 2;
          const lcm = findLCM(den1, den2);
          const newNum1 = num1 * (lcm / den1);
          const newNum2 = num2 * (lcm / den2);
          const resultNum = newNum1 + newNum2;
          const result = `${resultNum}/${lcm}`;
          
          return createShuffledQuestion(
            `What is ${num1}/${den1} + ${num2}/${den2}?`,
            [`${resultNum - 1}/${lcm}`, result, `${resultNum + 1}/${lcm}`, `${num1 + num2}/${den1 + den2}`],
            1,
            `Find common denominator: ${den1} × ${den2} = ${lcm}\nConvert: ${num1}/${den1} = ${newNum1}/${lcm}, ${num2}/${den2} = ${newNum2}/${lcm}\nAdd: ${newNum1}/${lcm} + ${newNum2}/${lcm} = ${result}`,
            4,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style fraction word problem with mixed numbers
          const whole1 = Math.floor(Math.random() * 3) + 1;
          const num1 = Math.floor(Math.random() * 3) + 1;
          const den1 = Math.floor(Math.random() * 4) + 2;
          const whole2 = Math.floor(Math.random() * 2) + 1;
          const num2 = Math.floor(Math.random() * 2) + 1;
          const den2 = Math.floor(Math.random() * 4) + 2;
          
          const improper1 = whole1 * den1 + num1;
          const improper2 = whole2 * den2 + num2;
          const lcm = findLCM(den1, den2);
          const newNum1 = improper1 * (lcm / den1);
          const newNum2 = improper2 * (lcm / den2);
          const resultNum = newNum1 + newNum2;
          const result = `${resultNum}/${lcm}`;
          
          return createShuffledQuestion(
            `What is ${whole1} ${num1}/${den1} + ${whole2} ${num2}/${den2}?`,
            [`${resultNum - 1}/${lcm}`, result, `${resultNum + 1}/${lcm}`, `${improper1 + improper2}/${den1 + den2}`],
            1,
            `Convert to improper fractions:\n${whole1} ${num1}/${den1} = ${improper1}/${den1}\n${whole2} ${num2}/${den2} = ${improper2}/${den2}\nFind common denominator and add:\n${improper1}/${den1} + ${improper2}/${den2} = ${result}`,
            4,
            'hard'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const num1 = Math.floor(Math.random() * 6) + 1;
          const den1 = Math.floor(Math.random() * 8) + 2;
          const num2 = Math.floor(Math.random() * 5) + 1;
          const den2 = Math.floor(Math.random() * 8) + 2;
          const lcm = findLCM(den1, den2);
          const newNum1 = num1 * (lcm / den1);
          const newNum2 = num2 * (lcm / den2);
          const resultNum = newNum1 + newNum2;
          const result = `${resultNum}/${lcm}`;
          
          return createShuffledQuestion(
            `What is ${num1}/${den1} + ${num2}/${den2}?`,
            [`${resultNum - 1}/${lcm}`, result, `${resultNum + 1}/${lcm}`, `${num1 + num2}/${den1 + den2}`],
            1,
            `Find common denominator: ${den1} × ${den2} = ${lcm}\nConvert: ${num1}/${den1} = ${newNum1}/${lcm}, ${num2}/${den2} = ${newNum2}/${lcm}\nAdd: ${newNum1}/${lcm} + ${newNum2}/${lcm} = ${result}`,
            4,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const num1 = Math.floor(Math.random() * 7) + 1;
          const den1 = Math.floor(Math.random() * 9) + 2;
          const num2 = Math.floor(Math.random() * 6) + 1;
          const den2 = Math.floor(Math.random() * 9) + 2;
          const num3 = Math.floor(Math.random() * 5) + 1;
          const den3 = Math.floor(Math.random() * 9) + 2;
          
          // Find LCM of all three denominators
          const lcm12 = findLCM(den1, den2);
          const lcm = findLCM(lcm12, den3);
          const newNum1 = num1 * (lcm / den1);
          const newNum2 = num2 * (lcm / den2);
          const newNum3 = num3 * (lcm / den3);
          const resultNum = newNum1 + newNum2 + newNum3;
          const result = `${resultNum}/${lcm}`;
          
          return createShuffledQuestion(
            `What is ${num1}/${den1} + ${num2}/${den2} + ${num3}/${den3}?`,
            [`${resultNum - 1}/${lcm}`, result, `${resultNum + 1}/${lcm}`, `${num1 + num2 + num3}/${den1 + den2 + den3}`],
            1,
            `Find common denominator: LCM of ${den1}, ${den2}, ${den3} = ${lcm}\nConvert all fractions and add numerators:\n${num1}/${den1} + ${num2}/${den2} + ${num3}/${den3} = ${result}`,
            4,
            'medium'
          );
        } else if (difficulty === 'hard') {
          // AMC-style complex fraction operations with mixed operations
          const num1 = Math.floor(Math.random() * 5) + 1;
          const den1 = Math.floor(Math.random() * 6) + 2;
          const num2 = Math.floor(Math.random() * 4) + 1;
          const den2 = Math.floor(Math.random() * 6) + 2;
          const num3 = Math.floor(Math.random() * 3) + 1;
          const den3 = Math.floor(Math.random() * 6) + 2;
          
          // (a/b + c/d) - e/f
          const lcm12 = findLCM(den1, den2);
          const lcm = findLCM(lcm12, den3);
          const newNum1 = num1 * (lcm / den1);
          const newNum2 = num2 * (lcm / den2);
          const newNum3 = num3 * (lcm / den3);
          const resultNum = newNum1 + newNum2 - newNum3;
          const result = `${resultNum}/${lcm}`;
          
          return createShuffledQuestion(
            `What is (${num1}/${den1} + ${num2}/${den2}) - ${num3}/${den3}?`,
            [`${resultNum - 1}/${lcm}`, result, `${resultNum + 1}/${lcm}`, `${num1 + num2 - num3}/${den1 + den2 + den3}`],
            1,
            `Step 1: Add ${num1}/${den1} + ${num2}/${den2}\nFind common denominator ${lcm}:\n${newNum1}/${lcm} + ${newNum2}/${lcm} = ${newNum1 + newNum2}/${lcm}\nStep 2: Subtract ${num3}/${den3}\n${newNum1 + newNum2}/${lcm} - ${newNum3}/${lcm} = ${result}`,
            4,
            'hard'
          );
        }
      }
    }
    
    // Geometry (Topic 5)
    if (topic.id === 5) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const sides = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5 sides
          const shapes = {3: 'triangle', 4: 'square', 5: 'pentagon'};
          const shape = shapes[sides];
          
          return createShuffledQuestion(
            `How many sides does a ${shape} have?`,
            [String(sides - 1), String(sides), String(sides + 1), String(sides + 2)],
            1,
            `A ${shape} has ${sides} sides. You can count them: 1, 2, 3${sides > 3 ? ', 4' : ''}${sides > 4 ? ', 5' : ''}!`,
            5,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const length = Math.floor(Math.random() * 8) + 3;
          const width = Math.floor(Math.random() * 6) + 2;
          const perimeter = 2 * (length + width);
          
          return createShuffledQuestion(
            `A rectangle has length ${length}cm and width ${width}cm. What is its perimeter?`,
            [String(perimeter - 4), String(perimeter), String(perimeter + 4), String(length * width)],
            1,
            `Perimeter = 2 × (length + width)\n= 2 × (${length} + ${width})\n= 2 × ${length + width}\n= ${perimeter}cm`,
            5,
            'medium'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const base = Math.floor(Math.random() * 8) + 4;
          const height = Math.floor(Math.random() * 6) + 3;
          const area = Math.floor((base * height) / 2);
          
          return createShuffledQuestion(
            `A triangle has base ${base}cm and height ${height}cm. What is its area?`,
            [String(area - 2), String(area), String(area + 2), String(base * height)],
            1,
            `Area of triangle = ½ × base × height\n= ½ × ${base} × ${height}\n= ½ × ${base * height}\n= ${area}cm²`,
            5,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const radius = Math.floor(Math.random() * 5) + 2;
          const diameter = radius * 2;
          const circumference = Math.round(2 * Math.PI * radius);
          
          return createShuffledQuestion(
            `A circle has radius ${radius}cm. What is its circumference? (Use π ≈ 3.14)`,
            [String(circumference - 2), String(circumference), String(circumference + 2), String(diameter)],
            1,
            `Circumference = 2 × π × radius\n= 2 × 3.14 × ${radius}\n= 6.28 × ${radius}\n≈ ${circumference}cm`,
            5,
            'medium'
          );
        }
      }
    }
    
    // Measurement (Topic 6)
    if (topic.id === 6) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const startHour = Math.floor(Math.random() * 12) + 1;
          const startMin = Math.floor(Math.random() * 4) * 15;
          const addHours = Math.floor(Math.random() * 3) + 1;
          const addMins = Math.floor(Math.random() * 3) * 15;
          
          let endHour = startHour + addHours;
          let endMin = startMin + addMins;
          if (endMin >= 60) {
            endHour += 1;
            endMin -= 60;
          }
          if (endHour > 12) endHour -= 12;
          
          const startTime = `${startHour}:${startMin.toString().padStart(2, '0')}`;
          const endTime = `${endHour}:${endMin.toString().padStart(2, '0')}`;
          
          return createShuffledQuestion(
            `What time will it be ${addHours} hours and ${addMins} minutes after ${startTime}?`,
            [`${endHour}:${(endMin - 15).toString().padStart(2, '0')}`, endTime, `${endHour}:${(endMin + 15).toString().padStart(2, '0')}`, `${startHour + addHours}:${startMin}`],
            1,
            `Starting at ${startTime}\n+ ${addHours} hours = ${startHour + addHours}:${startMin.toString().padStart(2, '0')}\n+ ${addMins} minutes = ${endTime}`,
            6,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const dollars = Math.floor(Math.random() * 10) + 1;
          const cents = Math.floor(Math.random() * 4) * 25;
          const total = dollars * 100 + cents;
          const spent = Math.floor(Math.random() * 5) * 25 + 25;
          const remaining = total - spent;
          
          return createShuffledQuestion(
            `Tom has $${dollars}.${cents.toString().padStart(2, '0')}. He spends $${(spent/100).toFixed(2)}. How much does he have left?`,
            [`$${(remaining/100 - 0.25).toFixed(2)}`, `$${(remaining/100).toFixed(2)}`, `$${(remaining/100 + 0.25).toFixed(2)}`, `$${(total/100).toFixed(2)}`],
            1,
            `Starting: $${(total/100).toFixed(2)}\nSpent: $${(spent/100).toFixed(2)}\nRemaining: $${(remaining/100).toFixed(2)}`,
            6,
            'medium'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const length = Math.floor(Math.random() * 10) + 5;
          const width = Math.floor(Math.random() * 8) + 3;
          const area = length * width;
          const perimeter = 2 * (length + width);
          
          return createShuffledQuestion(
            `A rectangle has length ${length}m and width ${width}m. What is its area?`,
            [String(area - width), String(area), String(area + width), String(perimeter)],
            1,
            `Area = length × width\n= ${length} × ${width}\n= ${area}m²`,
            6,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const distance = Math.floor(Math.random() * 50) + 20;
          const speed = Math.floor(Math.random() * 10) + 5;
          const time = Math.round(distance / speed);
          
          return createShuffledQuestion(
            `A car travels ${distance}km at ${speed}km/h. How many hours does the trip take?`,
            [String(time - 1), String(time), String(time + 1), String(distance + speed)],
            1,
            `Time = Distance ÷ Speed\n= ${distance} ÷ ${speed}\n= ${time} hours`,
            6,
            'medium'
          );
        }
      }
    }
    
    // Patterns (Topic 7)
    if (topic.id === 7) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const shapes = ['🔴', '🔵', '🟡', '🟢'];
          const pattern = shapes.slice(0, Math.floor(Math.random() * 3) + 2);
          const sequence = [...pattern, ...pattern, ...pattern.slice(0, 2)];
          const next = pattern[2] || pattern[0];
          
          return createShuffledQuestion(
            `What comes next in this pattern?\n${sequence.join(' ')}`,
            [pattern[pattern.length - 1], next, shapes[Math.floor(Math.random() * shapes.length)], pattern[0]],
            1,
            `The pattern repeats: ${pattern.join(' ')}\nAfter ${sequence.join(' ')}, the next shape is ${next}`,
            7,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const start = Math.floor(Math.random() * 10) + 1;
          const addend = Math.floor(Math.random() * 5) + 2;
          const sequence = [start, start + addend, start + addend * 2, start + addend * 3];
          const next = start + addend * 4;
          
          return createShuffledQuestion(
            `Find the next number: ${sequence.join(', ')}`,
            [String(next - addend), String(next), String(next + addend), String(start + addend * 5)],
            1,
            `Each number adds ${addend}:\n${start} + ${addend} = ${start + addend}\n${start + addend} + ${addend} = ${start + addend * 2}\n${start + addend * 3} + ${addend} = ${next}`,
            7,
            'medium'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const start = Math.floor(Math.random() * 10) + 1;
          const multiplier = Math.floor(Math.random() * 3) + 2;
          const sequence = [start, start * multiplier, start * multiplier * multiplier];
          const next = start * multiplier * multiplier * multiplier;
          
          return createShuffledQuestion(
            `Find the next number: ${sequence.join(', ')}`,
            [String(next - multiplier), String(next), String(next + multiplier), String(start * multiplier * multiplier)],
            1,
            `Each number is multiplied by ${multiplier}:\n${start} × ${multiplier} = ${start * multiplier}\n${start * multiplier} × ${multiplier} = ${start * multiplier * multiplier}\n${start * multiplier * multiplier} × ${multiplier} = ${next}`,
            7,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const start = Math.floor(Math.random() * 5) + 1;
          const sequence = [start, start * 2, start * 2 + 1, (start * 2 + 1) * 2];
          const next = (start * 2 + 1) * 2 + 1;
          
          return createShuffledQuestion(
            `Find the next number: ${sequence.join(', ')}`,
            [String(next - 1), String(next), String(next + 1), String(next * 2)],
            1,
            `Pattern: multiply by 2, then add 1, repeat\n${start} × 2 = ${start * 2}\n${start * 2} + 1 = ${start * 2 + 1}\n${start * 2 + 1} × 2 = ${(start * 2 + 1) * 2}\n${(start * 2 + 1) * 2} + 1 = ${next}`,
            7,
            'medium'
          );
        }
      }
    }
    
    // Problem Solving (Topic 8)
    if (topic.id === 8) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const num1 = Math.floor(Math.random() * 10) + 5;
          const num2 = Math.floor(Math.random() * 10) + 5;
          const sum = num1 + num2;
          const product = num1 * num2;
          
          return createShuffledQuestion(
            `Two numbers add to ${sum} and multiply to ${product}. What is the larger number?`,
            [String(Math.max(num1, num2) - 1), String(Math.max(num1, num2)), String(Math.max(num1, num2) + 1), String(sum)],
            1,
            `The numbers are ${num1} and ${num2}.\n${num1} + ${num2} = ${sum} ✓\n${num1} × ${num2} = ${product} ✓\nThe larger number is ${Math.max(num1, num2)}.`,
            8,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const total = Math.floor(Math.random() * 200) + 100;
          const ratio1 = Math.floor(Math.random() * 4) + 2;
          const ratio2 = Math.floor(Math.random() * 4) + 2;
          const totalRatio = ratio1 + ratio2;
          const part1 = Math.round((total * ratio1) / totalRatio);
          const part2 = total - part1;
          
          return createShuffledQuestion(
            `A sum of $${total} is divided in the ratio ${ratio1}:${ratio2}. What is the larger part?`,
            [String(part1 - 1), String(Math.max(part1, part2)), String(Math.max(part1, part2) + 1), String(total)],
            1,
            `Total parts: ${ratio1} + ${ratio2} = ${totalRatio}\nPart 1: ${total} × ${ratio1}/${totalRatio} = $${part1}\nPart 2: ${total} × ${ratio2}/${totalRatio} = $${part2}\nThe larger part is $${Math.max(part1, part2)}.`,
            8,
            'medium'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const age1 = Math.floor(Math.random() * 15) + 10;
          const age2 = Math.floor(Math.random() * 15) + 10;
          const sum = age1 + age2;
          const diff = Math.abs(age1 - age2);
          
          return createShuffledQuestion(
            `Two friends have ages that add to ${sum} and have a difference of ${diff}. What is the older friend's age?`,
            [String(Math.max(age1, age2) - 1), String(Math.max(age1, age2)), String(Math.max(age1, age2) + 1), String(sum)],
            1,
            `Let's solve:\nIf ages are x and y:\nx + y = ${sum}\nx - y = ${diff}\nAdding: 2x = ${sum + diff}\nx = ${(sum + diff) / 2}\nThe older friend is ${Math.max(age1, age2)} years old.`,
            8,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const total = Math.floor(Math.random() * 300) + 150;
          const ratio1 = Math.floor(Math.random() * 5) + 2;
          const ratio2 = Math.floor(Math.random() * 5) + 2;
          const ratio3 = Math.floor(Math.random() * 4) + 1;
          const totalRatio = ratio1 + ratio2 + ratio3;
          const part1 = Math.round((total * ratio1) / totalRatio);
          const part2 = Math.round((total * ratio2) / totalRatio);
          const part3 = total - part1 - part2;
          
          return createShuffledQuestion(
            `A sum of $${total} is divided in the ratio ${ratio1}:${ratio2}:${ratio3}. What is the largest part?`,
            [String(part1 - 1), String(Math.max(part1, part2, part3)), String(Math.max(part1, part2, part3) + 1), String(total)],
            1,
            `Total parts: ${ratio1} + ${ratio2} + ${ratio3} = ${totalRatio}\nPart 1: ${total} × ${ratio1}/${totalRatio} = $${part1}\nPart 2: ${total} × ${ratio2}/${totalRatio} = $${part2}\nPart 3: ${total} × ${ratio3}/${totalRatio} = $${part3}\nThe largest part is $${Math.max(part1, part2, part3)}.`,
            8,
            'medium'
          );
        }
      }
    }
    
    // Probability (Topic 9)
    if (topic.id === 9) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const redMarbles = Math.floor(Math.random() * 4) + 2;
          const blueMarbles = Math.floor(Math.random() * 4) + 3;
          const total = redMarbles + blueMarbles;
          const probability = redMarbles / total;
          
          return createShuffledQuestion(
            `A bag has ${redMarbles} red marbles and ${blueMarbles} blue marbles. What's the probability of drawing a red marble?`,
            [`${redMarbles}/${total}`, `${redMarbles}/${blueMarbles}`, `${blueMarbles}/${total}`, `${total}/${redMarbles}`],
            0,
            `Total marbles = ${redMarbles} + ${blueMarbles} = ${total}\nRed marbles = ${redMarbles}\nProbability = ${redMarbles}/${total}`,
            9,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const sides = Math.floor(Math.random() * 4) + 4; // 4, 5, 6, or 7 sides
          const target = Math.floor(Math.random() * sides) + 1;
          const probability = 1 / sides;
          
          return createShuffledQuestion(
            `A ${sides}-sided die is rolled. What's the probability of rolling a ${target}?`,
            [`1/${sides}`, `${target}/${sides}`, `1/${target}`, `${sides}/1`],
            0,
            `Total possible outcomes = ${sides}\nFavorable outcomes = 1 (rolling ${target})\nProbability = 1/${sides}`,
            9,
            'medium'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const total = Math.floor(Math.random() * 20) + 10;
          const favorable = Math.floor(Math.random() * (total - 5)) + 3;
          const probability = favorable / total;
          
          return createShuffledQuestion(
            `In a class of ${total} students, ${favorable} are wearing red shirts. What's the probability that a randomly chosen student is wearing red?`,
            [`${favorable}/${total}`, `${total}/${favorable}`, `${favorable}/${total - favorable}`, `${total - favorable}/${total}`],
            0,
            `Total students = ${total}\nStudents wearing red = ${favorable}\nProbability = ${favorable}/${total}`,
            9,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const red = Math.floor(Math.random() * 5) + 3;
          const blue = Math.floor(Math.random() * 5) + 3;
          const green = Math.floor(Math.random() * 5) + 2;
          const total = red + blue + green;
          const notRed = blue + green;
          const probability = notRed / total;
          
          return createShuffledQuestion(
            `A bag has ${red} red, ${blue} blue, and ${green} green marbles. What's the probability of NOT drawing a red marble?`,
            [`${notRed}/${total}`, `${red}/${total}`, `${total}/${notRed}`, `${notRed}/${red}`],
            0,
            `Total marbles = ${red} + ${blue} + ${green} = ${total}\nNon-red marbles = ${blue} + ${green} = ${notRed}\nProbability = ${notRed}/${total}`,
            9,
            'medium'
          );
        }
      }
    }
    
    // Logic (Topic 10)
    if (topic.id === 10) {
      if (yearLevel === 'junior') {
        if (difficulty === 'easy') {
          const num1 = Math.floor(Math.random() * 5) + 1;
          const num2 = Math.floor(Math.random() * 5) + 1;
          const num3 = Math.floor(Math.random() * 5) + 1;
          const sum = num1 + num2 + num3;
          const avg = Math.round(sum / 3);
          
          return createShuffledQuestion(
            `Three numbers are ${num1}, ${num2}, and ${num3}. What is their average?`,
            [String(avg - 1), String(avg), String(avg + 1), String(sum)],
            1,
            `Average = Sum ÷ Count\n= (${num1} + ${num2} + ${num3}) ÷ 3\n= ${sum} ÷ 3\n= ${avg}`,
            10,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const total = Math.floor(Math.random() * 30) + 20;
          const first = Math.floor(Math.random() * 10) + 5;
          const second = Math.floor(Math.random() * 10) + 5;
          const third = total - first - second;
          
          return createShuffledQuestion(
            `Three numbers add to ${total}. The first is ${first} and the second is ${second}. What is the third number?`,
            [String(third - 1), String(third), String(third + 1), String(total)],
            1,
            `Total = First + Second + Third\n${total} = ${first} + ${second} + Third\nThird = ${total} - ${first} - ${second} = ${third}`,
            10,
            'medium'
          );
        }
      } else {
        if (difficulty === 'easy') {
          const a = Math.floor(Math.random() * 10) + 1;
          const b = Math.floor(Math.random() * 10) + 1;
          const c = Math.floor(Math.random() * 10) + 1;
          const result = a + b * c;
          
          return createShuffledQuestion(
            `What is ${a} + ${b} × ${c}?`,
            [String(result - 1), String(result), String(result + 1), String((a + b) * c)],
            1,
            `Follow order of operations: multiplication first\n${b} × ${c} = ${b * c}\n${a} + ${b * c} = ${result}`,
            10,
            'easy'
          );
        } else if (difficulty === 'medium') {
          const x = Math.floor(Math.random() * 10) + 1;
          const y = Math.floor(Math.random() * 10) + 1;
          const equation = `${x} + ${y} = ${x + y}`;
          const wrong1 = x + y + 1;
          const wrong2 = x + y - 1;
          const wrong3 = x * y;
          
          return createShuffledQuestion(
            `If ${x} + ${y} = ${x + y}, what is ${x + y} + ${x}?`,
            [String(wrong1), String((x + y) + x), String(wrong2), String(wrong3)],
            1,
            `We know ${x} + ${y} = ${x + y}\nSo ${x + y} + ${x} = ${(x + y) + x}`,
            10,
            'medium'
          );
        }
      }
    }
    
      // Default fallback question - ensure correct answer is properly set
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const sum = a + b;
  
  return createShuffledQuestion(
    `What is ${a} + ${b}?`,
    [String(sum - 1), String(sum), String(sum + 1), String(sum + 2)],
    1, // Correct answer is at index 1 (sum)
    `Basic addition: ${a} + ${b} = ${sum}`,
    topic.id,
    'easy'
  );
  };

  // Legacy function for backward compatibility
  const generateDynamicQuestion = (topic, difficulty) => {
    return generateAMCQuestion(topic, difficulty, users[currentUser].year);
  };

  const generateSmartQuestions = (topic, count, baseLevel) => {
    const yearQuestions = sampleQuestions[users[currentUser].year];
    const topicStats = userStats[currentUser].topicStats?.[topic.id];
    const performance = getTopicPerformance(topic.id);
    
    let distribution = { easy: 0.3, medium: 0.5, hard: 0.2 };
    if (performance < 50) {
      distribution = { easy: 0.6, medium: 0.3, hard: 0.1 };
    } else if (performance > 80) {
      distribution = { easy: 0.1, medium: 0.4, hard: 0.5 };
    }
    
    const questions = [];
    const usedQuestions = new Set();
    
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let selectedDifficulty = 'medium';
      if (rand < distribution.easy) selectedDifficulty = 'easy';
      else if (rand < distribution.easy + distribution.medium) selectedDifficulty = 'medium';
      else selectedDifficulty = 'hard';
      
      if (Math.random() > 0.3) {
        const dynamicQ = generateAMCQuestion(topic, selectedDifficulty, users[currentUser].year);
        if (dynamicQ) {
          questions.push(dynamicQ);
          continue;
        }
      }
      
      const availableQuestions = yearQuestions[selectedDifficulty]?.filter(q => 
        q.topic === topic.id && !usedQuestions.has(q.question)
      ) || [];
      
      if (availableQuestions.length > 0) {
        const selected = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
        questions.push({...selected});
        usedQuestions.add(selected.question);
      } else {
        const anyQuestions = yearQuestions[selectedDifficulty] || yearQuestions['medium'] || [];
        if (anyQuestions.length > 0) {
          const selected = anyQuestions[Math.floor(Math.random() * anyQuestions.length)];
          questions.push({...selected});
        }
      }
    }
    
    while (questions.length < count && yearQuestions['medium']) {
      const selected = yearQuestions['medium'][Math.floor(Math.random() * yearQuestions['medium'].length)];
      questions.push({...selected});
    }
    
    return questions;
  };

  // Avatar Component
  const Avatar = ({ user, size = 'large' }) => {
    const sizeClasses = {
      small: 'w-12 h-12',
      medium: 'w-16 h-16',
      large: 'w-24 h-24',
      xlarge: 'w-32 h-32'
    };
    
    return (
      <div className={`${sizeClasses[size]} rounded-full ${users[user].color} ${users[user].borderColor} border-4 flex items-center justify-center overflow-hidden shadow-lg transform transition-transform hover:scale-110 hover:rotate-3`}>
        {users[user].avatarUrl ? (
          <img 
            src={users[user].avatarUrl} 
            alt={`${user} avatar`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}
        <div className={`text-4xl ${users[user].avatarUrl ? 'hidden' : ''}`}>
          {users[user].avatar}
        </div>
      </div>
    );
  };

  const Header = () => (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <School className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-900">AMC Math Practice</h1>
            <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Annie & Bella's Learning Hub</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={() => {
              setCurrentUser(currentUser === 'Annie' ? 'Bella' : 'Annie');
              setCurrentScreen('home');
            }}
            className="flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <Avatar user={currentUser} size="small" />
            <div className="text-left hidden sm:block">
              <span className="font-medium block">{currentUser}</span>
              <span className="text-xs text-gray-500">Year {users[currentUser].year}</span>
            </div>
            <ChevronDown className="w-4 h-4 hidden sm:block" />
          </button>
        </div>
      </div>
    </header>
  );

  // Achievement Popup Component
  const AchievementPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      if (showAchievement) {
        setIsVisible(true);
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => {
            setShowAchievement(null);
            console.log('Achievement popup auto-closed');
          }, 300);
        }, 3700);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
      }
    }, [showAchievement]);
    
    // Force close if stuck for more than 10 seconds
    useEffect(() => {
      if (showAchievement) {
        const forceCloseTimer = setTimeout(() => {
          if (showAchievement) {
            console.log('Force closing stuck achievement popup');
            setShowAchievement(null);
            setIsVisible(false);
          }
        }, 10000);
        return () => clearTimeout(forceCloseTimer);
      }
    }, [showAchievement]);

    if (!showAchievement) return null;

    return (
      <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-95'
      }`}>
        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-6 rounded-2xl shadow-2xl relative">
          <button
            onClick={() => setShowAchievement(null)}
            className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
            title="Close achievement"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-5xl animate-pulse">{showAchievement.icon}</div>
            <div>
              <h3 className="text-xl font-bold">Achievement Unlocked!</h3>
              <p className="text-lg">{showAchievement.name}</p>
              <p className="text-sm opacity-90">{showAchievement.desc}</p>
              <div className="mt-2 flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-pulse" />
        </div>
      </div>
    );
  };

  const Navigation = () => {
    const navItems = [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'practice', label: 'Practice', icon: BookOpen },
      { id: 'progress', label: 'Progress', icon: TrendingUp },
      { id: 'help', label: 'Help', icon: HelpCircle }
    ];

    return (
      <nav className="bg-white border-b border-gray-200 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-start md:justify-center space-x-4 md:space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className={`flex items-center space-x-2 px-3 md:px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  currentScreen === item.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm md:text-base">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    );
  };

  const HomeScreen = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-100 rounded-full -mr-16 -mt-16 md:-mr-32 md:-mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-purple-100 rounded-full -ml-12 -mb-12 md:-ml-24 md:-mb-24 opacity-50"></div>
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 text-center md:text-left">
            <Avatar user={currentUser} size="xlarge" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome back, {currentUser}! 👋</h2>
              <p className="text-base md:text-lg text-gray-700 mb-3">Ready to practice some amazing math problems?</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-sm font-medium shadow-sm">
                  🎓 Year {users[currentUser].year}
                </span>
                <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-sm font-medium shadow-sm">
                  🎂 {users[currentUser].age} years old
                </span>
                <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-sm font-medium shadow-sm">
                  🏆 AMC Preparation
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2 italic">{users[currentUser].description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Practice Section */}
      {lastUsedTopic && (
        <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`bg-gradient-to-br ${lastUsedTopic.color} rounded-lg p-3 w-16 h-16 flex items-center justify-center`}>
                <div className="text-2xl">{lastUsedTopic.icon}</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Continue with {lastUsedTopic.name}</h3>
                <p className="text-sm text-gray-600">Smart practice • Adaptive difficulty</p>
              </div>
            </div>
            <button
              onClick={() => {
                const defaults = smartDefaults[currentUser];
                const questions = generateSmartQuestions(lastUsedTopic, defaults.questions, defaults.difficulty);
                
                setPracticeSession({
                  topic: lastUsedTopic,
                  difficulty: defaults.difficulty,
                  questions: questions,
                  totalQuestions: defaults.questions,
                  timeLimit: defaults.time,
                  isAdaptive: true
                });
                
                setCurrentQuestion(0);
                setAnswers([]);
                setTimeElapsed(0);
                setTimerActive(true);
                setAdaptiveDifficulty(defaults.difficulty);
                setCurrentScreen('question');
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <span>Quick Start</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Weekly Progress Summary */}
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">This Week's Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {userStats[currentUser].totalQuestions > 100 ? '+' : ''}{Math.min(userStats[currentUser].totalQuestions, 25)}
            </div>
            <p className="text-sm text-gray-600">Questions</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userStats[currentUser].accuracy}%</div>
            <p className="text-sm text-gray-600">Accuracy</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{userStats[currentUser].streak}</div>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {topics.filter(t => getTopicPerformance(t.id) >= 70).length}
            </div>
            <p className="text-sm text-gray-600">Topics Mastered</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={() => setCurrentScreen('practice')}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-900">Start Practice</h3>
          <p className="text-sm text-gray-600 mt-1">Begin your daily practice</p>
          <div className="mt-3 text-2xl">📚</div>
        </button>
        <button 
          onClick={() => setCurrentScreen('progress')}
          className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-900">View Progress</h3>
          <p className="text-sm text-gray-600 mt-1">Check your achievements</p>
          <div className="mt-3 text-2xl">📈</div>
        </button>
        <button 
          onClick={() => {
            setCurrentScreen('practice');
            const weakest = getRecommendedTopics()[0];
            if (weakest) {
              setTimeout(() => {
                const topicButton = document.querySelector(`[data-topic-id="${weakest.id}"]`);
                if (topicButton) topicButton.click();
              }, 100);
            }
          }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          <Target className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold text-gray-900">Focus Areas</h3>
          <p className="text-sm text-gray-600 mt-1">Practice weak topics</p>
          <div className="mt-3 text-2xl">🎯</div>
        </button>
        <button className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200">
          <Award className="w-8 h-8 text-amber-600 mb-3" />
          <h3 className="font-semibold text-gray-900">Daily Streak</h3>
          <p className="text-sm text-gray-600 mt-1">{userStats[currentUser].streak} days in a row!</p>
          <div className="mt-3 text-2xl">🔥</div>
        </button>
      </div>

      {/* Achievements Section */}
      {userStats[currentUser].badges.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Achievements</h3>
          <div className="flex space-x-3">
            {userStats[currentUser].badges.map((badge, idx) => (
              <div key={idx} className="bg-gradient-to-br from-yellow-100 to-amber-100 px-4 py-2 rounded-xl flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-gray-800">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's Goals */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Goals for {currentUser}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todayGoals[currentUser].map(goal => (
            <div key={goal.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{goal.icon}</span>
                <span className="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                  {Math.round((goal.progress / goal.total) * 100)}%
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{goal.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{goal.desc}</p>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`${goal.color} h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
                    style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                {goal.progress >= goal.total && (
                  <div className="absolute -right-2 -top-2">
                    <Check className="w-6 h-6 text-green-500 bg-white rounded-full p-1" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {goal.progress} / {goal.total}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Together */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 text-[200px] transform rotate-12">👭</div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex -space-x-4">
              <Avatar user="Annie" size="large" />
              <Avatar user="Bella" size="large" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Learning Together! 👯‍♀️</h3>
              <p className="text-gray-700 mb-3">
                {currentUser === 'Annie' ? 'Bella' : 'Annie'} is also practicing right now! 
                Why not work together on some problems?
              </p>
              <div className="flex items-center space-x-3">
                <div className="bg-white/50 backdrop-blur rounded-lg px-4 py-2">
                  <p className="text-sm font-medium text-gray-700">
                    {currentUser === 'Annie' ? 'Bella' : 'Annie'} is working on: 
                    <span className="text-purple-600 ml-1">Fractions</span>
                  </p>
                </div>
                <span className="text-sm text-gray-600 italic">
                  "Math is more fun together!"
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );

  const PracticeScreen = () => {
    const recommendedTopics = getRecommendedTopics();

    const quickStartPractice = () => {
      if (!selectedTopic) return;
      
      setLastUsedTopic(selectedTopic);
      const defaults = smartDefaults[currentUser];
      const questions = generateSmartQuestions(selectedTopic, defaults.questions, defaults.difficulty);
      
      setPracticeSession({
        topic: selectedTopic,
        difficulty: defaults.difficulty,
        questions: questions,
        totalQuestions: defaults.questions,
        timeLimit: defaults.time,
        isAdaptive: true
      });
      
      setCurrentQuestion(0);
      setAnswers([]);
      setTimeElapsed(0);
      setTimerActive(true);
      setAdaptiveDifficulty(defaults.difficulty);
      setCurrentScreen('question');
    };

    const startCustomPractice = () => {
      setLastUsedTopic(selectedTopic);
      const questions = generateSmartQuestions(selectedTopic, questionCount, selectedDifficulty);
      setPracticeSession({
        topic: selectedTopic,
        difficulty: selectedDifficulty,
        questions: questions,
        totalQuestions: questionCount,
        timeLimit: timeLimit,
        isAdaptive: false
      });
      setCurrentQuestion(0);
      setAnswers([]);
      setTimeElapsed(0);
      if (timeLimit > 0) {
        setTimerActive(true);
      }
      setAdaptiveDifficulty(null);
      setCurrentScreen('question');
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Time! 🎯</h2>
        
        {/* Recommended Topics */}
        {recommendedTopics.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              Recommended for You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {recommendedTopics.map(topic => (
                <button
                  key={topic.id}
                  data-topic-id={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  onTouchStart={() => {}} // Prevent double-tap zoom
                  className={`p-4 rounded-xl border-2 transition-all bg-gradient-to-br from-purple-50 to-indigo-50 hover:shadow-md touch-manipulation ${
                    selectedTopic?.id === topic.id ? 'border-purple-500 shadow-lg' : 'border-purple-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`bg-gradient-to-br ${topic.color} rounded-lg p-2 w-12 h-12 flex items-center justify-center`}>
                      <div className="text-xl">{topic.icon}</div>
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-medium text-gray-900">{topic.name}</h4>
                      <p className="text-xs text-purple-600 mt-1">
                        {topic.performance}% mastery
                      </p>
                      <p className="text-xs text-gray-500">
                        {topic.daysSinceLastPractice === 0 
                          ? 'Practiced today' 
                          : topic.daysSinceLastPractice >= 30
                          ? 'Never practiced'
                          : `${topic.daysSinceLastPractice}d ago`}
                      </p>
                    </div>
                  </div>
                  {selectedTopic?.id === topic.id && (
                    <Check className="w-4 h-4 text-purple-600 mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* All Topics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">All Topics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {topics.map(topic => {
              const performance = getTopicPerformance(topic.id);
              const isRecommended = recommendedTopics.some(rt => rt.id === topic.id);
              
              return (
                <button
                  key={topic.id}
                  data-topic-id={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 relative ${
                    selectedTopic?.id === topic.id 
                      ? 'border-blue-500 shadow-lg bg-white' 
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      Recommended
                    </div>
                  )}
                  <div className={`bg-gradient-to-br ${topic.color} rounded-lg p-3 mb-2 mx-auto w-16 h-16 flex items-center justify-center`}>
                    <div className="text-2xl">{topic.icon}</div>
                  </div>
                  <h4 className="font-medium text-sm text-gray-900">{topic.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{topic.difficulty}</p>
                  {performance > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            performance >= 80 ? 'bg-green-500' : 
                            performance >= 60 ? 'bg-blue-500' : 
                            'bg-orange-500'
                          }`}
                          style={{ width: `${performance}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{performance}%</p>
                    </div>
                  )}
                  {selectedTopic?.id === topic.id && (
                    <div className="mt-1">
                      <Check className="w-4 h-4 text-blue-600 mx-auto" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Practice Mode Selection */}
        <div className="space-y-4">
          {!selectedTopic && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose a Topic First</h3>
                <p className="text-gray-600 mb-4">
                  Select a topic from above to start your practice session
                </p>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    📚 Pick any topic
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    🧠 Try recommended ones
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedTopic && (
            <>
              {/* Quick Start Option */}
              <div 
                className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 transition-all cursor-pointer ${
                  practiceMode === 'smart' ? 'border-blue-500 shadow-lg' : 'border-transparent'
                }`}
                onClick={() => setPracticeMode('smart')}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Smart Practice (Recommended)
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Let us choose the best settings based on your progress
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-medium">
                        📊 {smartDefaults[currentUser].difficulty} difficulty
                      </span>
                      <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-medium">
                        ❓ {smartDefaults[currentUser].questions} questions
                      </span>
                      <span className="px-3 py-1 bg-white/80 backdrop-blur rounded-full text-xs font-medium">
                        ⏱️ {smartDefaults[currentUser].time / 60} minutes
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      Difficulty adjusts based on your answers
                    </p>
                  </div>
                </div>
                {practiceMode === 'smart' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      quickStartPractice();
                    }}
                    data-quick-start="true"
                    className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Start Smart Practice</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Custom Practice Option */}
              <div 
                className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer ${
                  practiceMode === 'custom' ? 'border-purple-500 shadow-lg' : 'border-gray-200'
                }`}
                onClick={() => setPracticeMode('custom')}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white">
                      <Target className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-900 mb-1">
                      Custom Practice
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Choose your own difficulty, questions, and time
                    </p>
                  </div>
                </div>
                
                {practiceMode === 'custom' && (
                  <div className="mt-6 space-y-4">
                    {/* Enhanced Difficulty Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Difficulty Level</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {difficultyLevels.map(level => (
                          <button
                            key={level.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDifficulty(level.name);
                            }}
                            className={`p-3 rounded-lg border-2 transition-all text-left ${
                              selectedDifficulty === level.name
                                ? 'border-purple-500 bg-purple-50 text-purple-600'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              <div>
                                <div className="font-medium text-sm">{level.name}</div>
                                <div className="text-xs text-gray-500">{level.description}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Questions & Time - Compact Sliders */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Questions: {questionCount}
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="20"
                        step="5"
                        value={questionCount}
                        onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                        <span>20</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Time Limit: {timeLimit === 0 ? 'Untimed' : `${timeLimit / 60} min`}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="900"
                        step="300"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>None</span>
                        <span>5m</span>
                        <span>10m</span>
                        <span>15m</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startCustomPractice();
                      }}
                      className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Start Custom Practice</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-medium">{currentUser}'s Recent Performance:</span> 
                  {' '}{userStats[currentUser].accuracy}% accuracy • 
                  {' '}{userStats[currentUser].totalQuestions} questions completed
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const QuestionScreen = () => {
    const question = practiceSession.questions[currentQuestion];
    const currentDifficulty = adaptiveDifficulty || practiceSession.difficulty;
    
    useEffect(() => {
      if (practiceSession.timeLimit > 0 && timeElapsed >= practiceSession.timeLimit && timerActive) {
        setTimerActive(false);
        setCurrentScreen('results');
      }
    }, [timeElapsed, practiceSession.timeLimit, timerActive]);
    
    const handleAnswer = () => {
      if (selectedAnswer === null) return;
      
      const isCorrect = selectedAnswer === question.correct;
      
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setShowFeedback(true);
      
      if (!isCorrect) {
        const mistake = {
          question: question.question,
          userAnswer: question.options[selectedAnswer],
          correctAnswer: question.options[question.correct],
          topic: practiceSession.topic.id,
          date: Date.now()
        };
        setMistakeHistory(prev => [...prev.slice(-19), mistake]);
      }
      
      // Don't modify todayGoals as it's a constant - this was causing infinite re-renders
      const correctAnswers = newAnswers.filter((ans, idx) => ans === practiceSession.questions[idx].correct).length;
      const accuracy = Math.round((correctAnswers / newAnswers.length) * 100);
      
      const newStats = { ...userStats };
      newStats[currentUser].totalQuestions += 1;
      newStats[currentUser].accuracy = Math.round((newStats[currentUser].accuracy * (newStats[currentUser].totalQuestions - 1) + (isCorrect ? 100 : 0)) / newStats[currentUser].totalQuestions);
      
      // Enhanced analytics tracking
      const currentDifficulty = question.difficulty || 'medium';
      const currentTime = Date.now();
      
      // Track difficulty-specific performance
      if (!newStats[currentUser].accuracyByDifficulty[currentDifficulty]) {
        newStats[currentUser].accuracyByDifficulty[currentDifficulty] = 0;
      }
      if (!newStats[currentUser].questionsByDifficulty[currentDifficulty]) {
        newStats[currentUser].questionsByDifficulty[currentDifficulty] = 0;
      }
      
      const difficultyStats = newStats[currentUser].questionsByDifficulty[currentDifficulty];
      const currentAccuracy = newStats[currentUser].accuracyByDifficulty[currentDifficulty];
      newStats[currentUser].questionsByDifficulty[currentDifficulty] += 1;
      newStats[currentUser].accuracyByDifficulty[currentDifficulty] = Math.round(
        (currentAccuracy * difficultyStats + (isCorrect ? 100 : 0)) / (difficultyStats + 1)
      );
      
      // Track time analytics
      const questionTime = timeElapsed - (newStats[currentUser].totalTime || 0);
      newStats[currentUser].totalTime = timeElapsed;
      newStats[currentUser].averageTime = Math.round(
        ((newStats[currentUser].averageTime || 0) * (newStats[currentUser].totalQuestions - 1) + questionTime) / newStats[currentUser].totalQuestions
      );
      
      // Track daily and weekly questions
      const today = new Date().toDateString();
      const lastPracticeDate = newStats[currentUser].lastPracticeDate;
      if (lastPracticeDate !== today) {
        newStats[currentUser].questionsToday = 1;
        newStats[currentUser].lastPracticeDate = today;
      } else {
        newStats[currentUser].questionsToday += 1;
      }
      
      // Track mistake patterns
      if (!isCorrect) {
        const mistake = {
          topic: practiceSession.topic.id,
          difficulty: currentDifficulty,
          question: question.question,
          userAnswer: question.options[selectedAnswer],
          correctAnswer: question.options[question.correct],
          timestamp: currentTime
        };
        newStats[currentUser].mistakePatterns = [
          ...newStats[currentUser].mistakePatterns.slice(-9), // Keep last 10 mistakes
          mistake
        ];
      }
      
      // Calculate AMC readiness score
      const topicMastery = topics.map(t => getTopicPerformance(t.id)).filter(p => p >= 80).length;
      const difficultyMastery = newStats[currentUser].accuracyByDifficulty.hard || 0;
      const consistency = newStats[currentUser].streak || 0;
      newStats[currentUser].amcReadiness = Math.round(
        (topicMastery / topics.length * 40) + (difficultyMastery * 0.3) + (Math.min(consistency, 30) * 2)
      );
      
      const topicId = practiceSession.topic.id;
      if (!newStats[currentUser].topicStats[topicId]) {
        newStats[currentUser].topicStats[topicId] = { attempted: 0, correct: 0, lastPracticed: Date.now() };
      }
      newStats[currentUser].topicStats[topicId].attempted += 1;
      if (isCorrect) {
        newStats[currentUser].topicStats[topicId].correct += 1;
      }
      newStats[currentUser].topicStats[topicId].lastPracticed = Date.now();
      
      setUserStats(newStats);
      
      checkAchievements(newStats[currentUser]);
      
      if (practiceSession.isAdaptive && currentQuestion > 2) {
        const recentAnswers = newAnswers.slice(-3);
        const recentCorrect = recentAnswers.filter((ans, idx) => 
          ans === practiceSession.questions[newAnswers.length - 3 + idx].correct
        ).length;
        
        const recentDifficulties = practiceSession.questions
          .slice(newAnswers.length - 3, newAnswers.length)
          .map(q => q.difficulty || 'medium');
        
        if (recentCorrect === 3) {
          if (recentDifficulties.every(d => d === 'easy')) {
            setAdaptiveDifficulty('Medium');
            setShowDifficultyChange({ type: 'up', difficulty: 'Medium' });
          } else if (recentDifficulties.filter(d => d === 'medium').length >= 2) {
            setAdaptiveDifficulty('Hard');
            setShowDifficultyChange({ type: 'up', difficulty: 'Hard' });
          }
          setTimeout(() => setShowDifficultyChange(null), 3000);
        } else if (recentCorrect === 0) {
          if (recentDifficulties.every(d => d === 'hard')) {
            setAdaptiveDifficulty('Medium');
            setShowDifficultyChange({ type: 'down', difficulty: 'Medium' });
          } else if (recentDifficulties.filter(d => d === 'medium').length >= 2) {
            setAdaptiveDifficulty('Easy');
            setShowDifficultyChange({ type: 'down', difficulty: 'Easy' });
          }
          setTimeout(() => setShowDifficultyChange(null), 3000);
        }
      }
    };

    const nextQuestion = () => {
      if (currentQuestion < practiceSession.totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setTimerActive(false);
        setCurrentScreen('results');
      }
    };

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Difficulty Change Notification */}
        {showDifficultyChange && (
          <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
            showDifficultyChange ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}>
            <div className={`px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 ${
              showDifficultyChange.type === 'up' 
                ? 'bg-purple-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {showDifficultyChange.type === 'up' ? (
                <>
                  <TrendingUp className="w-5 h-5" />
                  <span>Difficulty increased to {showDifficultyChange.difficulty}! 🚀</span>
                </>
              ) : (
                <>
                  <Target className="w-5 h-5" />
                  <span>Adjusted to {showDifficultyChange.difficulty} mode 👍</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Progress Bar and Timer */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
            <span className="text-lg font-medium">Question {currentQuestion + 1} of {practiceSession.totalQuestions}</span>
            <div className="flex items-center space-x-4">
              {practiceSession.timeLimit > 0 && (
                <div className={`flex items-center space-x-2 ${
                  timeElapsed > practiceSession.timeLimit * 0.8 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <Timer className="w-4 h-4" />
                  <span className="font-medium">
                    {formatTime(Math.max(0, practiceSession.timeLimit - timeElapsed))}
                  </span>
                </div>
              )}
              <span className="text-sm text-gray-600">{practiceSession.topic.name}</span>
              {practiceSession.isAdaptive && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  {currentDifficulty} mode
                </span>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / practiceSession.totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
          <p className="text-xl leading-relaxed whitespace-pre-line">{question.question}</p>
        </div>

        {/* Answer Options - Mobile Optimized */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => !showFeedback && setSelectedAnswer(idx)}
              onTouchStart={() => {}} // Prevent double-tap zoom
              disabled={showFeedback}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all touch-manipulation ${
                showFeedback
                  ? idx === question.correct
                    ? 'border-green-500 bg-green-50'
                    : idx === selectedAnswer
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 opacity-50'
                  : selectedAnswer === idx
                  ? 'border-blue-500 bg-blue-50 transform scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="font-bold mr-3 text-lg w-8">{String.fromCharCode(65 + idx)})</span>
                <span className="text-base md:text-lg flex-1">{option}</span>
                {showFeedback && idx === question.correct && (
                  <Check className="w-5 h-5 text-green-600 ml-auto flex-shrink-0" />
                )}
                {showFeedback && idx === selectedAnswer && idx !== question.correct && (
                  <X className="w-5 h-5 text-red-600 ml-auto flex-shrink-0" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Submit/Next Button */}
        {!showFeedback ? (
          <button
            onClick={handleAnswer}
            onTouchStart={() => {}} // Prevent double-tap zoom
            disabled={selectedAnswer === null}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all touch-manipulation ${
              selectedAnswer !== null
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <>
            {/* Step-by-Step Solution Button */}
            <button
              onClick={() => {
                setShowStepByStep(!showStepByStep);
                setCurrentStep(0);
              }}
              className="w-full py-3 mb-3 bg-purple-600 text-white rounded-xl font-semibold text-lg transition-all hover:bg-purple-700"
            >
              {showStepByStep ? 'Hide' : 'Show'} Step-by-Step Solution
            </button>
            
            {/* Step-by-Step Solution */}
            {showStepByStep && (
              <div className="mb-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Step-by-Step Solution</h3>
                
                {(() => {
                  const solution = generateStepByStepSolution(question);
                  return (
                    <div>
                      <div className="mb-4">
                        <h4 className="font-medium text-purple-700 mb-2">Strategy:</h4>
                        <p className="text-gray-700">{solution.strategy}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-purple-700 mb-2">Steps:</h4>
                        <div className="space-y-2">
                          {solution.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <p className="text-gray-700">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-purple-700 mb-2">Common Mistakes:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {solution.commonMistakes.map((mistake, idx) => (
                            <li key={idx}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                        <h4 className="font-medium text-blue-800 mb-1">Answer:</h4>
                        <p className="text-blue-700">{question.options[question.correct]}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
            
            {/* Feedback */}
            <div className={`p-6 rounded-xl mb-4 ${
              selectedAnswer === question.correct ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                selectedAnswer === question.correct ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswer === question.correct ? '🎉 Correct!' : '💡 Not quite right'}
              </h4>
              <p className="text-gray-700 whitespace-pre-line">{question.explanation}</p>
            </div>
            
            {/* Next Question Button */}
            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-green-600 text-white rounded-xl font-semibold text-lg transition-all hover:bg-green-700"
            >
              {currentQuestion < practiceSession.totalQuestions - 1 ? 'Next Question' : 'See Results'}
            </button>
          </>
        )}
      </div>
    );
  };

  const ResultsScreen = () => {
    const correctAnswers = answers.filter((ans, idx) => ans === practiceSession.questions[idx].correct).length;
    const accuracy = Math.round((correctAnswers / answers.length) * 100);
    const timePerQuestion = Math.round(timeElapsed / answers.length);
    
    const difficultyBreakdown = {
      easy: { correct: 0, total: 0 },
      medium: { correct: 0, total: 0 },
      hard: { correct: 0, total: 0 }
    };
    
    practiceSession.questions.forEach((question, idx) => {
      const difficulty = question.difficulty || 'medium';
      difficultyBreakdown[difficulty].total++;
      if (answers[idx] === question.correct) {
        difficultyBreakdown[difficulty].correct++;
      }
    });
    
    const getPerformanceMessage = () => {
      if (accuracy >= 90) return { text: "Outstanding! 🌟", color: "text-green-600" };
      if (accuracy >= 80) return { text: "Great job! 🎉", color: "text-blue-600" };
      if (accuracy >= 70) return { text: "Good effort! 👍", color: "text-purple-600" };
      return { text: "Keep practicing! 💪", color: "text-orange-600" };
    };
    
    const performance = getPerformanceMessage();
    
    const getTips = () => {
      const tips = [];
      
      if (difficultyBreakdown.easy.total > 0 && difficultyBreakdown.easy.correct / difficultyBreakdown.easy.total < 0.8) {
        tips.push("Review the basics - even easy questions need attention!");
      }
      
      if (difficultyBreakdown.hard.total > 0 && difficultyBreakdown.hard.correct / difficultyBreakdown.hard.total > 0.6) {
        tips.push("You're doing great with hard questions! Keep challenging yourself.");
      }
      
      if (timePerQuestion > 120) {
        tips.push("Try to work a bit faster - speed comes with practice!");
      } else if (timePerQuestion < 30 && accuracy < 70) {
        tips.push("Take your time to read questions carefully.");
      }
      
      const wrongTopics = new Set();
      practiceSession.questions.forEach((q, idx) => {
        if (answers[idx] !== q.correct) {
          wrongTopics.add(q.topic);
        }
      });
      
      if (wrongTopics.size > 0) {
        const topicName = topics.find(t => t.id === Array.from(wrongTopics)[0])?.name;
        if (topicName) {
          tips.push(`Focus on ${topicName} in your next practice session.`);
        }
      }
      
      return tips;
    };

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Confetti effect for high scores */}
        {accuracy >= 80 && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                <span className="text-2xl">
                  {['🎉', '🌟', '⭐', '✨', '🎊'][Math.floor(Math.random() * 5)]}
                </span>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Avatar user={currentUser} size="large" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Practice Complete! 🎉</h2>
          <p className={`text-xl ${performance.color} font-semibold`}>{performance.text}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-6">
          <div className="text-center mb-6">
            <div className={`text-5xl md:text-6xl font-bold mb-2 ${
              accuracy >= 80 ? 'text-green-600' : accuracy >= 60 ? 'text-blue-600' : 'text-orange-600'
            }`}>
              {accuracy}%
            </div>
            <p className="text-gray-600">Accuracy</p>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 md:w-6 md:h-6 ${
                    i < Math.round(accuracy / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-green-600">{correctAnswers}</div>
              <p className="text-sm md:text-base text-gray-600">Correct</p>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-gray-600">{answers.length - correctAnswers}</div>
              <p className="text-sm md:text-base text-gray-600">Mistakes</p>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-semibold text-blue-600">{formatTime(timeElapsed)}</div>
              <p className="text-sm md:text-base text-gray-600">Time</p>
            </div>
          </div>
          
          {practiceSession.timeLimit > 0 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Average time per question: {timePerQuestion}s
              </p>
            </div>
          )}
        </div>
        
        {/* Difficulty Breakdown */}
        {Object.values(difficultyBreakdown).some(d => d.total > 0) && (
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Performance by Difficulty</h3>
            <div className="space-y-2">
              {['easy', 'medium', 'hard'].map(level => {
                const data = difficultyBreakdown[level];
                if (data.total === 0) return null;
                const percentage = Math.round((data.correct / data.total) * 100);
                
                return (
                  <div key={level} className="flex items-center space-x-3">
                    <span className="capitalize text-sm font-medium w-16">{level}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          percentage >= 80 ? 'bg-green-500' : 
                          percentage >= 60 ? 'bg-blue-500' : 
                          'bg-orange-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{data.correct}/{data.total}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {/* Personalized Tips */}
        {getTips().length > 0 && (
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Tips for Next Time
            </h3>
            <ul className="space-y-2">
              {getTips().map((tip, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Next Recommended Topic */}
        {accuracy >= 70 && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Great job!</h3>
                <p className="text-sm text-gray-600">
                  You've improved {practiceSession.topic.name} to {getTopicPerformance(practiceSession.topic.id)}% mastery
                </p>
              </div>
              <Trophy className="w-12 h-12 text-amber-500" />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              const weakTopics = getRecommendedTopics().filter(t => t.id !== practiceSession.topic.id);
              if (weakTopics.length > 0) {
                setLastUsedTopic(weakTopics[0]);
              }
              setCurrentScreen('practice');
            }}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Practice Different Topic</span>
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  const ProgressScreen = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentUser}'s Progress</h2>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="text-3xl font-bold text-blue-600">{userStats[currentUser].accuracy}%</div>
          <p className="text-gray-600 mt-1">Overall Accuracy</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="text-3xl font-bold text-green-600">{userStats[currentUser].totalQuestions}</div>
          <p className="text-gray-600 mt-1">Questions Answered</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="text-3xl font-bold text-purple-600">{userStats[currentUser].streak}</div>
          <p className="text-gray-600 mt-1">Day Streak</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <div className="text-3xl font-bold text-amber-600">{achievements.length}</div>
          <p className="text-gray-600 mt-1">Achievements</p>
        </div>
      </div>

      {/* Enhanced Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Performance by Difficulty */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Difficulty</h3>
          <div className="space-y-4">
            {['easy', 'medium', 'hard'].map(difficulty => {
              const stats = userStats[currentUser];
              const accuracy = stats.accuracyByDifficulty[difficulty] || 0;
              const questions = stats.questionsByDifficulty[difficulty] || 0;
              const colors = {
                easy: 'from-green-500 to-green-600',
                medium: 'from-yellow-500 to-orange-500',
                hard: 'from-red-500 to-red-600'
              };
              
              return (
                <div key={difficulty}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium capitalize">{difficulty}</span>
                    <span className="text-sm text-gray-600">{accuracy}% ({questions} questions)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${colors[difficulty]}`}
                      style={{ width: `${accuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Analytics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Time per Question</span>
              <span className="font-semibold">{Math.round(userStats[currentUser].averageTime || 0)}s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Study Time</span>
              <span className="font-semibold">{formatTime(userStats[currentUser].totalTime || 0)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Questions Today</span>
              <span className="font-semibold">{userStats[currentUser].questionsToday || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Questions This Week</span>
              <span className="font-semibold">{userStats[currentUser].questionsThisWeek || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AMC Readiness Score */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-indigo-600" />
          AMC Readiness Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600 mb-2">
              {Math.round(userStats[currentUser].amcReadiness || 0)}%
            </div>
            <p className="text-sm text-gray-600">Overall Readiness</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {topics.filter(t => getTopicPerformance(t.id) >= 80).length}
            </div>
            <p className="text-sm text-gray-600">Topics Mastered</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-600 mb-2">
              {userStats[currentUser].studyStreak || 0}
            </div>
            <p className="text-sm text-gray-600">Study Streak</p>
          </div>
        </div>
      </div>

      {/* Achievement Gallery */}
      {achievements.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Gallery</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'First Steps', desc: 'Complete your first practice', icon: '👣', earned: achievements.includes('First Steps') },
              { name: 'Math Wizard', desc: 'Score 100% on a practice', icon: '🧙‍♂️', earned: achievements.includes('Math Wizard') },
              { name: 'Century Club', desc: 'Answer 100 questions', icon: '💯', earned: achievements.includes('Century Club') },
              { name: 'Week Warrior', desc: '7 day practice streak', icon: '🔥', earned: achievements.includes('Week Warrior') },
              { name: 'Accuracy Master', desc: 'Achieve 90% overall accuracy', icon: '🎯', earned: achievements.includes('Accuracy Master') },
              { name: 'Speed Demon', desc: 'Complete practice under time limit', icon: '⚡', earned: achievements.includes('Speed Demon') }
            ].map((achievement, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl text-center transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-yellow-100 to-amber-100 shadow-sm'
                    : 'bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Topic Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Topic</h3>
        <div className="space-y-4">
          {topics.map(topic => {
            const performance = getTopicPerformance(topic.id);
            const stats = userStats[currentUser].topicStats?.[topic.id];
            const attempted = stats?.attempted || 0;
            
            return (
              <div key={topic.id}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{topic.icon}</span>
                    <span className="font-medium">{topic.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-700">{performance}%</span>
                    <span className="text-xs text-gray-500 ml-2">({attempted} questions)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      performance >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      performance >= 60 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      performance >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${performance}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-purple-600" />
          Practice Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getRecommendedTopics().map((topic, idx) => (
            <div key={topic.id} className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`bg-gradient-to-br ${topic.color} rounded-lg p-2 w-10 h-10 flex items-center justify-center`}>
                  <div className="text-lg">{topic.icon}</div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{topic.name}</h4>
                  <p className="text-xs text-purple-600">{topic.performance}% mastery</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setLastUsedTopic(topic);
                  setCurrentScreen('practice');
                }}
                className="w-full mt-2 py-2 bg-purple-500 text-white text-sm rounded-lg hover:bg-purple-600 transition-colors"
              >
                Practice Now
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Learning Insights */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-amber-600" />
          Learning Insights
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 rounded-lg p-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Strongest Topic</h4>
              <p className="text-sm text-gray-600">
                {(() => {
                  const best = topics.reduce((prev, current) => 
                    getTopicPerformance(current.id) > getTopicPerformance(prev.id) ? current : prev
                  );
                  return `${best.name} at ${getTopicPerformance(best.id)}% mastery`;
                })()}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 rounded-lg p-2">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Practice Pattern</h4>
              <p className="text-sm text-gray-600">
                Most active in the {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Next Goal</h4>
              <p className="text-sm text-gray-600">
                {userStats[currentUser].totalQuestions < 200 
                  ? `${200 - userStats[currentUser].totalQuestions} more questions to reach 200!`
                  : userStats[currentUser].accuracy < 90
                  ? `Improve accuracy to 90% (currently ${userStats[currentUser].accuracy}%)`
                  : `Master all topics to 80%+`}
              </p>
            </div>
          </div>
          
          {mistakeHistory.length > 0 && (
            <div className="flex items-start space-x-3">
              <div className="bg-red-100 rounded-lg p-2">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Common Mistakes</h4>
                <p className="text-sm text-gray-600">
                  Review {mistakeHistory.length} recent mistakes to improve
                </p>
                <button 
                  onClick={() => alert('Mistake review feature coming soon!')}
                  className="text-sm text-blue-600 hover:text-blue-700 mt-1"
                >
                  Review Mistakes →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const HelpScreen = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Tips</h2>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Use Smart Practice</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>The app recommends topics based on your performance and practice history</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Questions adapt to your skill level - getting harder as you improve</span>
            </li>
            <li className="flex items-start">
              <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span>Practice topics you haven't done in a while to maintain your skills</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 rounded-lg p-2">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Focus on Weak Areas</h4>
                <p className="text-sm text-gray-600">Practice topics with lower mastery scores</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 rounded-lg p-2">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Regular Practice</h4>
                <p className="text-sm text-gray-600">Practice a little bit every day</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 rounded-lg p-2">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Read Explanations</h4>
                <p className="text-sm text-gray-600">Learn from both correct and incorrect answers</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-amber-100 rounded-lg p-2">
                <Trophy className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Earn Achievements</h4>
                <p className="text-sm text-gray-600">Unlock badges as you improve</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'practice':
        return <PracticeScreen />;
      case 'question':
        return <QuestionScreen />;
      case 'results':
        return <ResultsScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'help':
        return <HelpScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <Navigation />
      <main className="pb-8">
        {renderScreen()}
      </main>
      <AchievementPopup />
    </div>
  );
};

export default App;