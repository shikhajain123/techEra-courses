import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {Link} from 'react-router-dom'

import './index.css'

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItemDetails extends Component {
  state = {
    courseDetailsData: {},
    api: apiStatus.initial,
  }

  componentDidMount() {
    this.getCourseDataDetails()
  }

  getCourseDataDetails = async () => {
    this.setState({api: apiStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetailsData: updatedData,
        api: apiStatus.success,
      })
    } else {
      this.setState({api: apiStatus.fail})
    }
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {courseDetailsData} = this.state
    return (
      <div className="course-details-container">
        <img
          src={courseDetailsData.imageUrl}
          alt={courseDetailsData.name}
          className="course-image"
        />
        <div>
          <h1 className="heading">{courseDetailsData.name}</h1>
          <p className="description">{courseDetailsData.description}</p>
        </div>
      </div>
    )
  }

  failView = () => (
    <div>
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="fail-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>

        <p className="para">
          We cannot seem to find the page you are looking for
        </p>
        <button
          type="button"
          onClick={this.getCourseDataDetails}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </div>
  )

  finalRender = () => {
    const {api} = this.state
    switch (api) {
      case apiStatus.loading:
        return this.loadingView()
      case apiStatus.success:
        return this.successView()
      case apiStatus.fail:
        return this.failView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Link to="/">
          <nav className="nav-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
              alt="website logo"
              className="logo"
            />
          </nav>
        </Link>

        <div className="course-view-container">{this.finalRender()}</div>
      </div>
    )
  }
}

export default CourseItemDetails
