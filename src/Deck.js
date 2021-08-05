import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck"

export class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null, //deck_id, remaining
            cards: [] // image, code
        };
        this.handleClick = this.handleClick.bind(this);
        this.drawCard = this.drawCard.bind(this);
    }
    async componentDidMount() {
        // Load a Deck
        const deckUrl = `${API_BASE_URL}/new/shuffle/`;
        let response = await axios.get(deckUrl);
        const deck = response.data;
        // set my deck to the state
        this.setState({ deck });
    }
    handleClick(evt) {
        evt.preventDefault();
        this.drawCard();
    }
    async drawCard() {

        try {
            if (this.state.deck.remaining === 0) {
                throw new Error("No card remaining")
            } else {
                const cardUrl = `${API_BASE_URL}/${this.state.deck.deck_id}/draw/`;
                const response = await axios.get(cardUrl);
                const card = response.data.cards[0];
                const { remaining, success } = response.data
                console.log(card);
                this.setState(st => ({
                    cards: [...st.cards, { image: card.image, code: card.code }],
                    deck: { ...st.deck, remaining, success }
                }));
            }
        } catch (err) {
            alert(err)
        }
    }
    render() {
        let cards = this.state.cards.map(c => <Card key={c.code} imgUrl={c.image} id={c.code} />)
        return (
            <div className="Deck">
                <h1>Card Dealer</h1>
                <h2>🔹A little demo made with React🔹</h2>
                <button onClick={this.handleClick}>Draw a Card</button>
                <ul>
                    {cards}
                </ul>
            </div>
        )
    }
}

export default Deck
