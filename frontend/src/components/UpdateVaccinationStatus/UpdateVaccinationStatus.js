import React,{useState, useEffect} from 'react'
import Header from '../Navbar/Navbar'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {Row,Col} from 'react-bootstrap'
import {Alert} from 'react-bootstrap'

import {updateVaccinationStatus} from '../API/api'

const VaccinationStatusUpdate = ()=>{

    const [vaccinationStatus,setVaccinationStatus] = useState()
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const handleChange = (e)=>{
        setVaccinationStatus(e.target.value)
    }

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let formData = new FormData()
        formData.append('file',file);
        formData.append('vaccinationStatus',vaccinationStatus)
        await updateVaccinationStatus(formData)
        .then(res=>{
            console.log(res)
        })
    }

    const form = ()=>(
        <Container>
            <Form className='mt-3'>
                <Form.Group controlId="form.vaccinationStatus">
                    <Form.Label className="mt-3">Preferred vaccination status</Form.Label>
                    <Form.Select 
                        value={vaccinationStatus} onChange={handleChange}>
                        <option>Default select</option>
                        <option>Fully vaccinated</option>
                        <option>Partially vaccinated</option>
                        <option>Not vaccinated</option>
                    </Form.Select>
                </Form.Group>
                
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className = "mt-3">Vaccination Certificate</Form.Label>
                    <Form.Control type="file" onChange={onChange}/>
                </Form.Group>
                
                <Button className='mt-3' 
                        variant="primary" 
                        type="submit"
                        onClick={handleSubmit}>
                    Update
                </Button>
            </Form>
        </Container>
    )
    
    return(
        <div>
            <Header />
            <h2>Update your vaccination status</h2>
            {form()}
        </div>
    )
}

export default VaccinationStatusUpdate