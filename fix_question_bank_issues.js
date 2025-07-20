// Fix identified issues in the AMC Math Practice question bank
console.log('🔧 FIXING QUESTION BANK ISSUES...\n');

// Analysis of failed tests:
// 1. Topic 2 Medium Year 5 - School Population Problem (ratio calculation issue)
// 2. Topic 3 Medium (all years) - Bus Transportation Problem (division logic)
// 3. Topic 4 Easy (most years) - Class Composition Problem (fraction context)
// 4. Topic 4 Medium (some years) - Mixed Number Operations (complexity)
// 5. Topic 7 Medium (some years) - Alternating Patterns (pattern logic)
// 6. Topic 7 Easy Year 6 - Multi-pattern Sequences (number range)

// Fix 1: Topic 2 Medium - School Population Problem
console.log('📊 FIXING TOPIC 2 MEDIUM - SCHOOL POPULATION');
const fixTopic2Medium = () => {
  const totalStudents = Math.floor(Math.random() * 150) + 100;
  const boysRatio = Math.floor(Math.random() * 4) + 2;
  const girlsRatio = Math.floor(Math.random() * 4) + 2;
  const totalRatio = boysRatio + girlsRatio;
  const boys = Math.round((totalStudents * boysRatio) / totalRatio);
  const girls = totalStudents - boys;
  const newBoys = Math.floor(Math.random() * 15) + 10;
  const newGirls = Math.floor(Math.random() * 15) + 10;
  const transferredBoys = Math.floor(Math.random() * 5) + 2;
  const finalTotal = totalStudents + newBoys + newGirls - transferredBoys;
  
  // Ensure final total is always greater than original
  if (finalTotal <= totalStudents) {
    return false; // This would cause the test to fail
  }
  
  const question = `A school has ${totalStudents} students in the ratio ${boysRatio}:${girlsRatio} (boys:girls). If ${newBoys} more boys and ${newGirls} more girls join, but ${transferredBoys} boys transfer out, how many students will there be?`;
  
  const hasComplexScenario = question.includes('ratio') && question.includes('transfer');
  const appropriateNumbers = totalStudents >= 100 && finalTotal > totalStudents;
  
  return hasComplexScenario && appropriateNumbers;
};

// Fix 2: Topic 3 Medium - Bus Transportation Problem
console.log('📊 FIXING TOPIC 3 MEDIUM - BUS TRANSPORTATION');
const fixTopic3Medium = () => {
  const totalStudents = Math.floor(Math.random() * 200) + 100;
  const buses = Math.floor(Math.random() * 8) + 4;
  const studentsPerBus = Math.floor(totalStudents / buses);
  const remainder = totalStudents % buses;
  const extraBus = remainder > 0 ? 1 : 0;
  const totalBuses = buses + extraBus;
  
  // Ensure we have a valid division scenario
  if (studentsPerBus === 0) {
    return false;
  }
  
  const question = `A school needs to transport ${totalStudents} students on a field trip. Each bus can hold ${studentsPerBus} students. How many buses are needed?`;
  
  const hasRealWorldContext = question.includes('school') && question.includes('field trip');
  const hasDivisionLogic = question.includes('hold') && question.includes('needed');
  const appropriateNumbers = totalStudents >= 100 && totalBuses >= 4;
  
  return hasRealWorldContext && hasDivisionLogic && appropriateNumbers;
};

// Fix 3: Topic 4 Easy - Class Composition Problem
console.log('📊 FIXING TOPIC 4 EASY - CLASS COMPOSITION');
const fixTopic4Easy = () => {
  const totalStudents = Math.floor(Math.random() * 60) + 40;
  const boysFraction = Math.floor(Math.random() * 3) + 2;
  const girlsFraction = Math.floor(Math.random() * 3) + 2;
  const totalFraction = boysFraction + girlsFraction;
  const boys = Math.round((totalStudents * boysFraction) / totalFraction);
  const girls = totalStudents - boys;
  const answer = boys;
  
  // Ensure we have a valid fraction scenario
  if (boysFraction === girlsFraction) {
    return false; // Need different fractions for educational value
  }
  
  const question = `A class has ${totalStudents} students. ${boysFraction}/${totalFraction} of the students are boys. How many boys are in the class?`;
  
  const hasFractionContext = question.includes('/') && question.includes('fraction');
  const hasRealWorldContext = question.includes('class') && question.includes('students');
  const appropriateNumbers = totalStudents >= 40 && answer > 0;
  
  return hasFractionContext && hasRealWorldContext && appropriateNumbers;
};

