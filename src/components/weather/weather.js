import React from 'react';


class Weather extends React.Component {
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

        fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=Mykolayiv%2C%20Ua&units=metric&cnt=5", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "83eae3db6emsh556aa4a4d737577p16b150jsnd1ae8dcd55e0",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                this.setState(
                    {
                        isLoaded: true,
                        items: response.list

                    }
                )
                console.log(this.state.items);
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
        console.log(this.state.items)
        return (
            <ul id='areaList'>

                <div className="main container">
                    <div className="row">
                        <div className="col-xs-12">
                            <div
                                className="col-xs-12 col-sm-6 col-sm-offset-6 col-lg-6col-lg-offset-6 weather-panel">
                                <div className="col-xs-6">
                                    <h2>Mykolayiv, Ua<br/><small>{new Date().toLocaleDateString()}</small></h2>
                                    <p className="h3"><img src={`http://openweathermap.org/img/wn/${this.state.items[0].weather[0].icon}@2x.png`} alt="car"/>{this.state.items[0].weather[0].main}
                                    </p>
                                </div>
                                <div className="col-xs-6 text-center">
                                    <div className="h1 temperature">
                                        <span>12°</span>
                                        <br/>
                                        <small>8° / 13°</small>
                                    </div>
                                </div>
                                <div className="col-xs-12">
                                    <ul className="list-inline row forecast">
                                        {
                                            this.state.items.map(
                                                item => (
                                                    <li className="col-xs-4 col-sm-2 text-center">
                                                        <h3 className="h5">Wed</h3>
                                                        <p><i className="mi mi-fw mi-2x mi-cloud-sun"></i><br/>9°/18°
                                                        </p>
                                                    </li>

                                                )
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </ul>
        )
    }

    renderErorr() {
        return (
            <div>Error :{this.state.error.message()} </div>
        )
    }
}

export default Weather;