import { Link } from 'react-router-dom'
import charactersImg from 'shared/assets/sidebarIcons/character.png'
import dubbersImg from 'shared/assets/sidebarIcons/dubber.png'
import genresImg from 'shared/assets/sidebarIcons/genres.png'
import releasesImg from 'shared/assets/sidebarIcons/releases.png'
import usersImg from 'shared/assets/sidebarIcons/users.png'

import style from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={style.sidebar}>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard/releases">
              <img src={releasesImg} alt="" />
              <span>Releases</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/characters">
              <img src={charactersImg} alt="" />
              <span>Characters</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/team">
              <img src={dubbersImg} alt="" />
              <span>Team</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/genres">
              <img src={genresImg} alt="" />
              <span>Genres</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users">
              <img src={usersImg} alt="" />
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
