// A pool of questions from various fields (general knowledge, science, geography, etc.)
const questionPool = [
    { question: 'What is the capital of France?', answer: 'Paris', correctOption: 'Paris', options: ['Paris', 'Berlin', 'Madrid', 'Rome'] },
    { question: 'What is 2 + 2?', answer: '4', correctOption: '4', options: ['3', '4', '5', '6'] },
    { question: 'What is the largest planet in the solar system?', answer: 'Jupiter', correctOption: 'Jupiter', options: ['Mars', 'Earth', 'Jupiter', 'Saturn'] },
    { question: 'Who wrote the book "1984"?', answer: 'George Orwell', correctOption: 'George Orwell', options: ['George Orwell', 'J.K. Rowling', 'Mark Twain', 'Charles Dickens'] },
    { question: 'What is the boiling point of water?', answer: '100°C', correctOption: '100°C', options: ['90°C', '100°C', '110°C', '120°C'] },
    { question: 'What is the fastest land animal?', answer: 'Cheetah', correctOption: 'Cheetah', options: ['Lion', 'Cheetah', 'Tiger', 'Elephant'] },
    { question: 'What is the square root of 81?', answer: '9', correctOption: '9', options: ['7', '8', '9', '10'] },
    { question: 'Which ocean is the largest?', answer: 'Pacific Ocean', correctOption: 'Pacific Ocean', options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'] },
    { question: 'What is the chemical symbol for water?', answer: 'H2O', correctOption: 'H2O', options: ['CO2', 'H2O', 'O2', 'N2'] },
    { question: 'Who painted the Mona Lisa?', answer: 'Leonardo da Vinci', correctOption: 'Leonardo da Vinci', options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Claude Monet'] },
    { question: 'Which is the smallest country in the world?', answer: 'Vatican City', correctOption: 'Vatican City', options: ['Vatican City', 'Monaco', 'San Marino', 'Liechtenstein'] },
    { question: 'Who invented the telephone?', answer: 'Alexander Graham Bell', correctOption: 'Alexander Graham Bell', options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Marie Curie'] },
    { question: 'What is the freezing point of water?', answer: '0°C', correctOption: '0°C', options: ['0°C', '-1°C', '1°C', '5°C'] },
    { question: 'Who was the first president of the United States?', answer: 'George Washington', correctOption: 'George Washington', options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'] },
    { question: 'What is the hardest natural substance on Earth?', answer: 'Diamond', correctOption: 'Diamond', options: ['Gold', 'Iron', 'Diamond', 'Platinum'] },
    { question: 'Which planet is known as the Red Planet?', answer: 'Mars', correctOption: 'Mars', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'] },
    { question: 'What is the longest river in the world?', answer: 'Nile', correctOption: 'Nile', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'] },
    { question: 'Who is the author of "Harry Potter"?', answer: 'J.K. Rowling', correctOption: 'J.K. Rowling', options: ['J.K. Rowling', 'J.R.R. Tolkien', 'George R.R. Martin', 'C.S. Lewis'] },
    { question: 'What is the smallest prime number?', answer: '2', correctOption: '2', options: ['1', '2', '3', '5'] },
    { question: 'What is the name of the ship that sank in 1912?', answer: 'Titanic', correctOption: 'Titanic', options: ['Titanic', 'Queen Mary', 'Lusitania', 'Andrea Doria'] }
];

// Variables to track the game state
let currentCardIndex = 0;
let score = 0;
let correctCount = 0;
let incorrectCount = 0;
let usedQuestions = [];  // Array to track used questions
let currentCard = {};

// Event listeners for buttons
document.getElementById('start-studying-button').addEventListener('click', startStudying);
document.getElementById('flip-button').addEventListener('click', flipCard);
document.getElementById('correct-button').addEventListener('click', markCorrect);
document.getElementById('incorrect-button').addEventListener('click', markIncorrect);
document.getElementById('playback-button').addEventListener('click', restartGame);

// Function to start studying, shuffle questions and start the game
function startStudying() {
    usedQuestions = [];  // Reset used questions for the new game
    shuffleCards();
    showFlashcard();
    document.getElementById('start-studying-button').style.display = 'none';
    document.getElementById('flashcard-container').style.display = 'block';
    document.getElementById('correct-button').disabled = false;
    document.getElementById('incorrect-button').disabled = false;
    resetScore();
}

// Function to shuffle cards and select new questions for the game
function shuffleCards() {
    // Randomly select 5 questions from the pool and shuffle them
    let availableQuestions = [...questionPool];
    let selectedQuestions = [];

    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestions.push(availableQuestions.splice(randomIndex, 1)[0]);
    }

    usedQuestions = selectedQuestions; // Store the selected questions for this round
    currentCardIndex = 0; // Start with the first selected question
}

// Function to display a flashcard
function showFlashcard() {
    currentCard = usedQuestions[currentCardIndex]; // Get current flashcard
    document.getElementById('question').textContent = currentCard.question;
    document.getElementById('answer').textContent = currentCard.answer;
    document.getElementById('answer').style.display = 'none';
}

// Function to flip the card and reveal the answer
function flipCard() {
    const answerDiv = document.getElementById('answer');
    answerDiv.style.display = answerDiv.style.display === 'none' ? 'block' : 'none';
}

// Function to mark the answer as correct
function markCorrect() {
    score++;
    correctCount++;
    nextCard();
}

// Function to mark the answer as incorrect
function markIncorrect() {
    incorrectCount++;
    nextCard();
}

// Function to move to the next card or end the game if no more cards
function nextCard() {
    currentCardIndex++;
    if (currentCardIndex >= usedQuestions.length) {
        endGame();
    } else {
        showFlashcard();
    }
}

// Function to display the game over screen
function endGame() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('score').textContent = score;
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('incorrect-count').textContent = incorrectCount;
    document.getElementById('flashcard-container').style.display = 'none';
}

// Function to restart the game
function restartGame() {
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
    shuffleCards();
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('start-studying-button').style.display = 'inline';
}

// Function to reset score counts
function resetScore() {
    score = 0;
    correctCount = 0;
    incorrectCount = 0;
}
