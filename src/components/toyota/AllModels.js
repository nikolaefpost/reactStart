import React from 'react';
import AllModelsItem from "./AllModelsItem";

class AllModels extends React.Component {
    constructor() {
        super();
        console.log('начато создание компонента')

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }

    doRead() {

        fetch(
            'https://www.toyota.nikolaev.ua/ajax/all_model',
            {
                method: 'GET',
                cache: 'no-cache',
                // mode: 'no-cors',
                credentials: 'same-origin',
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'X-Requested-With': 'XMLHttpRequest'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                // body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(items => {
                this.setState(
                    {
                        isLoaded: true,
                        items: items

                    }
                )
                console.log(items)
            })
            .catch(err => {
                    this.setState(
                        {
                            error: err
                        })
                }
            );
    }

    componentDidMount() {
        this.doRead();
        console.log('я создан и примонтирован')
    }

    render() {
        if (this.state.error) return this.renderErorr()
        else if (this.state.isLoaded) return this.renderItems()
        return (
            <div> preloader</div>
        )
    }

    renderItems() {
        return (
            <ul id='areaList' className='row'>{
                this.state.items.map(item => (
                        <li key={item.id} className='col-3 list-group-item' >
                            <AllModelsItem item={item}></AllModelsItem>
                        </li>

                    )
                )
            }

            </ul>
        )
    }

    renderErorr() {
        return (
            <div>Error :{this.state.error.message()} </div>
        )
    }
}

export default AllModels;