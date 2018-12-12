import React, { Component } from 'react';

class Contact extends Component {
    async componentDidMount() {
        const page = document.querySelector('#page');

        var imagesContainer = document.createElement('div');
        imagesContainer.classList.add('contact--images');

        var imageYork = document.createElement('div');
        imageYork.classList.add('item-image','image-york');

        var imageMoscow = document.createElement('div');
        imageMoscow.classList.add('item-image','image-moscow');

        imagesContainer.appendChild(imageYork);
        imagesContainer.appendChild(imageMoscow);
        page.appendChild(imagesContainer);

        const contactYork = document.querySelector('.contact-york');
        const contactMoscow = document.querySelector('.contact-moscow');

        contactYork.addEventListener('mouseenter', ()=> {
            page.classList.add('push-left');
        });

        contactYork.addEventListener('mouseleave', ()=> {
            page.classList.remove('push-left');
        });

        contactMoscow.addEventListener('mouseenter', ()=> {
            page.classList.add('push-right');
        });

        contactMoscow.addEventListener('mouseleave', ()=> {
            page.classList.remove('push-right');
        });
    }

    async componentWillUnmount() {
        document.querySelector('.contact--images').remove();
    }

    render() {
        return (
            <div className="contacts">
                <div className="container">
                    <div className="block-subtitle black">
                        <h1>Write Us</h1>
                    </div>
                    <div className="contact-container">
                        <div className="contact-item contact-york">
                            <div className="contact--title">
                                <h3>New-York</h3>
                            </div>
                            <div className="contact--text">
                                <p>East Side <br />
                                    Elbridge St. 126 / 45 <br />
                                    012435v</p>

                                <p>+1 646 586 28 55 <br />
                                    hello@geeks.game</p>
                            </div>
                        </div>
                        <div className="contact-item contact-moscow">
                            <div className="contact--title">
                                <h3>Moscow</h3>
                            </div>
                            <div className="contact--text">
                                <p>Kyznetsky Pr. 56 / 123 Office 234<br />
                                107014</p>

                                    <p>+7 910 586 28 55<br />
                                hello@geeks.game</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
