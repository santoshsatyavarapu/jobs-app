import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobCard = props => {
  const {eachElement} = props
  return (
    <li className="card-container-similar">
      <div className="row-container-similar">
        <img
          src={eachElement.companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-similar"
        />
        <div className="column-container-similar">
          <h1 className="title-heading-similar">{eachElement.title}</h1>
          <div className="row-container-similar">
            <BsFillStarFill className="star react-icons-similar" />
            <p className="para-elements-similar">{eachElement.rating}</p>
          </div>
        </div>
      </div>

      <h1 className="description-similar">Description</h1>
      <p className="para-elements-similar">{eachElement.jobDescription}</p>
      <div className="container-space-between">
        <div className="row-container-similar">
          <div className="row-container-similar">
            <MdLocationOn className="react-icons-similar" />
            <p className="para-elements-similar">{eachElement.location}</p>
          </div>

          <div className="row-container-similar">
            <BsFillBriefcaseFill className="react-icons-similar" />
            <p className="para-elements-similar">
              {eachElement.employmentType}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
