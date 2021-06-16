import React from 'react';
import gql from "graphql-tag";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Mutation, ApolloProvider } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.min.css'




// export default Sales;

/* This is an example snippet - you should consider tailoring it
to your service.
*/
/*
  Add these to your `package.json`:
    "apollo-boost": "^0.3.1",
    "graphql": "^14.2.1",
    "graphql-tag": "^2.10.0",
    "react-apollo": "^2.5.5"
*/



// This setup is only needed once per application;
const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://small-night.us-east-1.aws.cloud.dgraph.io/graphql",
    }),
});

const ADD_USER_MUTATION = gql`
    mutation AddUser {
        addUser(input: [{user_name: "Eduardo", email: "nguy@gmail.com", phone: 91, pwd: "ssdddg"}, {user_name: "Denisiy", email: "snguy@gmail.com", phone: 911, pwd: "swsdddg"}]) {
            numUids
        }
    }
`;

const AddUserMutation = (props) => {
    return (
        <Mutation
            mutation={ADD_USER_MUTATION}
            context={{ headers: {"Content-Type": "application/json"} }}
        >
            {(AddUser, { loading, error, data }) => {
                if (loading) return <pre>Loading</pre>

                if (error)
                    return (
                        <pre>
              Error in ADD_USER_MUTATION
                            {JSON.stringify(error, null, 2)}
            </pre>
                    );

                const dataEl = data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                ) : null;

                return (
                    <div>
                        {dataEl}

                        <button onClick={() => AddUser()}>
                            Run mutation: AddUser
                        </button>
                    </div>
                );
            }}
        </Mutation>
    )
};

// const container = (
//     <ApolloProvider client={apolloClient}>
//         <AddUserMutation  />
//     </ApolloProvider>
// );

class Sales extends React.Component {


    render() {

        return (
            <ApolloProvider client={apolloClient}>
                <AddUserMutation  />
            </ApolloProvider>
        )
    }

}

export default Sales;
// ReactDOM.render(container, document.getElementById("root"));