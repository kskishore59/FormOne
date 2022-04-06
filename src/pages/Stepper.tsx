import { Link, useLocation } from 'react-router-dom';

type Props = {}

export const Stepper = (props: Props) => {
    const location = useLocation()

    

  return (
    <nav className="container stepper-nav">
    <ul className="steps d-flex w-100 justify-content-between">
      
      <li className={location.pathname === "/" ? "active" : "step"}>
        <Link to="/" className="link-text">1</Link>
        
      </li>
      <hr/>
      <li className={location.pathname === "/step2" ? "active" : "step"}>
        <Link to="/step2">2</Link>
      </li>
      <hr/>
      <li className={location.pathname === "/step3" ? "active" : "step"}>
        <Link to="/step3">3</Link>
      </li>
    </ul>
  </nav>
  )
}

export { };

