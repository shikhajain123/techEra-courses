import './index.css'
import {Link} from 'react-router-dom'

const Item = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails

  return (
    <li>
      <Link to={`/courses/${id}`} className="course-item">
        <img src={logoUrl} alt={name} className="logo" />
        <p className="course-name">{name}</p>
      </Link>
    </li>
  )
}

export default Item
