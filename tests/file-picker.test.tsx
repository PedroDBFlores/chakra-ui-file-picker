import { render, screen } from "@testing-library/react"
import React, { useRef } from "react"
import FilePicker from "../src/file-picker"
import userEvent from "@testing-library/user-event"
import { Button } from "@chakra-ui/react"

describe("File picker", () => {
    const commonFile = new File(
        ["(T_T)"],
        "file.jpg",
        { type: "image/jpeg" })
    const anotherFile = new File(
        ["(╯°□°）╯︵ ┻━┻"],
        "table_flipping.txt",
        { type: "application/text" })

    it("renders the initial content", () => {
        render(<FilePicker onFileChange={jest.fn()} placeholder="the best placeholder" />)

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

    describe("Single file", () => {
        it("accepts a file", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder" />)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), commonFile)

            expect(onFileChangeMock).toHaveBeenLastCalledWith([commonFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${commonFile.name}`)
        })

        it("clears the selected file", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder" />)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), commonFile)

            expect(onFileChangeMock).toHaveBeenNthCalledWith(1, [commonFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${commonFile.name}`)

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
            userEvent.upload(screen.getByTestId(/^holder$/i), [commonFile, anotherFile])

            expect(onFileChangeMock).toHaveBeenLastCalledWith([commonFile, anotherFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${commonFile.name} & ${anotherFile.name}`)
        })

        it("clears the selected file", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder" multipleFiles={true} />)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), [commonFile, anotherFile])

            expect(onFileChangeMock).toHaveBeenNthCalledWith(1, [commonFile, anotherFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${commonFile.name} & ${anotherFile.name}`)

            userEvent.click(screen.getByText(/^clear$/i))

            expect(onFileChangeMock).toHaveBeenLastCalledWith([])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")
        })
    })

    it("resets the file picker", () => {
        const onFileChangeMock = jest.fn()

        const Component: React.VFC<{
            onFileChange: (fileList: Array<File>) => void
        }> = ({ onFileChange }) => {
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
        render(<Component onFileChange={onFileChangeMock} />)

        userEvent.upload(screen.getByTestId(/^holder$/i), [commonFile, anotherFile])
        expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${commonFile.name} & ${anotherFile.name}`)

        userEvent.click(screen.getByText(/trigger reset/i))

        expect(onFileChangeMock).toHaveBeenLastCalledWith([])
        expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")
    })
})
