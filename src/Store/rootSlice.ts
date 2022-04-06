import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserDetails {
    yourDetails: {
        firstName: string,
        lastName: string,
        dob: string,
        gender: string,
        annualIncome: number,
        panNumber: string,
        doorNo: number | undefined, street:string, zipCode: number | undefined,
        phoneNumber: string,
    }
}

export interface Step1 {
    firstName: string,
    lastName: string
}

export interface Step2 {
    panNumber : string,
    annualIncome: number,
    phoneNumber: string,
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
        gender: 'male',
        annualIncome: 0,
        panNumber: '',
        doorNo: undefined, street:'', zipCode: undefined,
        phoneNumber: '',
        
    }
}


export const rootSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      updateDetails: (state:UserDetails, action: PayloadAction<Step1 | Step2 | Step3 >) => {
        state.yourDetails =  {
              ...state.yourDetails,
              ...action.payload,
            }
          },
      reset: (state: UserDetails) => {
        state.yourDetails = initialState.yourDetails
      },
    }
  })

  export const { updateDetails, reset } = rootSlice.actions

  export default rootSlice.reducer
