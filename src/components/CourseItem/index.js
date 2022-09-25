import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Item from '../Item'

import './index.css'

const apiStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}

class CourseItem extends Component {
  state = {
    apiStat: apiStatus.initial,
    courseData: [],
  }

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({apiStat: apiStatus.loading})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, option)
    if (response.ok === true) {
      const data = await response.json()
      console.log()
      const formattedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({
        apiStat: apiStatus.success,
        courseData: formattedData,
      })
    }
  }

  renderSuccessView = () => {
    const {courseData} = this.state

    return (
      <>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <div className="courses-container">
          <h1 className="heading">Courses</h1>
          <ul className="courses-list-container">
            {courseData.map(eachCourse => (
              <Item key={eachCourse.id} courseDetails={eachCourse} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
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
          onClick={this.getCourseData}
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader=container" /* testid="loader" */>
      <Loader type="ThreeDots" width={50} height={50} color="#00BFFF" />
    </div>
  )

  renderApiStatus = () => {
    const {apiStat} = this.state
    switch (apiStat) {
      case apiStatus.loading:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.fail:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {courseData, apiStat} = this.state
    console.log(courseData)
    return (
      <div className="app-container">
        <div className="responsive">
          <div className="nav-container">
            {this.renderApiStatus()}
            {/* <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
                alt="website logo"
                className="logo"
              />
            </Link> */}
          </div>
        </div>
      </div>
    )
  }
}

export default CourseItem
