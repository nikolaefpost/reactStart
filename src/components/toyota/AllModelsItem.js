import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import AllModelsItemColor from "./AllModelsItemColor";




export default  class AllModelsItem extends React.Component {

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


    doReadModifications(){

        fetch(
            "https://www.toyota.nikolaev.ua/ajax/id_mod?id=" + this.props.item.id,
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


    doLoadModifications(){
        this.doReadModifications();
    }

    hidenModifications(){
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
            <div className="card">
                <img src={"https://www.toyota.nikolaev.ua/storage/" + this.props.item.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{this.props.item.name}</h5>
                    <div className='row'>
                        <div className='col-6'>
                            <input onClick={this.doLoadModifications.bind(this)} className="btn btn-primary" defaultValue='Load Modifications'/>
                        </div>

                        <AllModelsItemColor id={this.props.item.id}></AllModelsItemColor>
                    </div>


                </div>
            </div>
        )
    }

    renderFull() {
        return(
            <div className="card">
                <img src={"https://www.toyota.nikolaev.ua/storage/" + this.props.item.image} className="card-img-top w-25" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{this.props.item.name}</h5>
                    <div className='row'>
                        <div className='col-6'>
                            <input onClick={this.hidenModifications.bind(this)} className="btn btn-primary" defaultValue='Hide Modifications'/>
                            <ul className='list-group'>
                                {

                                    this.state.items.map ( item => (
                                            <li key={item.mod_id} className='list-group-item'>
                                                {item.mod_name}
                                            </li>
                                        )
                                    )


                                }
                            </ul>
                        </div>
                        <AllModelsItemColor id={this.props.item.id}></AllModelsItemColor>
                    </div>
                </div>
            </div>
        )
    }

    renderError(){
        return(<div>Error : {this.state.error.message}</div> )
    }
}