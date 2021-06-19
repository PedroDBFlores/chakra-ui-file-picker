import React from "react";
import {Input, InputGroup} from "@chakra-ui/input";
import {Button, InputRightAddon} from "@chakra-ui/react";

interface FilePickerProps {
    placeholder: string
    clearButtonLabel?: string | undefined
    multipleFiles?: boolean | undefined
    accept?: string | undefined
    onFileChange: (fileList: Array<File>) => void
}

interface FilePickerState {
    files: FileList | null
    fileName: string
}

const validate = (file: File, accept: string | undefined) => {
    if (accept) {
        const parts = accept.split(",")
        return parts.findIndex(s => s === file.type) != -1;

    }
    return true;
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
                    const file = this.state.files.item(i) as File
                    if (validate(file, this.props.accept)) {
                        fileArray.push(file)
                    }
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
                    accept={this.props.accept}
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
