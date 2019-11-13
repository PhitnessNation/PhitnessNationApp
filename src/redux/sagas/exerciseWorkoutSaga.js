import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import connect from './connect';

//fetch exercise workouts. automatically fetches goals for the logged in user
function* fetchExerciseWorkouts(){
    try{
        const response = yield axios.get('/api/exerciseWorkouts')
        yield put ({ type: 'SET_EXERCISE_WORKOUTS', payload: response.data})
    }catch (error) {
        console.log('FETCH EXERCISE WORKOUTS ERROR:', error);
    }
}
//update exercise workouts, send: { id of exercise workout: int, completed_reps: int, completed_sets: int, completed_weight: int, feedback: int }
function* updateExerciseWorkouts(action){
    try{
        yield axios.put('/api/exerciseWorkouts', action.payload)
        yield put ({ type: 'FETCH_EXERCISE_WORKOUTS' })
    }catch (error) {
        console.log('UPDATE EXERCISE WORKOUTS ERROR')
    }
}
//admin post exercise workouts, send: {user id: int, workout_id: int, exercise_id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
function* postExerciseWorkouts(action){
    try{
        yield axios.post('/api/admin/exerciseWorkouts', action.payload)
        yield put ({ type: 'ADMIN_FETCH_EXERCISE_WORKOUTS', payload: connect.id()})
    }catch (error) {
        console.log('POST EXERCISE WORKOUTS ERROR')
    }
}
//admin fetch exercise workouts, send id of user you want data from
function* adminFetchExerciseWorkouts(action){
    try{
        const response = yield axios.get('/api/admin/exerciseWorkouts/' + action.payload)
        yield put ({ type: 'SET_EXERCISE_WORKOUTS', payload: response.data })
    }catch (error) {
        console.log('ADMIN FETCH EXERCISE WORKOUTS ERROR:', error)
    }
}
//admin update exercise workouts, send: { id: int, assigned_sets: int, assigned_reps: int, assigned_weight: int, tips: "String" }
function* adminUpdatedExerciseWorkouts(action){
    try{
        yield axios.put('/api/admin/exerciseWorkouts', action.payload)
        yield put ({ type: 'ADMIN_FETCH_EXERCISE_WORKOUTS', payload: connect.id()})
    }catch (error) {
        console.log('ADMIN UPDATE EXERCISE WORKOUTS ERROR:', error)
    }
}
//admin delete exercise workouts, send the id of the exercise workout you want to delete
function* deleteExerciseWorkouts(action){
    try{
        yield axios.delete('/api/admin/exerciseWorkouts/' + action.payload)
        yield put ({ type: 'ADMIN_FETCH_EXERCISE_WORKOUTS', payload: connect.id()})
    }catch (error) {
        console.log('ADMIN DELETE EXERCISE WORKOUTS ERROR:', error)
    }
}
//admin get exercise workouts compliance data, automatically get the "current" users compliance data
function* getComplianceData(){
    try{
        const response = yield axios.get('/api/admin/data/' + connect.id())
        yield put ({ type: 'SET_COMPLIANCE', payload: response.data })
    }catch (error){
        console.log('ERROR GETTING COMPLIANCE DATA:', error)
    }
}
function* workoutsSaga(){
    yield takeLatest('FETCH_EXERCISE_WORKOUTS', fetchExerciseWorkouts);
    yield takeLatest('UPDATE_EXERCISE_WORKOUTS', updateExerciseWorkouts);
    yield takeLatest('POST_EXERCISE_WORKOUTS', postExerciseWorkouts);
    yield takeLatest('ADMIN_FETCH_EXERCISE_WORKOUTS', adminFetchExerciseWorkouts)
    yield takeLatest('ADMIN_UPDATE_EXERCISE_WORKOUTS', adminUpdatedExerciseWorkouts)
    yield takeLatest('DELETE_EXERCISE_WORKOUTS', deleteExerciseWorkouts)
    yield takeLatest('FETCH_COMPLIANCE', getComplianceData)
}

export default workoutsSaga;