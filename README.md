# Chakra UI File Picker

Since there is no default file picker for Chakra UI, I've developed my own for usage in 
one of my personal projects.

At the moment it only provides you with a list of
files that were picked by the user, no filtering of any kind.

## Usage

````
<FilePicker
    onFileChange={(fileList) => { // do stuff here }}
    placeholder="placeholder"
    clearButtonLabel="label"
    multipleFiles={true}
/>
````

`onFileChange` - is triggered every time that the file list changes

`placeholder` - Sets the placeholder on the input field

`clearButtonLabel` - Sets the label that will be shown on the clear button

`multipleFiles` - (boolean) Sets if the input can allow for one of many files at a time 

## TODO
- Accept files based on extension only
