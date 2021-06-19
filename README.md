![Components test](https://github.com/PedroDBFlores/Cookbook/workflows/Components%20test/badge.svg?branch=master)

# Chakra UI File Picker

Since there is no default file picker for [Chakra-UI](https://chakra-ui.com/), I've developed my own for
usage in one of my personal projects.

## Allows to:

- Retrieve the files from a callback
- Filter the files by file type/extension

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

`placeholder` - (string) Sets the placeholder on the input field

`onFileChange` - is triggered every time that the file list changes

`clearButtonLabel` - (string, optional) Sets the label that will be shown on the clear button. Default is 'Clear'

`multipleFiles` - (boolean, optional) Sets if the input can allow for one of many files at a time. Default is false

`accept` -  (string, optional) Allows to filter the files by type/extension. Default is no filter

`hideClearButton` -  (boolean, optional) Hides or shows the clear button. Default is false

`ref` - (React.RefObject<FilePicker>, optional) - Provides a reference to the `FilePicker`, where you are able to
reset the file picker programmatically

## TODO

- To be defined
