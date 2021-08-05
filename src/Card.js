import React, { Component } from 'react';
import './Card.css'


export class Card extends Component {
    constructor(props){
        super(props);
        let x = Math.random() *40 -20;
        let y = Math.random() *40 -20;
        let angle = Math.random() *90 -45;
        let transform = `translate(${x}px,${y}px) rotate(${angle}deg)`;
        this._cardStyle = {transform}
    }
    
    render() {

        return (
            <li className="Card">
                <img style={this._cardStyle} src={this.props.imgUrl} alt={this.props.id} />
            </li>
        )
    }
}

export default Card
