
    export type userInp = {
      country: number | countryInp
      
    }

    export type countryInp = {
      
      users: number | userInp
    }
