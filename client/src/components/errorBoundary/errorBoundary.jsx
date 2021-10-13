import React from 'react';

export class ErrorBoundary extends React.Component {
   constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.error) {
      window.history.pathname = '/';
    }

    return this.props.children; 
  }
}