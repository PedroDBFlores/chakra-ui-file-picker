import React from "react";
import {Input, InputGroup} from "@chakra-ui/input";
import {Button, InputRightAddon} from "@chakra-ui/react";

interface FilePickerProps {
    placeholder: string
    clearButtonLabel?: string
    multipleFiles?: boolean
    onFileChange: (fileList: Array<File>) => void
}

interface FilePickerState {
    files: FileList | null
    fileName: string
}

class FilePicker extends React.Component<FilePickerProps, FilePickerState> {
    private inputRef = React.createRef<HTMLInputElement>();

    constructor(props: FilePickerProps) {
        super(props)
        this.state = {
            files: null,
            fileName: ""
        }
    }

    componentDidUpdate(_: FilePickerProps, prevState: FilePickerState) {
        if (prevState.files != this.state.files) {
            const fileArray = new Array<File>()
            if (this.state.files) {
                for (let i = 0; i < this.state.files.length; i++) {
                    fileArray.push(this.state.files.item(i) as File)
                }
            }
            this.setState({...this.state, fileName: fileArray.map(f => f.name).join(" & ")})
            this.props.onFileChange(fileArray)
        }
    }

    private handleOnFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, files: ev.target.files})
    }

    private handleOnClearClick = () => {
        this.setState({...this.state, files: null})
    }

    public reset() {
        this.handleOnClearClick()
    }

    render = () => {
        return (
            <InputGroup>
                <input
                    type="file"
                    ref={this.inputRef}
                    style={{display: "none"}}
                    multiple={this.props.multipleFiles}
                    onChange={this.handleOnFileChange}
                    data-testid={this.props.placeholder}
                />
                <Input
                    placeholder={this.props.placeholder}
                    onClick={() => {
                        this.inputRef?.current?.click()
                    }}
                    readOnly={true}
                    value={this.state.fileName}
                />
                <InputRightAddon>
                    <Button onClick={this.handleOnClearClick}>{this.props.clearButtonLabel ?? "Clear"}</Button>
                </InputRightAddon>
            </InputGroup>
        )
    }
}

export default FilePicker
