import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { url } from '../helpers/url';
import { Button, Table, Modal, Container, Navbar, Form, FormControl } from 'react-bootstrap';
import { useForm } from '../hooks/UseForm';

const List = () => {
    // BUSCARDOR
    const [filtro, setFiltro] = useState([]);
    const [formValues, handleInputChange] = useForm({
        searchText: ''

    });
    const { searchText } = formValues;

    const handleSearch = (e) => {
        e.preventDefault();
        Buscador(searchText);
    }
   

    const Buscador = async (searchText) => {
        const pUrl = "https://restcountries.com/v2/name/";
        const input = searchText;
        let filtrar = pUrl + input;

        const resp = await fetch(filtrar);
        const data = await resp.json();
        setFiltro(data);
        console.log(data);
    };


    // TRAERDATOS DE LA API
    const [registros, setRegistro] = useState([]);
    const getData = () => {
        axios.get(url)
            .then(response => {
                setRegistro(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    // MODAL
    const [show, setShow] = useState(false);
    const [chooseList, setChooseList] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setShow(true);
        setChooseList(registros.find(registro => registro.name === name))
        console.log(registros.find(registro => registro.name === name))
    }

    useEffect(() => {
        if (searchText === '') {
            getData();

        } else {
            Buscador(searchText);
        }
    }, [searchText])

    console.log(registros)
    console.log(filtro)
    console.log(searchText)
    return (
        <div className='container centrar'>
            <Navbar bg="light" expand="lg" className="sticky-top">
                <Container fluid>
                    <Navbar.Brand href="#">Buscar por pais</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">

                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="search"
                                placeholder="Buscar"
                                className="me-2"
                                aria-label="Search"
                                name="searchText"
                                value={searchText}
                                onChange={handleInputChange}
                            />
                            {/* <Button variant="success">Buscar</Button> */}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <h1 className="m-4">Lista de paises</h1>

            {
                (!searchText) ?
                    (
                        <Table className='tabla'>
                            <thead>
                                <tr>

                                    <th><h5>Bandera</h5></th>
                                    <th><h5>Pais</h5></th>
                                    <th><h5>Continente</h5></th>
                                    <th><h5>Detalles</h5></th>
                                </tr>
                            </thead>

                            <tbody>

                                {registros.map((item, index) => (
                                    <tr key={index} className='m-3'>
                                        <td> <img src={item.flag} alt="Bandera" width="100" height="100" /></td>
                                        <td> <h5>{item.name}</h5></td>
                                        <td> <h5>{item.region}</h5></td>
                                        <td> <Button variant="info"
                                            onClick={() => handleShow(item.name)}
                                        >Ver deatalles</Button>{' '} </td>

                                    </tr>
                                ))}

                            </tbody>
                        </Table>

                    ) :

                    <Table className='tabla'>
                        <thead>
                            <tr>

                                <th><h5>Bandera</h5></th>
                                <th><h5>Pais</h5></th>
                                <th><h5>Continente</h5></th>
                                <th><h5>Detalles</h5></th>
                            </tr>
                        </thead>

                        <tbody>

                            {filtro.map((item, index) => (
                                <tr key={index} className='m-3'>
                                    <td> <img src={item.flag} alt="Bandera" width="100" height="100" /></td>
                                    <td> <h5>{item.name}</h5></td>
                                    <td> <h5>{item.region}</h5></td>
                                    <td> <Button variant="info"
                                    onClick={() => handleShow(item.name)}
                                    >Ver deatalles</Button>{' '} </td>

                                </tr>
                            ))}

                        </tbody>
                    </Table>
            }


            {/* Modal de la descripcion de las peliculas */}

            <Container className=" container centrar" >
                <Modal show={show}
                    size="lg"
                    scrollable
                    className="container-modal"
                    onHide={handleClose} >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body className="modal-content ">
                        <img src={chooseList.flag} alt="" className="img-modal" />
                        <div className="data-modal">
                            <h1>{chooseList.name}</h1>
                            <h3>Capital: {chooseList.capital}</h3>
                            <h3>Población: {chooseList.population}</h3>
                            <h3>Continente: {chooseList.region}</h3>
                            <h3>Área: {chooseList.area}</h3>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose} >Cerrar</Button>{' '}
                    </Modal.Footer>
                </Modal>
            </Container>

        </div>
    )
}


export default List