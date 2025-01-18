import style from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <aside className={style.sidebar}>
      <nav>
        <ul>
          <li>
            <a href="/">
              <img src="/src/shared/assets/sidebarIcons/releases.png" alt="" />
              <span>Releases</span>
            </a>
          </li>
          <li>
            <a href="/">
              <img src="/src/shared/assets/sidebarIcons/character.png" alt="" />
              <span>Characters</span>
            </a>
          </li>
          <li>
            <a href="/">
              <img src="/src/shared/assets/sidebarIcons/dubber.png" alt="" />
              <span>Dubbers</span>
            </a>
          </li>
          <li>
            <a href="/">
              <img src="/src/shared/assets/sidebarIcons/genres.png" alt="" />
              <span>Genres</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
