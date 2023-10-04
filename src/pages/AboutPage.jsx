import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>About this project:</h1>
            <p>this is react app to leave feedback for a product or service</p>
            <p>
                <Link to="/">back home</Link>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage