import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'



export default  class AllModelsItemColor extends React.Component {

    constructor(props) {
        super(props);
        console.log("Props:");
        console.log(this.props);

        // Динамически меняемые составляющие
        this.state = {
            error: null, // код ошибки
            isLoaded: false, // флаг загружены ли данные
            items: [] // данные
        }

    }


    doReadColor(){

        fetch(
            "https://www.toyota.nikolaev.ua/ajax/mod_color?id=" + this.props.id,
            {
                method: 'GET',
                cache: 'no-cache',
                // mode: 'no-cors',
                credentials: 'same-origin',
                headers: {
                    // 'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            })
            .then(response => response.json())
            .then(items => {
                console.log(items);
                this.setState(
                    {
                        isLoaded: true,
                        items: items
                    }
                )
            })
            .catch(err => {
                this.setState(
                    {
                        error: err
                    }
                )
                console.error(err);
            });
    }


    doLoadColor(){
        this.doReadColor();
    }

    hidenColors(){
        this.setState(
            {
                isLoaded: false,
                items: []
            }
        )
    }

    render() {
        if(this.state.error) { return this.renderError();}
        else if (this.state.isLoaded) {return this.renderFull();}
        return this.renderStart();
    }

    renderStart() {
        return(
            <div className='col-6'>
                <input onClick={this.doLoadColor.bind(this)} className="btn btn-primary" type="button" value="Load color"/>
            </div>
        )
    }

    renderFull() {
        return(
            <div className='col-6'>
                <input onClick={this.hidenColors.bind(this)} className="btn btn-primary" type="button" value="Hide colors"/>
                <ul className='list-group'>
                    {
                        this.state.items.map ( item => (
                                <li key={item.color_id} style={{background: item.rgb}} className='list-group-item'>
                                    {item.color_name}
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }

    renderError(){
        return(<div>Error : {this.state.error.message}</div> )
    }
}