"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const input_1 = require("@chakra-ui/input");
const react_2 = require("@chakra-ui/react");
class FilePicker extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.inputRef = react_1.default.createRef();
        this.reset = () => this.handleOnClearClick();
        this.render = () => {
            var _a;
            return (react_1.default.createElement(input_1.InputGroup, null,
                react_1.default.createElement("input", { type: "file", ref: this.inputRef, accept: this.props.accept, style: { display: "none" }, multiple: this.props.multipleFiles, onChange: this.handleOnFileChange, "data-testid": this.props.placeholder }),
                react_1.default.createElement(input_1.Input, { placeholder: this.props.placeholder, onClick: () => {
                        var _a;
                        if ((_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.current) {
                            this.inputRef.current.value = "";
                            this.inputRef.current.click();
                        }
                    }, readOnly: true, value: this.state.fileName }),
                !this.props.hideClearButton &&
                    react_1.default.createElement(react_2.InputRightAddon, null,
                        react_1.default.createElement(react_2.Button, { onClick: this.handleOnClearClick }, (_a = this.props.clearButtonLabel) !== null && _a !== void 0 ? _a : "Clear"))));
        };
        this.handleOnFileChange = (ev) => {
            this.setState(Object.assign(Object.assign({}, this.state), { files: ev.target.files }));
            this.clearInnerInput();
        };
        this.handleOnClearClick = () => {
            this.setState(Object.assign(Object.assign({}, this.state), { files: null }));
            this.clearInnerInput();
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
    hideClearButton: false
};
exports.default = FilePicker;
//# sourceMappingURL=file-picker.js.map