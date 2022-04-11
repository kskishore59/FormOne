import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import DoneIcon from '@mui/icons-material/Done';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type Props = {}

export const Stepper = (props: Props) => {
    const location = useLocation()
    const stepDetails = useSelector((state: RootState) => state.completedSteps)
    const {stepOne, stepTwo, stepThree} = stepDetails;

    const locationOne = location.pathname === "/" ? 'white' : 'skyblue';
    const locationTwo = location.pathname === "/step2" ? 'white' : 'skyblue';
    const locationThree = location.pathname === "/step3" ? 'white' : 'skyblue';

    

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ml: 10,
      mr: 10,
      width: '50%'
    }}>
      
    <Link to="/" style={{textDecoration: 'none',}}>
      <ListItem  sx={{backgroundColor: locationOne, borderRadius: '50%', border: '2px solid black' }} style={{backgroundColor: locationOne}}>
        {stepOne ? <DoneIcon style={{width: '1rem', height: '1.5rem'}} /> : 1}
      </ListItem>
      </Link>
      <hr style={{width: '100%',
    color: 'lightgray',
    marginRight: '2px',
    marginLeft: '2px',
    backgroundColor: 'lightgray',
    border: '1px solid lightgray',}}/>
      <Link to="/step2" style={{textDecoration: 'none',}}>
      <ListItem sx={{backgroundColor: locationTwo,border: '2px solid black', borderRadius: '50%', }}>
      {stepTwo ? <DoneIcon style={{width: '1rem', height: '1.5rem'}} /> : 2}
      </ListItem>
      </Link>
      <hr style={{width: '100%',
    color: 'lightgray',
    marginRight: '2px',
    marginLeft: '2px',
    backgroundColor: 'lightgray',
    border: '1px solid lightgray',}}/>
      <Link to="/step3" style={{textDecoration: 'none',}}>
      <ListItem sx={{backgroundColor: locationThree,border: '2px solid black', borderRadius: '50%', }}>
      {stepThree ? <DoneIcon style={{width: '1rem', height: '1.5rem'}} /> : 3}
      </ListItem >
      </Link>
  </Box>
  )
}

export { };

