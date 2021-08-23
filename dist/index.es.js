import React, { useEffect, useRef } from 'react';
import { attachField } from 'react-forms';
import { InputLabel, FormHelperText } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var QuillToolbar = function (props) {
    var _a = props.toolbarOptions, toolbarOptions = _a === void 0 ? ["align", "color", "image", "size"] : _a, customSizes = props.customSizes;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: props.id },
            toolbarOptions.includes("size") && customSizes
                ? getCustomSizeOptions(customSizes)
                : Size,
            React.createElement("span", { className: "ql-formats" },
                Formatting,
                toolbarOptions.includes("color") && Color),
            toolbarOptions.includes("image") && Image,
            toolbarOptions.includes("align") && Align,
            Indents)));
};
var Image = React.createElement("button", { className: "ql-image" });
// const Color = (
//     <select className="ql-color">
//     </select>
// )
var Color = React.createElement("input", { id: "color", type: "color", className: "ql-color" });
var getCustomSizeOptions = function (customSizes) {
    return (React.createElement("select", { className: "ql-size" }, customSizes.map(function (size, index) { return (React.createElement("option", { style: { fontSize: size.value }, key: size.value, selected: index === 0, value: size.value },
        size.label,
        " (",
        size.value,
        ")")); })));
};
// const Heading = (
// 	<span className="ql-formats">
// 		<select className="ql-header">
// 			<option value="1">Heading 1</option>
// 			<option value="2">Heading 2</option>
// 			<option value="3">Heading 3</option>
// 			{/* <option value="4">Heading 4</option>
//             <option value="5">Heading 5</option>
//             <option value="6">Heading 6</option> */}
// 			<option selected value="">Normal</option>
// 		</select>
// 	</span>
// );
var Size = (React.createElement("select", { className: "ql-size", defaultValue: "16px" },
    React.createElement("option", { value: "34px" }, "Heading 1 (34px) "),
    React.createElement("option", { value: "24px" }, "Heading 2 (24px) "),
    React.createElement("option", { value: "20px" }, "Heading 3 (20px) "),
    React.createElement("option", { value: "16px" }, "Body 1 (16px) "),
    React.createElement("option", { value: "14px" }, "Body 2 (14px) "),
    React.createElement("option", { value: "11px" }, "Body 3 (11px) ")));
var Indents = (React.createElement("span", { className: "ql-formats" },
    React.createElement("button", { className: "ql-list", value: "ordered" }),
    React.createElement("button", { className: "ql-list", value: "bullet" }),
    React.createElement("button", { className: "ql-indent", value: "-1" }),
    React.createElement("button", { className: "ql-indent", value: "+1" })));
var Formatting = (React.createElement(React.Fragment, null,
    React.createElement("button", { className: "ql-bold" }),
    React.createElement("button", { className: "ql-italic" }),
    React.createElement("button", { className: "ql-underline" }),
    React.createElement("button", { className: "ql-link" })));
var Align = (React.createElement("span", { className: "ql-formats" },
    React.createElement("button", { className: "ql-direction", value: "rtl" }),
    React.createElement("select", { className: "ql-align" })));
var getQuillModule = function (toolbarId) {
    return __assign(__assign({}, QUILL_MODULES), { toolbar: "#" + toolbarId });
};

