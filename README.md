# AMC Math Practice 🧮

An interactive math practice application designed for Australian primary school students preparing for the Australian Mathematics Competition (AMC). Features personalized learning paths, adaptive difficulty, and engaging practice sessions.

## ✨ Features

### 🎯 **Smart Practice System**
- **Adaptive Difficulty**: Questions automatically adjust based on performance
- **AMC-Style Questions**: Authentic competition-style problems
- **Multi-Topic Coverage**: Number, Addition & Subtraction, Multiplication & Division, Fractions, Geometry, Measurement, Patterns, Problem Solving

### 👥 **Dual User Profiles**
- **Annie** (Year 5, Age 10): Advanced problems and challenging concepts
- **Bella** (Year 3, Age 8): Foundation skills and building blocks
- **Custom Avatars**: Personalized character images for each user

### 📊 **Progress Tracking**
- **Performance Analytics**: Detailed statistics and progress reports
- **Achievement System**: Unlock badges and rewards
- **Goal Setting**: Daily and weekly learning objectives
- **Mistake History**: Track and learn from errors

### 🎮 **Interactive Learning**
- **Sound Effects**: Engaging audio feedback
- **Timer Options**: Practice with or without time limits
- **Immediate Feedback**: Detailed explanations for every answer
- **Visual Progress**: Color-coded performance indicators

### 🎨 **Modern UI/UX**
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Beautiful Animations**: Smooth transitions and hover effects
- **Accessible Interface**: Easy navigation and clear visual hierarchy
- **Study Buddies**: Collaborative learning environment

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/amc-math-practice.git
   cd amc-math-practice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
AMC/
├── public/
│   ├── avatars/           # Custom avatar images
│   │   ├── annie_avatar.png
│   │   ├── bella_avatar.png
│   │   └── annie_bella_together.png
│   └── index.html         # Main HTML file
├── src/
│   ├── App.jsx           # Main React component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # This file
```

## 🎯 Key Components

### **Smart Question Generation**
- **AMC-Style Problems**: Realistic competition questions
- **Multi-Difficulty Levels**: Easy, Medium, Hard
- **Topic-Specific Content**: Tailored to each mathematical concept
- **Year-Appropriate**: Content matches student grade level

### **User Management**
- **Profile Switching**: Easy toggle between Annie and Bella
- **Persistent Data**: Local storage for progress and achievements
- **Personalized Experience**: Different difficulty and content for each user

### **Practice Modes**
- **Quick Start**: Continue from last session
- **Smart Practice**: Adaptive difficulty with AI recommendations
- **Custom Practice**: Choose topic, difficulty, and question count
- **Timed Sessions**: Optional time limits for exam preparation

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React useState/useEffect
- **Local Storage**: Browser localStorage API

## 🎨 Customization

### **Adding New Avatars**
1. Place avatar images in `public/avatars/`
2. Update the `users` object in `src/App.jsx`
3. Images will automatically load with fallback to emojis

### **Adding New Topics**
1. Add topic to the `topics` array in `src/App.jsx`
2. Create sample questions in the `sampleQuestions` object
3. Implement question generation logic in `generateAMCQuestion`

### **Modifying Question Generation**
- Edit `generateAMCQuestion` function for AMC-style questions
- Modify `generateSmartQuestions` for adaptive difficulty
- Update `sampleQuestions` for new content

## 📊 Performance Features

- **Local Storage**: Persistent user data and progress
- **Optimized Rendering**: Efficient React component updates
- **Responsive Design**: Mobile-first approach
- **Fast Loading**: Vite's rapid development server

## 🎓 Educational Value

### **AMC Preparation**
- **Competition Format**: Questions mirror actual AMC structure
- **Problem Types**: Number patterns, geometry, measurement, problem solving
- **Difficulty Progression**: Builds skills from foundation to advanced
- **Time Management**: Optional timers for exam practice

### **Learning Outcomes**
- **Mathematical Thinking**: Develop logical reasoning skills
- **Problem Solving**: Practice multi-step problem approaches
- **Confidence Building**: Progressive difficulty and positive reinforcement
- **Competition Readiness**: Familiarity with AMC question styles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Australian Mathematics Competition** for question style inspiration
- **React Team** for the amazing framework
- **Tailwind CSS** for the beautiful styling system
- **Vite** for the fast development experience

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ for Australian primary school students preparing for AMC success!** 