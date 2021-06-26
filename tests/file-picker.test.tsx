import { render, screen } from "@testing-library/react"
import React, { useRef } from "react"
import userEvent from "@testing-library/user-event"
import FilePicker from "../src/file-picker"
import { Button, InputGroupProps, InputProps } from "@chakra-ui/react"

describe("File picker", () => {
    const jpgFile = new File(
        ["(T_T)"],
        "file.jpg",
        { type: "image/jpeg" })
    const txtFile = new File(
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
            clearButtonLabel="the best clear"
        />)

        expect(screen.getByText(/^the best clear$/i)).toBeInTheDocument()
    })

    it("allows to hide the clear button", () => {
        render(<FilePicker
            onFileChange={jest.fn()}
            placeholder="the best placeholder"
            clearButtonLabel="the best clear"
            hideClearButton={true}
        />)

        expect(screen.queryByText(/^the best clear/i)).not.toBeInTheDocument()
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

    it("allows for being labeled", () => {
        render(<FilePicker
            onFileChange={jest.fn()}
            placeholder="the best placeholder"
            clearButtonLabel="the best label"
            accept="application/jason"
        />)

        expect(screen.getByTestId(/^the best placeholder$/i)).toHaveAttribute("accept", "application/jason")
    })

    it("allows standard Chakra-UI props to the Input", () => {
        const inputProps: InputProps = {
            ['aria-autocomplete']: "none"
        }
        render(<FilePicker
            onFileChange={jest.fn()}
            placeholder="the best placeholder"
            clearButtonLabel="the best label"
            accept="application/jason"
            inputProps={inputProps}
        />)

        expect(screen.getByPlaceholderText(/^the best placeholder$/i)).toHaveAttribute("aria-autocomplete", "none")
    })

    it("allows standard Chakra-UI props to the InputGroup", () => {
        const inputGroupProps: InputGroupProps = {
            ['aria-autocomplete']: "none"
        }

        render(<FilePicker
            onFileChange={jest.fn()}
            placeholder="the best placeholder"
            clearButtonLabel="the best label"
            accept="application/jason"
            inputGroupProps={inputGroupProps}
        />)

        expect(screen.getByPlaceholderText(/^the best placeholder$/i).parentElement).toHaveAttribute("aria-autocomplete", "none")
    })

    describe("Prop spreading", () => {
        it("disallows changing the Input to read/write", () => {
            const inputProps: InputProps = {
                isReadOnly: false,
            }
            render(<FilePicker
                onFileChange={jest.fn()}
                placeholder="the best placeholder"
                clearButtonLabel="the best label"
                accept="application/jason"
                inputProps={inputProps}
            />)

            expect(screen.getByPlaceholderText(/^the best placeholder$/i)).toHaveAttribute("readonly", expect.anything())
        })

        it("allows providing placeholder via input props", () => {
            const inputProps: InputProps = {
                placeholder: "I want other placeholder here"
            }
            render(<FilePicker
                onFileChange={jest.fn()}
                placeholder="the best placeholder"
                clearButtonLabel="the best label"
                accept="application/jason"
                inputProps={inputProps}
            />)

            expect(screen.queryByPlaceholderText(/^the best placeholder$/i)).not.toBeInTheDocument()
            expect(screen.getByPlaceholderText(/^I want other placeholder here$/i)).toBeInTheDocument()
            expect(screen.getByTestId(/^I want other placeholder here$/i)).toBeInTheDocument()
        })

        it("disallows changing the Input's value", () => {
            const inputProps: InputProps = {
                value: "you got tricked"
            }
            render(<FilePicker
                onFileChange={jest.fn()}
                placeholder="the best placeholder"
                clearButtonLabel="the best label"
                accept="application/jason"
                inputProps={inputProps}
            />)

            expect(screen.getByPlaceholderText(/^the best placeholder$/i)).toHaveAttribute("value", "")
        })
        
        it("disallows changing the Input's onClick handler", () => {
            const inputProps: InputProps = {
                onClick: jest.fn()
            }
            render(<FilePicker
                onFileChange={jest.fn()}
                placeholder="the best placeholder"
                clearButtonLabel="the best label"
                accept="application/jason"
                inputProps={inputProps}
            />)
            const element = screen.getByPlaceholderText(/^the best placeholder$/i)

            userEvent.click(element)

            expect(inputProps.onClick).not.toHaveBeenCalled()
        })
    })

    describe("Single file", () => {
        it("accepts a file", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder" />)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), jpgFile)

            expect(onFileChangeMock).toHaveBeenLastCalledWith([jpgFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name}`)
        })

        it("clears the selected file and allows to pick again", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder" />)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), jpgFile)

            expect(onFileChangeMock).toHaveBeenNthCalledWith(1, [jpgFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name}`)

            userEvent.click(screen.getByText(/^clear$/i))

            expect(onFileChangeMock).toHaveBeenNthCalledWith(2, [])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")

            userEvent.upload(screen.getByTestId(/^holder$/i), jpgFile)

            expect(onFileChangeMock).toHaveBeenNthCalledWith(3, [jpgFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name}`)
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

        it("clears the selected file and allows to pick again", () => {
            const onFileChangeMock = jest.fn()
            render(<FilePicker onFileChange={onFileChangeMock} placeholder="holder" multipleFiles={true} />)

            // No other way since the normal input will not accept a file change
            userEvent.upload(screen.getByTestId(/^holder$/i), [jpgFile, txtFile])

            expect(onFileChangeMock).toHaveBeenNthCalledWith(1, [jpgFile, txtFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name} & ${txtFile.name}`)

            userEvent.click(screen.getByText(/^clear$/i))

            expect(onFileChangeMock).toHaveBeenNthCalledWith(2, [])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")

            userEvent.upload(screen.getByTestId(/^holder$/i), [jpgFile, txtFile])

            expect(onFileChangeMock).toHaveBeenNthCalledWith(3, [jpgFile, txtFile])
            expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name} & ${txtFile.name}`)
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

        userEvent.upload(screen.getByTestId(/^holder$/i), [jpgFile, txtFile])
        expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue(`${jpgFile.name} & ${txtFile.name}`)

        userEvent.click(screen.getByText(/trigger reset/i))

        expect(onFileChangeMock).toHaveBeenLastCalledWith([])
        expect(screen.getByPlaceholderText(/^holder$/i)).toHaveValue("")
    })
})
