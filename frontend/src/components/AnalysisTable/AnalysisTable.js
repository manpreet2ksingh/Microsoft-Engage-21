import React from 'react'
import Header from '../Navbar/Navbar';
import './styles.css'

const AnalysisTable = ()=>{

    return(
        <div>
            <Header />
            <div class="container">
                <h2>class batch time </h2>
                <ul class="responsive-table">
                    <li class="table-header">
                    <div class="col col-1">Student ID</div>
                    <div class="col col-2">Student Name</div>
                    <div class="col col-3">Vaccination Status</div>
                    <div class="col col-4">Preference</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AnalysisTable;