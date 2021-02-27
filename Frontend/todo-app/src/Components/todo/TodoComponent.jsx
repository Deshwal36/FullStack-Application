import React, { Component } from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TodoDataService from '../../api/TodoDataService.js'
import AuthService from './AuthService.js'
//mport moment from 'react-moment';

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        
        if (this.state.id === '-1') {
            
            return 
        }
            
        let username = AuthService.getLoggedInUser()
        TodoDataService.retriveTodo(username, this.state.id)
            .then(response =>
                this.setState(
                    {
                        description: response.data.description,
                        targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                    }
                )

            )   
    }

    onSubmit(values) {
        let username = AuthService.getLoggedInUser()
        let todo={
                 id: this.state.id,
                 username: username,
                description: values.description,
                targetDate: values.targetDate
        }
        if (this.state.id === '-1') {
            
             TodoDataService.createTodo(username, todo)
            .then(() => this.props.history.push('/todos'))
        
        } else {
            
            TodoDataService.UpdateTodo(username, this.state.id, todo)
            .then(() => this.props.history.push('/todos'))
        }

    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 character'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid target date'
        }
        return errors
    }

    render() {
        let description = this.state.description
        let targetDate = this.state.targetDate
        //console.log('hi' +description);
        //let targetDate=this.state.targetDate
        return (
            <>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}

                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>

                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>

                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>

                                    <button className="btn btn-success" type="submit" >Submit</button>

                                </Form>

                            )
                        }
                    </Formik>
                </div>
            </>
        )


    }
}

export default TodoComponent