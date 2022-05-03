import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';

class TicketControl extends React.Component {

    constructor(props) {
        super(props);
        console.log(props + " ticketControl constructor props")
        this.state = {
            // formVisibleOnPage: false, //handled with redux now
            selectedTicket: null,
            editing: false
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    //It's common practice to prefix the name of an event handler function with handle

    handleEditClick = () => {
        this.setState({editing: true});
    }
    handleEditingTicketInList = (ticketToEdit) => {
        const { dispatch } = this.props;
        const action = a.addTicket(ticketToEdit);
        dispatch(action);
        this.setState({
            editing: false,
            selectedTicket: null
        });
    }
    
    // handleEditingTicketInList = (ticketToEdit) => {
    //     const { dispatch } = this.props;
    //     const { id, names, location, issue } = ticketToEdit;       
    //     const action = {
    //         type: 'ADD_TICKET',
    //         id: id,
    //         names: names,
    //         location: location,
    //         issue: issue,
    //     }
    //     dispatch(action);
    //     this.setState({
    //         editing: false,
    //         selectedTicket: null
    //     });
    // }
    handleDeletingTicket = (id) => {
        const { dispatch } = this.props;
        const action = a.deleteTicket(id);
        dispatch(action);
        this.setState({selectedTicket: null});
    }
    // handleDeletingTicket = (id) => {
    //     const { dispatch } = this.props;
    //     const deleteTicket = id => ({
    //         type: 'DELETE_TICKET',
    //         id
    //     })
    //     const action = deleteTicket(id)
    //     // const action = {
    //     //     type: 'DELETE_TICKET',
    //     //     id: id
    //     // }
    //     dispatch(action);
    //     this.setState({selectedTicket: null});
    // }

    handleChangingSelectedTicket = (id) => {
        const selectedTicket = this.props.mainTicketList[id];
        this.setState({selectedTicket: selectedTicket})
    }

    handleAddingNewTicketToList = (newTicket) => {
        const { dispatch } = this.props;
        const action = a.addTicket(newTicket);
        dispatch(action);
        const action2 = a.toggleForm();
        dispatch(action2);
    }
    // handleAddingNewTicketToList = (newTicket) => {
    //     const { dispatch } = this.props;
    //     const { id, names, location, issue } = newTicket;
    //     const action = {
    //         type: 'ADD_TICKET',
    //         id: id,
    //         names: names,
    //         location: location,
    //         issue: issue,
    //     }
    //     dispatch(action);
    //     // this.setState({formVisibleOnPage: false }); //handled with redux now
    // }

    handleClick = () => {
        if (this.state.selectedTicket != null) {
            this.setState({
            // formVisibleOnPage: false, //handled with redux now
            selectedTicket: null,
            editing: false
            });
        } else {
            const { dispatch } = this.props;
            const action = a.toggleForm();
            dispatch(action);
            // this.setState(prevState => ({
            // formVisibleOnPage: !prevState.formVisibleOnPage,
            // })); //handled with redux now
        }
    }
    // prefix props with "on" -- as in onNewTicketCreation
    render(){
        let currentlyVisibleState = null;
        let buttonText = null;
        if (this.state.editing ) {      
            currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
            buttonText = "Return to Ticket List";
        } else if (this.state.selectedTicket != null) {
            currentlyVisibleState = <TicketDetail 
            ticket = {this.state.selectedTicket} 
            onClickingDelete = {this.handleDeletingTicket} 
            onClickingEdit = {this.handleEditClick}/>
            buttonText = "Return to Ticket List";

            // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
        }
        else if (this.props.formVisibleOnPage) { //changed this.state to this.props 

        // This conditional needs to be updated to "else if."

        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />;
        buttonText = "Return to Ticket List";
        } else {
        currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;

        // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.

        buttonText = "Add Ticket";
        }
        return (
            <React.Fragment>
                {currentlyVisibleState}
                <button onClick={this.handleClick}>{buttonText}</button>
            </React.Fragment>
        );
    }

}

TicketControl.propTypes = {
    mainTicketList: PropTypes.object,
    formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        // Key-value pairs of state to be mapped from Redux to React component go here.
        mainTicketList: state.mainTicketList,
        formVisibleOnPage: state.formVisibleOnPage
    }
}
TicketControl = connect(mapStateToProps)(TicketControl);
export default TicketControl;