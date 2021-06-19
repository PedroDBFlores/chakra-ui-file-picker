"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var input_1 = require("@chakra-ui/input");
var react_2 = require("@chakra-ui/react");
var FilePicker = (function (_super) {
    __extends(FilePicker, _super);
    function FilePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.inputRef = react_1.default.createRef();
        _this.reset = function () { return _this.handleOnClearClick(); };
        _this.render = function () {
            var _a;
            return (react_1.default.createElement(input_1.InputGroup, null,
                react_1.default.createElement("input", { type: "file", ref: _this.inputRef, accept: _this.props.accept, style: { display: "none" }, multiple: _this.props.multipleFiles, onChange: _this.handleOnFileChange, "data-testid": _this.props.placeholder }),
                react_1.default.createElement(input_1.Input, { placeholder: _this.props.placeholder, onClick: function () {
                        var _a, _b, _c;
                        if ((_a = _this.inputRef) === null || _a === void 0 ? void 0 : _a.current) {
                            _this.inputRef.current.value = "";
                        }
                        (_c = (_b = _this.inputRef) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.click();
                    }, readOnly: true, value: _this.state.fileName }),
                !_this.props.hideClearButton &&
                    react_1.default.createElement(react_2.InputRightAddon, null,
                        react_1.default.createElement(react_2.Button, { onClick: _this.handleOnClearClick }, (_a = _this.props.clearButtonLabel) !== null && _a !== void 0 ? _a : "Clear"))));
        };
        _this.handleOnFileChange = function (ev) {
            _this.setState(__assign(__assign({}, _this.state), { files: ev.target.files }));
            _this.clearInnerInput();
        };
        _this.handleOnClearClick = function () {
            _this.setState(__assign(__assign({}, _this.state), { files: null }));
            _this.clearInnerInput();
        };
        _this.state = {
            files: null,
            fileName: ""
        };
        return _this;
    }
    FilePicker.prototype.componentDidUpdate = function (_, prevState) {
        if (prevState.files !== this.state.files) {
            var fileArray = new Array();
            if (this.state.files) {
                for (var i = 0; i < this.state.files.length; i++) {
                    var file = this.state.files.item(i);
                    fileArray.push(file);
                }
            }
            this.setState(__assign(__assign({}, this.state), { fileName: fileArray.map(function (f) { return f.name; }).join(" & ") }));
            this.props.onFileChange(fileArray);
        }
    };
    FilePicker.prototype.clearInnerInput = function () {
        var _a;
        if ((_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.current) {
            this.inputRef.current.files = null;
        }
    };
    FilePicker.defaultProps = {
        clearButtonLabel: "Clear",
        multipleFiles: false,
        accept: undefined,
        hideClearButton: false
    };
    return FilePicker;
}(react_1.default.Component));
exports.default = FilePicker;
//# sourceMappingURL=file-picker.js.map