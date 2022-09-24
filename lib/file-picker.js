"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = require("@chakra-ui/input");
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const prop_types_1 = __importDefault(require("prop-types"));
class FilePicker extends react_2.default.Component {
    constructor(props) {
        super(props);
        this.inputRef = react_2.default.createRef();
        this.reset = () => this.handleOnClearClick();
        this.handleOnFileChange = (ev) => {
            this.setState(Object.assign(Object.assign({}, this.state), { files: ev.target.files }));
            this.clearInnerInput();
        };
        this.handleOnClearClick = () => {
            this.setState(Object.assign(Object.assign({}, this.state), { files: null }));
            this.clearInnerInput();
        };
        this.handleOnInputClick = () => {
            var _a;
            if ((_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.current) {
                this.inputRef.current.value = "";
                this.inputRef.current.click();
            }
        };
        this.render = () => {
            var _a;
            const { placeholder, clearButtonLabel, hideClearButton, multipleFiles, accept, inputProps, inputGroupProps } = this.props;
            return (react_2.default.createElement(input_1.InputGroup, Object.assign({}, inputGroupProps),
                react_2.default.createElement("input", { type: "file", ref: this.inputRef, accept: accept, style: { display: "none" }, multiple: multipleFiles, onChange: this.handleOnFileChange, "data-testid": (_a = inputProps === null || inputProps === void 0 ? void 0 : inputProps.placeholder) !== null && _a !== void 0 ? _a : placeholder }),
                react_2.default.createElement(input_1.Input, Object.assign({ placeholder: placeholder }, Object.assign(Object.assign({}, inputProps), { readOnly: true, isReadOnly: true, value: this.state.fileName, onClick: this.handleOnInputClick }))),
                !hideClearButton &&
                    react_2.default.createElement(ClearButton, { clearButtonLabel: clearButtonLabel !== null && clearButtonLabel !== void 0 ? clearButtonLabel : "Clear", onButtonClick: this.handleOnClearClick })));
        };
        this.state = {
            files: null,
            fileName: ""
        };
    }
    componentDidUpdate(_, prevState) {
        if (prevState.files !== this.state.files) {
            const fileArray = new Array();
            if (this.state.files) {
                for (const file of this.state.files) {
                    fileArray.push(file);
                }
            }
            this.setState(Object.assign(Object.assign({}, this.state), { fileName: fileArray.map(f => f.name).join(" & ") }));
            this.props.onFileChange(fileArray);
        }
    }
    clearInnerInput() {
        var _a;
        if ((_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.current) {
            this.inputRef.current.files = null;
        }
    }
}
FilePicker.defaultProps = {
    clearButtonLabel: "Clear",
    multipleFiles: false,
    accept: undefined,
    hideClearButton: false,
    inputProps: undefined,
    inputGroupProps: undefined
};
const ClearButton = ({ clearButtonLabel, onButtonClick }) => (react_2.default.createElement(react_1.InputRightAddon, null,
    react_2.default.createElement(react_1.Button, { onClick: onButtonClick }, clearButtonLabel !== null && clearButtonLabel !== void 0 ? clearButtonLabel : "Clear")));
ClearButton.propTypes = {
    clearButtonLabel: prop_types_1.default.string,
    onButtonClick: prop_types_1.default.func.isRequired
};
exports.default = FilePicker;
//# sourceMappingURL=file-picker.js.map