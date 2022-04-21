import React from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewTicketForm(props){
    function handleNewTicketFormSubmission(event) {
        event.preventDefault();
        props.onNewTicketCreation({
            names: event.target.names.value, 
            location: event.target.location.value, 
            issue: event.target.issue.value,
            id: v4()
        });
    }
    const formStyles = {
        backgroundColor:'red',
        fontFamily: 'sans-serif'
    }
    return (
        <React.Fragment>
            <div style={formStyles}>
            <ReusableForm 
                formSubmissionHandler={handleNewTicketFormSubmission}
                buttonText="Help!" />
            </div>
        </React.Fragment>
    );
}

NewTicketForm.propTypes = {
    onNewTicketCreation : PropTypes.func
};

export default NewTicketForm;