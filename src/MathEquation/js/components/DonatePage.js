import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoin, faEthereum, faPaypal } from "@fortawesome/free-brands-svg-icons";

class DonatePage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        //<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    
        return (
            <div>
                <p>Supports the development of the application</p>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" id="paypalForm">
                    <input type="hidden" name="cmd" value="_donations" />
                    <input type="hidden" name="business" value="6GQXV84G2PEFJ" />
                    <input type="hidden" name="currency_code" value="USD" />

                    <button  type="submit" form="paypalForm" value="Submit" id="paypalButton">
                        <FontAwesomeIcon icon={faPaypal} id="paypalLogo"/>
                        Donate
                    </button>
                    
                </form>

                <p><FontAwesomeIcon icon={faBitcoin} /> BitCoin Wallet - 14h7B43j6xBmXJs67PjrudiaJEh6TefVUZ</p>

                <p> <FontAwesomeIcon icon={faEthereum} />Ethereum Wallet - 0x74A0Ccc350b5877cf6A8FB1Ccf922E76ECb8b524</p>
            </div>
        )
    }
}

export default DonatePage;