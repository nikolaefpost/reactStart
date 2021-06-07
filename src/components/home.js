import React from 'react';
import NpAreas from "./newpost/npAreas";

class Home extends React.Component{
    constructor() {
        super();
        console.log('начато создание компонента')


    }
    componentDidMount() {
        console.log('я создан и примонтирован')
    }

    render() {
        return (
            <div>
                <h3>Hello world</h3>
                <NpAreas></NpAreas>
            </div>

        )
    }
}

export default Home;
