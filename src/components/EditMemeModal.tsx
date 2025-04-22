import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input
} from "@heroui/react";
import {Meme} from "../utils/types";
import {useState} from "react";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
    meme: Meme;
    onSave: (updated: Meme) => void;
};

export const EditMemeModal = ({isOpen, onOpenChange, meme, onSave}: Props) => {
    const [editedMeme, setEditedMeme] = useState<Meme>(meme);

    const handleChange = (field: keyof Meme, value: string | number) => {
        setEditedMeme({...editedMeme, [field]: value});
    };

    const handleSave = () => {
        onSave(editedMeme);
        onOpenChange();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader>Edit Meme</ModalHeader>
                        <ModalBody>
                            <Input
                                label="Title"
                                value={editedMeme.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                            <Input
                                label="Image URL"
                                value={editedMeme.image}
                                onChange={(e) => handleChange("image", e.target.value)}
                            />
                            <Input
                                label="Likes"
                                type="number"
                                value={editedMeme.likes.toString()}
                                onChange={(e) => handleChange("likes", Number(e.target.value))}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onOpenChange}>
                                Cancel
                            </Button>
                            <Button color="primary" onPress={handleSave}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};