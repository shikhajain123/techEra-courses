import './index.css'
import {Link} from 'react-router-dom'

const Item = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <li>
      <Link to={`/courses/${id}`} className="course-item">
        <img src={logoUrl} alt={name} className="logo" />
        <h1 className="course-name">{name}</h1>
      </Link>
    </li>
  )
}

export default Item
