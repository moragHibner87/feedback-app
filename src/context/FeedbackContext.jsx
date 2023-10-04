import {createContext, useState} from 'react'
import { v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            rating: 3,
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          },
          {
            id: 2,
            rating: 2,
            text: 'adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
          }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // delete
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete this feedback?')){
        setFeedback((feedArr) => {
            const updateArr = feedArr.filter(item => item.id !== id)
    
            return updateArr
        })
        }
    }

    //add new
    const addFeedback = (obj) => {
        obj.id = uuidv4();
        setFeedback((feedArr) => {
        const updateArr = [obj, ...feedArr]

        return updateArr
        })
    }

    //Edit feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // update feedback
    const updateFeedback = (id, obj) => {
       setFeedback(feedback.map(item => item.id === id? {...item, ...obj} : item))
    }


    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext