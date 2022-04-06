import { Link, useLocation } from 'react-router-dom';

type Props = {}

export const Stepper = (props: Props) => {
    const location = useLocation()
  return (
    <nav className="container d-flex">
    <ul className="steps d-flex w-100 justify-content-between">
      <li className={location.pathname === "/" ? "active" : ""}>
        <Link to="/">Step 1</Link>
      </li>
      <li className={location.pathname === "/step2" ? "active" : ""}>
        <Link to="/step2">Step 2</Link>
      </li>
      <li className={location.pathname === "/step3" ? "active" : ""}>
        <Link to="/step3">Step 3</Link>
      </li>
    </ul>
  </nav>
  )
}

export { };
