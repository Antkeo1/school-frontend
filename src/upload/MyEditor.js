import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import { isAuthenticated } from "../auth";
import { create } from "./apiUpload";

class MyEditor extends React.Component {
    editorStyle = {
        'width': '200px',
        'margin': '10px',
        'border': '1px solid gray'
    }

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.onChange = editorState => this.setState({editorState})
    }

    componentDidMount() {
        this.uploadData = new FormData();
        this.setState({ user: isAuthenticated().user});
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

    // getContentAsRawJson = () => {
    //     const contentState = this.state.editorState.getCurrentContent();
    //     const raw = convertToRaw(contentState);

    //     return JSON.stringify(raw, null, 2)
    // }

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.state.loading) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.uploadData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data))),
                        redirectToUpload: true
                    });
                }
            });
        }
    };

    // loadContent = () => {
    //     // aapi call here
    //     const savedData = localStorage.getItem('draftEditorContentJson')
    //     return savedData ? JSON.parse(savedData) : null
    // }
    
    setEditorContent = () => {
        const rawEditorData = this.loadContent();
        if(rawEditorData !== null) {
           const contentState = convertFromRaw(rawEditorData)
            const newEditorState = EditorState.createWithContent(contentState)
            this.setState({editorState: newEditorState})
        }
    }

    render() {
        const {editorState} = this.state
       
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
                    <button onClick={this.clickSubmit}>Save Content</button>
                    <button onClick={this.setEditorContent}>Load Content</button>
                </div>
                
                <div>
                    <pre>
                        
                    </pre>
                </div>
            </div>
        )
    }
}

export default MyEditor