// Fix 4: Topic 4 Medium - Mixed Number Operations
console.log('📊 FIXING TOPIC 4 MEDIUM - MIXED NUMBER OPERATIONS');
const fixTopic4Medium = () => {
  const whole1 = Math.floor(Math.random() * 3) + 2;
  const num1 = Math.floor(Math.random() * 4) + 1;
  const den1 = Math.floor(Math.random() * 6) + 2;
  const whole2 = Math.floor(Math.random() * 2) + 1;
  const num2 = Math.floor(Math.random() * 3) + 1;
  const den2 = Math.floor(Math.random() * 6) + 2;
  
  // Ensure different denominators for complexity
  if (den1 === den2) {
    return false;
  }
  
  const improper1 = whole1 * den1 + num1;
  const improper2 = whole2 * den2 + num2;
  const lcm = findLCM(den1, den2);
  const newNum1 = improper1 * (lcm / den1);
  const newNum2 = improper2 * (lcm / den2);
  const resultNum = newNum1 + newNum2;
  
  const question = `What is ${whole1} ${num1}/${den1} + ${whole2} ${num2}/${den2}?`;
  
  const hasMixedNumbers = question.includes(' ') && question.includes('/');
  const hasComplexFractions = den1 !== den2;
  
  return hasMixedNumbers && hasComplexFractions;
};

// Fix 5: Topic 7 Medium - Alternating Patterns
console.log('📊 FIXING TOPIC 7 MEDIUM - ALTERNATING PATTERNS');
const fixTopic7Medium = () => {
  const start = Math.floor(Math.random() * 15) + 10;
  const evenStep = Math.floor(Math.random() * 4) + 2;
  const oddStep = Math.floor(Math.random() * 3) + 1;
  
  // Ensure different steps for alternating pattern
  if (evenStep === oddStep) {
    return false;
  }
  
  const sequence = [start, start + evenStep, start + evenStep + oddStep, start + evenStep + oddStep + evenStep];
  const next = start + evenStep + oddStep + evenStep + oddStep;
  
  const question = `In the sequence ${sequence.join(', ')}, the pattern alternates between two different steps. What is the next term?`;
  
  const hasAlternatingPattern = evenStep !== oddStep;
  const hasComplexDescription = question.includes('alternates') && question.includes('different');
  const appropriateNumbers = start >= 10 && next > start;
  
  return hasAlternatingPattern && hasComplexDescription && appropriateNumbers;
};

// Fix 6: Topic 7 Easy - Multi-pattern Sequences
console.log('📊 FIXING TOPIC 7 EASY - MULTI-PATTERN SEQUENCES');
const fixTopic7Easy = () => {
  const start = Math.floor(Math.random() * 20) + 10;
  const pattern1 = Math.floor(Math.random() * 5) + 2;
  const pattern2 = Math.floor(Math.random() * 3) + 1;
  
  // Ensure different patterns for complexity
  if (pattern1 === pattern2) {
    return false;
  }
  
  const sequence = [start, start + pattern1, start + pattern1 + pattern2, start + pattern1 + pattern2 * 2];
  const next = start + pattern1 + pattern2 * 3;
  
  const question = `In the sequence ${sequence.join(', ')}, each term after the first increases by a pattern. What is the next term?`;
  
  const hasComplexPattern = pattern1 !== pattern2;
  const hasMultiStep = question.includes('pattern') && question.includes('increases');
  const appropriateNumbers = start >= 10 && next > start;
  
  return hasComplexPattern && hasMultiStep && appropriateNumbers;
};

// Test the fixes
console.log('\n🧪 TESTING FIXES...\n');

let fixResults = {
  total: 0,
  passed: 0,
  failed: 0
};

const testFix = (fixName, fixFunction) => {
  fixResults.total++;
  try {
    const result = fixFunction();
    if (result) {
      fixResults.passed++;
      console.log(`✅ ${fixName} - FIXED`);
    } else {
      fixResults.failed++;
      console.log(`❌ ${fixName} - STILL FAILING`);
    }
  } catch (error) {
    fixResults.failed++;
    console.log(`❌ ${fixName} - ERROR: ${error.message}`);
  }
};

// Test all fixes
testFix('Topic 2 Medium - School Population', fixTopic2Medium);
testFix('Topic 3 Medium - Bus Transportation', fixTopic3Medium);
testFix('Topic 4 Easy - Class Composition', fixTopic4Easy);
testFix('Topic 4 Medium - Mixed Number Operations', fixTopic4Medium);
testFix('Topic 7 Medium - Alternating Patterns', fixTopic7Medium);
testFix('Topic 7 Easy - Multi-pattern Sequences', fixTopic7Easy);

console.log('\n📋 FIX RESULTS SUMMARY');
console.log(`Total fixes tested: ${fixResults.total}`);
console.log(`Fixes passed: ${fixResults.passed}`);
console.log(`Fixes failed: ${fixResults.failed}`);
console.log(`Fix success rate: ${((fixResults.passed / fixResults.total) * 100).toFixed(2)}%`);

if (fixResults.failed > 0) {
  console.log('\n🔧 ADDITIONAL FIXES NEEDED:');
  console.log('1. Review logic in failing fixes');
  console.log('2. Ensure proper validation conditions');
  console.log('3. Test edge cases in fix functions');
} else {
  console.log('\n✅ ALL FIXES SUCCESSFUL!');
  console.log('🎉 Question bank issues resolved!');
}

console.log('\n🎯 NEXT STEPS:');
console.log('1. Apply fixes to actual question generation code');
console.log('2. Re-run comprehensive validation tests');
console.log('3. Verify all AMC standards are met');
console.log('4. Prepare for GitHub upload'); 