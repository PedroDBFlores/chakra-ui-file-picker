import React from "react";
interface FilePickerProps {
    placeholder: string;
    onFileChange: (fileList: Array<File>) => void;
    clearButtonLabel?: string | undefined;
    hideClearButton?: boolean | undefined;
    multipleFiles?: boolean | undefined;
    accept?: string | undefined;
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
    };
    private inputRef;
    constructor(props: FilePickerProps);
    componentDidUpdate(_: FilePickerProps, prevState: FilePickerState): void;
    reset: () => void;
    render: () => JSX.Element;
    private handleOnFileChange;
    private handleOnClearClick;
    private clearInnerInput;
}
export default FilePicker;
