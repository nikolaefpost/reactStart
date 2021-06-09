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
        fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=Mykolayiv%2C%20Ua&units=metric&cnt=6", {
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
            <>
                <div className="main container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-xs-12 offset-sm-1 col-sm-10  col-lg-8 offset-lg-2  weather-panel">
                                <div className="row align-items-center">
                                    <div className="col-sm-6 pt-5">
                                        <h2>Mykolayiv<br/><small>{new Date().toLocaleDateString()}</small></h2>
                                        <div className="h3">
                                            <img src={`http://openweathermap.org/img/wn/${this.state.items[0].weather[0].icon}@2x.png`}
                                            alt="clouds"/>{this.state.items[0].weather[0].main}
                                        </div>
                                    </div>
                                    <div className="col-sm-6 text-center">
                                        <div className="h1 temperature">
                                            <span>{Math.floor(this.state.items[0].main.temp)}°</span>
                                            <br/>
                                            <small>{Math.floor(this.state.items[0].main.temp_min)}° / {Math.floor(this.state.items[0].main.temp_max)}°</small>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 ">
                                        <ul className="list-inline row forecast align-items-end m-1">
                                            {
                                                this.state.items.map(
                                                    item => (
                                                        <li className="col-xs-4 col-sm-4 col-lg-2 text-center pt-2">
                                                            <h3 className="h5">{new Date(item.dt*1000).getHours()}:00</h3>
                                                            <p><img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                                                    alt="clouds"/>
                                                                    <br/>
                                                                {Math.floor(item.main.temp_min)}° / {Math.floor(item.main.temp_max)}°
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
                </div>
            </>
        )
    }

    renderErorr() {
        return (
            <div>Error :{this.state.error.message()} </div>
        )
    }
}

export default Weather;