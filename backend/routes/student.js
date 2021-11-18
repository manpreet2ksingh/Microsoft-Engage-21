const express = require('express');
const router = express.Router();

const {saveResponse, getStudentByID} = require('../controllers/student')

/* preference for each class for next day -- response collected -- 

response = {
    batch,time,teacherID,preference,subject,studentID,studentName
}

after 6pm -- display on dashboard --- analysis of each lecture next day -- to teacher , to students

each lecture analysis -- get records from collected response -- filter(batch,time,tid) -- Count of offline/online/absentees

url = '/:teacherID/lecture/getAnalysis'

*/

router.post('/:studentID/response',saveResponse);
router.param("studentID",getStudentByID);

module.exports = router
