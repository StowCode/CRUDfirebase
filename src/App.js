// https://www.youtube.com/watch?v=jCY6DH8F4oc

import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(0)

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users'); // users data from db set to variable

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, age: Number(newAge) });
    window.location.reload(true)
  }

  // Adds a year to age
  const addYear = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age+1}
    await updateDoc(userDoc, newFields)
    window.location.reload(true)
  };

  // Subtracts year from age
  const subtractYear = async (id, age) => {
    const userDoc = doc(db, "users", id)
    const newFields = {age: age-1}
    await updateDoc(userDoc, newFields)
    window.location.reload(true)
  };

  // Deletes User
  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
    window.location.reload(true);
  }


  // task after render
  useEffect(() => {

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); // iterates through data and returns everything the field contains plus the ID
    }

    getUsers()
  }, [])

  return (
    <div className="App">
      <h1>Conference Check-in</h1>
      <div id='input_container'>
        <input placeholder='name' onChange={(event) => {setNewName(event.target.value)}}/> {/* takes input and sets it to db */}
        <input placeholder='age' type='number' onChange={(event) => {setNewAge(event.target.value)}}/>
        <button onClick={createUser}> Check In </button>
      </div>

      {users.map((user) => { 
        return (
        <div>
          <div id='line'></div>
          <div className='userInfo'>
            <h2>NAME: {user.name}</h2>
            
            <div className='agebox'>
            <h2>AGE: {user.age}</h2>
              <div id="button_container">
                <button onClick={() => {subtractYear(user.id, user.age)}}> - </button>
                <button onClick={() => {addYear(user.id, user.age)}}> + </button>
              </div>
            </div>

            <button onClick={() => {deleteUser(user.id)}}>Delete Attendee</button>
          </div>
        </div>
        );
      })}
    </div>
  );
}

export default App;