var RichTextEditor = function (props) {
    var fieldConfig = props.fieldConfig, _a = props.formikProps, formikProps = _a === void 0 ? {} : _a, _b = props.fieldProps, fieldProps = _b === void 0 ? {} : _b;
    var label = fieldProps.label, labelProps = fieldProps.labelProps, helperText = fieldProps.helperText, helperTextProps = fieldProps.helperTextProps, sizes = fieldProps.sizes;
    var classes = useStyles();
    useEffect(function () {
        var Size = Quill.import('attributors/style/size');
        var Align = Quill.import('attributors/style/align');
        Size.whitelist = (sizes === null || sizes === void 0 ? void 0 : sizes.map(function (size) { return (size.value); })) || ['11px', '12px', '14px', '16px', '18px', '20px', '24px', '34px'];
        Quill.register(Size, true);
        Quill.register(Align, true);
    }, [sizes]);
    var quillRef = useRef(null);
    var name = fieldProps.name;
    var value = _.get(formikProps, "values." + name) || '';
    // const errorText = getFieldError(name, formikProps);
    var errorText = _.get(formikProps, "errors." + name);
    var showColorPicker = function (value) {
        var _a;
        var quill = (_a = quillRef.current) === null || _a === void 0 ? void 0 : _a.getEditor();
        if (value === 'color-picker') {
            var picker = document.getElementById('color-picker');
            if (!picker) {
                picker = document.createElement('input');
                picker.id = 'color-picker';
                picker.type = 'color';
                picker.style.display = 'none';
                picker.value = '#FF0000';
                document.body.appendChild(picker);
                picker.addEventListener('change', function () {
                    quill === null || quill === void 0 ? void 0 : quill.format('color', picker.value);
                }, false);
            }
            picker.click();
        }
        else {
            quill === null || quill === void 0 ? void 0 : quill.format('color', value);
        }
    };
    function imageHandler() {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        // Listen upload local image and save to server
        input.onchange = function () {
            var _a;
            var file = (_a = input === null || input === void 0 ? void 0 : input.files) === null || _a === void 0 ? void 0 : _a[0];
            var reader = new FileReader();
            if (file) {
                reader.onload = function () {
                    var fileInfo = {
                        name: file.name,
                        type: file.type,
                        size: Math.round(file.size / 1000) + ' kB',
                        base64: reader.result,
                        file: file,
                    };
                    saveToServer(fileInfo);
                };
                reader['readAsDataURL'](file);
            }
        };
    }
    var saveToServer = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var url, quill, range;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!fieldProps.customImageUploadAdapter) return [3 /*break*/, 2];
                    return [4 /*yield*/, fieldProps.customImageUploadAdapter(file)];
                case 1:
                    url = _b.sent();
                    quill = (_a = quillRef.current) === null || _a === void 0 ? void 0 : _a.getEditor();
                    range = quill === null || quill === void 0 ? void 0 : quill.getSelection();
                    if (range)
                        quill === null || quill === void 0 ? void 0 : quill.insertEmbed(range.index, 'image', url);
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var _a;
        var quill = (_a = quillRef.current) === null || _a === void 0 ? void 0 : _a.getEditor();
        var toolbar = quill === null || quill === void 0 ? void 0 : quill.getModule('toolbar');
        toolbar.addHandler('color', showColorPicker);
        if (fieldProps.customImageUploadAdapter)
            toolbar.addHandler('image', imageHandler);
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var toolbarId = React.useMemo(function () { return ({ toolbarId: (name + Math.random().toString(36)).replace(/[^\w]/gi, '') }); }, []).toolbarId;
    // If toolbarId has any special characters, then the ReactQuill editor won't be able to find it and the page will fail to load.
    // Also pad an alphanumeric random string of 1-12 characters that make sure that toolbarId is unique for about 70M entries
    // Modified version of method found in https://stackoverflow.com/a/12502559/10032950
    return (React.createElement(React.Fragment, null,
        React.createElement(InputLabel, __assign({}, labelProps, { error: !!errorText }),
            " ",
            label,
            " "),
        React.createElement(QuillToolbar, { customSizes: sizes, id: toolbarId }),
        React.createElement(ReactQuill, __assign({ ref: function (ref) { quillRef.current = ref; }, formats: QUILL_FORMATS, modules: getQuillModule(toolbarId), className: classes.rte, value: value, onChange: function (data) { return formikProps === null || formikProps === void 0 ? void 0 : formikProps.setFieldValue((fieldConfig === null || fieldConfig === void 0 ? void 0 : fieldConfig.valueKey) || '', processText(data)); } }, fieldProps)),
        React.createElement(FormHelperText, __assign({}, helperTextProps, { error: !!errorText }),
            " ",
            errorText || helperText,
            " ")));
};
var useStyles = makeStyles(function () {
    return (createStyles({
        rte: {
            '& .ql-editor': {
                minHeight: 160
            },
            '& .ql-color .ql-picker-options [data-value=color-picker]:before': {
                content: 'Pick Color',
            },
            '& .ql-color .ql-picker-options [data-value=color-picker]': {
                background: 'none !important',
                width: '100% !important',
                height: '25px !important',
                textAlign: 'center',
                color: 'blue',
                textDecoration: 'underline',
            }
        },
    }));
});
var QUILL_FORMATS = [
    'header',
    'image',
    'bold', 'italic', 'underline', 'strike',
    'indent',
    'link', 'image', 'color', 'script', 'font', 'align',
    'direction',
    'size', 'list',
    'blockquote', 'code-block'
];
var QUILL_MODULES = {
    history: {
        delay: 100,
        maxStack: 200,
        userOnly: false
    },
    clipboard: {
        matchVisual: false,
    },
    toolbar: [
        [{ size: ['small', 'normal', 'large'] }],
        ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote'],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        // [{ 'color': [] }],
        [{ 'align': [] }],
        ['image'],
        [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'color-picker'] }]
    ],
};
var processText = function (text) {
    return text.replaceAll(/<p><br><\/p>/g, '<p>&nbsp;</p>');
};

attachField('rte-quill', React.createElement(RichTextEditor, null));

export { QUILL_FORMATS, QUILL_MODULES };
//# sourceMappingURL=index.es.js.map
