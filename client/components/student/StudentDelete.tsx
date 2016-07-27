import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Button} from 'react-bootstrap';
import helper from '../../helpers/uiHelper';
import * as _ from 'lodash';
import * as studentActions from '../../actions/studentActions';

interface State {
    student: any,
    visible: boolean,
    close(): void
}

interface Props {
    student: any,
    visible: boolean,
    close(): void,
    actions: any
}

class StudentDelete extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            student: _.assign({}, props.student),
            visible: props.visible,
            close: props.close
        };
        
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent(event) {
        event.preventDefault();

        this.props.actions.deleteStudent(this.props.student.id)
            .then(() => {
                this.props.close();
                
                helper.showMessage('Student deleted');
            });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.deleteStudent}>Delete</Button>
                        <Button onClick={this.props.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

(StudentDelete as any).propTypes = {
    student: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired,
    visible: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        student: _.cloneDeep(state.student.current)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: (bindActionCreators as any)(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentDelete);