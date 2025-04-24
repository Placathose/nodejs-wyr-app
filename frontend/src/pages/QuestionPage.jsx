import React, { useEffect, useState } from 'react'
// import questionsData from '../data'
import AnswerDrawer from '../components/AnswerDrawer';
import { generateQuestion } from '../utils/fetchOpenAI';

function QuestionPage() {

  // Create a state for question list, index, selections
  const [questionsList, setQuestionsList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState([]);



  useEffect(() => {
    // using my own data
    // setQuestionsList(questionsData)
    
    const fetchQuestions = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        // Fetch questions from Deepseek
        const generatedQuestions = await generateQuestion();
        if (generatedQuestions) {
          setQuestionsList(generatedQuestions);
        }
        setIsLoading(false);
        console.log(questionsList)
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();

    fetchQuestions()
    console.log( `Questions are: ${questionsList}`)
  }, [questionsList]);

  const handleClick = (option) => {
    // Add selected to list
    setSelectedOptions([...selectedOptions, option]);

    if(currentQuestionIndex < questionsList.length -1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log(selectedOptions)
    } else {
      console.log("All questions answered")
    }

  }

  // Current Question
  let currentQuestion = questionsList[currentQuestionIndex];

  return (
    <AnswerDrawer selectedOptions={selectedOptions}>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="">
            {isLoading ? ( // Show loading message if isLoading is true
              <p>Loading questions...</p>
            ) : currentQuestion ? ( // Show the current question if available
              <>
                <h1 className="text-5xl font-bold mb-20">{currentQuestion.question}:</h1>
                <div className="flex flex-col h-1/2 ">
                  <button
                    className="btn btn-primary mb-10"
                    onClick={() => handleClick(currentQuestion.optionA)}
                  >
                    A: {currentQuestion.optionA}
                  </button>
                  OR
                  <button
                    className="btn btn-accent mt-10"
                    onClick={() => handleClick(currentQuestion.optionB)}
                  >
                    B: {currentQuestion.optionB}
                  </button>
                </div>
              </>
            ) : ( // Show "No more questions" if no questions are available
              <p className="py-6">No more questions!</p>
            )}
          </div>
        </div>
      </div>
    </AnswerDrawer>
  )
}

export default QuestionPage