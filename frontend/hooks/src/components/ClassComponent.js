import React, { Component } from 'react';

class ClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            name: 'Class Component'
        };
    }

    componentDidMount() {
        console.log('Component mounted');
        // This is similar to useEffect with empty dependency array
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            console.log('Count updated:', this.state.count);
            // This is similar to useEffect with count in dependency array
        }
    }

    componentWillUnmount() {
        console.log('Component will unmount');
        // This is similar to useEffect's cleanup function
    }

    incrementCount = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    render() {
        return (
            <div>
            <h2> {this.state.name} </h2> 
            <p> Count: {this.state.count} </p> 
            <button onClick={this.incrementCount}> Increment </button> 
            </div>
                        );
    }
}
export default ClassComponent;