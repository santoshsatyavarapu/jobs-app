import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  return (
    <li className="card-container">
      <Link to={`/jobs/${jobDetails.id}`} className="link-elements">
        <div className="row-container">
          <img
            src={jobDetails.companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="column-container">
            <h1 className="title-heading">{jobDetails.title}</h1>
            <div className="row-container">
              <BsFillStarFill className="star react-icons" />
              <p className="para-elements">{jobDetails.rating}</p>
            </div>
          </div>
        </div>
        <div className="container-space-between">
          <div className="row-container">
            <div className="row-container">
              <MdLocationOn className="react-icons" />
              <p className="para-elements">{jobDetails.location}</p>
            </div>

            <div className="row-container">
              <BsFillBriefcaseFill className="react-icons" />
              <p className="para-elements">{jobDetails.employmentType}</p>
            </div>
          </div>
          <p className="para-elements"> {jobDetails.packagePerAnnum}</p>
        </div>

        <hr />
        <h1 className="description">Description</h1>
        <p className="para-elements">{jobDetails.jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
