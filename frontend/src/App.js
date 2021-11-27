import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import LoginScreen from './components/LoginScreen/LoginScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard/TeacherDashbord';
import TimetableLayout from './components/Timetable/Timetable';
import StudentPreference from './components/Submission/studentSubmission';
import TeacherPreference from './components/Submission/teacherSubmission';
import AnalysisTable from './components/AnalysisTable/AnalysisTable';
import List from './components/OfflineStudentList/List';
import ExtraClass from './components/ExtraClass/ExtraClass';
import VaccinationStatusUpdate from './components/UpdateVaccinationStatus/UpdateVaccinationStatus'
import ShowExtraLectures from './components/ExtraClass/ShowExtraLectures';

import Test from './components/testing'

const App = () => (
  <BrowserRouter>
    <Switch>
        <Route path='/' component={LandingPage} exact />
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} exact />
        <Route path='/timetable' component={TimetableLayout} exact />
        <Route path='/studentDashboard' component={StudentDashboard} exact />
        <Route path='/teacherDashboard' component={TeacherDashboard} exact />
        <Route path="/studentSubmit" component={StudentPreference} exact />
        <Route path="/teacherSubmit" component={TeacherPreference} exact />
        <Route path="/response" component={AnalysisTable} exact />
        <Route path="/extraLecture" component={ExtraClass} exact />
        <Route path="/upcomingExtraLectures" component={ShowExtraLectures} exact />
        <Route path="/updateVaccinationStatus" component={VaccinationStatusUpdate} exact />
        <Route path="/list" component={List} exact />
        <Route path="/test" component={Test} exact />
    </Switch>
  </BrowserRouter>
)

export default App;
