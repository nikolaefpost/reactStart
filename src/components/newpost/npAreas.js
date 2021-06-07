import React from 'react';

class NpAreas extends React.Component{
    constructor() {
        super();
        console.log('начато создание компонента')

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    doRead(){
        let request = {
            apiKey: 'f5bf7ccf7d80614557218cf7043569b8',
            modelName: 'Address',
            calledMethod: 'getAreas',
            methodProperties: {}
        };
        fetch(


            'https://api.novaposhta.ua/v2.0/json/',
            {
                method: 'POST',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(request)
            }

        )
            .then(response => response.json())
            .then(items => console.log(items));
    }
    componentDidMount() {
        this.doRead();
        console.log('я создан и примонтирован')
    }

    render() {
        if(this.state.error) return this.renderErorr()
        else if (this.state.isLoaded) return this.renderItems()
        return (
            <div> preloader</div>
        )
    }

    renderItems(){
        return(
            <div>data</div>
        )
    }
    renderErorr(){
        return(
            <div >Error :{this.state.error.message()} </div>
    )
    }
}

export default NpAreas;
