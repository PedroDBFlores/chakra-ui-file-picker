[![Components test](https://github.com/PedroDBFlores/chakra-ui-file-picker/actions/workflows/components-test.yml/badge.svg)](https://github.com/PedroDBFlores/chakra-ui-file-picker/actions/workflows/components-test.yml)

# Chakra UI File Picker

Since there is no default file picker for [Chakra-UI](https://chakra-ui.com/), I've developed my own for usage in one of
my personal projects.

## Allows to:

- Retrieve the files from a callback
- Filter the files by file type/extension
- Reset programmatically by using a `ref`
- Provide styling to the Input and InputGroup

## Usage

![Demonstration](https://raw.githubusercontent.com/PedroDBFlores/chakra-ui-file-picker/main/readme/small-demo.gif "Demonstration")

````
<FilePicker
    onFileChange={(fileList) => { // do stuff here }}
    placeholder="placeholder"
    clearButtonLabel="label"
    multipleFiles={true}
    accept="application/json"
    hideClearButton={false}
    ref={myRef}
/>
````

| Prop name | Type | Optional | Description | Default |
| --------- | ---- | --------- | ----------- | ------- |
| placeholder | string | No | Sets the placeholder on the input field | N/A |
| onFileChange | (fileList: Array\<File>) => void | No | Is triggered every time that the file list changes | N/A |
| clearButtonLabel | string | Yes | Sets the label that will be shown on the clear button. | 'Clear'
| multipleFiles | boolean | Yes | Sets if the input can allow for one of many files at a time | False |
| accept | string | Yes | Allows to filter the files by type/extension. | undefined |
| hideClearButton | boolean | Yes | Hides or shows the clear button. | False
| ref | React.RefObject | Yes | Provides a reference to the `FilePicker` | undefined |

## TODO

- Maybe have a FormControl base with this component?

## Contributions

Are of course accepted, but please try to follow this rules:
- Write some description around your idea so I can follow your train of thought.
- Please do write accompanying unit tests for the functionality (unless it's really impossible to do so).
This will allow us to improve and deploy this component with more confidence that it does what it's supposed
  to. I chose to use React Testing Library, you can find additional info [here](https://testing-library.com/docs/react-testing-library/intro/)
  on how to write tests in this fashion.

