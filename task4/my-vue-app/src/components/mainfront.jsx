// CardPage.js
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { doc, getDocs, collection, getFirestore } from "firebase/firestore";
import { firestore } from './auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/authLogin';
import { useNavigate } from "react-router-dom";

import './mainfront.css';

function Mainfront() {
    const [cardsData, setCardsData] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "users"));
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCardsData(data);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        };
        fetchData();
    }, []);

    const scrollRight = () => {
        document.getElementById('flexContainer').scrollLeft += 100;
    };

    const scrollLeft = () => {
        document.getElementById('flexContainer').scrollLeft -= 100;
    };

    return (
        <>
            <div>
                {
                    user !== null ?
                        <>
                            <h1 className="page-title">Codecraft courses</h1>
                            <Container>
                                <div id="flexContainer" className="flex-container">
                                    <button className="scroll-button right" onClick={scrollRight}>{">"}</button>
                                    <button className="scroll-button left" onClick={scrollLeft}>{"<"}</button>
                                    <Row className="g-4">
                                        {cardsData.map((card, index) => (
                                            <Col className="custom-card" key={index}>
                                                <Card style={{ width: '300px', height: '300px', margin: '8px', border: '1px solid black', position: 'relative' }}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={card.imageurl}
                                                        alt={card.title}
                                                        style={{ objectFit: 'cover', width: '100%', height: '200px', zIndex: '1' }}
                                                    />
                                                    <Card.Body>
                                                        <Card.Title style={{ textAlign: 'center', padding: '5px 0px 0px 0px' }}>{card.title}</Card.Title>
                                                        <Card.Text style={{ textAlign: 'center' }}>{card.text}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                            </Container>
                        </> : navigate('/login')
                }</div>
        </>
    );
}

export { Mainfront };
