import { FormHelperText, FormHelperTextProps, InputLabel, InputLabelProps } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormikProps } from 'formik';
import _ from 'lodash';
import React, { FC, useEffect, useRef } from 'react';
import { getFieldError, IFieldProps } from 'react-forms';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { getQuillModule } from './QuillToolbar';



export interface ReactQuillFieldProps {
	name: string,
	format?: QuillFormat[];
	label: string;
	labelProps: InputLabelProps;
	helperText: string;
	helperTextProps: FormHelperTextProps;
}

export interface RichTextEditorProps extends IFieldProps {
	fieldProps?: ReactQuillFieldProps;
}

const RichTextEditor: FC<RichTextEditorProps> = (props) => {
	const classes = useStyles();
	useEffect(() => {
		const Size = Quill.import('attributors/style/size');
		const Align = Quill.import('attributors/style/align');
		Size.whitelist = ['12px', '14px', '16px', '18px', '20px'];
		console.log({ Size, Align });
		Quill.register(Size, true);
		Quill.register(Align, true);
	}, []);

	const quillRef = useRef<ReactQuill | null>(null);

	const { fieldConfig, formikProps = {} as FormikProps<any>, fieldProps = {} as ReactQuillFieldProps } = props;
	const { label, labelProps, helperText, helperTextProps } = fieldProps;
	const { name } = fieldProps;
	const value = _.get(formikProps, `values.${name}`) || '';
	const errorText = getFieldError(name, formikProps);

	const showColorPicker = (value: any) => {
		const quill = quillRef.current?.getEditor();
		if (value === 'color-picker') {
			var picker = document.getElementById('color-picker') as HTMLInputElement;
			if (!picker) {
				picker = document.createElement('input');
				picker.id = 'color-picker';
				picker.type = 'color';
				picker.style.display = 'none';
				picker.value = '#FF0000';
				document.body.appendChild(picker);

				picker.addEventListener('change', function () {
					quill?.format('color', picker.value);
				}, false);
			}
			picker.click();
		} else {
			quill?.format('color', value);
		}
	};

	useEffect(() => {
		const quill = quillRef.current?.getEditor();
		var toolbar = quill?.getModule('toolbar');
		toolbar.addHandler('color', showColorPicker);
	}, []);

	console.log({ name });

	return (
		<>
			<InputLabel {...labelProps} error={!!errorText} > {label} </InputLabel>
			<QuillToolbar variant="size" id={name} />
			<ReactQuill
				ref={ref => { quillRef.current = ref; }}
				formats={QUILL_FORMATS}
				modules={getQuillModule(name)}
				className={classes.rte}
				value={value}
				onChange={data => formikProps?.setFieldValue(fieldConfig?.name || '', data)}
				{...fieldProps}
			/>
			<FormHelperText {...helperTextProps} error={!!errorText}> {errorText || helperText} </FormHelperText>
		</>
	);
};


const useStyles = makeStyles<Theme>(() => {
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

export default RichTextEditor;

export type QuillFormat =
	'header' |
	'image' |
	'bold' | 'italic' | 'underline' | 'strike' |
	'indent' |
	'link' | 'image' | 'color' | 'script' | 'font' | 'align' |
	'direction' |
	'size' | 'list' |
	'blockquote' | 'code-block';

export const QUILL_FORMATS: QuillFormat[] = [
	'header',
	'image',
	'bold', 'italic', 'underline', 'strike',
	'indent',
	'link', 'image', 'color', 'script', 'font', 'align',
	'direction',
	'size', 'list',
	'blockquote', 'code-block'
];

export const QUILL_MODULES = {
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