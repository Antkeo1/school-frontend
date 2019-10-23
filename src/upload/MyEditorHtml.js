import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { draftUploadByUser, read, create } from "./apiUpload";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import debounce from 'lodash/debounce'

class MyEditorHtml extends React.Component {
    editorStyle = {
        'width': '200px',
        'margin': '10px',
        'border': '1px solid gray'
    }

    constructor(props) {
        super(props);
        this.state = { 
            editorState: EditorState.createEmpty(),
            user: {},
            loading: false
        }
    }


    componentDidMount() {
        if(this.props.upload === null) {
            this.setState({
                displayUpload: 'new',
                editorState: EditorState.createEmpty()
            })
        } else {
            this.setState({
                displayUpload: this.props.upload.id,
                editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content)))
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.upload === null && !!this.props.upload) {

        }
    }

    onChange = editorState => {
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);
        
        this.setState({
            editorState
        })
    }

    handleKeyCommand = (command) => {
        const {editorState} = this.state
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState)
            return true
        }
        return false
    }

    getContentAsRawJson = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const raw = convertToRaw(contentState);

        return JSON.stringify(raw, null, 2)
    }
    
    
    

    // getContentAsRawHtml = () => {
    //     const contentState = this.state.editorState.getCurrentContent();
    //     const html = stateToHTML(contentState)
        
    // }

    render() {
        const {editorState} = this.state
        if(!editorState) {
            return (
                <h3 className='loading'>Loading...</h3>
            )
        }

        return (
            <div>
                <div style={{'margin': '10px'}}>
                    <button onClick={() => this.handleKeyCommand('bold')} >Bold</button>
                    <button onClick={() => this.handleKeyCommand('italic')} >Italic</button>
                    <button onClick={() => this.handleKeyCommand('underline')} >Underline</button>
                    <button onClick={() => this.handleKeyCommand('code')} >Code</button>
 
                </div>
                <div style={this.editorStyle}>
                    <Editor 
                        editorState={editorState} 
                        onChange={this.onChange} 
                        handleKeyCommand={this.handleKeyCommand} 
                    />
                </div>
                
                <div  style={{'margin': '10px'}}>
                
                <button
                    onClick={this.saveContent}
                    className="btn btn-raised btn-primary"
                >
                    Upload File
                </button>
                <Link className='btn btn-raised ml-5' to={'/uploads'}>Back</Link>
            
                </div>
                
                <div>
                    <pre>
                        
                    </pre>
                </div>
            </div>
        )
    }
}

export default MyEditorHtml