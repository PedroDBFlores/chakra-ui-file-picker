import { Input, InputGroup, InputGroupProps } from "@chakra-ui/input"
import { Button, ButtonProps, InputRightAddon } from "@chakra-ui/react"
import React from "react"
import PropTypes from "prop-types"

interface FilePickerProps {
    onFileChange: (fileList: Array<File>) => void
    placeholder: string
    clearButtonLabel?: string
    hideClearButton?: boolean
    multipleFiles?: boolean
    accept?: string
    inputProps?: InputGroupProps
    inputGroupProps?: InputGroupProps
    buttonProps?: ButtonProps
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
        hideClearButton: false,
        inputProps: undefined,
        inputGroupProps: undefined,
        buttonProps: undefined
    }

    private inputRef = React.createRef<HTMLInputElement>()

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
            this.setState({ ...this.state, fileName: fileArray.map(f => f.name).join(" & ") })
            this.props.onFileChange(fileArray)
        }
    }

    public reset = (): void => this.handleOnClearClick()

    private handleOnFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, files: ev.target.files })
        this.clearInnerInput()
    }


    private handleOnClearClick = () => {
        this.setState({ ...this.state, files: null })
        this.clearInnerInput()
    }

    private clearInnerInput() {
        if (this.inputRef?.current) {
            this.inputRef.current.value = ""
        }
    }

    private handleOnInputClick = () => {
        if (this.inputRef?.current) {
            this.inputRef.current.value = ""
            this.inputRef.current.click()
        }
    }

    render = (): JSX.Element => {
        const {
            placeholder,
            clearButtonLabel,
            hideClearButton,
            multipleFiles,
            accept,
            inputProps,
            inputGroupProps
        } = this.props

        return (
            <InputGroup  {...inputGroupProps}>
                <input
                    type="file"
                    ref={this.inputRef}
                    accept={accept}
                    style={{ display: "none" }}
                    multiple={multipleFiles}
                    onChange={this.handleOnFileChange}
                    data-testid={inputProps?.placeholder ?? placeholder}
                />
                <Input
                    placeholder={placeholder}
                    {
                    ...{
                        ...inputProps,
                        readOnly: true,
                        isReadOnly: true,
                        value: this.state.fileName,
                        onClick: this.handleOnInputClick,
                    }
                    }
                />
                {
                    !hideClearButton &&
                    <ClearButton
                        clearButtonLabel={clearButtonLabel ?? "Clear"}
                        onButtonClick={this.handleOnClearClick} />
                }
            </InputGroup>
        )
    }
}

type ClearButtonProps = Pick<FilePickerProps, "clearButtonLabel" | "buttonProps"> & {
    onButtonClick: () => void
}

const ClearButton: React.FC<ClearButtonProps> = ({
    clearButtonLabel,
    onButtonClick,
    buttonProps
}) => (
    <InputRightAddon>
        <Button {...buttonProps} onClick={onButtonClick}>{clearButtonLabel ?? "Clear"}</Button>
    </InputRightAddon>
)

ClearButton.propTypes = {
    clearButtonLabel: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired,
    buttonProps: PropTypes.object,
}


export default FilePicker
