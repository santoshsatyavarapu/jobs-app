import {Link, withRouter} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <ul className="nav-menu-list-mobile">
          <Link to="/">
            <li className="nav-menu-item-mobile">
              <AiFillHome className="path-icons" />
            </li>
          </Link>
          <Link to="/jobs">
            <li className="nav-menu-item-mobile">
              <BsFillBriefcaseFill className="path-icons" />
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="path-icons" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
