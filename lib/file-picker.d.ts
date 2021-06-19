import React from "react";
interface FilePickerProps {
    placeholder: string;
    clearButtonLabel?: string | undefined;
    multipleFiles?: boolean | undefined;
    accept?: string | undefined;
    onFileChange: (fileList: Array<File>) => void;
}
interface FilePickerState {
    files: FileList | null;
    fileName: string;
}
declare class FilePicker extends React.Component<FilePickerProps, FilePickerState> {
    private inputRef;
    constructor(props: FilePickerProps);
    componentDidUpdate(_: FilePickerProps, prevState: FilePickerState): void;
    reset(): void;
    render: () => JSX.Element;
    private handleOnFileChange;
    private handleOnClearClick;
    private clearInnerInput;
}
export default FilePicker;
