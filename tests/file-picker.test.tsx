import {render, screen} from "@testing-library/react"
import React, {useRef} from "react"
import FilePicker from "../src/file-picker"
import userEvent from "@testing-library/user-event"
import {Button} from "@chakra-ui/react"

describe("File picker", () => {
    const jpgFile = new File(
        ["(T_T)"],
        "file.jpg",
        {type: "image/jpeg"})
    const txtFile = new File(
        ["(╯°□°）╯︵ ┻━┻"],
        "table_flipping.txt",
        {type: "application/text"})

    it("renders the initial content", () => {
        render(<FilePicker onFileChange={jest.fn()} placeholder="the best placeholder"/>)

        expect(screen.getByPlaceholderText(/^the best placeholder$/i)).toBeInTheDocument()
        expect(screen.getByText(/^clear$/i)).toBeInTheDocument()
    })

    it("allows a different clear button label", () => {
        render(<FilePicker
            onFileChange={jest.fn()}
            placeholder="the best placeholder"
            clearButtonLabel="the best label"
        />)

        expect(screen.getByText(/^the best label$/i)).toBeInTheDocument()
    })

    it("allows for accepted file types", () => {
        render(<FilePicker
            onFileChange={jest.fn()}
            placeholder="the best placeholder"
            clearButtonLabel="the best label"
            accept="application/jason"
        />)

        expect(screen.getByTestId(/^the best placeholder$/i)).toHaveAttribute("accept", "application/jason")
    })

    describe("Single file", () => {
        it("accepts a file", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder"/>)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), jpgFile)

            expect(onFileChangeMock).toHaveBeenLastCalledWith([jpgFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name}`)
        })

        it("clears the selected file", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder"/>)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), jpgFile)

            expect(onFileChangeMock).toHaveBeenNthCalledWith(1, [jpgFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name}`)

            userEvent.click(screen.getByText(/^clear$/i))

            expect(onFileChangeMock).toHaveBeenLastCalledWith([])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")
        })
    })

    describe("Multiple files", () => {
        it("accepts multiple files", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker
                onFileChange={onFileChangeMock}
                placeholder="holder"
                multipleFiles={true}
            />)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), [jpgFile, txtFile])

            expect(onFileChangeMock).toHaveBeenLastCalledWith([jpgFile, txtFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name} & ${txtFile.name}`)
        })

        it("clears the selected file", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder" multipleFiles={true}/>)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), [jpgFile, txtFile])

            expect(onFileChangeMock).toHaveBeenNthCalledWith(1, [jpgFile, txtFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name} & ${txtFile.name}`)

            userEvent.click(screen.getByText(/^clear$/i))

            expect(onFileChangeMock).toHaveBeenLastCalledWith([])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")
        })
    })

    it("resets the file picker", () => {
        const onFileChangeMock = jest.fn()

        const Component: React.VFC<{
            onFileChange: (fileList: Array<File>) => void
        }> = ({onFileChange}) => {
            const ref = useRef<FilePicker>(null);
            return <>
                <Button onClick={() => ref?.current?.reset()}>Trigger reset</Button>
                <FilePicker
                    ref={ref}
                    onFileChange={onFileChange}
                    placeholder="holder"
                    multipleFiles={true}
                />
            </>
        }
        render(<Component onFileChange={onFileChangeMock}/>)

        userEvent.upload(screen.getByTestId(/^holder$/i), [jpgFile, txtFile])
        expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name} & ${txtFile.name}`)

        userEvent.click(screen.getByText(/trigger reset/i))

        expect(onFileChangeMock).toHaveBeenLastCalledWith([])
        expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")
    })

    describe("File extensions", () => {
        it("unsets the file if a not-allowed extension is provided", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker
                onFileChange={onFileChangeMock}
                placeholder="holder"
                accept="image/jpeg"
            />)

            userEvent.upload(screen.getByTestId(/^holder$/i), jpgFile)
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(jpgFile.name)

            userEvent.upload(screen.getByTestId(/^holder$/i), txtFile)
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")
        })
    })
})
