export const registerUserReducer = (state={},action) =>{
    switch(action.type){
        case 'USER_REGISTER_REQUEST':
            return{
                ...errorReducer(state, action),
                loading: true
            }
        case 'USER_REGISTER_SUCCESS':
            return{
                loading : false,
                success : true
            }
        case 'USER_REGISTER_FAIL':
            return{
                ...errorReducer(state, action),
                loading: false,
                // error: action.payload
                
            }
        default:
            return {state}        
    }
}

export const loginUserReducer = (state={success:false},action) =>{
    switch(action.type){
        case 'USER_LOGIN_REQUEST' :
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'USER_LOGIN_SUCCESS':
            return{
                loading:false,
                success:true,
                token: action.payload
            }
        case 'USER_LOGIN_FAIL' :
            return{
                ...errorReducer(state,action),
                loading:false
            }
        case 'RESET_SUCCESS':
            return {
                ...state,
                success: false,
            };
        default : 
            return state;
    }
};

export const logoutUserReducer = (state={},action) =>{
    switch(action.type){
        case 'USER_LOGOUT_REQUEST' :
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'USER_LOGOUT_SUCCESS':
            return{
                loading:false,
                success:true
            }
        case 'USER_LOGOUT_FAIL' :
            return{
                ...errorReducer(state,action),
                loading:false
            }
        default : 
            return state;
    }
};

export const authReducer = (state = {isAuthenticated:false}, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false
        };
      default:
        return state;
    }
  };

export const getAllUserReducer = (state={users:[]},action) =>{
    switch(action.type){
        case 'GET_USERS_REQUEST' :
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'GET_USERS_SUCCESS':
            return{
                users: action.payload,
                loading:false
            }
        case 'GET_USERS_FAIL' :
            return{
                ...errorReducer(state,action),
                loading:false
            }
        default : 
            return state;
    }
}

export const getUsersByIdReducer = (state={students:[]},action) =>{
    switch(action.type){
        case 'GETUSERSBYID_REQUEST' :
            return{
                ...errorReducer(state,action),
                loading:true
            }
        case 'GETUSERSBYID_SUCCESS':
            return{
                students: action.payload,
                loading:false
            }
        case 'GETUSERSBYID_FAIL' :
            return{
                ...errorReducer(state,action),
                loading:false
            }
        default : 
            return state;
    }
}

// export const getRootUserReducer = (state={ },action) =>{
//     switch(action.type){
//         case 'GET_USER_REQUEST' :
//             return{
//                 ...errorReducer(state,action),
//                 loading:true
//             }
//         case 'GET_USER_SUCCESS':
            
//             return{
//                 user: action.payload,
//                 item:"yes",
//                 loading:false
//             }
//         case 'GET_USER_FAIL' :
//             return{
//                 ...errorReducer(state,action),
//                 loading:false
//             }
//         default : 
//             return state;
//     }
// }

// ////////////////////// Update User //////////////////////

export const updateUserReducer = (state={},action) =>{
    switch(action.type){
        case 'UPDATE_USER_REQUEST':
            return{
                ...errorReducer(state, action),
                loading: true
            }
        case 'UPDATE_USER_SUCCESS':
            return{
                loading : false,
                success : true
            }
        case 'UPDATE_USER_FAIL':
            return{
                ...errorReducer(state, action),
                loading: false,
                // error: action.payload
                
            }
        default:
            return {state}        
    }
}


// ////////////////////// Delete User //////////////////////

export const deleteUserReducer = (state={},action) =>{
    switch(action.type){
        case 'DELETE_USER_REQUEST':
            return{
                ...errorReducer(state, action),
                loading: true
            }
        case 'DELETE_USER_SUCCESS':
            return{
                loading : false,
                success : true
            }
        case 'DELETE_USER_FAIL':
            return{
                ...errorReducer(state, action),
                loading: false,
                // error: action.payload
                
            }
        default:
            return {state}        
    }
}


export const errorReducer = (state, action) => {
    if (!action.error) {
      return {
        ...state,
        error: null,
      }
    }
//   console.log(action.payload.response.data.error)
    return {
      ...state,
      error: {
        errorMessage: "error occured.",
        ...action.payload.response.data,
      },
    }
  }


const initialState = true;

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.payload;
    default:
      return state;
  }
};
