import React from "react";
import ReactDOM from "react-dom";

class ErrorBoundary extends React.Component {

    state = { error : false }

    static getDerivedStateFromError(error){
        return {error};
    }

    componentDidCatch(error){
        console.error(error);
    }

    render(){
        return this.state.error ? this.props.fallback : this.props.children;
    }

}

const BrokenComponent = () => {
        
}

ReactDOM.render(

    
)