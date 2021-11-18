import React, { useState,useEffect } from 'react'
import './styles.css'
import {TimeTable} from '../API/api'

const TimetableLayout = ()=>{

    var md = new Array(5);

    for (var i = 0; i < md.length; i++) {
        md[i] = new Array(9);
        for(var j=0;j<9;j++)
        {
            md[i][j] = j+1;
        }
    }

    const [timetable,setTimeTable] = useState([[{}]])

    const getTimeTable = async ()=>{
        await TimeTable()
        .then(data=>{
            setTimeTable(data.timetable)
            
            // for(var i=0;i<5;i++){
            //     var len = timetable[i].length;
            //     for(var j=0;j<len;j++)
            //     {
            //         md[i][timetable[i][j].time-1] = timetable[i][j];
            //     }
            // }
            // console.log(md);
        })
    }

    useEffect(()=>{
        getTimeTable();
    },[])

    return(
        <div className="timetable">
            <div className="week-names">
                <div>monday</div>
                <div>tuesday</div>
                <div>wednesday</div>
                <div>thursday</div>
                <div>friday</div>
                <div className="weekend">saturday</div>
                <div className="weekend">sunday</div>
            </div>
            <div className="time-interval">
                <div>8:00 - 9:00 </div>
                <div>9:00 - 10:00 </div>
                <div>10:00 - 11:00 </div>
                <div>11:00 - 12:00</div>
                <div>12:00 - 13:00</div>
                <div>13:00 - 14:00</div>
                <div>14:00 - 15:00</div>
                <div>15:00 - 16:00</div>
                <div>16:00 - 17:00</div>
            </div>
            <div className="content">
                {/* {
                    timetable.map((record,i)=>(
                        record.map((lecture,j)=>(
                            <div>
                                <div className="accent-orange-gradient"><p>{lecture.subject}</p></div>
                            </div>
                        ))
                    ))
                } */}
                <div>
                <div className="accent-orange-gradient"></div>
                </div>
                    <div></div>
                    <div></div>
                    <div></div>
                <div>
                    <div className="accent-green-gradient"></div>
                </div>
                    <div className="weekend"></div>
                    <div className="weekend"></div>

                <div></div>
                <div></div>
                <div></div>
                <div>
                    <div className="accent-cyan-gradient"></div>
                </div>
                <div></div>
                <div className="weekend"></div>
                <div className="weekend"></div>

                <div>
                <div className="accent-pink-gradient"></div>
                </div>
                <div></div>
                <div>
                <div className="accent-purple-gradient"></div>
                </div>
                <div></div>
                <div></div>
                <div className="weekend"></div>
                <div className="weekend"></div>

                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="weekend"></div>
                <div className="weekend"></div>

                <div>
                <div className="accent-purple-gradient"></div>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="weekend"></div>
                <div className="weekend"></div>

                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="weekend"></div>
                <div className="weekend"></div>
            </div>
        </div>
    )
}

export default TimetableLayout;