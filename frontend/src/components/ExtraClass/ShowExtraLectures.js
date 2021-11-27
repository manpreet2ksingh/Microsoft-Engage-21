import React,{useEffect,useState} from "react";
import ExtraLectureCard from '../Cards/ExtraLectureCard';
import Header from '../Navbar/Navbar';
import {upcomingExtraLectures,upcomingExtraLecturesByTeacherID} from '../API/api'

const ShowExtraLectures = ()=>{

    const [extraLectures,setExtraLectures] = useState()

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const getUpcomingExtraLectures = async () =>{

        if(userInfo.role === 0){
            await upcomingExtraLectures(userInfo.batch)
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    setExtraLectures(data)
                }
            })
        }
        else{
            var teacherID = userInfo.ID
            await upcomingExtraLecturesByTeacherID(teacherID)
            .then(data=>{
                if(data && data.error){
                    console.log(data.error)
                }
                else{
                    // console.log(data)
                    setExtraLectures(data)
                }
            })
        }
    }

    useEffect(()=>{
        getUpcomingExtraLectures()
    },[])

    return(
        <div>
            <Header />
            <div className="master">
                <h3>
                    Upcoming Extra Lectures
                </h3>

                <div className="container">
                    {extraLectures && extraLectures.length > 0 ?
                        extraLectures.map((lectureData,i)=>(
                            <ExtraLectureCard data={lectureData} key={i} index={++i} handler={userInfo.role}/>
                        )):
                        <h4>No upcoming extra lectures!</h4> 
                        }
                </div>
            </div>
        </div>
    )
}
export default ShowExtraLectures;