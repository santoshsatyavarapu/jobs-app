import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobCard from '../JobCard/index'
import SalaryRange from '../SalaryRanges'
import EmploymentTypes from '../EmploymentTypes'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    apiStatusForProfile: apiStatusConstants.initial,
    profileDetails: {},
    searchInput: '',
    jobsArray: [],
    salaryRangeId: '1000000',
    employmentIds: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatusForProfile: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        apiStatusForProfile: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatusForProfile: apiStatusConstants.failure,
      })
    }
  }

  getJobsDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {salaryRangeId, searchInput, employmentIds} = this.state
    const employmentString = employmentIds.join()

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentString}&minimum_package=${salaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachElement => {
        const objectData = {
          companyLogoUrl: eachElement.company_logo_url,
          employmentType: eachElement.employment_type,
          id: eachElement.id,
          jobDescription: eachElement.job_description,
          location: eachElement.location,
          packagePerAnnum: eachElement.package_per_annum,
          rating: eachElement.rating,
          title: eachElement.title,
        }
        return objectData
      })
      this.setState({
        jobsArray: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileCard = () => {
    const {profileDetails} = this.state

    return (
      <div className="profile-container">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile"
          className="profile-image"
        />
        <h1 className="name-heading">{profileDetails.name}</h1>
        <p className="short-bio"> {profileDetails.shortBio}</p>
      </div>
    )
  }

  renderJobCard = () => {
    const {jobsArray} = this.state
    if (jobsArray.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure-image"
          />
          <h1 className="no-jobs">No Jobs Found</h1>
          <p className="try-filter">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }

    return (
      <ul className="jobs-cards-container">
        {jobsArray.map(eachElement => (
          <JobCard jobDetails={eachElement} key={eachElement.id} />
        ))}
      </ul>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobsDetails()
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container ">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onChangeSalaryInput = event => {
    this.setState({salaryRangeId: event}, this.getJobsDetails)
  }

  renderSalaryRangesList = () => (
    <ul className="employment-list-container">
      <h1 className="filter-heading">Salary Range</h1>
      {salaryRangesList.map(eachElement => (
        <SalaryRange
          eachElement={eachElement}
          onChangeSalaryInput={this.onChangeSalaryInput}
          key={eachElement.salaryRangeId}
        />
      ))}
    </ul>
  )

  updateEmploymentIds = event => {
    const {employmentIds} = this.state
    if (employmentIds.includes(event)) {
      const updatedList = employmentIds.filter(
        eachElement => eachElement !== event,
      )
      this.setState({employmentIds: [...updatedList]}, this.getJobsDetails)
    } else {
      employmentIds.push(event)
      this.setState({employmentIds: [...employmentIds]}, this.getJobsDetails)
    }
  }

  renderEmploymentTypes = () => {
    const {employmentIds} = this.state

    return (
      <ul className="employment-list-container">
        <h1 className="filter-heading">Type of Employment</h1>
        {employmentTypesList.map(eachElement => (
          <EmploymentTypes
            eachElement={eachElement}
            key={eachElement.employmentTypeId}
            employmentIds={employmentIds}
            updateEmploymentIds={this.updateEmploymentIds}
          />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailure = () => (
    <div className="loader-container">
      <button
        type="button"
        className="failure-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="no-jobs">Oops! Something Went Wrong</h1>
      <p className="try-filter">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getJobsDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatusForProfile, apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="filter-container">
            <div className="sm-container">{this.renderSearchInput()}</div>
            {apiStatusForProfile === 'FAILURE' && this.renderProfileFailure()}
            {apiStatusForProfile === 'IN_PROGRESS' && this.renderLoadingView()}
            {apiStatusForProfile === 'SUCCESS' && this.renderProfileCard()}

            <hr className="horizontal-line" />
            {this.renderEmploymentTypes()}
            <hr className="horizontal-line" />
            {this.renderSalaryRangesList()}
          </div>
          <div className="right-container">
            <div className="lg-container">{this.renderSearchInput()}</div>
            {apiStatus === 'FAILURE' && this.renderJobFailure()}
            {apiStatus === 'SUCCESS' && this.renderJobCard()}
            {apiStatus === 'IN_PROGRESS' && this.renderLoadingView()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
