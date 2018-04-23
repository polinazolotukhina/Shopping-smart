import firebase from 'firebase';
import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';

export const saveItem = item => {
  return dispatch => {
    firebase
      .database()
      .ref('/items')
      .push(item)
      .then(() => {
        dispatch({ type: types.ITEM_SAVE });
      });
  };
};

export const itemsFetch = () => {
  return dispatch => {
    firebase
      .database()
      .ref('/items')
      .on('value', snapshot => {
        dispatch({ type: types.ITEM_FETCH_SECCESS, payload: snapshot.val() });
      });
  };
};

//==================      DATA SORT      ========================

export const sortData = (criteria, desc) => {
  return dispatch => {
    firebase
      .database()
      .ref('/items')
      .orderByChild(criteria)
      .on('value', snapshot => {
        const results = [];
        snapshot.forEach(function(child) {
          results.push(child.val());
        });
        dispatch({
          type: types.ITEM_ORDER,
          payload: desc ? results.reverse() : results
        });
      });
  };
};

//==================       UPDATE      ========================
function itemUpdate(myitem) {
  return {
    type: types.ITEM_EDIT,
    editItem: myitem
  };
}

export const editItem = item => {
  return dispatch => {
    dispatch(itemUpdate(item));
    browserHistory.push('/editItem');
  };
};

//=====================IMG TO  UPLOAD ================================================

function itemUpload(img) {
  return {
    type: types.ITEM_UPLOAD,
    uploadItem: img
  };
}
export const uploadedItem = item => {
  return dispatch => {
    dispatch(itemUpload(item));
  };
};

//=====================================================================

export const deleteItem = id => {
  return dispatch => {
    firebase
      .database()
      .ref('items')
      .child(id)
      .remove();
    dispatch({ type: types.ITEM_DELETE });
  };
};

export const rewriteItem = (values, id) => {
  browserHistory.push('/');
  return dispatch => {
    firebase
      .database()
      .ref('items')
      .child(id)
      .update(values);
    dispatch({ type: types.ITEM_REWRITE });
  };
};

export const plusTimes = (id, time) => {
  return dispatch => {
    const t = parseInt(time) + 1;
    firebase
      .database()
      .ref('items')
      .child(id)
      .update({ times: t });
    dispatch({ type: types.PLUSMINUS });
  };
};
function timeGreater(time) {
  return parseInt(time) >= 1 ? parseInt(time) - 1 : 0;
}
export const minusTimes = (id, time) => {
  return dispatch => {
    firebase
      .database()
      .ref('items')
      .child(id)
      .update({ times: timeGreater(time) });
    dispatch({ type: types.PLUSMINUS });
  };
};

//
// export const itemsFetch = () => {
//     return (dispatch) => {
//         firebase.database().ref('/items')
//
//
//         .on('value', snapshot => {
//             const data = [];
//             snapshot.forEach(ss => {
//                data.push(ss.child('items').val());
//             });
//             console.log('data', data);
//             dispatch({ type: types.ITEM_FETCH_SECCESS, payload: data });
//         });
//     };
// };
