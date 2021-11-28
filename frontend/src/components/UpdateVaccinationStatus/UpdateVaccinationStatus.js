import React,{useState} from 'react'
import Header from '../Navbar/Navbar'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {updateVaccinationStatus} from '../API/api'
import {Alert} from 'react-bootstrap'

const VaccinationStatusUpdate = ()=>{

    const [vaccinationStatus,setVaccinationStatus] = useState()
    const [link,setLink] = useState()
    const [response,setResponse] = useState()

    const handleChange = (e)=>{
        setVaccinationStatus(e.target.value)
        setResponse()
    }

    const onChange = e => {
        setLink(e.target.value)
        setResponse()
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const {ID,role} = JSON.parse(localStorage.getItem('userInfo'))

        // console.log(ID,role,vaccinationStatus,link)

        await updateVaccinationStatus({ID,role,vaccinationStatus,link})
        .then(res=>{
            setResponse(res)
        })
    }

    const displayResponse=()=>{
        if(response.success)
        {
            return <Alert  className="d-flex justify-content-center" variant="success">
                        {response.success}
                    </Alert>
        }
        else{
            return <Alert  className="d-flex justify-content-center" variant="danger">
                        {response.error}
                    </Alert>
        }
        
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
                    <Form.Label className = "mt-3">Vaccination Certificate Link</Form.Label>
                    <Form.Control type="text" value={link} onChange={onChange}/>
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
            {response && displayResponse()}
            <h2>Update your vaccination status</h2>
            {form()}
        </div>
    )
}

export default VaccinationStatusUpdate