import {Component} from 'react'

import {
  BsFillStarFill,
  BsFillBriefcaseFill,
  BsBoxArrowInUpRight,
} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import SkillCard from '../SkillCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const getSkills = data => {
  const updatedData = data.map(eachElement => {
    const objectNow = {
      name: eachElement.name,
      imageUrl: eachElement.image_url,
    }
    return objectNow
  })
  return updatedData
}

const formatData = eachElement => {
  const objectUpdated = {
    companyLogoUrl: eachElement.company_logo_url,
    companyWebsiteUrl: eachElement.company_website_url,
    skills: getSkills(eachElement.skills),
    atCompanyDescription: eachElement.life_at_company.description,
    atCompanyImageUrl: eachElement.life_at_company.image_url,

    employmentType: eachElement.employment_type,
    id: eachElement.id,
    jobDescription: eachElement.job_description,
    location: eachElement.location,
    packagePerAnnum: eachElement.package_per_annum,
    rating: eachElement.rating,
    title: eachElement.title,
  }

  return objectUpdated
}

const formatSimilarJobsData = arrayElement => {
  const updatedArray = arrayElement.map(eachElement => {
    const objectUpdated = {
      companyLogoUrl: eachElement.company_logo_url,
      employmentType: eachElement.employment_type,
      id: eachElement.id,
      jobDescription: eachElement.job_description,
      location: eachElement.location,
      rating: eachElement.rating,
      title: eachElement.title,
    }

    return objectUpdated
  })
  return updatedArray
}

class JobDetailed extends Component {
  state = {
    jobsData: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDetailedJobData()
  }

  getDetailedJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const jobsData = formatData(fetchedData.job_details)
      const similarJobs = formatSimilarJobsData(fetchedData.similar_jobs)

      this.setState({
        jobsData,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderDetailedJobCard = () => {
    const {jobsData} = this.state
    const skillsArray = jobsData.skills
    const arrayElement = skillsArray.map(eachElement => (
      <SkillCard eachElement={eachElement} key={eachElement.name} />
    ))

    return (
      <div className="card-container-detailed">
        <div className="row-container-detailed">
          <img
            src={jobsData.companyLogoUrl}
            alt="job details company logo"
            className="company-logo-detailed"
          />
          <div className="column-container-detailed">
            <h1 className="title-heading-detailed">{jobsData.title}</h1>
            <div className="row-container-detailed">
              <BsFillStarFill className="star-detailed react-icons-detailed" />
              <p className="para-elements-detailed">{jobsData.rating}</p>
            </div>
          </div>
        </div>
        <div className="container-space-between-detailed">
          <div className="row-container-detailed">
            <div className="row-container-detailed">
              <MdLocationOn className="react-icons-detailed" />
              <p className="para-elements-detailed">{jobsData.location}</p>
            </div>

            <div className="row-container-detailed">
              <BsFillBriefcaseFill className="react-icons-detailed" />
              <p className="para-elements-detailed">
                {jobsData.employmentType}
              </p>
            </div>
          </div>
          <p className="para-elements-detailed"> {jobsData.packagePerAnnum}</p>
        </div>

        <hr />
        <div className="anchor-container">
          <h1 className="description-detailed">Description</h1>
          <a href={jobsData.companyWebsiteUrl} className="anchor-element">
            Visit
            <BsBoxArrowInUpRight className="anchor-icon" />
          </a>
        </div>

        <p className="para-elements-detailed">{jobsData.jobDescription}</p>
        <h1 className="description-detailed">Skills</h1>
        <ul className="skills-container">{arrayElement}</ul>
        <h1 className="description-detailed">Life at Company</h1>
        <div className="at-company-container">
          <p className="para-elements-detailed">
            {jobsData.atCompanyDescription}
          </p>
          <img
            src={jobsData.atCompanyImageUrl}
            alt="life at company"
            className="at-company-image"
          />
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
        onClick={this.getDetailedJobData}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {similarJobs, apiStatus} = this.state

    return (
      <>
        <Header />
        <div className="detailed-bg-container">
          {apiStatus === 'SUCCESS' && (
            <>
              {this.renderDetailedJobCard()}
              <h1 className="similar-jobs">Similar Jobs</h1>
              <ul className="similar-jobs-container">
                {similarJobs.map(eachElement => (
                  <SimilarJobCard
                    eachElement={eachElement}
                    key={eachElement.id}
                  />
                ))}
              </ul>
            </>
          )}
          {apiStatus === 'IN_PROGRESS' && this.renderLoadingView()}
          {apiStatus === 'FAILURE' && this.renderJobFailure()}
        </div>
        )
      </>
    )
  }
}

export default JobDetailed
