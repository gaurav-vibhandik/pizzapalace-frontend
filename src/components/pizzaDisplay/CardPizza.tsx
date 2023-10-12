import React from "react";
import { Button, Card } from "react-bootstrap";
import { Pizza } from "../interfaces/pizzaInterface";

const CardPizza = (props: Pizza) => {
  return (
    <Card style={{ width: "10rem" }}>
      <Card.Img variant="top" src={props.imageUrl} />
      <Card.Body>
        <Card.Title>{props.pizzaId}</Card.Title>
        <Card.Subtitle>{props.name}</Card.Subtitle>
        <Card.Text>{props.description}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
