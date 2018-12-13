import React, { Component } from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState = (obj, url) => {
    window.history.pushState(obj + ", " + url);
};

const onPopState = event => {
    window.onpopstate = event;
};

class App extends Component {

    constructor() {
        super();
        
        this.state = { ...this.props.initialData };
    }

    componentDidMount() {
        onPopState((event) => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            });
        });
    }

    componentWillUnmount() {
        onPopState(null);
    }

    fetchContest = (contestId) => {
        pushState(
            { currentContestId: contestId },
            `/contest/${contestId}`
        );
    
    };

    fetchContestList = () => {
        pushState(
            { currentContestId: null },
            '/'
        );

    };

    fetchNames = (nameIds) => {
        if (!nameIds) return;
        api.fetchNames(nameIds).then(names => {
            this.setState({
                names
            });
        });
    };

    currentContest() {
        return this.state.contests[this.state.currentContestId];
    }

    pageHeader() {
        if (this.state.currentContestId) {
            return this.currentContest().contestName;
        }
        return 'Naming Contests';
    }

    lookupName = (nameId) => {
        if (!this.state.names || !this.state.names[nameId]) {
            return {
                name: '...'
            };
        }
        return this.state.names[nameId];
    };

    addName = (newName, contestId) => {
        api.addName(newName, contestId).then( res => {
            this.setState({
                contests: {
                    ...this.state.contests,
                    [res.updatedContest._id]: res.updatedContest
                },
                names: {
                    ...this.state.names,
                    [res.newName._id]: res.newName
                }
            })
        }).catch(err => console.log("Something's wrong:", err));
    };

    currentContent() {
        if (this.state.currentContestId) {
            return <Contest contestListClick={this.fetchContestList}
                            fetchNames={this.fetchNames}
                            lookupName={this.lookupName}
                            addName={this.addName}
                            {...this.currentContest()} />;
        }
        return <ContestList onContestClick={this.fetchContest}
                            contests={this.state.contests} />;
    }

    render() {
        return (
            <div className="App">
                <Header message={this.pageHeader()} />
                { this.currentContent() }
            </div>
        );
    }
}

export default App;