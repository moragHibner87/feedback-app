import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm() {
    const [text, setText] = useState('');
    const [rating, setRating] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [msg, setMsg] = useState('');

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleText = (e) => {
        if(text === ''){
            setBtnDisabled(true);
            setMsg(null);
        } else if(text !== '' && text.trim().length <= 10){
            setMsg('Text must be at least 10 characters');
            setBtnDisabled(true);
        } else{
            setMsg(null);
            setBtnDisabled(false);
        }
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFeedback = {
            text: text,
            rating: rating,
        }
        if(feedbackEdit.edit === true){
            updateFeedback(feedbackEdit.item.id, newFeedback)
        }else{
            addFeedback(newFeedback)
        }
        //reset state
        setText('')
        setRating(10)
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input type="text" placeholder='Write a review' onChange={handleText} value={text}/>
                <Button type="submit" version="primary" isDisabled={btnDisabled}>Send</Button>
            </div>
            {msg && <div className='message'>{msg}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm