import React from "react";
import {Input, InputGroup} from "@chakra-ui/input";
import {Button, InputRightAddon} from "@chakra-ui/react";

interface FilePickerProps {
    placeholder: string
    onFileChange: (fileList: Array<File>) => void
    clearButtonLabel?: string | undefined
    hideClearButton?: boolean | undefined
    multipleFiles?: boolean | undefined
    accept?: string | undefined
}

interface FilePickerState {
    files: FileList | null
    fileName: string
}

class FilePicker extends React.Component<FilePickerProps, FilePickerState> {
    static defaultProps = {
        clearButtonLabel: "Clear",
        multipleFiles: false,
        accept: undefined,
        hideClearButton: false
    }

    private inputRef = React.createRef<HTMLInputElement>();

    constructor(props: FilePickerProps) {
        super(props)
        this.state = {
            files: null,
            fileName: ""
        }
    }

    componentDidUpdate(_: FilePickerProps, prevState: FilePickerState): void {
        if (prevState.files !== this.state.files) {
            const fileArray = new Array<File>()
            if (this.state.files) {
                for (const file of this.state.files) {
                    fileArray.push(file)
                }
            }
            this.setState({...this.state, fileName: fileArray.map(f => f.name).join(" & ")})
            this.props.onFileChange(fileArray)
        }
    }

    public reset = (): void => this.handleOnClearClick()

    render = (): JSX.Element => {
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
                        if (this.inputRef?.current) {
                            this.inputRef.current.value = "";
                            this.inputRef.current.click()
                        }
                    }}
                    readOnly={true}
                    value={this.state.fileName}
                />
                {
                    !this.props.hideClearButton &&
                    <InputRightAddon>
                        <Button onClick={this.handleOnClearClick}>{this.props.clearButtonLabel ?? "Clear"}</Button>
                    </InputRightAddon>
                }
            </InputGroup>
        )
    }

    private handleOnFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({...this.state, files: ev.target.files})
        this.clearInnerInput();
    }


    private handleOnClearClick = () => {
        this.setState({...this.state, files: null})
        this.clearInnerInput();
    }

    private clearInnerInput() {
        if (this.inputRef?.current) {
            this.inputRef.current.files = null;
        }
    }
}

export default FilePicker
