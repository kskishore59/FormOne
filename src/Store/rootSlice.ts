import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserDetails {
    yourDetails: {
        firstName: string,
        lastName: string,
        dob: string,
        gender: string,
        annualIncome: number,
        panNumber: string,
        doorNo: number, street:string, zipCode: number,
        phoneNumber: number,
        
    }
}

export interface Step1 {
    firstName: string,
    lastName: string
}

export interface Step2 {
    panNumber : string,
    annualIncome: number,
    phoneNumber: number,
    dob: string,
    gender:string,
}

export interface Step3{
        doorNo: number,
        street: string,
        zipCode: number,
}


export const initialState = {
    yourDetails: {
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        annualIncome: 0,
        panNumber: '',
        doorNo: 0, street:'', zipCode: 0,
        phoneNumber: 0,
        
    }
}


export const rootSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      updateDetails: (state:UserDetails, action: PayloadAction<Step1 | Step2 | Step3 >) => {
        state =  {
            ...state.yourDetails,
            yourDetails: {
              ...state.yourDetails,
              ...action.payload,
            }
          }
      },
      reset: (state: UserDetails) => {
        state = initialState
      },
    },
  })

  export const { updateDetails, reset } = rootSlice.actions

  export default rootSlice.reducer
