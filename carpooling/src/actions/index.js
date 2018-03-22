import _ from 'lodash';
import axios from 'axios';

const CREATE_USER = 'create_user';
const GET_USER = 'get_user'

export function createUser(data) {
  const request = axios({
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    data: data,
    url: 'http://localhost:2000/api/user/create'
  })

  return {type: CREATE_USER, payload: request};
}

export function userLoginSuccess(ic){
  const url = 'http://localhost:2000/api/user/loginSuccess?ic=' + ic;
  const request = axios.get(url);

  return {type: GET_USER, payload: request};
}

export function getUserLogin(email, password, callback){
  let url = 'http://localhost:2000/api/user/login';

  console.log('getUserLogin');  // This text appears on the log

  return function (dispatch) {
    axios({
      url          : url,
      method       : 'POST',
      responseType : 'json',
      headers: { 'Content-Type': 'application/json'},
      data : {
        email : email,
        password : password
      }
    })
    .then(
      response => {
        if (response.data.rowCount === 1) {
          console.log('success for user login response');  // This log does not appear
          var ic = response.data.rows[0].icnum;
          dispatch(userLoginSuccess(ic))
          .then(() => callback());  //  Store it in the state
        }
        else {
          console.log('fail to login user');
          alert('fail to login user');
        }
      },
      error    => {
        console.log(error);
        console.log('fail to login user');  // Neither does this one
      }
    )
    ;
  };

};
