import { FormHelperText, FormHelperTextProps, InputLabel, InputLabelProps } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormikProps } from 'formik';
import _ from 'lodash';
import React, { FC, useEffect, useRef } from 'react';
import { IFieldProps } from 'react-forms';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import QuillToolbar, { getQuillModule } from './QuillToolbar';

export interface QuillFontSizeOption { label: string; value: string; }

export interface ReactQuillFieldProps {
	name: string,
	format?: QuillFormat[];
	label: string;
	labelProps: InputLabelProps;
	helperText: string;
	helperTextProps: FormHelperTextProps;
	sizes?: QuillFontSizeOption[];
	customImageUploadAdapter?: (file: any) => Promise<string>;
}

export interface RichTextEditorProps extends IFieldProps {
	fieldProps?: ReactQuillFieldProps;
}

const RichTextEditor: FC<RichTextEditorProps> = (props) => {
	const { fieldConfig, formikProps = {} as FormikProps<any>, fieldProps = {} as ReactQuillFieldProps } = props;
	const { label, labelProps, helperText, helperTextProps, sizes } = fieldProps;

	const classes = useStyles();
	useEffect(() => {
		const Size = Quill.import('attributors/style/size');
		const Align = Quill.import('attributors/style/align');
		Size.whitelist = sizes?.map((size) => (size.value)) || ['11px', '12px', '14px', '16px', '18px', '20px', '24px', '34px'];

		Quill.register(Size, true);
		Quill.register(Align, true);
	}, [sizes]);

	const quillRef = useRef<ReactQuill | null>(null);

	const { name } = fieldProps;
	const value = _.get(formikProps, `values.${name}`) || '';
	// const errorText = getFieldError(name, formikProps);
	const errorText = _.get(formikProps, `errors.${name}`);

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

	function imageHandler() {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.click();

		// Listen upload local image and save to server
		input.onchange = () => {
			const file = input?.files?.[0];
			let reader = new FileReader();
			if (file) {
				reader.onload = () => {
					let fileInfo = {
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

	const saveToServer = async <T extends {}>(file?: T) => {
		if (fieldProps.customImageUploadAdapter) {
			const url = await fieldProps.customImageUploadAdapter(file);
			const quill = quillRef.current?.getEditor();
			const range = quill?.getSelection();
			if (range) quill?.insertEmbed(range.index, 'image', url);
		}
	};


	useEffect(() => {
		const quill = quillRef.current?.getEditor();
		var toolbar = quill?.getModule('toolbar');
		toolbar.addHandler('color', showColorPicker);
		if (fieldProps.customImageUploadAdapter)
			toolbar.addHandler('image', imageHandler);
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	let { toolbarId } = React.useMemo(() => ({ toolbarId: (name + Math.random().toString(36)).replace(/[^\w]/gi, '') }), []);
	// If toolbarId has any special characters, then the ReactQuill editor won't be able to find it and the page will fail to load.
	// Also pad an alphanumeric random string of 1-12 characters that make sure that toolbarId is unique for about 70M entries
	// Modified version of method found in https://stackoverflow.com/a/12502559/10032950

	return (
		<>
			<InputLabel {...labelProps} error={!!errorText} > {label} </InputLabel>
			<QuillToolbar customSizes={sizes} id={toolbarId} />
			<ReactQuill
				ref={ref => { quillRef.current = ref; }}
				formats={QUILL_FORMATS}
				modules={getQuillModule(toolbarId)}
				className={classes.rte}
				value={value}
				onChange={data => formikProps?.setFieldValue(fieldConfig?.valueKey || '', processText(data))}
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

const processText = (text: string): string => { // quill simply keeps adding <br> for no reason at all. Workaround for it.
	return text.replaceAll(/<p><br><\/p>/g, '<p>&nbsp;</p>');
};