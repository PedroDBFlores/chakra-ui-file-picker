import { InputGroupProps } from "@chakra-ui/input";
import React from "react";
interface FilePickerProps {
    onFileChange: (fileList: Array<File>) => void;
    placeholder: string;
    clearButtonLabel?: string | undefined;
    hideClearButton?: boolean | undefined;
    multipleFiles?: boolean | undefined;
    accept?: string | undefined;
    inputProps?: InputGroupProps | undefined;
    inputGroupProps?: InputGroupProps | undefined;
}
interface FilePickerState {
    files: FileList | null;
    fileName: string;
}
declare class FilePicker extends React.Component<FilePickerProps, FilePickerState> {
    static defaultProps: {
        clearButtonLabel: string;
        multipleFiles: boolean;
        accept: undefined;
        hideClearButton: boolean;
        inputProps: undefined;
        inputGroupProps: undefined;
    };
    private inputRef;
    constructor(props: FilePickerProps);
    componentDidUpdate(_: FilePickerProps, prevState: FilePickerState): void;
    reset: () => void;
    private handleOnFileChange;
    private handleOnClearClick;
    private clearInnerInput;
    private handleOnInputClick;
    render: () => JSX.Element;
}
export default FilePicker;
